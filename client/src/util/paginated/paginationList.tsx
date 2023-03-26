import React, { useState } from 'react';
import Pagination from './pagination';
import { BsFillCartCheckFill } from 'react-icons/bs'
import HealthcareMarket from '../../contracts/HealthcareMarket.json'
import HealthcareToken from '../../contracts/HealthcareToken.json'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import './pagination.css'
import { Link } from 'react-router-dom';

interface Props {
  items: any[];
  itemsPerPage: number;
}

const PaginatedList: React.FC<Props> = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const pagedItems = items.slice(offset, offset + itemsPerPage);
  
  async function buyProduct(productId: any) {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()
    const deployedNetwork = HealthcareMarket.networks[networkId as unknown as keyof typeof HealthcareMarket.networks]
    const healthcareMarketInstance = new web3.eth.Contract(
      HealthcareMarket.abi as any,
      deployedNetwork.address
    );
    //
    const deployedNetworkToken = HealthcareToken.networks[networkId as unknown as keyof typeof HealthcareToken.networks]
    const healthcareMarketInstanceToken = new web3.eth.Contract(
      HealthcareToken.abi as any,
      deployedNetworkToken.address
    );
    try {
      const product = await healthcareMarketInstance.methods.products(productId).call();
      const price = product.price;

      await healthcareMarketInstanceToken.methods.approve(
        deployedNetwork.address,
        price
      ).send({ from: accounts[0] });

      await healthcareMarketInstance.methods.buy(productId).send({ from: accounts[0] });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='class-page-main'>
      {pagedItems.map((item, index) => (
        <Link to={`/product/item/${item.id}`}>
        <div className='class-classify-main item'>
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
                {item.price} HCMA
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
              <span className='span-block-center' onClick={() => buyProduct(1)}>
                Buy
              </span>
            </div>
          </div>
        </div>
        </Link>
      ))}
      <Pagination
        pageCount={Math.ceil(items.length / itemsPerPage)}
        onPageChange={handlePageChange}
        initialPage={currentPage}
      />
    </div>
  );
};

export default PaginatedList;
