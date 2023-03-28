import React, { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { HealthcareState } from '../../store/reducers';
import { DisplayDocumentPage } from './component'
import { CreateModal } from './component/classification/component/modal/create-modal';
import './product.css'

interface RootState {
  healthcare: HealthcareState;
}

export default function Product() {

  const [modal, setModal] = useState(false);
  const callbackUpdateModal = (callbackData: boolean) => {
    setModal(callbackData)
  }
  const {checkOwner} = useSelector((state:any) => state);

  return (
    <div className='body'>
      {modal === true && <CreateModal propsCallback={callbackUpdateModal} />}
      <div className='body-header'>
        <div className='header-item-view column'>
          <span className='title-page'>Products</span>
          <span>Only the owner can create items!</span>
        </div>
        {checkOwner === true
          && <div className='header-item-view' onClick={() => setModal(true)}>
            <BsPlusLg className='icon-body-header' />
            <div className='item-view' >
              <span className='say-any'>Create item</span>
            </div>
          </div>
        }
      </div>
      <DisplayDocumentPage />
    </div>
  )
}
