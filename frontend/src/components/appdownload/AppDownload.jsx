import React from 'react'
import './appdownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br/>Tomato App</p>
        <div className='app-download-plateforms'>
            <img src={assets.app_store}/>
            <img src={assets.play_store}/>
        </div>
    </div>
  )
}

export default AppDownload