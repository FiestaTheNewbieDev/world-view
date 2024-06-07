import { api } from '@/services/ServiceHelper'

export const fetchAllCountries = async () => {
  return await api.get('/all')
}

export const fetchCountryByName = async (name: string) => {
  return await api.get(`/name/${name}?fullText=true`)
}

export const fetchCountryByCode = async (code: string) => {
  return await api.get(`/alpha/${code}`)
}

export const fetchAllByFilter = async (name: string, capital = null, currencies = null) => {
  return await api.get(`/all?fields=${name},capital,currencies`)
}
