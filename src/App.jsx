import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from './store/userSlice';

import Routes from "./components/Routes";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const user =  useSelector(state => state.user);

  useEffect(() => {
    console.log('Routes')
    if (user.status === 'idle') {
      dispatch(getUserData())
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  return loading ? <h1>Loading...</h1> : <Routes />
}

export default App;
