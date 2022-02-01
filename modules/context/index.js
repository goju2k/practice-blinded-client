import {createContext} from 'react'
const global = {
    mode:'dev',
    random:()=>{return Math.random()}
}

Object.freeze(global)
  
const globalContext = createContext(global);
  
export default globalContext