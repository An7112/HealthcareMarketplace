import { useEffect, useState } from "react";
import HealthcareMarket from "contracts/HealthcareMarket.json";
import HealthcareToken from 'contracts/HealthcareToken.json'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { Purchase } from "modal/modal";
import { DiClojureAlt } from 'react-icons/di'
import { IoSwapVerticalSharp } from 'react-icons/io5'
import { SiEthereum } from 'react-icons/si'
import PaginatedList from 'util/paginated/paginationList'
import { useDispatch, useSelector } from 'react-redux';
import './profile.css'
import { setDisplayProduct, setEndIndex, setProductCount } from "store/reducers";

export default function Profile() {
  const { startIndex, endIndex } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [web3, setWeb3] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [balance, setBalance] = useState(0);
  const [amountInput, setAmountInput] = useState(1);
  const [refetch, setRefetch] = useState(0);
  const [lastPurchase, setLastPurchase] = useState(0);

  useEffect(() => {
    const init = async () => {
      const web3Modal = new Web3Modal()
      const provider = await web3Modal.connect()
      const web3 = new Web3(provider)
      setWeb3(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HealthcareMarket.networks[networkId as unknown as keyof typeof HealthcareMarket.networks];
      const contractInstance = new web3.eth.Contract(
        HealthcareMarket.abi as any,
        deployedNetwork && deployedNetwork.address
      );
      setContract(contractInstance);
    };
    init();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      const web3Modal = new Web3Modal()
      const provider = await web3Modal.connect()
      const web3 = new Web3(provider)
      const accounts = await web3.eth.getAccounts()
      const networkId = await web3.eth.net.getId();
      const deployedToken = HealthcareToken.networks[networkId as unknown as keyof typeof HealthcareToken.networks];
      const tokenContract = new web3.eth.Contract(
        HealthcareToken.abi as any,
        deployedToken && deployedToken.address
      );
      const balanceToken = await tokenContract.methods.balanceOf(accounts[0]).call();
      const convertBalance = balanceToken / 10 ** 18;
      setBalance(convertBalance);
    }
    return () => {
      fetchBalance();
    }
  }, [refetch])

  useEffect(() => {
    const getPurchasedProducts = async () => {
      if (!contract) return;
      const accounts = await web3.eth.getAccounts();
      const productCount = await contract.methods.lastPurchaseId().call();
      setLastPurchase(productCount);
      dispatch(setEndIndex(Number(productCount) < 8 ? Number(productCount) : 8))
      const existingStart = startIndex;
      const existingEnd = endIndex;
      const getProduct = await contract.methods.getAllPurchasedProducts(existingStart, existingEnd, accounts[0]).call();
      const products = await Promise.allSettled(
        getProduct.map(async (ele: any) => {
          return {
            buyer: ele.buyer,
            name: ele.name,
            id: ele.id,
            description: ele.description,
            price: ele.price,
            imageURL: ele.imageURL,
            quantity: ele.qtyPurchase,
            status: ele.status
          };
        })
      );
      const filteredProducts: Array<any> = products
        .filter(({ status }) => status === 'fulfilled')
        .map(({ value }: any) => value)
        console.log(filteredProducts)
      setPurchases(filteredProducts);
      dispatch(setDisplayProduct(filteredProducts));
      dispatch(setProductCount(Number(productCount)));
    };
    getPurchasedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, dispatch, endIndex, startIndex]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amountChange = event.target.value;
    setAmountInput(Number(amountChange))
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
    const weiAmount = web3.utils.toWei(String(amountInput), "ether");
    await instance.methods.buyToken().send({
      from: accounts[0],
      value: weiAmount,
    });
    setRefetch(prev => prev + 1);
  };

  return (
    <div className='profile-main'>
      <h3 className='title-page'>Profile</h3>
      <div className='profile-container'>
        <div className='container-flex-full'>
          <div className='grid-w-full top'>
            <div className='grid-col-span-4'>
              <div className='frame-user'>
                <div className='banner-user'>
                  <div className='user'>
                    <img src='/media/avatar.avif' alt='' />
                  </div>
                </div>
                <div className='frame-username'>
                  <h4>Nguyen Thanh An</h4>
                  <p className='text-base'>Product Manager</p>
                </div>
                <div className='frame-username-dsc'>
                  <div className='dsc-item'>
                    <h4>{balance}</h4>
                    <p className='text-base'>Balance ( HCMA )</p>
                  </div>
                  <div className='dsc-item'>
                    <h4>{lastPurchase}</h4>
                    <p className='text-base'>Purchased</p>
                  </div>
                  <div className='dsc-item'>
                    <h4>1</h4>
                    <p className='text-base'>Following</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid-col-span-3'>
              <div className='frame-span-3'>
                <h3 className="title">Swap Token</h3>
                <div className="frame-swap">
                  <div className="frame-token">
                    <h3 className="from-to-title">
                      From
                    </h3>
                    <div className="swap-dsc">
                      <div className="swap-dsc-content">
                        <div className="icon-token">
                          <SiEthereum className="ether-icon" />
                          <h3 className="from-to-title token">
                            ETH
                          </h3>
                        </div>
                        <div className="frame-balance swap">
                          <input defaultValue={1} type="number" className="ether-input" onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="icon-swap-token">
                        <IoSwapVerticalSharp />
                      </div>
                    </div>
                  </div>
                  <div className="frame-token">
                    <h3 className="from-to-title">
                      To
                    </h3>
                    <div className="swap-dsc">
                      <div className="swap-dsc-content">
                        <div className="icon-token">
                          <DiClojureAlt />
                          <h3 className="from-to-title token">
                            HCMA
                          </h3>
                        </div>
                        <div className="frame-balance swap">
                          <h3 className="from-to-title">{amountInput}</h3>
                          <h3 className="from-to-title blur">( ~ {amountInput} ETH)</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="price-swap">
                    <h3 className="title blur">Price</h3>
                    <h3 className="title">1 ETH = 1 HCMA</h3>
                  </div>
                  <button className="swap-button" onClick={buyToken}>Swap</button>
                </div>

              </div>
            </div>
            <div className='grid-col-span-5'>
              <div className='grid-span-11'>
                <div className='upload-frame'>
                  <label htmlFor="Img">
                    <div className='div-child-label'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload" viewBox="0 0 16 16" style={{ width: '40px', height: '40px', marginBottom: '12px', color: '#9ca3af' }}>
                        <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                        <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                      </svg>
                      <p className='click-to-upload'><span style={{ fontWeight: "600" }}>Click to upload</span> or drag and drop</p>
                      <p className="format-text">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                  </label>
                  <input id='Img' type="file" name="Asset" style={{ display: "none" }}
                  />
                </div>
                <div className='upload-dsc'>
                  <h3>Complete Your Profile</h3>
                  <p>Stay on the pulse of distributed projects with an anline whiteboard to plan, coordinate and discuss.</p>
                  <button className='button-publish'>Publish now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pagination-container'>
          <h3 className='title-page'>All products</h3>
          <p>Here you can find more details about your products. Keep you user engaged by providing meaningful information.</p>
          <PaginatedList displayProduct={purchases} />
        </div>
      </div>
    </div>
  )
}
