import React, { useState, useEffect } from 'react'
import HealthcareMarket from 'contracts/HealthcareMarket.json'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import PaginatedList from 'util/paginated/paginationList'
// import { LoadingFrame } from 'component/loading-frame/loadingFrame'
import './classifyListItem.css'

export const ClassifyListItem = () => {

    const [products, setProducts] = useState<any>([]);
    const [contract, setContract] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
            setLoading(true);
            try {
                const productCount = await contract.methods.lastProductId().call();
                const productIds = Array.from(
                    { length: productCount },
                    (_, i) => i + 1
                );
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
            } finally {
                setLoading(false)
            }
        }
        if (contract != null) {
            fetchProducts();
        }
    }, [contract])

    console.log(loading);

    return (
        <PaginatedList items={products} itemsPerPage={8} />
    )
}
