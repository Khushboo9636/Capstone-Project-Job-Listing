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
        MonthlySalary : "",
        jobType : "",
        remote :"",
        location: "",
        jobdescription: "",
        about: "",
        skillRequired: "",
        additional: "",
    });
    console.log(formData);



    const handleChange = (e) => {
        if (e.target.name === 'skillRequired') {
          // Split the input string into an array using ',' as the separator
          const skillsArray = e.target.value.split(',').map(skill => skill.trim());
          setFormData({ ...formData, [e.target.name]: skillsArray });
        } else {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        }
      };
      
    
    

    useEffect(() => {
        const { id, edit } = state || {};
    
        const fetchData = async () => {
            try {
                if (edit) {
                    setEdit(edit);
                }
    
                if (id) {
                    setId(id);
                    console.log('Fetching data for id:', id);
    
                    const options = { method: 'GET' };
                    const response = await fetch(`http://localhost:4000/api/job/viewjob/${id}`, options);
    
                    if (!response.ok) {
                        console.error('Server error:', response.statusText);
                        // Handle the error case as needed, e.g., set an error state
                        return;
                    }
    
                    const responseData = await response.json();
                    console.log('Fetched data:', responseData);
    
                    // Assuming responseData.jobPost is the correct property, update if needed
                    setFormData({ ...responseData.data });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error case as needed, e.g., set an error state
            }
        };
    
        fetchData(); // Call the fetchData function
    }, [state]);
    
      
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (
            !formData.companyName ||
            !formData.logoURL ||
            !formData.jobType ||
            !formData.position ||
            !formData.MonthlySalary ||
            !formData.remote ||
            !formData.location ||
            !formData.jobdescription ||
            !formData.about ||
            !formData.skillRequired ||
            !formData.additional
        ) {
            alert("Please fill all fields.");
            return;
        }
    
        const token = window.localStorage.getItem("token");
         console.log("Token:", token);

        const recruiterName = window.localStorage.getItem("name");
    
        if (!token) {
            alert("Login first to create job");
            return;
        }
    console.log('FormData: ', formData);
        const data = { ...formData, name: recruiterName || '', skills: formData.skillRequired };
    
        try {
            const response = await fetch("http://localhost:4000/api/job/jobdescription", {
               method: "POST",
              headers: {
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`,
               },
                body: JSON.stringify(data),
             });
             console.log("response: ", response)

    
            if (!response.ok) {
                //console.error("Server error:", error.message);
                console.error("Server error:", response.error.message);
                alert("An error occurred, please try again");
                return;
            }
    
            const resData = await response.json();
            console.log(resData);
            console.log("created",data)
      
            alert('Job created Successfully');
            navigate('/joblist');

        } catch (error) {
            console.error("There is a problem sending the data request:", error.message);
        }
    };
    

    const handleEdit = async (e) => {
        e.preventDefault();
    
        const token = window.localStorage.getItem("token");
        const recruiterName = window.localStorage.getItem("name");
    
        if (!token) {
            alert("Login to create job ");
            return;
        }
    
        const data = { ...formData, name: recruiterName };
    
        try {
            const response = await fetch(`http://localhost:4000/api/job/editjob/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                console.error("Server error:", response.statusText);
                const errorData = await response.json(); // Try to parse error response
                console.error("Server error details:", errorData);
                alert("An error occurred, please check the console for details");
                return;
            }
    
            const resData = await response.json();
            console.log(resData);
            alert("Job edited Successfully");
            navigate("/joblist");
        } catch (error) {
            console.error("There is a problem sending the data request:", error);
            alert("An error occurred, please check the console for details");
        }
    };
    
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
            <input className={style.input} type='text' name='MonthlySalary' value={formData.MonthlySalary} onChange={handleChange} placeholder='Enter Amount in rupees'  />
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
            <input className={style.input} type='text' name='jobdescription' value={formData.jobdescription} onChange={handleChange} placeholder='Type the job description' />
         </div>
         <div className={style.formGroup}>
            <label className={style.label}>About Company</label>
            <input className={style.input} type='text' name='about' value={formData.about} onChange={handleChange} placeholder='Type about your company' />
         </div>
         <div className={style.formGroup}>
            <label className={style.label}>Skills Requird</label>
            <input className={style.input} type='text' name='skillRequired' value={formData.skillRequired} onChange={handleChange} placeholder='Enter the must have skills' />
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
