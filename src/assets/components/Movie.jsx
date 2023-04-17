import React from 'react'
import './Movie.css'

function Movie(props) {
    return(
    <li className='movielist'>
        <h2>Title:{props.title}</h2>
        <h3>openingText:{props.openingText}</h3>
        <h3>releaseDate:{props.releaseDate}</h3>
    </li>
    )
}

export default Movie