import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isMenuOpen: false,
    isWhatsappLoggedIn: false
}

export const layoutSlice = createSlice({
    name: 'layoutSlice',
    initialState: initialState,
    reducers: {
        setIsMenuOpen: (state, action) => {
            state.isMenuOpen = action.payload
        },
        setIsWhatsappLoggedIn: (state, action) => {
            state.isWhatsappLoggedIn = action.payload
        }
    }
})

export const { setIsMenuOpen, setIsWhatsappLoggedIn } = layoutSlice.actions

export default layoutSlice.reducer