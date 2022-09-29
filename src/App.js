import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import DisplayCards from './DisplayCards';

function App() {
  
  const [faves, setFaves] = useState([])
  const [search, setSearch] = useState('')
  const [data, setData] = useState({villagers: []})

  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
      .then(response => response.json())
      .then((rdata) => {
        rdata = Object.values(rdata)
        setData({villagers: rdata})
        console.log('Villager Data:', rdata)
      })
  }, [])

  const getFilteredVillagers = (e) => {
    let searchTerm = search.toLowerCase()
    return data.villagers.filter(v => {
      let lowerCaseName = v.name['name-USen'].toLowerCase()
      return lowerCaseName.includes(searchTerm)
    })
  }

  

  return (
    <div className='App'>
        <div className='search'>
          <label htmlFor="villager-search">Search for a villager</label>
          <input 
            id="villager-search" 
            type="text" 
            value={search} 
            onChange={e => {setSearch(e.target.value)}}
          />
        </div>
        <DisplayCards villagers={getFilteredVillagers()}/>
  
    </div>
  )
}

export default App;
