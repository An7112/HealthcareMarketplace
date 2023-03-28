import React, { useState } from 'react'
import { FiActivity } from 'react-icons/fi'
import { GrFormDown, GrFormUp } from 'react-icons/gr'
import {BiTransferAlt} from 'react-icons/bi'
import {GoLinkExternal} from 'react-icons/go'
import {FaOpencart} from 'react-icons/fa'

export function Activity() {

  const [activity, setActivity] = useState(true)

  function showActivity() {
    setActivity(!activity)
  }

  return (
    <div className='class-info-chakra-stack'>
      <div className='class-showdown'>
        <div className='class-properties offer'>
          <div className='class-name-properties'>
            <FiActivity className='properties icon' />
            <span className='properties'>Activity</span>
          </div>
          <div className='showdown'>
            {
              activity
                ?
                <GrFormDown className='showdown-icon' onClick={showActivity} />
                :
                <GrFormUp className='showdown-icon' onClick={showActivity} />
            }
          </div>
        </div>
        {
          activity && <div className='class-down-offer'>
            <div className='chakra-accordion-panel'>
              <div className='chakra-stack'>
                <div className='chakra-stack-list'>
                  <div className='chakra-stack-grid-activity'>
                    <div className='chakra-wrap-left'>
                      <div className='chakra-wrap-left-content'>
                        <button className='wrap-left-content-button'>
                          <BiTransferAlt />
                          <p>Transfer</p>
                        </button>
                      </div>
                      <div className='chakra-wrap-left-content info'>
                        <span>From</span>
                        <p>71a12b</p>
                        <span>To</span>
                        <p>27a11b</p>
                        <span>22 hours ago</span>
                      </div>
                    </div>
                    <button className='chakra-wrap-right'>
                      <GoLinkExternal />
                    </button>
                  </div>
                  <hr style={{ width: '96%' }}></hr>
                  <div className='chakra-stack-grid-activity'>
                    <div className='chakra-wrap-left'>
                      <div className='chakra-wrap-left-content'>
                        <button className='wrap-left-content-button sale'>
                          <FaOpencart />
                          <p>Sale</p>
                        </button>
                      </div>
                      <div className='chakra-wrap-left-content info'>
                        <span>From</span>
                        <p>71a12b</p>
                        <span>To</span>
                        <p>27a11b</p>
                        <span>22 hours ago</span>
                      </div>
                    </div>
                    <button className='chakra-wrap-right'>
                      <GoLinkExternal />
                    </button>
                  </div>
                  <hr style={{ width: '96%' }}></hr>
                  <div className='chakra-stack-grid-activity'>
                    <div className='chakra-wrap-left'>
                      <div className='chakra-wrap-left-content'>
                        <button className='wrap-left-content-button'>
                          <BiTransferAlt />
                          <p>Transfer</p>
                        </button>
                      </div>
                      <div className='chakra-wrap-left-content info'>
                        <span>From</span>
                        <p>71a12b</p>
                        <span>To</span>
                        <p>27a11b</p>
                        <span>22 hours ago</span>
                      </div>
                    </div>
                    <button className='chakra-wrap-right'>
                      <GoLinkExternal />
                    </button>
                  </div>
                  <hr style={{ width: '96%' }}></hr>
                  <div className='chakra-stack-grid-activity'>
                    <div className='chakra-wrap-left'>
                      <div className='chakra-wrap-left-content'>
                        <button className='wrap-left-content-button sale'>
                          <FaOpencart />
                          <p>Sale</p>
                        </button>
                      </div>
                      <div className='chakra-wrap-left-content info'>
                        <span>From</span>
                        <p>71a12b</p>
                        <span>To</span>
                        <p>27a11b</p>
                        <span>22 hours ago</span>
                      </div>
                    </div>
                    <button className='chakra-wrap-right'>
                      <GoLinkExternal />
                    </button>
                  </div>
                  <hr style={{ width: '96%' }}></hr>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}