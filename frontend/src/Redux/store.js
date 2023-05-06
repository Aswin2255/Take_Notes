import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import Userslices from './Userslices'
import {persistReducer} from 'redux-persist'
import Adminslice from './Adminslice'
import Postslice from './postslice'


const rootreducer = combineReducers({
    Auth : Userslices.reducer,
    Admin : Adminslice.reducer,
    Post : Postslice.reducer,
})
const persistConfig = {
    key : 'root',
    version : 1,
    storage,
    whitelist: ['Auth','Admin'], 
}
const persistedreducer = persistReducer(persistConfig,rootreducer)

export const store = configureStore({
    
      reducer : persistedreducer
    
})

export default store