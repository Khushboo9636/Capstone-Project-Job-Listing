import JobForm from '../Components/JobForm/JobForm.jsx'
import jobimage from '../assets/i3.png'
import jobimage1 from '../assets/i4.png'
function AddJob() {
  return (
    <div style={{display:"flex"}}>
            <JobForm/>
            <img style={{position:"absolute", float:"right",right:"70px", width:"34vw",top:"95px"}}  src={jobimage1}/>
            <img style={{maxHeight:"120vh", width:"50vw"}}  src={jobimage}/>
        </div> 
  )
}

export default AddJob


