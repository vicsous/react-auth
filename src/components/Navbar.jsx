import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar () {
    const user =  useSelector(state => state.user);
    return (
      user.isLogged ?
        <nav>
          <ul>
            <li><NavLink to='/profile'>Profile</NavLink></li>
            <li><NavLink to='/blog'>Blog</NavLink></li>   
            <li><NavLink to='/mod'>Moderator</NavLink></li>
            <li><NavLink to='/admin'>Admin</NavLink></li>
            <li><a href='/logout'>Logout</a></li>
          </ul>
        </nav> :
        <nav>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>     
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/blog'>Blog</NavLink></li>   
            </ul>
        </nav>
    )
  }