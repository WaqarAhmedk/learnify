

import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import CallHomePage from './components/meeeting/callhomepage/callhomepage';
import CallPage from './components/meeeting/callpage/callpage';
import Header from './components/header';
import Login from './pages/authpages/loginp';
import Signup from './pages/authpages/signupp';
import Landingpage from './pages/home';
import Navbarmain from './pages/mainnavbar';
import OurMoto from './pages/moto';
import { useContext } from 'react';
import CustomPopup from './components/meeeting/scanface/joinmeeting-popup1';
import CustomPopupShowFace from './components/meeeting/scanface/facescanprogress';
import ParticipationReport from './pages/participationreport';
import { useCookies } from 'react-cookie';
import TeacherClassDetails from './teacher/teacherclassdetails';
import Dashboard from './student/studentdashboard';
import ClassDetails from './student/studentclassdetails';
import TeacherDashboard from './teacher/teacherdashboard';
import Calendar from './components/calendar';
import { UserContext, UserProvider } from "./context/usercontext"
import TeacherProtectedRoutes from './teacher/teachercomponents/teacherroutecomponents/TeacherProtectedRoutes';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { CourseDetailsProvider } from './teacher/context/Coursecontext';
import CreateQuiz from './teacher/teachercomponents/crudoperations/CreateQuiz';
import { QuizContextProvider } from './teacher/context/QuizCOntext';
import QuizParent from './teacher/teachercomponents/teacherdashboardcomponents/QuizParent';
import StartQuiz from './student/Quiz/startQuiz';
import AttemptQuiz from './student/Quiz/AttemptQuiz';
import Room from './components/meeeting/callpage/callpage';

function App() {

  const [user, setUser] = useContext(UserContext);
  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }



  return (


    <AlertProvider template={AlertTemplate} {...options}>


      <BrowserRouter>

        {

          user.logedin ? <Header /> : <Navbarmain />

        }







        <Routes>


          <Route exact path='/meeting/:id' element={<Room />} />
          <Route exact path='/createmeeting' element={<CallHomePage />} />

          
          <Route exact path="/scanface" element={<CustomPopup />} />
          <Route exact path='/participationReport' element={<ParticipationReport />} />
          <Route exact path='/showface' element={<CustomPopupShowFace />} />



          <Route exact path='/' element={<Landingpage />} />
          <Route exact path='/moto' element={<OurMoto />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/signin' element={<Login />} />




          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path='/dashboard/classdetails' element={<ClassDetails />} />
          <Route exact path='/startquiz/:quizid' element={<StartQuiz />} />
          <Route exact path='/attemptquiz/:quizid' element={<AttemptQuiz />} />




          {/* teacher */}



          <Route exact path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route exact path='teacher/dashboard/classdetails/:courseid' element={<TeacherClassDetails />} />
          <Route exact path="/events" element={<Calendar />} />
          <Route exact path="/createquiz/course/:courseid" element={<QuizParent />} />

          {/* <Route element={<TeacherProtectedRoutes />}>
          </Route> */}


        </Routes>

      </BrowserRouter>





    </AlertProvider>
  );
}

export default App;
