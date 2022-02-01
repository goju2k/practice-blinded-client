
const styleContainer = {

    //size
    width:'100%',
    height:'calc(100% - 50px)',

    //scroll
    overflowX:'hidden',
    
}

const styleItem = {

    //size
    height:'100px',
    padding:'10px',

    //display
    background:'#fff',
    
    //contents
    whiteSpace:'nowrap',
    
    //etc
    cursor:'pointer'

}

const styleTop = {

    //size
    height:'40%',

    //font
    fontSize:'14px',
    color:'black',
    fontWeight:600,

    opacity:0.9,

}

const styleMid = {

    //size
    height:'30%',

    //display
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'flex-start',

    //font
    fontSize:'11px',
    color:'gray',
    
    item:{
        paddingRight:'10px'
    }

}

const styleBottom = {

    //size
    height:'30%',

    //display
    display:'flex',
    justifyContent:'space-between',
    alignItems:'flex-start',

    //font
    fontSize:'11px',
    color:'gray',

}

const styleBottomLeft = {

    //display
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'flex-start',

    item:{
        paddingRight:'10px'
    }

}

const styleBottomRight = {

    //display
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'flex-start',

    //font
    fontSize:'12px',
    color:'#00a8c3',

}

const styleBar = {

    //size
    height:'8px',

    //display
    background:'#ededed',

}

const styleContentBar = {

    //size
    height:'1px',

    //display
    background:'lightgray',

}

import DateUtil from '/modules/util/Date.js'

export default function BoardList({children, items, itemClick}) {

    return (

        <div style={styleContainer}>

            {items && items.map((item, i) => {
                return <div>
                    
                    {i === 0 && <div style={styleBar}></div>}

                    <div style={styleItem} key={item.id} onClick={itemClick.bind(null, item, items)}>

                        <div style={styleTop}>

                            <div>{item.title}</div>

                        </div>

                        <div style={styleMid}>

                            <div style={styleMid.item}>{item.group}</div>
                            <div style={styleMid.item}>{item.nick}</div>
                            <div style={styleMid.item}>{DateUtil.getTimeToApxText(item.time)}</div>

                        </div>

                        <div style={styleBottom}>

                            <div style={styleBottomLeft}>

                                <div style={styleBottomLeft.item}>{'조회 '+item.view}</div>
                                <div style={styleBottomLeft.item}>{item.good > 0?'좋아요 '+ item.good:'좋아요'}</div>
                                <div style={styleBottomLeft.item}>{'댓글 '+item.reply}</div>

                            </div>

                            <div style={styleBottomRight}>

                                <div>{item.cname}</div>

                            </div>

                        </div>

                    </div>

                    {i === items.length - 1 
                    ? <div style={styleBar}></div>
                    :<div style={styleContentBar}></div>}
                    
                </div>
            })}

        </div>

    )
}
