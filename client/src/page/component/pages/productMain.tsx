import React, { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { DisplayPage } from './component'
import { CreateModal } from './component/classification/component/modal/create-modal';
import './productMain.css'

interface IProps {
  modalProps: boolean,
  titlePage: string,
  dscPage: string,
}

export default function ProductMain({modalProps, titlePage, dscPage}:IProps) {

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
          <span className='title-page'>{titlePage}</span>
          <span>{dscPage}</span>
        </div>
        {(checkOwner === true && modalProps === true)
          && <div className='header-item-view' onClick={() => setModal(true)}>
            <BsPlusLg className='icon-body-header' />
            <div className='item-view' >
              <span className='say-any'>Create item</span>
            </div>
          </div>
        }
      </div>
      <DisplayPage />
    </div>
  )
}
