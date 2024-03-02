import './App.css';
import { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, Button } from '@mui/material';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

function App() {

  const [cityA, setCityA] = useState("");
  const [cityB, setCityB] = useState("");
  const [cities, setCities] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3000/cities").then((response)=>{
      console.debug(response)
      setCities(response.data);
    })
    .catch((err)=>{
      alert("something went wrong from BE");
    })
  },[])

  function handleSubmit()
  {
    if(!cityA || !cityB)
    {
      alert('please select two cities')
    }
    else{

    }
  }
  return (
    <div className="App">
          <div>
          <InputLabel id="cityA">Select city A</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cityA}
              label="Select City A"
              onChange={(e)=>{setCityA(e.target.value)}}
              autoWidth
          >
            {
              cities.map((city)=>(
                <MenuItem value={city}>{city.name}</MenuItem>
              ))
            }
          </Select>
          </div>
          <div>
          <InputLabel id="cityB">Select City B</InputLabel>
          <Select
              id="cityB"
              value={cityB}
              label="Select City B"
              autoWidth
              onChange={(e)=>{setCityB(e.target.value)}}
          >
            {
              cities.map((city)=>(
                <MenuItem value={city}>{city.name}</MenuItem>
              ))
            }
          </Select>
          </div>
          <Button onClick={handleSubmit} type='primary'>submit</Button>
          <div>
            {
              cityA && cityB && <MapContainer center={[37.7749, -122.4194]} zoom={4} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
    
                {/* Markers for two cities */}
                <Marker position={[cityA.lat,cityA.lon]}>
                  <Popup>{cityA.name}</Popup>
                </Marker>
                <Marker position={[cityB.lat,cityB.lon]}>
                  <Popup>{cityB.name}</Popup>
                </Marker>
    
                {/* Polyline to connect the two cities */}
                <Polyline positions={[[cityA.lat,cityA.lon], [cityB.lat,cityB.lon]]} color="blue" />
              </MapContainer>
            }
          
          </div>
    </div>
    
  );
}

export default App;
