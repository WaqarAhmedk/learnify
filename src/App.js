
import './App.css';
import Instructordashboard from './pages/Instructor/instructordashboard';

import Studentdashboard from './pages/Sudent/studnetdashboard';

function App() {
  var role="instructor";
  return (
    <div className="">
   <Instructordashboard role={role}/>
    </div>
  );
}

export default App;
