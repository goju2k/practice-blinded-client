import {createContext} from 'react'

const global = {
    mode:'dev',
    loading:true
}

const globalContext = createContext(global);
  
export default globalContext