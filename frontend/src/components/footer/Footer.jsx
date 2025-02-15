import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo}/>
                <p>Welcome to Eatiz, your go-to solution for delicious meals delivered straight to your door! We believe that great food should be accessible to everyone, no matter where you are.</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon}/>
                    <img src={assets.twitter_icon}/>
                    <img src={assets.linkedin_icon}/>
                </div>
            </div>

            <div className='footer-content-centre'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className='footer-content-right'>
                <h2>Get In Touch</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@eatiz.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright © 2024 eatiz.com - All Right Reserved</p>
    </div>
  )
}

export default Footer