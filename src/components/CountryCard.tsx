import Link from 'next/link'
import ICountry from '@/interfaces/ICountry'

export default function CountryCard(props: ICountry) {
  return (
    <Link href={`/${props.cca3}`} passHref>
      <div className="rounded-lg overflow-hidden shadow-lg p-4 w-64 hover:bg-gray-500 hover:bg-opacity-20">
        <div className="h-24 w-full">
          <img className="mx-auto h-full object-cover" src={props.flags.png} alt={props.flags.alt} />
        </div>
        <div className="pt-4">
          <h2 className="font-bold text-white text-md text-center">
            <span>{props.flag} </span>
            {props.name.common}
          </h2>
        </div>
      </div>
    </Link>
  )
}
