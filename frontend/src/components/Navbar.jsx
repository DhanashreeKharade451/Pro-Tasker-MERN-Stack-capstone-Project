import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
function Navbar() {
  //bring in user info from context
  const { user, logout } = useUser();

  {
    user ? (
      <>
        <li>Welcome {user.username}!</li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </>
    );
  }
  return (
    <nav>
      <ul>
        {user? (
            <>
                <li>Welcome {user.username}</li>
          <li><button onClick={logout}>Logout</button></li>
          <li><Link to='/projects'>Projects</Link></li>
            </>
        ):(
            <>
            <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
            </>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;
