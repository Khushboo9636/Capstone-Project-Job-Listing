import React, { useState } from 'react'
import {useNavigate} from 'react-router';
import styles from './Style.module.css'

function RegisterForm() {
    const navigate = useNavigate()
const [formData,setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    agreeTerms: false,
});

const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]: e.target.value})
};

const handleSubmit = async (e) =>{
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.mobile || !formData.agreeTerms ){
        alert('Please fill in all fields')
        return;
    }
     
    try {
        const response = await fetch("http://localhost:4000/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "appliction/json",

          },
          body: JSON.stringify(formData)
        });
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        
        const responseData = await response.json();
        console.log(responseData);
        window.localStorage.setItem("user", responseData.user)
        window.localStorage.setItem("name", responseData.name)
        window.localStorage.setItem("token", responseData.token)
        navigate("/listing")

    } catch (error) {
        console.error("Error during fetching", error);
        alert("There is problem with sending request please check.")
    }
     

}


  return (
    <div className={styles.container}>
        <h1 className={styles.h1}> Create an account</h1>
        <h5 className={styles.h5}> Your personal job finder is here</h5>
         
         
            <input className={styles.input} type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name'/>  
            <input className={styles.input} type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
            <input className={styles.input} type="text" name="mobile" placeholder='Mobile' value={formData.mobile} onChange={handleChange} />
            <input className={styles.input} type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
            <span className={styles.message}><input className={styles.checkedInput} type="checkbox" name="agreeTerms" value={formData.agreeTerms} onChange={handleChange} />
            
               By creating an account you agree to our terms of use and privacy policy.
            </span>

            <button type="submit" className={styles.button} onClick={handleSubmit}>Create Account</button>
         
         <p className={styles.footer}>Already have an account? <span className={styles.underline} onClick={() => navigate("/Login")}>Sign in</span></p>
        
        

      
    </div>
  )
}

export default RegisterForm
