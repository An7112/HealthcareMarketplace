import React, { useState, useEffect } from 'react'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import HealthcareMarket from '../../../../../contracts/HealthcareMarket.json'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import './treatDiseases.css'

export const TreatDiseases = () => {

    const [products, setProducts] = useState<any>([]);
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const init = async () => {
            const web3Modal = new Web3Modal();
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = HealthcareMarket.networks[networkId as unknown as keyof typeof HealthcareMarket.networks];
            const contract = new web3.eth.Contract(
                HealthcareMarket.abi as any,
                deployedNetwork && deployedNetwork.address
            );
            setContract(contract);
        };
        init();
    }, []);

    useEffect(() => {
        async function fetchProducts() {
            if (contract !== null) {
                try {
                    const productCount = await contract.methods.lastProductId().call();
                    const products = [];
                    for (let i = 1; i <= productCount; i++) {
                        const product = await contract.methods.products(i).call();
                        if (product.available && product.quantity > 0) {
                            products.push({
                                name: product.name,
                                id: product.id,
                                description: product.description,
                                price: product.price,
                                imageURL: product.imageURL,
                                quantity: product.quantity,
                            });
                        }
                    }
                    setProducts(products);
                } catch (error: any) {
                    console.log(error);
                }
            }
        }
        fetchProducts();
    }, [contract])

    return (
        <div className='document-all'>
            <div className='frame-item-list'>
                {products.map((item: any) => (
                    <div className='item'>
                        <div className='add-to-cart'>
                            <BsFillCartCheckFill />
                        </div>
                        <div className='flex-info-item top'>
                            <p className='info-item'>
                                {item.name}
                            </p>
                            <HiOutlineBadgeCheck />
                        </div>
                        <div className='item-frame'>
                            <span className='span-item'>
                                <img className='img-item' alt='' src={item.imageURL} />
                            </span>
                        </div>
                        <div className='description-item'>
                            <div className='grid-info-item bottom'>
                                <div className='flex-info-item bottom'>
                                    <p className='info-item lable'>
                                        QUANTITY
                                    </p>
                                    <p className='info-item'>
                                        {item.quantity}
                                    </p>
                                </div>
                                <div className='flex-info-item bottom right'>
                                    <p className='info-item lable '>
                                        PRICE
                                    </p>
                                    <p className='info-item'>
                                        {item.price}
                                    </p>
                                    <p className='info-item lable' style={{color:'var(--main-major)'}}>
                                        Wei
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
