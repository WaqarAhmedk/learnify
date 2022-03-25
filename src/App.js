
import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Routes ,Switch} from 'react-router-dom';
import './App.css';
import Login from './pages/authpages/loginp';
import Signup from './pages/authpages/signupp';
import Landingpage from './pages/home';
import Instructordashboard from './pages/Instructor/instructordashboard';
import Navbarmain from './pages/mainnavbar';
import OurMoto from './pages/moto';


function App() {
  var role = "instructor";
  return (
    <div className="">

      <BrowserRouter>
        <Navbarmain />
        <Routes>
         
          <Route exact path='/' element={<Landingpage />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/moto' element={<OurMoto />}/>
          <Route exact path='/signin' element={<Login />} />



          
          <Route exact path='/instructordashboard' element={<Instructordashboard />} />
        </Routes>
      </BrowserRouter>

      
      {/* <Landingpage />
   <Signup />
   <Login />
   <Instructordashboard /> */}


    </div>
  );
}

export default App;
