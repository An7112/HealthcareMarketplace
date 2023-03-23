import React, { useState, useEffect } from 'react'
import HealthcareMarket from '../../../../../../contracts/HealthcareMarket.json'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import './classifyListItem.css'
import PaginatedList from '../../../../../../util/paginated/paginationList'

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
        <PaginatedList items={products} itemsPerPage={5}/>
    )
}
