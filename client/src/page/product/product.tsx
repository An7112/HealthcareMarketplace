import React from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { ButtonDocument, DisplayDocumentPage } from './component'
import './product.css'

export default function Product() {
  return (
    <div className='body'>
      <div className='body-header'>
        <div className='header-item-view column'>
          <span className='title-page'>Products</span>
          <span>Only contract owner can create item!</span>
        </div>
        <div className='header-item-view'>
          <BsPlusLg className='icon-body-header' />
          <div className='item-view'>
            <span className='say-any'>Create item</span>
          </div>
        </div>
      </div>
      <ButtonDocument/>
      <DisplayDocumentPage/>
    </div>
  )
}
