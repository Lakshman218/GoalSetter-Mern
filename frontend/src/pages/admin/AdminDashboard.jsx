import React from 'react'
import { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, adminLogout } from '../../features/adminAuth/adminAuthSlice'
import UserList from '../../components/UserList'


 
function AdminDashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { admin } = useSelector((state) => state.adminAuth)

  const onLogout = () => {
    dispatch(adminLogout())
    dispatch(reset())
    navigate('/admin/login')
  }

  useEffect(() => {
    if(!admin) {
      navigate('/admin/login')
    }
    return()=>{
      dispatch(reset())
    }
  }, [admin, navigate, dispatch])
  
  return (
    <div className='container-1'>
      <div className="nav">
        <h3>Admin Dashboard</h3>

      </div>

      <div className="profile">
        <div className="profile-image">
          <img src={admin?.profileUrl ? admin.profileUrl :  "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"} alt="profile"  />
        </div>
        <div className="profile-card">
          <div className="profile-info">
            <p>Name : {admin && admin.name}</p>
            <p>Email : {admin && admin.email}</p>
          </div>
          <div className="profile-buttons">
          <button onClick={onLogout} className='btn'  > logout</button>
          </div>
        </div>
      </div>
      <UserList />
    </div>
  )
}

export default AdminDashboard