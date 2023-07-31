import { useSelector } from "react-redux";
import { Route, Redirect} from "react-router-dom";

export default function PrivateRoute({ component: Component, requiredRole, ...rest }) {
    const user = useSelector(state => state.user);
    return (
      <Route
        {...rest}
        render={(props) => {
          if (!user.isLogged || !user?.data?.roles.includes(requiredRole)) return <Redirect to="/" />
          return <Component {...props} />
        }}
      ></Route>
    );
  }