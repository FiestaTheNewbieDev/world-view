import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarth } from '@fortawesome/free-solid-svg-icons'
import Searchbar from './Searchbar'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function Navbar({ className }) {
  return (
    <nav className={`bg-black w-full px-8 ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto p-4">
        <a
          href="/"
          className="flex items-center space-x-3 text-white text-2xl font-semibold self-center whitespace-nowrap"
        >
          <span>World</span>
          <FontAwesomeIcon icon={faEarth} size="lg" color="white" />
          <span>View</span>
        </a>
        <Searchbar className="w-full md:w-1/2 mt-2 md:mt-0" />
      </div>
    </nav>
  )
}
