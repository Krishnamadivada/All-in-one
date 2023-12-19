// DayForecast.jsx
import React from "react";
import { Typography, Grid } from "@mui/material";

const HourlyForecast = ({ forecasts }) => {

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  const formatTime = (dtTxt) => {
    const time = dtTxt.split(" ")[1];
    return time;
  };


  return (
   <>
      {forecasts.map((forecast, index)=>(
        <Grid item key={index} xs={12} sm={6} md={3} sx={{display: 'flex', justifyContent: 'center'}}>
        <div style={{background: 'rgba(91, 57, 244, 0.119)', padding: 20, borderRadius: 6, display: 'flex',flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <img
            src={getWeatherIconUrl(forecast.weather[0].icon)}
            alt={forecast.weather[0].description}
            style={{objectFit: 'cover', width: '100px'}}
          />
        <Typography>
          Time: {formatTime(forecast.dt_txt)}
        </Typography>
        <Typography>
          Temperature: {forecast.main.temp}
        </Typography>
        <Typography>
          Humidity: {forecast.main.humidity}
        </Typography>
        <Typography>
          Pressure: {forecast.main.pressure}
        </Typography>
        <Typography>
          Wind speed: {forecast.wind.speed}
        </Typography>
        </div>
        </Grid>
      ))}
      
      </>
  );
};

export default HourlyForecast;
