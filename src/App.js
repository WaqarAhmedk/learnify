


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Addcourse from './components/addcourse';
import Dashboard from './components/dashboard';
import UpdateCourse from './components/updatecourse';

import Login from './pages/authpages/loginp';
import Signup from './pages/authpages/signupp';
import Landingpage from './pages/home';

import OurMoto from './pages/moto';




function App() {


  return (


    <div className="">



      <BrowserRouter>


        <Routes>

          <Route exact path='/' element={<Landingpage />} />

          <Route exact path='/addcourse' element={<Addcourse />} />
          <Route exact path='/updatecourse' element={<UpdateCourse />} />


          <Route exact path='/moto' element={<OurMoto />} />

          <Route exact path='/signup' element={<Signup />} />

          <Route exact path='/signin' element={<Login />} />

          <Route exact path="/dashboard" element={<Dashboard />} />

        </Routes>

      </BrowserRouter>





    </div>
  );
}

export default App;
