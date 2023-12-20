import {Routes, Route} from "react-router-dom"
import Register from  './Pages/Register.jsx'
import Login from './Pages/Login.jsx'

function App() {
  return (
    <Routes>
      <Route path="/register"  element={<Register/>} />
      <Route path="/"  element= {<Login/>} />
      
    </Routes>
  );
}

export default App;
