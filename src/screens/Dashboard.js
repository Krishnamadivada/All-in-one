import { Typography, CssBaseline, Box, Toolbar, Grid, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();
  const budgets = useSelector((state) => state.budgets);

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      let tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ ...doc.data(), id: doc.id });
      });
      console.log("tasks", tasks);
      setTasks(tasks.length);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const APIKEY = 'cfe00c1bf18f3badfb25075206369878';

  const getWeather = async () => {
   
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=hyderabad&units=metric&appid=${APIKEY}`)
      .then((response) => {
        console.log('AAAAAAAAA', response.data)
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    }  

  useEffect(() => {
    fetchTasks();
    getWeather();
  },[]);

  const handleCreateTask = () => {
    navigate("/tasks");
  }
  const handleCreateBudget = () => {
    navigate("/expense");
  }
  const handleWeather = () => {
    navigate("/weather");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography variant="h5" fontWeight='bold'>
          Dashboard
        </Typography>
        <Grid container spacing={3} mt={1}>
         <Grid item xs={4}>
          <div style={{ boxShadow: "0 0 4px 4px  rgba(0,0,0,0.1)", display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems:'center', padding: 10, borderRadius: 6}}>
            <Typography mb={1}>
              Existing tasks: {tasks}
            </Typography>
            <Button variant="outlined" onClick={handleCreateTask} size="small">
              Create new Task
            </Button>
          </div>
         </Grid>
         <Grid item xs={4}>
          <div style={{ boxShadow: "0 0 4px 4px  rgba(0,0,0,0.1)", display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems:'center', padding: 10, borderRadius: 6}}>
            <Typography mb={1}>
              Existing Budgets: {budgets.length}
            </Typography>
            <Button variant="outlined" onClick={handleCreateBudget} size="small">
              Create new Budget
            </Button>
          </div>
         </Grid>
         <Grid item xs={4}>
          <div style={{ boxShadow: "0 0 4px 4px  rgba(0,0,0,0.1)", display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems:'center', padding: 10, borderRadius: 6}}>
            <Typography mb={1}>
              Weather in {weatherData?.city?.name}{' '}{weatherData?.list[0].main.temp}°C
            </Typography>
            <Button variant="outlined" onClick={handleWeather} size="small">
              Know weather
            </Button>
          </div>
         </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
