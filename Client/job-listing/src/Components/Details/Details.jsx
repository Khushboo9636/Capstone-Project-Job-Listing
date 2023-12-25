import styles from './style.module.css'
import {useLocation, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
export const Details = ()=>{
    const navigate = useNavigate()
    const [data, setData]= useState({})
    const {state} = useLocation();
    const { id } = state || {};

    useEffect(() => {
        const options = { method: 'GET' };
        fetch(`https://api-0173.onrender.com/api/job/viewjob/${id}`, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((response) => {
            console.log('API Response:', response);
            setData({ ...response.data });
          })
          .catch((err) => console.error('Error during fetching:', err));
      }, [id]);
    return(
        <>
        {data?
        <>
             <div className={styles.container}>
               <p className={styles.containerText}>{data.position} {data.remote} job/internship at {data.companyName}</p>
            </div>
            <div className={styles.containerBottom}>
                <div className={styles.preHeading}>
                <span className={styles.lightText}>{data.createdAt}</span> <p>  </p> <p>  </p>
                <span className={styles.lightText}>{data.jobType}</span>
                </div>
                <div className={styles.heading}>
                    <div>
                    <p className={styles.boldText}>{data.position} </p>
                    <p className={styles.locationText}>{data.location} | India</p>
                    </div>
                    <div>
                        <button onClick={()=>{navigate('/addJob', { state: { id: data._id, edit:true} })}}  className={styles.edit}>Edit Job</button>
                    </div>
                </div>
                <div className={styles.perks}>
                    <div>
                        <p className={styles.lightText}>Stipend</p>
                        <p className={styles.lightText}>Rs {data.MonthlySalary}/month</p>
                    </div>
                    <div>
                        <p className={styles.lightText}>Duration</p>
                        <p className={styles.lightText}>6 Months</p>
                    </div>
                </div>
                <div className={styles.info}>
                    <h2>About Company</h2>
                    <p>{data.about}</p>
                </div>
                <div className={styles.info}>
                    <h2>Skill(s) Required</h2>
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
                <div className={styles.info}>
                    <h2>About the job/internship</h2>
                    <p>{data.jobdescription}</p>
                </div>
            </div>
            </>
        :<></>}
        </>
    )
}