'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { fetchAllCountries } from '@/services/countries/CountriesService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarth } from '@fortawesome/free-solid-svg-icons'
import RootContext from '@/contexts/RootContext'
import Navbar from '@/components/Navbar'
import CountryCard from '@/components/CountryCard'
import ICountry from '@/interfaces/ICountry'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function Home() {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')

  const [countries, setCountries] = React.useState<ICountry[]>([])
  const [results, setResults] = React.useState<ICountry[]>([])

  const searchByKeyword = (keyword: string) => {
    setResults(
      countries.filter(
        (country) =>
          country.name.common.toLowerCase().includes(keyword.toLowerCase()) ||
          country.name.official.toLowerCase().includes(keyword.toLowerCase()) ||
          country.capital?.some((capital) => capital.toLowerCase().includes(keyword.toLowerCase()))
      )
    )
  }

  React.useEffect(() => {
    fetchAllCountries().then((response) => {
      setCountries(response.data.sort((a: ICountry, b: ICountry) => a.name.common.localeCompare(b.name.common)))
    })
  }, [])

  React.useEffect(() => {
    setResults(countries)

    if (keyword) {
      searchByKeyword(keyword)
    }
  }, [countries])

  const contextValues = {
    countries,
    searchByKeyword
  }

  return (
    <RootContext.Provider value={contextValues}>
      <Navbar className="fixed" />
      <main>
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-black font-bold text-6xl">
            World <FontAwesomeIcon icon={faEarth} /> View
          </h1>
        </div>
        <div className="faded-box h-100"></div>
        <div className="bg-black flex flex-wrap gap-4 justify-center py-16 p-4">
          {results.map((country) => (
            <CountryCard key={country.name.common} {...country} />
          ))}
        </div>
      </main>
    </RootContext.Provider>
  )
}
