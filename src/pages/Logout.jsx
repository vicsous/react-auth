import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { Redirect } from "react-router-dom";

export default function Logout () {
    localStorage.removeItem('accessToken')
    const dispatch = useDispatch()
    dispatch(logout())
    return <Redirect to='/' />
}