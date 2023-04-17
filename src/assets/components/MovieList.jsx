import React from 'react'
import './MovieList.css'
import Movie from './movie'

function MovieList({movies}) {
    const movieList = movies
    const fullData = movieList.map((listEl)=>{
        return(
            <Movie
            key={listEl.id}
            title = {listEl.title}
            openingText={listEl.openingText}
            releaseDate={listEl.releaseDate}
            />
        )
    })
  return (
    <div className='list-container'>
        {fullData}
    </div>
  )
}

export default MovieList