import styles from './Style.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function Navbar() {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem("user"))
    const recruiterName = window.localStorage.getItem('name');
    const handleLogout = ()=>{
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("name")
        window.localStorage.removeItem("token")
        setIsLoggedIn(!!window.localStorage.getItem("user"))
    }
    return (
        <div className={styles.nav}>
            
            <p className={styles.text}>JobFinder</p>
            <div>
                {isLoggedIn?<>
                    <span onClick={handleLogout} className={styles.loggedInText}>Logout</span>
                    <span className={styles.loggedInText}>Hello {recruiterName}</span>
                   
                </>:
                <>
                <button onClick={()=>navigate("/login")}   className={styles.login}>Login</button>
                <button onClick={()=>navigate("/register")}  className={styles.register}>Register</button>
                </>
                }
            </div>
        </div>
    )
}

export default Navbar
