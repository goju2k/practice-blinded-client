//css
import styles from '/styles/main/list/List.module.css'

//components
import BaseLayout from '/components/layout/BaseLayout.js'
import TopMenu from '/components/menu/TopMenu.js'

//api
import axios from 'axios'

//hook
import { useState, useEffect } from 'react';

export default function MainList() {
    
    console.log('[MainList] start');
    /**
     * === [Loading Start] ======================================================
     */
     const [loading, setLoading] = useState(false)
     const loadingProp = {loading, setLoading}

    /**
     * === [Category Start] ======================================================
     */

    //category 초기화
    const [categoryList, setCategoryList] = useState()
    //category 는 한번만 조회
    useEffect(async ()=>{
        
        setLoading(true)
        const {data} = await axios.get('category/list')
        data && data.forEach(elem => {
            if(elem.id == 1){
                elem.focus = true
            }else{
                elem.focus = false
            }
        });

        setCategoryList(data)
        setLoading(false)

    }, [])

    /**
     * === [Board List Start] ======================================================
     */

    //curr Category - 초기값 : id:1
    const [currCategoryId, setCurrCategoryId] = useState(1)
    const [boardList, setBoardList] = useState([])
    useEffect(async ()=>{
        const {data} = await axios.get('board/list', {params:{inqType:'1', id:currCategoryId}})
        setBoardList(data)
        setLoading(false)
    }, [currCategoryId])

    /**
     * === [event] ======================================================
     */

    //Category 변경 이벤트 처리
    const itemClick = function(item, items){

        let targetId;
        items.forEach((i)=>{
            if(item.id != i.id){
                i.focus = false;
            }else{
                i.focus = true;
                targetId = i.id
            }
        })
        
        if(targetId >= 0){
            console.log('target ID changed!!!');
            setBoardList(null) //리스트 초기화
            setCurrCategoryId(targetId) //Category 변경
            setLoading(true)
        }
        
    }
    
    return (
        <BaseLayout loadingProp={loadingProp}>

            <TopMenu items={categoryList} itemClick={itemClick}></TopMenu>

            {console.log('[render] boardList => ', boardList)}
            {boardList && boardList.map((item, i) => {
                return <div style={{padding:'15px 10px'}} key={item.cid} >{item.title}</div>
            })}

        </BaseLayout>
    )

}