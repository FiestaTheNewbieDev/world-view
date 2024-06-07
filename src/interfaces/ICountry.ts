export default interface ICountry {
  altSpellings: string[]
  area: number
  borders: string[]
  capital: string[]
  capitalInfo: {
    latlng: number[]
  }
  car: {
    side: string
    signs: string[]
  }
  cca2: string
  cca3: string
  ccn3: string
  cioc: string
  coatOfArms: {
    png: string
    svg: string
  }
  continents: string[]
  currencies: {}
  demonyms: {}
  fifa: string
  flag: string
  flags: {
    alt: string
    png: string
    svg: string
  }
  gini: {}
  idd: {
    root: string
    suffiexes: string[]
  }
  independent: boolean
  landlocked: boolean
  languages: {}
  latlng: number[]
  maps: {
    googleMaps: string
    openStreetMaps: string
  }
  name: {
    common: string
    nativeName: {}
    official: string
  }
  population: number
  region: string
  startOfWeek: string
  status: string
  subregion: string
  timezones: string[]
  tlds: string[]
  translations: {}
  unMember: boolean
}
