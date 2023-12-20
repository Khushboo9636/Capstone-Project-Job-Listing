import React from 'react'
import RegisterForm from '../Components/Register/RegisterForm'
import img1 from '../assets/i1.png'
import img2 from '../assets/i2.png'
function Register() {
  return (
    <div className='main' style={{display:"flex"}}>
      <div className='main-left' style={{width:"60vw"}}>
        <RegisterForm/>

      </div>
      <div className='main-right' style={{width:"40vw"}}>
      <img style={{position: "absolute",
    top: "20px",
    paddingTop:"20px",
    paddingLeft: "100px",
    width: "23%", marginLeft:"10px"}} src = {img2} alt="Image2" />
        <img style={{height:"100vh", width:"40vw", margin:"0px",paddingLeft:"10px"}} src = {img1} alt="Image1" />

      </div>
    </div>
  );
}

export default Register;
