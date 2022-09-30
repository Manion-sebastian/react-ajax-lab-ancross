import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import DisplayCards from './DisplayCards';

function App() {
  
  const [visible, setVisible] = useState(false)
  const [faves, setFaves] = useState([])
  const [search, setSearch] = useState('')
  const [data, setData] = useState({villagers: []})

  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
      .then(response => response.json())
      .then((rdata) => {
        rdata = Object.values(rdata)
        setData({villagers: rdata})
        // console.log('Villager Data:', rdata)
      })
  }, [])

  const getFilteredVillagers = (e) => {
    let searchTerm = search.toLowerCase()
    return data.villagers.filter(v => {
      let lowerCaseName = v.name['name-USen'].toLowerCase()
      return lowerCaseName.includes(searchTerm)
    })
  }

  const handleClick = villager => {
    if(!faves.includes(villager)){
      setFaves([...faves, villager])
      if(!visible){
        setVisible(true)
      }
    }
  }

  const handleClearFavs = () => {
    setFaves([])
    if(visible){
      setVisible(false)
    }
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
        <div className={`favorites ${visible? '': 'hidden'}`}  >
          <h1>Favorite Villagers</h1>
          <DisplayCards 
          clickie={false}
          villagers={faves}/>

          <button onClick={() => handleClearFavs()}>Clear Favorites</button>
        </div>
        <div className='characterGrid'>
          <DisplayCards 
          clickie={true}
          villagers={getFilteredVillagers()}
          handleClick={handleClick}
          />

        </div>
  
    </div>
  )
}

export default App;
