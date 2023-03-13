import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { VscBellDot } from 'react-icons/vsc'
import './header.css'

export default function Header() {
    return (
        <div className='header'>
            <div className='frame-header'>
                <div className='frame-input'>
                    <BiSearch className='icon-search-header' />
                    <input className='input-header' placeholder='Search or type a command' />
                </div>
                <div className='frame-info'>
                    <div className='class-icon-bell'>
                        <VscBellDot className='icon-bell'/>
                    </div>
                    <div className='class-avatar'>
                        <span className='span-frame'>
                            <img className='img-avatar' alt='' src='/media/avatar.avif' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
