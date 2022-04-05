

import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import CallHomePage from './components/meeeting/callhomepage/callhomepage';
import CallPage from './components/meeeting/callpage/callpage';
import Dashboard from './components/dashboard';
import Header from './components/header';
import Login from './pages/authpages/loginp';
import Signup from './pages/authpages/signupp';
import Landingpage from './pages/home';
import InstClassDetails from './pages/inst_classdetails';
import Navbarmain from './pages/mainnavbar';
import OurMoto from './pages/moto';
import axios from 'axios';
import { useState } from 'react';


function App() {
  var role = "instructor";


let [vara,setvar]=useState("");
  axios
    .get("http://localhost:8080/")
    .then((response)=>{
      setvar(response.data.msg);
    } )
    .catch(err => console.error(err));

  let loggedin = false;
  return (


    <div className="">

{vara}

      <BrowserRouter>

        {

          loggedin ? <Header /> : <Navbarmain />
        }


        <Routes>

          <Route exact path='/:id' element={<CallPage />} />
          <Route exact path='/s' element={<CallHomePage />} />

          
          <Route exact path='/' element={<Landingpage />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/moto' element={<OurMoto />} />
          <Route exact path='/signin' element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path='/dashboard/classdetails' element={<InstClassDetails />} />

        </Routes>
      </BrowserRouter>





    </div>
  );
}

export default App;
