//style object
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
    background:'#222222',
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

    //animation
    transition:'font-size 0.3s',

    //etc
    cursor:'pointer'

}

const styleItemFocus = Object.assign({}, styleItem);
styleItemFocus.color = 'white'
styleItemFocus.fontSize = '15px'

//common function
const setToCenter = function(elem, currItemId){
    for(let child of elem.children){
        if(child.dataset.id == currItemId){
            elem.scrollLeft = child.offsetLeft - (elem.offsetWidth/2) + (child.offsetWidth/2)
            break
        }
    }
}

//hook
import { useState, useEffect, useRef } from 'react';

//router
import { useRouter } from 'next/router'

export default function TopMenu({children, items, itemClick}) {

    const router = useRouter()
    console.log('[TopMenu] start', router.query);
    const qId = Number(router.query.id)

    /**
     * === [curr item change] ======================================================
     */
    const [currItemId, setCurrItemId] = useState(qId);
    const refContainer = useRef(null)

    if(currItemId === null && items){
        const [initActiveItem] = items.filter(item=>item.focus === true)
        if(initActiveItem){
            setCurrItemId(initActiveItem.id)
        }
    }

    console.log('[TopMenu] currItemId', currItemId);

    if(qId != currItemId && items){
        const [activeItem] = items.filter(item=>item.id === qId)
        if(activeItem){
            setCurrItemId(activeItem.id)
        }
        if(itemClick){
            itemClick.bind(null, activeItem, items, false)()
        }
    }

    useEffect(()=>{

        const elem = refContainer.current
        console.log('currItemId=>',currItemId, elem.children);
        if(elem && elem.children[0]){
            setToCenter(elem, currItemId)
        }

    }, [currItemId])

    /**
     * === [side margin div] ======================================================
     */
    const [leftMarginStyle, setLeftMarginStyle] = useState(null);
    const [rightMarginStyle, setRightMarginStyle] = useState(null);
    const [marginCreatedInit, setMarginCreatedInit] = useState(false);
    
    useEffect(()=>{

        const elem = refContainer.current
        
        //side margin style 최초 설정
        if(leftMarginStyle == null && rightMarginStyle == null){

            if(elem && elem.children[0]){

                setLeftMarginStyle({minWidth:elem.offsetWidth / 2})

                const lastElem = elem.children[elem.children.length - 1]
                setRightMarginStyle({minWidth:(elem.offsetWidth / 2) - (lastElem.offsetWidth / 2)})
                
                console.log('margin style set!!!');

            }

        //side margin 설정후에 active item 위치 center 초기화
        }else if(marginCreatedInit === false){

            //flag true
            setMarginCreatedInit(true)
            console.log('marginCreatedInit set!!!');

            //center
            setToCenter(elem, currItemId)

            // observe elems
            // resizeObserver.observe(elem);

        }

    })

    /**
     * === [event] ======================================================
     */

    //resize
    // const [resizeObserver] = useState(new ResizeObserver( entries => {
    //     console.log('ResizeObserver start =>',entries)
    //     setCurrItemId(null)
    //     setLeftMarginStyle(null)
    //     setRightMarginStyle(null)
    //     setMarginCreatedInit(false)
    // }));

    //item click
    const itemClickMain = (item, items)=>{

        router.push('/main/list/'+item.id)
        // setCurrItemId(item.id)
        // if(itemClick){
        //     itemClick.bind(null, item, items)()
        // }

    }

    return (
        
        <div style={styleContainer} ref={refContainer}>
            {leftMarginStyle && <div style={leftMarginStyle}></div>}
            {items && items.map((item, i) => {
                return <div data-id={item.id} data-focus={item.focus} key={item.id} style={item.focus?styleItemFocus:styleItem} onClick={itemClickMain.bind(null, item, items)}>{item.name}</div>
            })}
            {rightMarginStyle && <div style={rightMarginStyle}></div>}
        </div>
        
    )

}