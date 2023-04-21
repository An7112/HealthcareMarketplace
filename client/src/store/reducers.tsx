import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface HealthcareState {
    checkOwner: boolean;
    displayProduct: Array<any>;
    startIndex: number,
    productCount: number;
    endIndex: number,
    checkCart: number,
}

const initialState: HealthcareState = {
    checkOwner: false,
    productCount: 0,
    displayProduct: [],
    startIndex: 0,
    endIndex: 0,
    checkCart: 0,
}

const healthcareSlice = createSlice({
    name: 'healthcare',
    initialState,
    reducers: {
        setCheckOwner: (state, action: PayloadAction<boolean>) => {
            state.checkOwner = action.payload
        },
        setDisplayProduct: (state, action: PayloadAction<Array<any>>) => {
            state.displayProduct = action.payload
        },
        setStartIndex: (state, action: PayloadAction<number>) => {
            state.startIndex = action.payload
        },
        setEndIndex: (state, action: PayloadAction<number>) => {
            state.endIndex = action.payload
        },
        setProductCount: (state, action: PayloadAction<number>) => {
            state.productCount = action.payload
        },
        setCheckCart: (state, action: PayloadAction<number>) => {
            state.checkCart = action.payload
        },
    }
})

export const { 
    setCheckOwner, 
    setDisplayProduct, 
    setStartIndex, 
    setEndIndex, 
    setProductCount,
    setCheckCart
} = healthcareSlice.actions;

export default healthcareSlice.reducer;
