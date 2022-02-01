import {useState, useContext, Children} from 'react'

import styles from './BaseLayout.module.css'

import LoadingContext from '/modules/context/loading.js'

const defaultConfig = {
    itemSizing:'auto',
    direction:'column',
}

//loading component
function LoadingComponent(){
  
    const { loading, setLoading } = useContext(LoadingContext);
    console.log('[Loading] loading => ',loading)
    return loading &&
    <div className={styles.loadingContainer}>
        <div className={styles.loadingBar}>
            <div className={styles.loadingMove}>
            </div>
        </div>
    </div>

}
  
export default function BaseLayout({children, config, loadingProp}) {

    const thisConfig = {}
    Object.assign(thisConfig, defaultConfig)
    Object.assign(thisConfig, config)
    console.log('thisConfig => ', thisConfig);

    const styleContainer = {
        width:'100%',
        // display:'flex',
        // flexDirection:thisConfig.direction,
        // justifyContent:'center',
        // alignItems:'center',
    }
    const styleItem = {
        width:'100%'
    }

    //loading state
    console.log('[BaseLayout] loadingProp ', loadingProp);
    
    return (
        <LoadingContext.Provider value={loadingProp}>
            <div style={styleContainer}>
                
                
                    <LoadingComponent></LoadingComponent>
                
                {
                Children.map(children, (child, i)=>{
                    return <div key={i} style={styleItem}>{child}</div>
                })
                }
            </div>
        </LoadingContext.Provider>

    )

}