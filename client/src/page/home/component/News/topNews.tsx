import React from 'react'
import {IoClose, IoNotificationsSharp} from 'react-icons/io5'
import './topNews.css'

export default function TopNews() {
  return (
    <div className='top-news'>
      <div className='news-header'>
        <div className='news-header-item'>
          <IoClose/>
        </div>
        <div className='news-header-item'>
          <span>Vaccine COVID-19</span>
        </div>
        <div className='news-header-item'>
          <IoNotificationsSharp/>
        </div>
      </div>
    </div>
  )
}
