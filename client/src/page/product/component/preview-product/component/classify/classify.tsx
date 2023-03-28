import React from 'react'
import { BsFillCartCheckFill } from 'react-icons/bs'
import './classify.css'

export const Classify = () => {
    return (
        <div className='class-classify-main'>
            <div className='class-classify title'>
                <div className='classify-item single'>
                    <span className='span-block-center'>
                        <div className='frame-icon-check'>
                            <BsFillCartCheckFill />
                        </div>
                    </span>
                </div>
                <div className='classify-item rows'>
                    <span className='span-block-center'>
                        Product Name
                    </span>
                </div>
                <div className='classify-item'>
                    <span className='span-block-center'>
                        Classify
                    </span>
                </div>
                <div className='classify-item'>
                    <span className='span-block-center'>
                        Price
                    </span>
                </div>
                <div className='classify-item'>
                    <span className='span-block-center'>
                        Quantity
                    </span>
                </div>
                <div className='classify-item double'>
                    <span className='span-block-center'>
                        Created Day
                    </span>
                </div>
            </div>
            <div className='line-bottom'></div>
        </div>
    )
}
