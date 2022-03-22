
import './App.css';
import Landingpage from './pages/home';
import Instructordashboard from './pages/Instructor/instructordashboard';

import Studentdashboard from './pages/Sudent/studnetdashboard';

function App() {
  var role = "instructor";
  return (
    <div className="">

      <Landingpage />




      {/* <Instructordashboard role={role}/> */}
    </div>
  );
}

export default App;
