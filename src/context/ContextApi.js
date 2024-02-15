import React, { useEffect, useReducer } from 'react'
import { ContextCity } from "./ContextCity";
import { api_key, base_url } from "../apiService";
import axios from 'axios'

// Initial States are defined.
const initialState = {
    data: {},
    loading: false,
    error: null,
};

// Define action types.
const ActionTypes = {
    FETCH_DATA_REQUEST: 'FETCH_DATA_REQUEST',
    FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
    FETCH_DATA_FAILURE: 'FETCH_DATA_FAILURE'
}
// Reducer function to manage any changing in state.
const apiReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_DATA_REQUEST:
            return { ...state, loading: true, error: null }
        case ActionTypes.FETCH_DATA_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ActionTypes.FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

const ContextApi = React.createContext()

export const ApiProvider = ({ children }) => {
    /* 
    It is an alternative to useState hook when the state logic is complex and 
    involves multiple sub-values or when the next state depends on the previous one.
    */
    const { selectedCity } = React.useContext(ContextCity);
    const [data, setData] = useReducer(apiReducer, initialState)

    useEffect(() => {
        const getWeather = async () => {
            setData({ type: ActionTypes.FETCH_DATA_REQUEST })
            // const apiUrl = `${process.env.REACT_APP_BASE_URL}forecast?q=${selectedCity}&appid=${process.env.REACT_APP_API_KEY}&units=metric` 
            
            const apiUrl = `${base_url}forecast?q=${selectedCity}&appid=${api_key}&units=metric`

            console.log(selectedCity);
            console.log(apiUrl);

            //            
            try {
                //
                const res = await axios.get(apiUrl)
                console.log(res.data);
                setData({ type: ActionTypes.FETCH_DATA_SUCCESS, payload: res.data })
            } catch (error) {
                setData({ type: ActionTypes.FETCH_DATA_FAILURE, payload: error.message })
            }
        }
        getWeather()
    }, [selectedCity])

    // console.log('Current State:', data);
    return <ContextApi.Provider value={data}>{children}</ContextApi.Provider>
}

// Creating a custom hook for using Context..
export const useApi = () => {
    const context = React.useContext(ContextApi)
    if (!context) throw new Error('useApi must be used within an ApiProvider')
    return context
}

export default ContextApi
