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
            try {
                const productCount = await contract.methods.lastProductId().call();
                const productIds = Array.from(
                    { length: productCount },
                    (_, i) => i + 1
                );
                console.log(productIds);
                const products = await Promise.all(
                    productIds.map(async (id) => {
                        const product = await contract.methods.products(id).call();
                        return {
                            name: product.name,
                            id: product.id,
                            description: product.description,
                            price: product.price,
                            imageURL: product.imageURL,
                            quantity: product.quantity,
                            available: product.available
                        };
                    })
                );
                setProducts(products.filter((product) => product.available && product.quantity > 0));
            } catch (error: any) {
                console.log(error);
            }
        }
        if (contract != null) {
            fetchProducts();
        }
    }, [contract])

    return (
        <PaginatedList items={products} itemsPerPage={8} />
    )
}
