import React, { useState } from 'react'
import {AiOutlineUnorderedList} from 'react-icons/ai'
import {GrFormDown, GrFormUp} from 'react-icons/gr'

export function Properties() {

    const [showDescribe, setShowDescribe] = useState(true)
    function showDown() {
        setShowDescribe(!showDescribe)
    }

    return (
        <div className='class-showdown'>
            <div className='class-properties'>
                <div className='class-name-properties'>
                    <AiOutlineUnorderedList className='properties icon' />
                    <span className='properties'>Properties</span>
                </div>
                <div className='showdown'>
                    {
                        showDescribe
                            ?
                            <GrFormDown className='showdown-icon' onClick={showDown} />
                            :
                            <GrFormUp className='showdown-icon' onClick={showDown} />
                    }
                </div>
            </div>
            {
                showDescribe && <div className='class-down-detail'>
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