import {Routes, Route} from "react-router-dom"
import Register from  './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import { Detail } from "./Pages/Detail.jsx";
import AddJob from "./Pages/Job.jsx";
import JobList from "./Pages/JobList.jsx";

function App() {
  return (
    <Routes>
      <Route path="/register"  element={<Register/>} />
      <Route path="/login"  element= {<Login/>} />
      <Route path="/addjob"  element= {<AddJob/>} />
      <Route path="/detail"  element= {<Detail/>} />
      <Route path="/joblist"  element= {<JobList/>} />
      <Route path="/"  element= {<JobList/>} />

      
    </Routes>
  );
}

export default App;
