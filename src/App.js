import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Autocomplete,TextField } from '@mui/material'
import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const[city,setcity] = useState('');
  const[weatherdata,setweatherdata] = useState(null);
  
  const cities = ["Sarajevo","Mostar","Trebinje","Zenica","Banja Luka","Tuzla","Bijeljina","Doboj"]

  // case for autocomplete
  const handleChange = (event,value) =>{
    setcity(value)
  }
  

  const fetchWeatherData = async () =>{
    
    try{

      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6570afc5dfde20e21f2781d0d09810ba&units=metric`);
      console.log(result.data);
    
      if(result.status === 200){
        setweatherdata(result.data);
      }
      
    }catch(e){

      console.log(e);

    }


  };
      

    
    
    
  useEffect(()=>{

    
    if(city){

      fetchWeatherData();

    }else{

      setweatherdata(null);

    }

  },[city]);
    
    


  
  return (
    <div className="App">
      <div className="wrapper">
        <h2>Weather forecast for Bosnia and Herzegovina</h2>
        <ThermostatIcon/>
        

      </div>
      <div className="App-header">
        <div className='input-wrapper'>
          <Autocomplete
          disablePortal
          id="city-search"
          options={cities}
          sx={{ width: 300 }}
          onChange={(event,value)=>handleChange(event,value)}
          value={city}
          renderInput={(params) => <TextField {...params} label="City"  />}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        
          
        </div>
        <div className='weather-wrapper'>
          {weatherdata ?
          <>
          <div>
            <h3 className='boja'>{weatherdata?.name}</h3>
          </div>
          <div className='temperature-wrapper'>
            <div>
              <p>Temperature:</p>
              <p><b>{Math.round(weatherdata?.main?.temp)}&#8451;</b></p>
            </div>
            <div>
              <p>Feels Like:</p>
              <p><b>{Math.round(weatherdata?.main?.feels_like)}&#8451;</b></p>
            </div>
          </div>
          <div>
            <p className='weather'>{weatherdata?.weather[0].main}</p>
            <img src={`https://openweathermap.org/img/wn/${weatherdata?.weather[0]?.icon}@2x.png`} alt="#" width="150" height="100"/>
          </div>
          <div>
            <p>Humidity: <b>{weatherdata?.main?.humidity}%</b></p>
          </div>
          </>  :
         <h4>no data avaliable</h4>
        }
        </div>
        </div>
    </div>
         
  );
}
          
export default App;
            
            

            


        
         
  
        



        

