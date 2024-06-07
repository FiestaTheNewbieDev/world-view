import React from 'react'
import ICountry from '@/interfaces/ICountry'

export interface IRootContext {
  countries: ICountry[]
  searchByKeyword: (keyword: string) => void
}

const defaultValues: IRootContext = {
  countries: [],
  searchByKeyword: () => {}
}

const RootContext = React.createContext<IRootContext>(defaultValues)

export default RootContext
