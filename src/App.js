

import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Login from './pages/authpages/loginp';
import Signup from './pages/authpages/signupp';
import Landingpage from './pages/home';
import Navbarmain from './pages/mainnavbar';
import OurMoto from './pages/moto';
import React, { useContext } from 'react';
import ParticipationReport from './pages/participationreport';
import TeacherClassDetails from './teacher/teacherclassdetails';
import Dashboard from './student/studentdashboard';
import ClassDetails from './student/studentclassdetails';
import TeacherDashboard from './teacher/teacherdashboard';
import Calendar from './components/calendar';
import { UserContext, UserProvider } from "./context/usercontext"
import TeacherProtectedRoutes from './teacher/teachercomponents/teacherroutecomponents/TeacherProtectedRoutes';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import QuizParent from './teacher/teachercomponents/teacherdashboardcomponents/QuizParent';
import StartQuiz from './student/Quiz/startQuiz';
import AttemptQuiz from './student/Quiz/AttemptQuiz';
import Room from './components/meeeting/callpage/callpage';
import FaceRecognition from './components/faceRecognition';
import UpdateProfile from './pages/updateprofile';
import AdminLogin from './admin/adminlogin';
import Adminhomepage from './admin/adminhomepage';
import AdminSignUp from './admin/adminsignup';
import Tasks from './components/Tasks';
import Notifications from './components/Notifications';
import TeacherEvents from './teacher/teachercomponents/teacherevents';
import AdminProtectedRoutes from './admin/AdminProtectedRoute';

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

          user.logedin ? user.user.role === "admin" ? "" : <Header /> : <Navbarmain />

        }

        <Routes>


          {/* Common */}
          <Route exact path='/' element={<Landingpage />} />
          <Route exact path='/moto' element={<OurMoto />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/signin' element={<Login />} />


          {/* Admin */}
          <Route exact path='/admin' element={<Adminhomepage />} />
          <Route exac path='/admin/login' element={<AdminLogin />} />
          <Route exac path='/admin/signup' element={<AdminSignUp />} />


          {/* Student */}

          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path='/dashboard/classdetails' element={<ClassDetails />} />
          <Route exact path='/startquiz/:quizid' element={<StartQuiz />} />
          <Route exact path='/attemptquiz/:quizid' element={<AttemptQuiz />} />
          <Route exact path="/events" element={<Calendar />} />
          <Route exac path='/tasks' element={<Tasks />} />
          <Route exac path='/notifications' element={<Notifications />} />
          <Route exact path='/face' element={<FaceRecognition />} />
          <Route exact path='/meeting/:id' element={<Room />} />
          <Route exact path='/updateprofile' element={<UpdateProfile />} />
          {/* <Route exact path='/participationReport' element={<ParticipationReport />} /> */}


          {/* teacher */}

          <Route element={<TeacherProtectedRoutes />}>

            <Route exact path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route exact path='teacher/dashboard/classdetails/:courseid' element={<TeacherClassDetails />} />
            <Route exact path="/createquiz/course/:courseid" element={<QuizParent />} />
            <Route exact path="/teacher-events" element={<TeacherEvents />} />


          </Route>


        </Routes>

      </BrowserRouter>





    </AlertProvider>
  );
}

export default App;
