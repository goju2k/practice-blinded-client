import {createContext} from 'react'

const LoadingContext = createContext({
    loading: false,
    setLoading: () => {console.log('Empty LoadingContext setLoading');}
});

export default LoadingContext