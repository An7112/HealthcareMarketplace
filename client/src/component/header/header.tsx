import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { BsFillCartCheckFill } from 'react-icons/bs'
import HealthcareToken from 'contracts/HealthcareToken.json';
import Web3Modal from 'web3modal'
import Web3 from "web3";
import './header.css'
import ShoppingCart from 'component/shopping-cart/shopping-cart'

export default function Header() {
    const [balance, setBalance] = useState(0);
    const [visible, setVisible] = useState(false);
    const [openCart, setOpenCart] = useState(false)

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            alert("No web3 provider detected!");
        }
    };

    const getBalance = async () => {
        const web3Modal = new Web3Modal()
        const provider = await web3Modal.connect()
        const web3 = new Web3(provider)
        const networkId = await web3.eth.net.getId()
        const accounts = await web3.eth.getAccounts()

        const deployedNetwork = HealthcareToken.networks[networkId as unknown as keyof typeof HealthcareToken.networks]
        const tokenContract = new web3.eth.Contract(
            HealthcareToken.abi as any,
            deployedNetwork && deployedNetwork.address
        )
        const balanceToken = await tokenContract.methods.balanceOf(accounts[0]).call();
        const convertBalance = balanceToken / 10 ** 18;
        setBalance(convertBalance);
        setVisible(prev => !prev);
    }

    const callbackOpenCart = (callbackData: boolean) => {
        setOpenCart(callbackData)
    }

    useEffect(() => {
        loadWeb3()
    }, [])

    return (
        <>
            <div className='header'>
                {
                    openCart === true
                    &&
                    <ShoppingCart propsCallback={callbackOpenCart} />
                }
                {visible === true
                    && <div className='dropdown'>
                        <AiOutlineCaretDown className='down-icon' />
                        <div className='frame-balance'>
                            <h5>Balance: </h5>
                            <p>{balance}</p>
                            <h5>HCMA</h5>
                        </div>
                    </div>
                }
                <div className='frame-header'>
                    <div className='frame-input'>
                        <BiSearch className='icon-search-header' />
                        <input className='input-header' placeholder='Search or type a command' />
                    </div>
                    <div className='frame-info'>
                        <div className='class-icon-header' onClick={getBalance}>
                            <MdOutlineAttachMoney className='icon-header' />
                        </div>
                        <div className='class-icon-header' onClick={() => setOpenCart(true)}>
                            <BsFillCartCheckFill className='icon-header' />
                        </div>
                        <div className='class-avatar'>
                            <span className='span-frame'>
                                <img className='img-avatar' alt='' src='/media/avatar.avif' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
