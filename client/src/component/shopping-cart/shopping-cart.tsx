import React, { useState, useEffect, useCallback } from 'react'
import { AiFillExclamationCircle, AiFillRest } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { TbShoppingCartDiscount } from 'react-icons/tb'
import { removeFromCart } from 'util/index'
import './shopping.css'
import HealthcareMarket from 'contracts/HealthcareMarket.json'
import HealthcareToken from 'contracts/HealthcareToken.json'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { useDispatch, useSelector } from 'react-redux';
import { productModal } from 'modal/modal'
import { setCheckCart } from 'store/reducers'
export default function ShoppingCart({ propsCallback }: any) {

    const dispatch = useDispatch();
    const [shoppingCart, setShoppingCart] = useState<productModal[]>([])
    const [cartItems, setCartItems] = useState<number[]>([]);
    const { checkCart } = useSelector((state: any) => state);
    const [contract, setContract] = useState<any>(null);
    const [count, setCount] = useState<number>(checkCart);

    useEffect(() => {
        const productsInCart: number[] = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(productsInCart);
    }, [checkCart]);

    useEffect(() => {
        dispatch(setCheckCart(count))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[count])

    const totalPrice = shoppingCart.reduce((a: any, c: any) =>
        a + (c.price * 1), 0
    );
    // const totalPrice = shoppingCart.reduce((a: any, c: any) =>
    //     a + (c.price * c.quantity), 0
    // );
    function clearAllItem() {
        localStorage.removeItem('cart')
        setCount(prev => prev - 1)
    }
    const closeCart = () => {
        propsCallback(false)
    }

    const handleRemoveFromCart = (productId: number) => {
        removeFromCart({id: productId, qty: 1});
        const newCartItems = cartItems.filter((ele:any) => ele.id !== productId);
        setCartItems(newCartItems);
        setCount(prev => prev - 1)
    };

    const fetchProducts = useCallback(async () => {
        try {
            for (let i = 0; i <= cartItems.length; i++) {
                const products = await Promise.allSettled(
                    cartItems.map(async (ele: any) => {
                        const product = await contract.methods.products(ele.id).call();
                        return {
                            name: product.name,
                            id: product.id,
                            description: product.description,
                            price: product.price,
                            imageURL: product.imageURL,
                            quantity: product.quantity,
                            available: product.available,
                        };
                    })
                );
                const filteredProducts: Array<any> = products
                    .filter(({ status }) => status === 'fulfilled')
                    .map(({ value }: any) => value)
                    .filter((product) => product.available && product.quantity > 0);

                setShoppingCart(filteredProducts);
            }

        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract, cartItems]);

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


    async function buyProduct() {
        if (contract != null) {
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
            const contractNetwork = HealthcareMarket.networks[networkId as unknown as keyof typeof HealthcareMarket.networks];
            const contract = new web3.eth.Contract(
                HealthcareMarket.abi as any,
                contractNetwork && contractNetwork.address
            )
            try {

                const price = web3.utils.toWei(String(totalPrice), 'ether');
                var getValue = cartItems.map((ele:any) => String(ele.qty));
                var getKey = cartItems.map((ele:any) => String(ele.id));
                await healthcareMarketInstanceToken.methods.approve(
                    contractNetwork.address,
                    price
                ).send({ from: accounts[0] });
                    console.log(accounts[0])
                await contract.methods.buy(getKey, getValue, accounts[0]).send({ from: accounts[0] });
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <aside className='cart-main'>
            <div className='cart-outer'>
                <div className='shopping-cart'>
                    <header>
                        <div className='fresnel-greater'>
                            <div className='cart-inner'>
                                <div className='shopping-cart-name'>
                                    <h4>Your cart</h4>
                                    <AiFillExclamationCircle />
                                </div>
                                <button type='button' onClick={closeCart}>
                                    <IoMdClose />
                                </button>
                            </div>
                            <hr />
                            <div className='count-item'>
                                <span>{shoppingCart.length} item</span>
                                <button type='button' onClick={clearAllItem}>
                                    <span>
                                        Clear all
                                    </span>
                                </button>
                            </div>
                        </div>
                    </header>
                    <ul className='list-item'>
                        {
                            shoppingCart.map((ele: productModal) => (
                                <div className='shopping-cart-item'>
                                    <div className='box-img-item'>
                                        <span>
                                            <img src={ele.imageURL} alt='' />
                                        </span>
                                    </div>
                                    <div className='content-item'>
                                        <div className='content-item-inner'>
                                            <span className='item-name'>
                                                {ele.name} #{ele.id}
                                                <span className='item-name qty'><TbShoppingCartDiscount /> 1</span>
                                            </span>
                                            <span className='item-owner'>
                                                0x742990c29fE64d1b8b79D54C2e81a291bC841025
                                            </span>
                                            <span className='item-sub'>
                                                Creation fee: 0.0001 ether
                                            </span>

                                        </div>
                                    </div>
                                    <div className='item-price'>
                                        <span>{ele.price} HCMA</span>
                                        <AiFillRest onClick={() => handleRemoveFromCart(ele.id)} />
                                    </div>
                                </div>
                            ))
                        }
                    </ul>
                    <div style={{ marginBottom: '16px' }}></div>
                    <hr />
                    <footer>
                        <div className='footer-inner'>
                            <span className='footer-title'>Total price</span>
                            <span>{totalPrice} HCMA</span>
                        </div>
                    </footer>
                    <div className='class-button'>
                        <button onClick={buyProduct}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    )
}
