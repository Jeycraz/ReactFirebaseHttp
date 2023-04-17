import React, { useCallback, useEffect, useState } from 'react';

import MovieList from './assets/components/MovieList';
import './App.css';
import AddMovie from './assets/components/AddMovie';

function App() {
  // const [updatedDetail,setUpdatedDetail] = useState([])
  const [list,setList] = useState([])

  // initialize loading state 
  const [isLoading,setIsLoading] = useState(false)
  const [isError,setIsError] = useState(null)

  //Have to use useCallback to prevent from unnecessary re-render
  const onFetchHandler = useCallback(async()=>{
    //The isLoading variable is initially set to true, which indicates that the page is still loading.
    setIsLoading(true)

    //ensure that the error is set to null
    setIsError(null)

    try{
    //GET API REQUEST From "FIREBASE" , 'movies' is the firebase storage folder name  , '.json' is a MUST! 
    const response = await fetch("https://react-http-50e90-default-rtdb.firebaseio.com/movies.json")
    const data = await response.json()

    const updatedDetail=[]
    for(let key in data){
      const updatedList = {
        id:key,
        title:data[key].title,
        openingText:data[key].openingText,
        releaseDate:data[key].release_date,
      }
      updatedDetail.push(updatedList)
    }
    
    if(!response.ok){
      setIsError(true)
      //Error Handling - if response is not okay - throw error
      throw new Error('Data response is not okay')
    }
  
    // Once the data is fetched, it is transformed into a totalList of movies. The isLoading variable is then set to 'false'
        setIsLoading(false)

        // upload the local updated array to 'list'
        setList(updatedDetail)
      }
  
    catch(error){
        setIsError(true)
        // setErrorMsg(error.message)
      }
      setIsLoading(false)

    //no dependencies for useCallback 
  },[])

  //POST DATA TO FIREBASE
  async function onAddMovie(movie){
    try{
      //The reason why we need to write '../movies' is because of the folder name recorded in firebase//
      const response = await fetch('https://react-http-50e90-default-rtdb.firebaseio.com/movies.json',{
        method:'POST',

        //Turn object/array into strings so that it becomes JSON compatible
        body:JSON.stringify(movie),
        // This is not optional for firebase
        //List down the specific content-type - to declare the content type 
        headers:{
          'Content-Type':'application/json',
        }})

    }catch(error){
      alert(error)
    }
  }
    // Re-render conditionally 
    //onFetchHandler() is only re-executed ONLY IF THERE IS CHANGES from onFetchHandler 
    useEffect(()=>{
      onFetchHandler()
    },[onFetchHandler])

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={onAddMovie} />
      </section>
      <section>
        <button onClick={onFetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? <p>The Page is Loading</p>:<MovieList movies={list} /> }
        { isError ?<p>Couldn't receive the data.</p>:''}
        {list.length === 0 && <p>No item has been recorded yet</p> }
      </section>
    </React.Fragment>
  );
}

export default App;
