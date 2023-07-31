import { useSelector } from "react-redux";
import { Route, Redirect} from "react-router-dom";

export default function PublicRoute({ component: Component, ...rest }) {
    const user = useSelector(state => state.user);
    return (
      <Route
        {...rest}
        render={(props) => {
          return !user.isLogged ? (
            <Component {...props} />
          ) : (
            <Redirect to="/profile" />
          );
        }}
      ></Route>
    );
  }