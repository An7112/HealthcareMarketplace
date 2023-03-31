import React from 'react'
import ProductMain from '../component/pages/productMain'

export default function ProductPage() {
    return (
        <ProductMain
            dscPage='Only the owner can create items!'
            modalProps={true}
            titlePage='Products'
        />
    )
}
