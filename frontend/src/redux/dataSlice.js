import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
    name: 'dataSlice',
    initialState: {
        user: null,
        rooms: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setRooms: (state, action) => {
            state.rooms = action.payload
        },
    },
})

export const { setUser , setRooms } = dataSlice.actions

export default dataSlice.reducer