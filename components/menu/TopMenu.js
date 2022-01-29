export default function TopMenu({children, items, itemClick}) {

    console.log('[TopMenu] start');

    const styleContainer = {

        //size
        width:'100%',
        height:'50px',

        //scroll
        overflowX:'auto',

        //display
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        
        //기본 폰트
        fontSize:'12px',
        color:'gray',
        background:'black',
        fontWeight:'600'

    }

    const styleItem = {

        //display
        display:'flex',
        justifyContent:'center',
        alignItems:'center',

        //contents
        padding:'5px 20px',
        whiteSpace:'nowrap',
        width:'fit-content',

    }

    const styleItemFocus = Object.assign({}, styleItem);
    styleItemFocus.color = 'white'
    styleItemFocus.fontSize = '15px'
    
    return (
        
        <div style={styleContainer}>
            
            {!items ? <div>loading...</div> : items.map((item, i) => {
                return <div key={item.id} style={item.focus?styleItemFocus:styleItem} onClick={itemClick.bind(null, item, items)}>{item.name}</div>
            })}
            
        </div>
        
    )

}