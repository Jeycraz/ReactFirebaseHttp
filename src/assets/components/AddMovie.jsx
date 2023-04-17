import React, { useRef, useState } from 'react'
import './AddMovie.css'

function AddMovie(props) {
    const [ titleState,setTitleState] = useState('')
    const [ openingState,setOpeningText] = useState('')
    const [ releaseState,setRelease_date] = useState('')

    const titleRef = useRef('')
    const openingText = useRef('')
    const release_date = useRef('')

    const onSubmitHandler = (e)=>{
        e.preventDefault()

        const updatedMovie = {
            title:titleRef.current.value,
            openingText:openingText.current.value,
            release_date:release_date.current.value,
        }
        props.onAddMovie(updatedMovie)
    
    // Use inputRef to access the DOM target value 
       titleRef.current.value = ''
       openingText.current.value = ''
       release_date.current.value = ''
    }
  return (
    <form onSubmit={onSubmitHandler} className='form-container'>
        <div className='input-style' >
            <label htmlFor="title">Title</label>
            <input type="text" ref={titleRef} />
        </div>

        <div className='input-style'>
            <label htmlFor="openingtext">Opening Text</label>
            <input type="text" ref={openingText} />
        </div>

        <div className='input-style'>
            <label htmlFor="release-date">Release Date</label>
            <input type="text" ref={release_date}/>
        </div>
        <button type="submit">Submit Form</button>
    </form>
  )
}

export default AddMovie