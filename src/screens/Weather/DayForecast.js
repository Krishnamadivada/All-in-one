// DayForecast.jsx
import React from "react";
import { Typography, Grid, Button, } from "@mui/material";

const DayForecast = ({ date, forecasts, setShowHourlyData, setHourlyData }) => {

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  const handleMoreDetails = (forecast) => {
   setShowHourlyData(true);
   setHourlyData(forecast);
  }

  return (
    <Grid item key={date} xs={12} sm={6} md={4} sx={{display: 'flex', justifyContent: 'center'}}>
      <div style={{background: 'rgba(91, 57, 244, 0.119)', padding: 20, borderRadius: 6, display: 'flex',flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Typography variant="h6" gutterBottom>
          {date}
        </Typography>
        <div style={{display: 'flex',flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
        <img
            src={getWeatherIconUrl(forecasts[0].weather[0].icon)}
            alt={forecasts[0].weather[0].description}
          />
        <Typography variant="body1">
          Temperature: {Math.round(forecasts[0].main.temp)}°C
        </Typography>
        
        </div>
        <Button variant="outlined" onClick={()=>handleMoreDetails(forecasts)}>
          More Details
        </Button>
          </div>
    </Grid>
  );
};

export default DayForecast;
