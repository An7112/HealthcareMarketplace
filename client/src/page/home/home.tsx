import React, { useState } from 'react'
// import ExchangeToken from './exchangeToken'
import { FaHeartbeat, FaTooth } from 'react-icons/fa'
import { RiVirusLine } from 'react-icons/ri'
import { AiOutlineBarChart } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import { BsChevronRight } from 'react-icons/bs'
import './home.css'
import TopNews from './component/News/topNews'

export default function Home() {

  const [percent, setPercent] = useState(35);

  return (
    <div className='home-main'>
      <div className='home-frame'>
        <div className='class-home-top'>
          <div className='home-top-item banner'>
            <h3>Hello, An!</h3>
              <span className='span-banner'>
                <img className='banner' alt='' src='/media/banner.jpg'/>
              </span>
          </div>
          <div className='home-top-item'>
            <h3>Hello, An!</h3>
          </div>
          <div className='home-top-item'>
            <h3>Hello, An!</h3>
          </div>
        </div>
        <div className='class-category'>
          <h3>Category</h3>
          <div className='grid-category'>
            <div className='category-item'>
              <div className='frame-icon heart'>
                <FaHeartbeat className='heart' />
              </div>
              <div className='category-dsc'>
                <h4>Heart research</h4>
                <span>32 research</span>
              </div>

            </div>
            <div className='category-item'>
              <div className='frame-icon'>
                <RiVirusLine className='virus' />
              </div>
              <div className='category-dsc'>
                <h4>Virus research</h4>
                <span>23 research</span>
              </div>
            </div>
            <div className='category-item'>
              <div className='frame-icon'>
                <FaTooth className='virus' />
              </div>
              <div className='category-dsc'>
                <h4>Tooth research</h4>
                <span>51 research</span>
              </div>
            </div>
          </div>
        </div>
        <div className='research-in-progress'>
          <div className='progress-item header'>
            <h3>Research in progress</h3>
            <div className='progress-header-icon'>
              <div className='frame-icon'>
                <AiOutlineBarChart />
              </div>
              <div className='frame-icon'>
                <TfiReload />
              </div>
            </div>
          </div>
          <div className='frame-item-research'>
            <div className='item-research'>
              <div className='frame-icon'>
                <RiVirusLine className='virus' />
              </div>
              <div className='item-research-dsc'>
                <div className='item-research-dsc top'>
                  <h4>Vaccine COVID-19</h4>
                  <h4>35%</h4>
                </div>
                <div className='item-research-line'>
                  <div className='percent' style={{ gridColumn: `span ${percent}` }}></div>
                </div>
              </div>
            </div>
            <div className='item-research-docter'>
              <div className='research-docter-avatar'>
                <span className='span-avatar'>
                  <img src='/media/avatar.avif' alt='' className='image-avatar' />
                </span>
              </div>
              <div className='research-docter-dsc'>
                <span className='docter-dsc-label'>
                  Researcher
                </span>
                <span className='docter-dsc-label name'>
                  Dr. Nguyen Thanh An
                </span>
              </div>
              <div className='preview-icon'>
                <BsChevronRight />
              </div>
            </div>
          </div>
          <div className='frame-item-research'>
            <div className='item-research'>
              <div className='frame-icon'>
                <RiVirusLine className='virus' />
              </div>
              <div className='item-research-dsc'>
                <div className='item-research-dsc top'>
                  <h4>Vaccine ARVI</h4>
                  <h4>85%</h4>
                </div>
                <div className='item-research-line'>
                  <div className='percent' style={{ gridColumn: `span 85` }}></div>
                </div>
              </div>
            </div>
            <div className='item-research-docter'>
              <div className='research-docter-avatar'>
                <span className='span-avatar'>
                  <img src='/media/avatar.avif' alt='' className='image-avatar' />
                </span>
              </div>
              <div className='research-docter-dsc'>
                <span className='docter-dsc-label'>
                  Researcher
                </span>
                <span className='docter-dsc-label name'>
                  Dr. Nguyen Thanh An
                </span>
              </div>
              <div className='preview-icon'>
                <BsChevronRight />
              </div>
            </div>
          </div>
        </div>
        {/* <ExchangeToken /> */}
      </div>
      {/*  */}
      <TopNews/>
    </div>
  )
}
