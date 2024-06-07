'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import RootContext from '@/contexts/RootContext'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function Searchbar(props: { className?: string }) {
  const { searchByKeyword } = React.useContext(RootContext)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const keyword: string = (event.currentTarget.elements.namedItem('keyword') as HTMLInputElement).value
    window.location.href = `/?keyword=${keyword}`
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const keyword: string = (event.currentTarget as HTMLInputElement).value
    searchByKeyword(keyword)
  }

  return (
    <div className={props.className}>
      <form
        className="relative flex items-center w-full h-12 rounded-lg bg-white overflow-hidden"
        onSubmit={handleSubmit}
      >
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          id="keyword"
          type="text"
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          placeholder="Search..."
          onChange={handleChange}
        />
        <input type="submit" hidden />
      </form>
    </div>
  )
}
