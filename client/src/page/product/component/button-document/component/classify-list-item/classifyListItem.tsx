import React, { useState, useEffect } from 'react'
import HealthcareMarket from '../../../../../../contracts/HealthcareMarket.json'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { BsFillCartCheckFill } from 'react-icons/bs'
import './classifyListItem.css'

export const ClassifyListItem = () => {

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
        <>
            {products.map((item: any) => (
                <div className='class-classify-main'>
                    <div className='class-classify'>
                        <div className='classify-item single'>
                            <span className='span-block-center'>
                                <div className='frame-icon-check'>
                                    <BsFillCartCheckFill />
                                </div>
                            </span>
                        </div>
                        <div className='classify-item rows'>
                            <div className='flex-item-row'>
                                <div className='item-frame-main'>
                                    <div className='item-frame'>
                                        <span className='span-item'>
                                            <img className='img-item' alt='' src={item.imageURL} />
                                        </span>
                                    </div>
                                </div>
                                <span className='span-block-center'>
                                    {item.name}
                                </span>
                            </div>
                        </div>
                        <div className='classify-item'>
                            <span className='span-block-center'>
                                Treat diseases
                            </span>
                        </div>
                        <div className='classify-item'>
                            <span className='span-block-center'>
                                {item.price}
                            </span>
                        </div>
                        <div className='classify-item'>
                            <span className='span-block-center'>
                                {item.quantity}
                            </span>
                        </div>
                        <div className='classify-item double'>
                            <span className='span-block-center'>
                                15/03/2023
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
