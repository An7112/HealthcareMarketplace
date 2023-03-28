import React, {useState} from 'react'
import {MdOutlineLocalOffer} from 'react-icons/md'
import {GrFormDown, GrFormUp} from 'react-icons/gr'
import {FaEthereum} from 'react-icons/fa'

export function Offer() {

    const [offer, setShowOffer] = useState(true)
    
    function showOffer() {
        setShowOffer(!offer)
    }

    return (
        <div className='class-info-chakra-stack'>
            <div className='class-showdown'>
                <div className='class-properties offer'>
                    <div className='class-name-properties'>
                        <MdOutlineLocalOffer className='properties icon' />
                        <span className='properties'>Offer</span>
                    </div>
                    <div className='showdown'>
                        {
                            offer
                                ?
                                <GrFormDown className='showdown-icon' onClick={showOffer} />
                                :
                                <GrFormUp className='showdown-icon' onClick={showOffer} />
                        }
                    </div>
                </div>
                {
                    offer && <div className='class-down-offer'>
                        <div className='chakra-accordion-panel'>
                            <div className='chakra-stack'>
                                <div className='chakra-stack-list'>
                                    <div className='chakra-stack-grid'>
                                        <div className='chakra-wrap'>
                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                            <span>2%</span>
                                            <span>Below floor</span>
                                        </div>
                                        <div className='chakra-wrap'>
                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                            <p>An</p>
                                            <span>Expiry: in 30 days</span>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    <div className='chakra-stack-grid'>
                                        <div className='chakra-wrap'>
                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                            <span>2%</span>
                                            <span>Below floor</span>
                                        </div>
                                        <div className='chakra-wrap'>
                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                            <p>An</p>
                                            <span>Expiry: in 30 days</span>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    <div className='chakra-stack-grid'>
                                        <div className='chakra-wrap'>
                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                            <span>2%</span>
                                            <span>Below floor</span>
                                        </div>
                                        <div className='chakra-wrap'>
                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                            <p>An</p>
                                            <span>Expiry: in 30 days</span>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    <div className='chakra-stack-grid'>
                                        <div className='chakra-wrap'>
                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                            <span>2%</span>
                                            <span>Below floor</span>
                                        </div>
                                        <div className='chakra-wrap'>
                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                            <p>An</p>
                                            <span>Expiry: in 30 days</span>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    <div className='chakra-stack-grid'>
                                        <div className='chakra-wrap'>
                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                            <span>2%</span>
                                            <span>Below floor</span>
                                        </div>
                                        <div className='chakra-wrap'>
                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                            <p>An</p>
                                            <span>Expiry: in 30 days</span>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    <div className='chakra-stack-grid'>
                                        <div className='chakra-wrap'>
                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                            <span>2%</span>
                                            <span>Below floor</span>
                                        </div>
                                        <div className='chakra-wrap'>
                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                            <p>An</p>
                                            <span>Expiry: in 30 days</span>
                                        </div>
                                        <hr></hr>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}