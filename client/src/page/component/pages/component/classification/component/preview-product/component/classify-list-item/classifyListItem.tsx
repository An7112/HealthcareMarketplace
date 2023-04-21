import React from 'react'
import PaginatedList from 'util/paginated/paginationList'
import './classifyListItem.css'
import { useSelector } from 'react-redux';

export const ClassifyListItem = () => {
    const { displayProduct} = useSelector((state: any) => state);
    return (
        <PaginatedList displayProduct={displayProduct}/>
    )
}
