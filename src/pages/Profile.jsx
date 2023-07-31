import { useSelector } from "react-redux";

export default function Profile() {
    const user = useSelector(state => state.user)
    return (
      <>
        <h1>Profile</h1>
        <p>Page available for all users.</p>
        <h3>Username: @{user?.data?.username}</h3>
        <h3>Email: {user?.data?.email}</h3>
        <h3>roles: {user?.data?.roles.map(((x, y) => {
          return <div key={y+1}>{x}</div>
        }))}</h3>
      </>
    )
  }
  