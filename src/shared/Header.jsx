import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/user/userSlice';
function Header() {
    var user = useSelector(state => state.usr);
    var dispatch = useDispatch();
    var navigate = useNavigate();
    function logoutUser() {
        dispatch(logout())
        navigate("/login")
    }
    return (
        <div className=' bg-success'>
            <nav className="container navbar navbar-expand-sm">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Edupoly</Link>
                        </li>
                    </ul>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse ms-auto" id="navbarNav">
                        <ul className="navbar-nav">
                            {
                                user.isLoggedIn && <><li className="nav-item">
                                    <b onClick={logoutUser} className="nav-link">Logout</b>
                                </li>
                                    <li className="nav-item">
                                    <button className='btn text-dark'><Link to={user.userDetails.role==="admin"?"/adminDashboard":"/userDashboard"}>Dasboard</Link></button>
                                    </li>
                                </>
                            }
                            {
                                !user.isLoggedIn && (<li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header