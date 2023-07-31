import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Admin from "../pages/Admin";
import Blog from "../pages/Blog";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Logout from "../pages/Logout"
import Moderator from "../pages/Moderator";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";

// Components
import Navbar from "../components/Navbar";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";

export default function Routes () {
  return (
      <Router>
        <Navbar />
        <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/blog" component={Blog} />

            <PublicRoute exact path="/" component={Landing} />
            <PublicRoute path="/signup" component={Signup} />
            <PublicRoute path="/login" component={Login} />

            <PrivateRoute path="/admin" requiredRole={import.meta.env.VITE_REACT_APP_ADMIN_CODE} component={Admin} />
            <PrivateRoute path="/mod" requiredRole={import.meta.env.VITE_REACT_APP_MOD_CODE} component={Moderator} />
            <PrivateRoute path="/profile" requiredRole={import.meta.env.VITE_REACT_APP_USER_CODE} component={Profile} />

            <Route path="*">
                  <h1>Page not found</h1>
            </Route>
        </Switch>            
    </ Router>
  )
}