

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
import ClassDetails from '../src/pages/classdetails';
import Navbarmain from './pages/mainnavbar';
import OurMoto from './pages/moto';
import axios from 'axios';
import { useState } from 'react';
import CustomPopup from './components/meeeting/scanface/joinmeeting-popup1';


function App() {
  var role = "instructor";


  let [vara, setvar] = useState("");
  // axios
  //   .get("http://localhost:8080/")
  //   .then((response) => {
  //     setvar(response.data.msg);
  //   })
  //   .catch(err => console.error(err));



  let loggedin = false;

  return (


    <div className="">

    

      <BrowserRouter>

        {

          loggedin ? <Header /> : <Navbarmain />
        }


        <Routes>

          <Route exact path='/:id' element={<CallPage />} />
          <Route exact path='/meetinghome' element={<CallHomePage />} />


          <Route exact path='/' element={<Landingpage />} />

          <Route exact path='/moto' element={<OurMoto />} />

          <Route exact path='/signup' element={<Signup />} />

       
          
          <Route exact path='/signin' element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route exact path="/scanface" element={<CustomPopup />} />

          <Route exact path='/dashboard/classdetails' element={<ClassDetails />} />

        </Routes>

      </BrowserRouter>





    </div>
  );
}

export default App;
