import {Children} from 'react'

const defaultConfig = {
    itemSizing:'auto',
    direction:'column',
}

export default function BaseLayout({children, config}) {

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
    
    return (
        <div style={styleContainer}>
            {
            Children.map(children, (child, i)=>{
                return <div key={i} style={styleItem}>{child}</div>
            })
            }
        </div>
    )

}