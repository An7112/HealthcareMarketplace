import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { documentModal } from '../../../../modal/modal';
import { documentLinks } from '../../../../util';
import { BiSearch } from 'react-icons/bi'
import './product.css'
import { Classify, ClassifyListItem } from './component';

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
            {/* <input type="checkbox" name="check" value="check" className='checkbox'/> */}
            {documentLinks.map((ele: documentModal) => {
                return <div
                    className={`button-document-page ${ele.search === active ? 'active' : ''}`}
                    onClick={() => handleActive(ele.search)}
                >
                    <span className='span-block-center'>{ele.name}</span>
                </div>
            })}
            <div className='product-search'>
                <div className='frame-input'>
                    <BiSearch className='icon-search-header' />
                    <input className='input-header' placeholder='Search or type a command' />
                </div>
            </div>
        </div>
        <Classify/>
        <ClassifyListItem/>
    </div>
}