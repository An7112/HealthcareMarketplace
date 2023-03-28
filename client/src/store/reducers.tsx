import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface HealthcareState {
    checkOwner: boolean;
}

const initialState: HealthcareState = {
    checkOwner: false,
}

const healthcareSlice = createSlice({
    name: 'healthcare',
    initialState,
    reducers: {
        setCheckOwner: (state, action: PayloadAction<boolean>) => {
            state.checkOwner = action.payload
        }
    }
})

export const { setCheckOwner } = healthcareSlice.actions;

export default healthcareSlice.reducer;
