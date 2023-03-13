import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { TreatDiseases } from './treat-diseases/treatDiseases';
import { PreventiveMedicine } from './preventive-medicine/preventiveMedicine';

export const DisplayDocumentPage = () => {
    const [searchParams] = useSearchParams();
    const getParam = searchParams.get('products');
    switch (getParam) {
        case 'any':
            return <TreatDiseases />
        case 'any2':
            return <PreventiveMedicine/>
        default:
            return <TreatDiseases />
    }
}