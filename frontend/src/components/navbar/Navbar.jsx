import React, { useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

const [Menu,setMenu]=useState("Home");

const {getTotalCartAmount,token,setToken}=useContext(StoreContext);

const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  setToken("")
  navigate("/")
}

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} className='logo'/></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu("Home")} className={Menu==="Home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={Menu==="Menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("Mobile App")} className={Menu==="Mobile App"?"active":""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu("Contact Us")} className={Menu==="Contact Us"?"active":""}>Contact Us</a>
      </ul>

      <div className='navbar-right'>
          <div className='navbar-search-icon'>
            <Link to='/cart'><img className='basket-icon
            ' src={assets.basket_icon} /></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
          </div>
          {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
          :<div className='navbar-profile'>
            <img src={assets.profile_icon}/>
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon}/><p>Orders</p></li>
              <hr/>
              <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
            </ul>
          </div>}
        </div>
    </div>
  )
}

export default Navbar