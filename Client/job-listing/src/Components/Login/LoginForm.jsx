import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import style from './Style.module.css';
function LoginForm(props) {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password :""
    });
    const handleChange =(e) =>{
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(data.email && data.password) {
            try {
                const response = await fetch("https://api-0173.onrender.com/api/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                if(!response.ok){
                    throw new Error("Network response was not ok");

                }
                const responseData = await response.json()
                console.log(responseData);
                window.localStorage.setItem("user", responseData.user)
                window.localStorage.setItem("name", responseData.recruiterName)
                window.localStorage.setItem("token", responseData.token)
                navigate("/joblist")
                
            } catch (error) {
                alert("There was problem with the request , please try again");
                console.log(error)
            }
        }
    }
  return (
    <div className={style.container}>
        <h1 className={style.h1}> Already have an account?</h1>
        <h5 className={style.h5}> Your personal job finder is here</h5>
        
      <input className={style.input} type={'email'} name='email' value={data.email} placeholder='Email' onChange={handleChange}/> 
      <input className={style.input
    } type={'password'} name='password' value={data.password} placeholder='Password' onChange={handleChange}/>
      <button onClick={handleSubmit} className={style.button}>
        Sign in
      </button>
      
      <footer className={style.footer}> Don't have an account? <span onClick={() => navigate("/register")} className={style.underline}>Sign Up </span></footer>

    </div>
  )
}

export default LoginForm