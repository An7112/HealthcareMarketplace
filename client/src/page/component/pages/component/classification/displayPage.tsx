import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { TreatDiseases } from './treat-diseases/treatDiseases';
import { PreventiveMedicine } from './preventive-medicine/preventiveMedicine';

export const DisplayPage = () => {
    const [searchParams] = useSearchParams();
    const getParam = searchParams.get('products');
    switch (getParam) {
        case 'treat-diseases':
            return <TreatDiseases />
        case 'preventive-medicine':
            return <PreventiveMedicine/>
        default:
            return <TreatDiseases />
    }
}