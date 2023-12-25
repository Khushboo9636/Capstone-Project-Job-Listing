import styles from './style.module.css'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import g1 from '../../assets/group.png'
import f1 from '../../assets/flag.png'
import rup from '../../assets/rup.png'


function Joblist() {
    const navigate = useNavigate()
    const [skills, setSkills] = useState([])
    const [jobs, setJobs] = useState([]);
    const [search,setSearch] = useState("");
    
    const handleSeach = (e) =>{

        setSearch(e.target.value)

    }
    useEffect(()=> {
        // if(search.length> 0){
        //     const arr = jobs.filter(job=>job?.position?.includes(search))
        //     console.log(arr)
        //     setJobs([...arr])
        if (search.length > 0) {
            const options = { method: 'GET' };
            fetch(`https://api-0173.onrender.com/api/job/viewjoblist?search=${search}`, options)
                .then(response => response.json())
                .then(response => setJobs([...response.jobPosts]))
                .catch(err => console.error(err));

        }
        else{
            const options = {method: 'GET'};
        fetch(`https://api-0173.onrender.com/api/job/viewjoblist?skillsRequired=`, options)
        .then(response => response.json())
        .then(response => setJobs([...response.jobPosts]))
        .catch(err => console.error(err));
        }
    }, [search, setJobs])
    const handleSkill = (e)=>{
        if(!skills.includes(e.target.value))
        setSkills((prev)=>[...prev,e.target.value])
    }

    const handleRemove = (skill) =>{
        const index = skills.indexOf(skill)
        skills.splice(index,1)
        setSkills([...skills])
    }
    useEffect(() => {
        const options = { method: 'GET' };
        const searchQuery = skills.length > 0 ? `&skillRequired=${skills.join('&')}` : '';
    
        fetch(`https://api-0173.onrender.com/api/job/viewjoblist?jobType=${searchQuery}&skillRequired=${skills.join('&')}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                // Check if the response is JSON
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                } else {
                    // Handle non-JSON response
                    console.log("Non-JSON response:", response);
                    return null; // or handle accordingly
                }
            })
            .then(response => {
                if (response !== null) {
                    const sortedJobs = response.jobPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setJobs([...sortedJobs]);
                }
            })
            .catch(err => {
                console.error("Error during fetching:", err);
                // Check if the response object has a text() method before calling it
            if (err.text && typeof err.text === 'function') {
                err.text().then(errorMessage => {
                    console.log("Error Message:", errorMessage);
                });
            } else {
                console.log("Error Message:", err.message || "Unknown error");
            }
            });
    }, [skills]);
    
    
  return (
    <div style={{marginTop:"280px"}}>
    <div className={styles.container}>
        <div className={styles.containerTop} >
          <input className={styles.inputTop} value ={search} onChange={handleSeach} type ="text" name ='search' placeholder='Type any job title'/>
        </div>
        <div className={styles.containerBottom}>
           <select onClick={handleSkill} className={styles.inputSelect} name="remote">
            <option>Skills</option>
            {codingSkills.map((skill) => (
                <option key={skill} value={skill}>
                    {skill}
                </option>
            ))}
           </select>
           {skills.map((skill)=>{
                        return (
                            <span className={styles.chip} key={skill}>{skill}<span onClick={()=>handleRemove(skill)} className={styles.cross}>X</span></span>
                        )
                    }
          )}

         <button onClick={()=>navigate("/addJob")}  className={styles.edit}>Add Job</button>
        </div>
        </div>
           {/* <div className={styles.bottom}> */}
           {jobs.map((data) => {
    return (
        <div key={data._id} className={styles.list}>
            <div className={styles.listLeft}>
                <div className={styles.logo}>
                    <img style={{width:"100%", height:"100%"}} src={data.logoURL} alt={data.position} />
                </div>
                <div className={styles.infoLeft}>
                    <p className={styles.position}>{data.position}</p>
                    <p className={styles.extraInfo}>
                        <span className={styles.greyText}> <img src={g1} alt={data.position} /></span>
                        <span className={styles.greyText}>11-50</span>
                        <span className={styles.greyText}> <img src={rup} alt={data.position} /></span>
                        <span className={styles.greyText}>{data.salary}</span>
                        <span className={styles.greyText}> <img src={f1} alt={data.position} /></span>
                        <span className={styles.greyText}>{data.location}</span>
                    </p>
                    <p className={styles.extraInfo}>
                        <span className={styles.redText}>{data.remote}</span>
                        <span className={styles.redText}>{data.jobType}</span>
                    </p>
                </div>
            </div>
            <div>
                <div style={{display:"flex"}}>
               
              
                {Array.isArray(data.skillRequired) ? (
                   data.skillRequired.map((skillsString, index) => (
                  <div key={index}>
                     {skillsString.split(',').map((skill, skillIndex) => (
                      <span className={styles.skill} key={skillIndex}>
                           {skill.trim()} {/* trim to remove any leading/trailing spaces */}
                      </span>
                     ))}
                  </div>
                   ))
                  ) : (
                   <p>No skills required</p>
                      )}
           


                </div>
                <div className={styles.btnGroup}>
                    <button onClick={() => navigate('/addJob', { state: { id: data._id, edit: true } })} className={styles.edit}>Edit job</button>
                    <button onClick={() => navigate('/detail', { state: { id: data._id } })} className={styles.view}>View Details</button>
                </div>
            </div>
        </div>
    );
})}

            {/* </div> */}
        </div>
    )
}



const codingSkills = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'Ruby',
    'PHP',
    'Swift',
    'Objective-C',
    'SQL',
    'HTML',
    'CSS',
    'css',
    "node",
    "react"
  ];

export default Joblist
