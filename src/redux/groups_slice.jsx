import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    grouplist: []
}

export const grouplistSlice = createSlice({
    name: 'grouplistSlice',
    initialState: initialState,
    reducers: {
        setGroupList: (state, action) => {
            state.grouplist = action.payload
        }
    }
})

export const { setGroupList } = grouplistSlice.actions

export default grouplistSlice.reducer