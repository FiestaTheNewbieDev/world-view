'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { fetchCountryByCode } from '@/services/countries/CountriesService'
import ICountry from '@/interfaces/ICountry'
import Navbar from '@/components/Navbar'
import NotFound from '@/app/not-found'
import Link from 'next/link'

export default function Country() {
  const { name } = useParams()
  const [country, setCountry] = React.useState<ICountry>()
  const [borders, setBorders] = React.useState<ICountry[]>([])
  const [notFound, setNotFound] = React.useState(false)

  React.useEffect(() => {
    fetchCountryByCode(name as string)
      .then((response) => {
        setCountry(response.data[0] as ICountry)
      })
      .catch((error) => {
        if (error.code === 'ERR_BAD_REQUEST') {
          setNotFound(true)
        }
      })
  }, [])

  React.useEffect(() => {
    country?.borders?.forEach((border) => {
      fetchCountryByCode(border).then((response) => {
        setBorders((borders) => [...borders, response.data[0] as ICountry])
      })
    })
  }, [country])

  React.useEffect(() => {
    setBorders(borders.filter((value, index) => borders.indexOf(value) === index))
  }, [borders])

  if (notFound) {
    return NotFound()
  }

  return (
    <div className="min-h-screen w-full bg-black">
      <Navbar className="sticky top-0" />

      <header className="text-white w-full px-[5%] py-8">
        <div className="flex flex-wrap gap-8 items-center justify-center">
          <img src={country?.flags.png} alt={country?.flags.alt} />
          <div className="flex-grow">
            <h1 className="font-bold text-4xl">
              <span>{country?.flag} </span>
              {country?.name.common}
            </h1>
            <h2 className="text-gray-500 text-2xl">{country?.name.official}</h2>
          </div>
        </div>
      </header>

      <main className="w-full text-white p-[5%] flex flex-wrap gap-[5%] gap-y-[20px]">
        <section>
          <h3 className="text-xl font-bold">Basic Country Information</h3>
          <ul className="mx-4">
            <li>
              <span className="font-bold">Common Names:</span>
              <ul className="mx-6 list-disc">
                {Object.values(country?.name.nativeName || {}).map((nativeName) => (
                  <li>
                    <span className="text-gray-500">{nativeName.common}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <span className="font-bold">Official Names:</span>
              <ul className="mx-6 list-disc">
                {Object.values(country?.name.nativeName || {}).map((nativeName) => (
                  <li>
                    <span className="text-gray-500">{nativeName.official}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold">Geographical Data</h3>
          <ul className="mx-4">
            <li>
              <span className="font-bold">Lat, Lng:</span>{' '}
              {country?.latlng[0] && country?.latlng[1] ? (
                <span className="text-gray-500">
                  {country?.latlng[0]}, {country?.latlng[1]}
                </span>
              ) : (
                <span className="text-gray-500">Unknown</span>
              )}
            </li>
            <li>
              <span className="font-bold">Area:</span>{' '}
              {country?.area ? (
                <span className="text-gray-500">
                  {country?.area} km<sup>2</sup>
                </span>
              ) : (
                <span className="text-gray-500">Unknown</span>
              )}
            </li>
            <li>
              <span className="font-bold">Borders:</span>{' '}
              {borders.length > 0 ? (
                <ul className="mx-6 list-disc">
                  {borders.map((border) => (
                    <Link href={`/${border.cca3}`}>
                      <li>
                        <span className="text-gray-500 hover:text-white hover:underline">{border?.name.common}</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-500">None</span>
              )}
            </li>
            <li>
              <span className="font-bold">Region, Subregion:</span>{' '}
              {country?.region ? (
                <span className="text-gray-500">{country?.region}, </span>
              ) : (
                <span className="text-gray-500">Unknown, </span>
              )}
              {country?.subregion ? (
                <span className="text-gray-500">{country?.subregion}</span>
              ) : (
                <span className="text-gray-500">{country?.region}</span>
              )}
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold">Political and Administrative Data</h3>
          <ul className="mx-4">
            <li>
              <span className="fond-bold">Capital:</span>{' '}
              {country?.capital ? (
                <span className="text-gray-500">{country?.capital}</span>
              ) : (
                <span className="text-gray-500">None</span>
              )}
            </li>
            <li>
              <span className="font-bold">Indepedent:</span>{' '}
              {country?.independent ? (
                <span className="text-gray-500">Yes</span>
              ) : (
                <span className="text-gray-500">No</span>
              )}
            </li>
            <li>
              <span className="font-bold">UN Member:</span>{' '}
              {country?.unMember ? (
                <span className="text-gray-500">Yes</span>
              ) : (
                <span className="text-gray-500">No</span>
              )}
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold">Economic and Demographic Data</h3>
          <ul className="mx-4">
            <li>
              <span className="font-bold">Population:</span>{' '}
              {country?.population ? (
                <span className="text-gray-500">{country?.population}</span>
              ) : (
                <span className="text-gray-500">Unknown</span>
              )}
            </li>
            <li>
              <span className="font-bold">Currencies:</span>
              <ul className="mx-6 list-disc">
                {Object.values(country?.currencies || {}).map((currency) => (
                  <li>
                    <span className="text-gray-500">
                      {currency.name} ({currency.symbol})
                    </span>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <span className="font-bold">Gini coefficient:</span>
              <ul className="mx-6 list-disc">
                {Object.entries(country?.gini || {}).map(([year, value]) => (
                  <li>
                    <span className="text-gray-500">
                      {year}: {value}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold">Cultural Data</h3>
          <ul className="mx-4">
            <li>
              <span className="font-bold">Languages:</span>
              <ul className="mx-6 list-disc">
                {Object.values(country?.languages || {}).map((language) => (
                  <li>
                    <span className="text-gray-500">{language}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}
