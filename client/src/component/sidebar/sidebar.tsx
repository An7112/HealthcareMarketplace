import React from 'react'
import { DiClojureAlt } from 'react-icons/di'
import { NavLink } from 'react-router-dom';
import { linkList } from '../../util/links/links';
import { sidebarModal } from '../../modal/modal';
import './sidebar.css'

export default function Sidebar() {
  return (
    <div className='class-sidebar'>
      <div className='frame-sidebar'>
        <div className='logo'>
          <DiClojureAlt className='di-clojure-alt' size={60} />
          <span>Healthcare Market</span>
        </div>
        <div className='class-nav-links'>
          <div className='class-nav-links'>
            {linkList.map((item: sidebarModal) => (
              <NavLink
                to={`/${item.link}`}
                key={item.name}
                style={({ isActive }) => ({
                  borderLeft: isActive ? '4px solid black' : '',
                })}
                className='nav-link'
              >
                <div className='class-nav-link'>
                  {item.icon} <span>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
