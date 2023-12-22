import JobForm from '../Components/JobForm/JobForm.jsx'
import jobimage from '../assets/i4.png'
function AddJob() {
  return (
    <div style={{display:"flex"}}>
            <JobForm/>
            <img style={{maxHeight:"100vh", width:"50vw"}}  src={jobimage}/>
        </div> 
  )
}

export default AddJob


