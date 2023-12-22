import { useState, useEffect } from 'react'

import style from './Style.module.css'
import { useNavigate, useLocation } from 'react-router'
function JobForm() {
    const navigate = useNavigate()
    const {state} = useLocation();
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState(null)
    const [formData, setFormData] = useState({
        companyName: "",
        logoURL: "",
        position: "",
        salary : "",
        jobType : "",
        remote :"",
        location: "",
        description: "",
        about: "",
        skillsRequired: "",
        additional: "",
    });
    console.log(formData);



    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    
    };

    useEffect(()=>{
        const {id, edit } = state || {};
        console.log(edit)
        if(edit){
            setEdit(edit)
        }
        if(id){
            setId(id);
            const options= {method: 'GET'};
            fetch(`http://localhost:4000/api/job/job-posts/${id}`,options)
            .then(response => response.json())
            .then(response => setFormData({...response.jobPost}))
            .catch(err => console.error(err));
        }

    }, [state])
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(
            !formData.companyName ||
            !formData.logoURL || 
            !formData.jobType ||
            !formData.position ||
            !formData.salary ||
            !formData.remote ||
            !formData.location ||
            !formData.description ||
            !formData.about ||
            !formData.skillsRequired||
            !formData.additional
        ){
            alert("Please fill all fields.")
            return;
        }

        const token = window.localStorage.getItem("token")
        const recruiterName = window.localStorage.getItem("name")
        if(!token){
            alert("Login first to create job")
            return
        }

        const data = {...formData,name: recruiterName}

        try {
             
            const response = await fetch("http://localhost:4000/api/job/jobdescription",{
                method: "POST",
                heders: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body:JSON.stringify(data),
            });
            if (!response.ok) {
                alert("An error ocurred, please try again");
              }

            const resData = await response.json();
            console.log(resData)
            alert("Job created Successfully")
            navigate("/joblist")
            


        } catch (error) {
            console.error("there is problem of sending data request:", error)
            
        }

    }

    const handleEdit = async (e) =>{
        e.preventDefault()
        
        if(
            !formData.companyName ||
            !formData.logoURL || 
            !formData.jobType ||
            !formData.position ||
            !formData.salary ||
            !formData.remote ||
            !formData.location ||
            !formData.description ||
            !formData.about ||
            !formData.skillsRequired||
            !formData.additional
        ){
            alert("Please fill all fields.")
            return;
        }
        const token = window.localStorage.getItem("token")
        const recruiterName = window.localStorage.getItem("name")
        if(!token){
            alert("Login to create job ");
            return
        }
        const data = {...formData, name:recruiterName}
        try {

            const response = await fetch(`http://localhost:3000/api/job/job-posts/${id}`,{
                method: "PUT",
                header: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(data)
            });


            const resData = await response.json();
            console.log(resData);
            alert("job edited Successfully")
            navigate("/joblist")
            
        } catch (error) {
            console.error("there is problem of sending data request:", error)
            
        }
    }
  return (
    <div className={style.container}>
      <h1 className={style.h1}> {edit? <>Edit</>: <>Add</>} job description</h1>
       
       <div className={style.form}>
         <div className={style.formGroup}>
            <label className={style.label}>Company Name</label>
            <input className={style.input} type='text' name='companyName' value={formData.companyName} onChange={handleChange} placeholder='Enter your Company name here'  />
         </div>
         <div className={style.formGroup}>
            <label className={style.label}> Add Logo URL</label>
            <input className={style.input} type='text' name='logoURL' value={formData.logoURL} onChange={handleChange} placeholder='Enter the link' />
         </div>
         <div className={style.formGroup}>
            <label className={style.label}> Job position</label>
            <input className={style.input} type='text' name='position' value={formData.position} onChange={handleChange} placeholder='Enter job position'  />
         </div>
         <div className={style.formGroup}>
            <label className={style.label}> Monthly salary</label>
            <input className={style.input} type='text' name='salary' value={formData.salary} onChange={handleChange} placeholder='Enter Amount in rupees'  />
         </div>
         <div className={style.formGroup}>
            <label className={style.label}> Job Type</label>
            <select className={style.input} name='jobType' value={formData.jobType} onChange={handleChange}>
                <option value="">Select jobType</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
            </select>
         </div>
         <div className={style.formGroup}>
            <label className={style.label}> Remote: </label>
            <select className={style.input} name='remote' value={formData.remote} onChange={handleChange}>
                <option value="">Select </option>
                <option value="Remote">Remote</option>
                <option value="Office">Office</option>
            </select>
         </div>
         <div className={style.formGroup}>
            <label className={style.label}> Location</label>
            <input className={style.input} type='text' name='location' value={formData.location} onChange={handleChange} placeholder='Enter location'  />
         </div>
         <div className={style.formGroup}>
            <label className={style.label}>Job Description</label>
            <input className={style.input} type='text' name='description' value={formData.description} onChange={handleChange} placeholder='Type the job description' />
         </div>
         <div className={style.formGroup}>
            <label className={style.label}>About Company</label>
            <input className={style.input} type='text' name='about' value={formData.about} onChange={handleChange} placeholder='Type about your company' />
         </div>
         <div className={style.formGroup}>
            <label className={style.label}>Skills Requird</label>
            <input className={style.input} type='text' name='skillsRequired' value={formData.skillsRequired} onChange={handleChange} placeholder='Enter the must have skills' />
         </div>
         <div className={style.formGroup}>
            <label className={style.label}>Information</label>
            <input className={style.input} type='text' name='additional' value={formData.additional} onChange={handleChange} placeholder='Enter theadditional information' />
         </div>

       </div>
       <button onClick={ () => navigate("/joblist")} className={style.cancel}>Cancel</button>
       {edit? 
         <button onClick={handleEdit} className={style.add}>Edit job</button>
         : <button onClick={handleSubmit} className={style.add} > + Add job</button>   
    }
    </div>
  )
}

export default JobForm
