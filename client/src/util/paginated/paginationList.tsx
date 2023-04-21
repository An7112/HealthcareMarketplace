import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import { BsFillCartCheckFill } from 'react-icons/bs'
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './pagination.css'
import { productModal } from 'modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from 'util/cart/cart';
import { setCheckCart } from 'store/reducers';

interface pageType {
  displayProduct: Array<any>,
}


const PaginatedList = (props: pageType) => {

  const dispatch = useDispatch();
  const { productCount } = useSelector((state: any) => state);
  const [currentPage, setCurrentPage] = useState(0);
  const { checkCart } = useSelector((state: any) => state);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const productsInCart: number[] = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(productsInCart);
  }, [checkCart]);

  useEffect(() => {
    dispatch(setCheckCart(count))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleAddToCart = (productId: number) => {
    addToCart({ id: productId, qty: 1 });
    setCartItems([...cartItems, { id: productId, qty: 1 }]);
    setCount(prev => prev + 1)
  };

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart({ id: productId, qty: 1 });
    const newCartItems = cartItems.filter((ele) => ele.id !== productId);
    setCartItems(newCartItems);
    dispatch(setCheckCart(0))
    setCount(prev => prev - 1)
  };

  const isInCart = (productId: number) => {
    if(cartItems.filter((ele:any) => ele.id === productId).length){
      return true
    }
  };

  return (
    <div className='class-page-main'>
      {props.displayProduct.map((item: productModal) => (
        <div className='class-classify-main item' key={item.id}>
          <>
            <div className='classify-item single'>
              <span className='span-block-center'>
                {isInCart(item.id)
                  ? <div className='frame-icon-check checked' onClick={() => handleRemoveFromCart(item.id)}>
                    <FiCheckCircle />
                  </div>
                  : <div className='frame-icon-check' onClick={() => handleAddToCart(item.id)}>
                    <BsFillCartCheckFill />
                  </div>
                }
              </span>
            </div>
            <Link to={`/product/item/${item.id}`} key={item.id} className='class-classify'>
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
                  {item.available === true
                    ? <div className='available'>Available</div>
                    : <div className='available unavailable'>Unavailable</div>}
                </span>
              </div>
            </Link>
          </>
        </div>
      ))}
      <Pagination
        pageCount={Math.ceil(productCount / 8)}
        onPageChange={handlePageChange}
        initialPage={currentPage}
      />
    </div>
  );
};

export default PaginatedList;
