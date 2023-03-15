import React, { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { DisplayDocumentPage } from './component'
import { CreateModal } from './component/document-page/component/modal/create-modal';
import './product.css'

export default function Product() {
  const [modal, setModal] = useState(false);
  const callbackUpdateModal = (callbackData: boolean) => {
    setModal(callbackData)
  }
  return (
    <div className='body'>
      {modal === true && <CreateModal propsCallback={callbackUpdateModal} />}
      <div className='body-header'>
        <div className='header-item-view column'>
          <span className='title-page'>Products</span>
          <span>Only contract owner can create item!</span>
        </div>
        <div className='header-item-view' onClick={() => setModal(true)}>
          <BsPlusLg className='icon-body-header' />
          <div className='item-view' >
            <span className='say-any'>Create item</span>
          </div>
        </div>
      </div>
      <DisplayDocumentPage />
    </div>
  )
}
