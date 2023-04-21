import React, { useState, useEffect, useCallback } from 'react';
import HealthcareMarket from 'contracts/HealthcareMarket.json'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { useDispatch, useSelector } from "react-redux";
import ProductMain from '../component/pages/productMain'
import { setDisplayProduct, setEndIndex, setProductCount } from 'store/reducers';

export default function ProductPage() {
    const dispatch = useDispatch();
    const { startIndex, endIndex } = useSelector((state: any) => state);
    const [contract, setContract] = useState<any>(null);

    const fetchProducts = useCallback(async () => {
        try {
            const productCount = await contract.methods.lastProductId().call();
            console.log(productCount);
            const existingStart = startIndex;
            const existingEnd = Number(productCount) < 8 ? Number(productCount) : endIndex;
            const productIds = Array.from({ length: productCount }, (_, i) => i + 1);
            const getProducts = await contract.methods.getAvailableProducts(existingStart, existingEnd).call();
            const products = await Promise.allSettled(
                getProducts.map(async (ele:any) => {
                    return {
                        name: ele.name,
                        id: ele.id,
                        description: ele.description,
                        price: ele.price,
                        imageURL: ele.imageURL,
                        quantity: ele.quantity,
                        available: ele.available,
                    };
                })
            );
            const filteredProducts: Array<any> = products
                .filter(({ status }) => status === 'fulfilled')
                .map(({ value }: any) => value)
                .filter((product) => product.available && product.quantity > 0);
                dispatch(setDisplayProduct(filteredProducts));
            dispatch(setProductCount(productIds.length));
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract, endIndex, startIndex, dispatch]);

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
        if (contract != null) {
            fetchProducts();
        }
    }, [contract, fetchProducts]);

    return (
        <ProductMain
            dscPage='Only the owner can create items!'
            modalProps={true}
            titlePage='Products'
        />
    )
}
