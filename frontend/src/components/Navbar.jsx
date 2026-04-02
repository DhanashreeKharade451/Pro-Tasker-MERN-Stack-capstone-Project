import { Link } from "react-router-dom"
import { useUser } from "../context/UserContext";
function Navbar(){

    //bring in user info from context
    const {user} = useUser()

    return(
        <nav>
            <ul>
                {user &&<li>Welcome {user.username}!</li>}
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><Link to='./project'>Projects</Link></li>
            </ul>
        </nav>
    )
}
export default Navbar;