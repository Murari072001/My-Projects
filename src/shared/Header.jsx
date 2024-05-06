import React from "react";
import { useLogoutMutation } from "../services/stocksApi";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from "../features/userSlice";

function Header() {
  const { Login } = useSelector(state => state.userDetails)
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const LogoutFn = () => {
    logout().then((res) => {
      dispatch(setLogin(res.data.Login))
      navigate("/login")
    })
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {
              Login && <button className="btn btn-secondary" onClick={() => { LogoutFn() }}>Logout</button>
            }
            {
              !Login && <button className="btn btn-secondary" onClick={() => { navigate("/login") }}>Log In</button>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header