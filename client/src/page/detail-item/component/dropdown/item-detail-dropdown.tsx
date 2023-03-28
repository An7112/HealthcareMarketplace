import React, { useState } from 'react'
import { BsExclamationSquare } from 'react-icons/bs'
import { GrFormDown, GrFormUp } from 'react-icons/gr'

export function ItemDetailDropDown() {

  const [tokenDetail, setTokenDetail] = useState(false)

  function showDownToken() {
    setTokenDetail(!tokenDetail)
  }

  return (
    <div className='class-showdown'>
      <div className='class-properties'>
        <div className='class-name-properties'>
          <BsExclamationSquare className='properties icon' />
          <span className='properties'>Item Detail</span>
        </div>
        <div className='showdown'>
          {
            tokenDetail
              ?
              <GrFormDown className='showdown-icon' onClick={showDownToken} />
              :
              <GrFormUp className='showdown-icon' onClick={showDownToken} />
          }
        </div>
      </div>
      {
        tokenDetail && <div className='class-down-detail'>
          <div className='class-down-grid'>
            <div className='down-detail-item'>
              <span className='title-item'>Category</span>
              <span>Shadow</span>
              <div className='detail-item-bottom'>
                <div className='detail-item-bottom-percent'>
                  <p>9,007</p>
                </div>
                <div className='detail-item-bottom-price'>
                  <p>1.33323213</p>
                </div>
              </div>
            </div>
            <div className='down-detail-item'>
              <span className='title-item'>Category</span>
              <span>Shadow</span>
              <div className='detail-item-bottom'>
                <div className='detail-item-bottom-percent'>
                  <p>9,007</p>
                </div>
                <div className='detail-item-bottom-price'>
                  <p>1.33323213</p>
                </div>
              </div>
            </div>
            <div className='down-detail-item'>
              <span className='title-item'>Category</span>
              <span>Shadow</span>
              <div className='detail-item-bottom'>
                <div className='detail-item-bottom-percent'>
                  <p>9,007</p>
                </div>
                <div className='detail-item-bottom-price'>
                  <p>1.33323213</p>
                </div>
              </div>
            </div>
            <div className='down-detail-item'>
              <span className='title-item'>Category</span>
              <span>Shadow</span>
              <div className='detail-item-bottom'>
                <div className='detail-item-bottom-percent'>
                  <p>9,007</p>
                </div>
                <div className='detail-item-bottom-price'>
                  <p>1.33323213</p>
                </div>
              </div>
            </div>
            <div className='down-detail-item'>
              <span className='title-item'>Category</span>
              <span>Shadow</span>
              <div className='detail-item-bottom'>
                <div className='detail-item-bottom-percent'>
                  <p>9,007</p>
                </div>
                <div className='detail-item-bottom-price'>
                  <p>1.33323213</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}