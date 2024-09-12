/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const Redirect = ({label, link, path}) => {
  return (
    <p className="text-[16px]">
        {label} <Link to={`/${path}`} className="text-blue-600 underline">{link}</Link>
      </p>
  )
}

export default Redirect
