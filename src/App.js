
import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard';
import Header from './components/header';
import Login from './pages/authpages/loginp';
import Signup from './pages/authpages/signupp';
import Landingpage from './pages/home';
import InstClassDetails from './pages/instructor/inst_classdetails';
import Navbarmain from './pages/mainnavbar';
import OurMoto from './pages/moto';


function App() {
  var role = "instructor";

  let loggedin = false;
  return (


    <div className="">



      <BrowserRouter>

        {

          loggedin ? <Header /> : <Navbarmain />
        }


        <Routes>

          <Route exact path='/' element={<Landingpage />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/moto' element={<OurMoto />} />
          <Route exact path='/signin' element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route  exact path='/dashboard/classdetails' element={<InstClassDetails />}  />

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
