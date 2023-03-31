import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingFrame } from "component/loading-frame/loadingFrame";
import { Activity, ItemDetailDropDown, Offer, Properties } from "./component/dropdown";
import { AiFillCaretDown } from 'react-icons/ai'
import { GiSelfLove } from 'react-icons/gi'
import { FaEthereum, FaHome } from 'react-icons/fa'
import { BsPatchCheckFill, BsShare } from 'react-icons/bs'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import HealthcareMarket from 'contracts/HealthcareMarket.json'
import HealthcareToken from 'contracts/HealthcareToken.json'
import './item-detail.css'
interface productType {
    id: number,
    name: string,
    description: string,
    price: number,
    imageURL: string,
    quantity: number,
    available?: boolean,
}

export default function DetailItem() {
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [nft, setNft] = useState<productType>()
    const [contract, setContract] = useState<any>(null);
    const [contractNetwork, setContractNetwork] = useState<any>(null);
    const { _id } = useParams();

    useEffect(() => {
        async function init() {
            const web3Modal = new Web3Modal();
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const networkId = await web3.eth.net.getId();
            const contractNetwork = HealthcareMarket.networks[networkId as unknown as keyof typeof HealthcareMarket.networks];
            const contract = new web3.eth.Contract(
                HealthcareMarket.abi as any,
                contractNetwork && contractNetwork.address
            )
            setContract(contract);
            setContractNetwork(contractNetwork);
        }
        init()
    }, [])

    useEffect(() => {
        async function fetchProducts() {
            setLoadingDetail(true);
            if (contract != null) {
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
                    await Promise.all(products.filter((ele: any) => ele.id === _id).map(async (i: any) => {
                        setNft(i)
                    }))
                } catch (error: any) {
                    console.log(error);
                } finally {
                    setLoadingDetail(false);
                }
            }
        }
        return () => {
            fetchProducts()
        }
    }, [_id, contract])

    async function buyProduct(productId: any) {
        if (contract != null && contractNetwork != null) {
            const web3Modal = new Web3Modal();
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const networkId = await web3.eth.net.getId();
            const accounts = await web3.eth.getAccounts();
            const deployedNetworkToken = HealthcareToken.networks[networkId as unknown as keyof typeof HealthcareToken.networks]
            const healthcareMarketInstanceToken = new web3.eth.Contract(
                HealthcareToken.abi as any,
                deployedNetworkToken.address
            );
            try {
                const product = await contract.methods.products(productId).call();
                const price = product.price;

                await healthcareMarketInstanceToken.methods.approve(
                    contractNetwork.address,
                    price
                ).send({ from: accounts[0] });

                await contract.methods.buy(productId).send({ from: accounts[0] });
            } catch (error) {
                console.error(error);
            }
        }
    }


    return <div className='class-collection-detail' id='collection-detail'>
        <div className='content-page'>
            <div className='collection-detail-left'>
                {
                    loadingDetail === true
                        ?
                        <LoadingFrame divWidth={"100%"} divHeight={"480px"} />
                        :
                        <img src={nft?.imageURL} alt='' />
                }
                {
                    loadingDetail === true
                        ?
                        <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                        :
                        (
                            <Properties />
                        )
                }

                {
                    loadingDetail === true
                        ?
                        <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                        :
                        (
                            <ItemDetailDropDown />
                        )}

            </div>
            <div className='collection-detail-right'>
                <div className='chakra-stack'>
                    <AiFillCaretDown className='svg-down-edit' />
                    <div className='chakra-stack-header'>
                        <div className='chakra-stack-header-left'>
                            <span className='header-left-span'>
                                <p>Certified</p>
                                <p className='check'><BsPatchCheckFill /></p>
                            </span>
                            <div className='floor-type'>
                                {
                                    loadingDetail === true
                                        ?
                                        <LoadingFrame divWidth={"100px"} divHeight={"24px"} />
                                        :
                                        <>
                                            <p className="volumn">Volumn</p>
                                            <p style={{ overflow: "hidden" }}>
                                                {nft?.price} HCMA</p>
                                        </>
                                }
                            </div>
                        </div>
                        <div className='chakra-stack-header-right'>
                            <span><GiSelfLove /></span>
                            <span><BsShare /></span>
                            <span><FaHome /></span>
                            <span><BiDotsVerticalRounded /></span>
                        </div>
                    </div>
                    <div className='class-info-chakra-stack'>
                        {loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"24px"} />
                            :
                            <h3>{nft?.name} #{nft?.id}</h3>
                        }

                    </div>
                    <div className='class-info-chakra-stack'>
                        <div className='class-info-owner'>
                            {
                                loadingDetail === true
                                    ?
                                    <LoadingFrame divWidth={"40px"} divHeight={"40px"} />
                                    :
                                    <img src='/media/avatar.avif' alt='' />
                            }

                            {loadingDetail === true
                                ?
                                <LoadingFrame divWidth={"240px"} divHeight={"40px"} />
                                :
                                <div className='owner-name'>
                                    <span>Owner</span>
                                    <p>0x742990c29fE64d1b8b79D54C2e81a291bC841025</p>
                                </div>}
                        </div>
                    </div>
                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                            :
                            (
                                <div className='class-info-chakra-stack'>
                                    <div className='class-offer'>
                                        <div className='class-offer-content'>
                                            <div className='offer-info'>
                                                <span>Price</span>
                                                <FaEthereum />
                                                <p>{nft?.price} HCMA</p>
                                            </div>
                                        </div>
                                        <div className='class-offer-content'>
                                            <div className='offer-info'>
                                                <button onClick={() => buyProduct(nft?.id)}>Buy now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    }

                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"60px"} spacing={"32px 0"} />
                            :
                            (
                                <Offer />
                            )
                    }

                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                            :
                            (
                                <Activity />
                            )
                    }
                </div>
            </div>
        </div>
    </div>
}
