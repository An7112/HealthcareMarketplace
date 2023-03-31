import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
import { Classify, ClassifyListItem } from './component';
import { documentModal } from 'modal/modal';
import { documentLinks } from 'util/index';
import './product.css'

export const Product = () => {
    const Navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [active, setActive] = useState('');

    const handleActive = (param: string) => {
        Navigate({
            pathname: '/product',
            search: `?products=${param}`
        })
        setActive(param);
    }

    useEffect(() => {
        const getParam: any = searchParams.get('products');
        setActive(getParam);
    }, [searchParams])

    return <div className='frame-document-main'>
        <div className='button-frame-document'>
            {documentLinks.map((ele: documentModal) => {
                return (
                    <div
                        key={ele.search}
                        className={`button-document-page ${ele.search === active ? 'active' : ''}`}
                        onClick={() => handleActive(ele.search)}
                    >
                        <span className='span-block-center'>{ele.name}</span>
                    </div>
                )
            })}
            <div className='product-search'>
                <div className='frame-input'>
                    <BiSearch className='icon-search-header' />
                    <input className='input-header' placeholder='Search or type a command' />
                </div>
            </div>
        </div>
        <Classify />
        <ClassifyListItem />
    </div>
}