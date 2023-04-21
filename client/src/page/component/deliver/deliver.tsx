import React, { useState, useEffect } from 'react';
import HealthcareMarket from 'contracts/HealthcareMarket.json';
import Web3Modal from 'web3modal'
import Web3 from 'web3'

type Purchase = {
  id: number;
  buyer: string;
  products: number[];
  delivered: boolean;
  status: number;
};

function DeliveryComponent() {

  const deliverPurchase = async (purchaseId:number) => {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()

    const marketplaceContract = new web3.eth.Contract(
      HealthcareMarket.abi as any,
      HealthcareMarket.networks[networkId as unknown as keyof typeof HealthcareMarket.networks].address
    )
    await marketplaceContract.methods.deliver(purchaseId).send({ from: accounts[0] });
  };

  // const confirmDelivery = async (purchaseId) => {
  //   await healthcareMarket.methods.confirmDelivery(purchaseId).send({ from: accounts[0] });
  //   const purchase = await healthcareMarket.methods.purchases(purchaseId).call();
  //   setPurchases([...purchases.filter(p => p.id !== purchaseId), purchase]);
  // };
  return;
}

export default DeliveryComponent;