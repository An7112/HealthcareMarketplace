import React, { useEffect, useState } from "react";
import HealthcareMarket from '../../contracts/HealthcareMarket.json';
import HealthcareToken from '../../contracts/HealthcareToken.json';
import Web3Modal from 'web3modal'
import Web3 from "web3";

export default function ExchangeToken() {
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState(0);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            alert("No web3 provider detected!");
        }
    };

    const getBalance = async () => {
        const web3Modal = new Web3Modal()
        const provider = await web3Modal.connect()
        const web3 = new Web3(provider)
        const networkId = await web3.eth.net.getId()
        const accounts = await web3.eth.getAccounts()

        const deployedNetwork = HealthcareToken.networks[networkId as unknown as keyof typeof HealthcareToken.networks]
        const tokenContract = new web3.eth.Contract(
            HealthcareToken.abi as any,
            deployedNetwork && deployedNetwork.address
        )
        const balanceToken = await tokenContract.methods.balanceOf(accounts[0]).call();
        console.log(balanceToken);

        setBalance(balanceToken);
    }

    const buyToken = async () => {
        const web3Modal = new Web3Modal()
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider)
        const networkId = await web3.eth.net.getId()
        const accounts = await web3.eth.getAccounts()
        const deployedNetwork = HealthcareToken.networks[networkId as unknown as keyof typeof HealthcareToken.networks];
        const instance = new web3.eth.Contract(
            HealthcareToken.abi as any,
            deployedNetwork && deployedNetwork.address
        );
        const weiAmount = web3.utils.toWei(amount, "ether");
        await instance.methods.buyToken().send({
            from: accounts[0],
            value: weiAmount,
        });
    };

    const handleChange = (e: any) => {
       setAmount(e.target.value)
    };

    useEffect(() => {
        loadWeb3()
    },[])
    return (
        <div className="App">
            <header className="App-header">
                <h1>HealthcareMarket Token</h1>
            </header>
            <div className="App-content">
            <>
                        <p>Connected to Web3</p>
                        <>
                            <p>Balance: {balance} HCMA</p>
                            <input
                                type="text"
                                value={amount}
                                onChange={handleChange}
                                placeholder="Enter amount of Ether to buy tokens"
                            />
                            <button onClick={buyToken}>Mua Token</button>
                            <button onClick={getBalance}>Get balance token</button>
                        </>
                    </>
            </div>
        </div>
    );
};