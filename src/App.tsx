import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios, {Method} from 'axios';
import Search from './search/searchL';

function App() {
  const LOCATION_SEARCH_URL = '/app/api/v1/location';
  useEffect(() => {
    const deleteAll = () =>{
      axios.delete(LOCATION_SEARCH_URL+"/delete-all")
    }
    deleteAll();
    },[])

  return (
    <div className="App">
      <header className="App-header">
      <Search/>
      </header>
    </div>
  );
}

export default App;
