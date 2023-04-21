import React, { useState, useEffect, useCallback } from 'react';
import HealthcareMarket from 'contracts/HealthcareMarket.json'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { useDispatch } from "react-redux";
import ProductMain from '../component/pages/productMain'
import { setDisplayProduct } from 'store/reducers';

export default function Purchase() {
  const dispatch = useDispatch();
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState('');

  // const newObject:Array<any> = [{name: 'Anh', age: 6}, {name: 'An', age: 4}];
  // console.log(newObject.filter((ele:any) => ele.name === 'Anh' ? {...newObject, age: ele.age = 9} : ele))

  const fetchProducts = useCallback(async () => {
    try {
      if (contract && account) {
        const allPurchaseId: Array<string> = await contract.methods.getPurchasedProducts(account).call();
        const purchaseIdArray: Array<any> = [];
        const filIndex: Array<any> = allPurchaseId.filter((item, index) => allPurchaseId.indexOf(item) === index)
        
        const arrFunc = (array:Array<any>, x:any) => {
          let count = 0;
          for(let i = 0; i < array.length; i ++){
            if(array[i] === x){
              count ++;
            }
          }
          return purchaseIdArray.push({
            id: x,
            qty: count
          })
        }

        for(let i = 0; i < filIndex.length; i ++){
          arrFunc(allPurchaseId, filIndex[i])
        }
        console.log(purchaseIdArray)
        const products = await Promise.allSettled(
          purchaseIdArray.map(async (item) => {
            const product = await contract.methods.products(item.id).call();
            return {
              name: product.name,
              id: product.id,
              description: product.description,
              price: product.price,
              imageURL: product.imageURL,
              quantity: item.qty,
              available: product.available,
            };
          })
        );

        const filteredProducts: Array<any> = products
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }: any) => value)
        dispatch(setDisplayProduct(filteredProducts));
      }
    } catch (error) {
      console.log(error);
    }
  }, [account, contract, dispatch]);

  useEffect(() => {
    const init = async () => {
      const web3Modal = new Web3Modal();
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();
      const deployedNetwork = HealthcareMarket.networks[networkId as unknown as keyof typeof HealthcareMarket.networks];
      const contract = new web3.eth.Contract(
        HealthcareMarket.abi as any,
        deployedNetwork && deployedNetwork.address
      );
      setContract(contract);
      setAccount(accounts[0])
    };
    init();
  }, []);

  useEffect(() => {
    if (contract != null) {
      fetchProducts();
    }
  }, [contract, fetchProducts]);
  return (
    // <ProductMain
    //   dscPage='Get purchase by ids buy buyer'
    //   modalProps={false}
    //   titlePage='Purchased'
    // />
    <span>purchase</span>
  )
}
