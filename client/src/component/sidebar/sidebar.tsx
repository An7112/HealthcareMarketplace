import React, { useEffect, useState } from 'react'
import { DiClojureAlt } from 'react-icons/di'
import { NavLink } from 'react-router-dom';
import { linkList } from '../../util/links/links';
import { sidebarModal } from '../../modal/modal';
import { CgShoppingBag } from 'react-icons/cg'
import Web3Modal from 'web3modal'
import Web3 from 'web3';
import HealthcareMarket from '../../contracts/HealthcareMarket.json'
import './sidebar.css'

export default function Sidebar() {

  const [newLinks, setNewLinks] = useState<Array<any>>([])

  useEffect(() => {
    async function init() {
      const web3Modal = new Web3Modal()
      const provider = await web3Modal.connect()
      const web3 = new Web3(provider)
      const networkId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()
      const instance = HealthcareMarket.networks[networkId as unknown as keyof typeof HealthcareMarket.networks]
      const contract = new web3.eth.Contract(
        HealthcareMarket.abi as any,
        instance && instance.address
      )

      const addressContract = await contract.methods.getOwnerAddress().call()

      if (String(accounts[0]) === String(addressContract)) {
        setNewLinks([...linkList,
        {
          link: "create",
          name: "create",
          icon: <CgShoppingBag style={{ fontSize: '18' }} />
        },])
      } else {
        setNewLinks(linkList)
      }
    }
    init()
  }, [])

  return (
    <div className='class-sidebar'>
      <div className='frame-sidebar'>
        <div className='logo'>
          <DiClojureAlt className='di-clojure-alt' size={60} />
          <span>Healthcare Market</span>
        </div>
        <div className='class-nav-links'>
          <div className='class-nav-links'>
            {newLinks.map((item: sidebarModal) => (
              <NavLink
                to={`/${item.link}`}
                key={item.name}
                style={({ isActive }) => ({
                  borderLeft: isActive ? '4px solid black' : '',
                })}
                className='nav-link'
              >
                <div className='class-nav-link'>
                  {item.icon} <span>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
