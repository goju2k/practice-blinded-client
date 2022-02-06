//css
import styles from '/styles/main/list/List.module.css'

//components
import BaseLayout from '/components/layout/BaseLayout.js'
import TopMenu from '/components/menu/TopMenu.js'
import BoardList from '/components/menu/BoardList.js'

//api
import axios from '/modules/axios'

//hook
import { useState, useEffect } from 'react';

//router
import { useRouter } from 'next/router'

export default function MainList() {
    
    const router = useRouter()
    console.log('[MainList] start', router.query);

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
            if(elem.id == router.query.id){
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
    const [currCategoryId, setCurrCategoryId] = useState(router.query.id)
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

        let targetId = -1;
        items.forEach((i)=>{
            if(item.id != i.id){
                i.focus = false;
            }else{
                if(i.focus !== true){
                    targetId = i.id
                }
                i.focus = true;
            }
        })
        
        if(targetId >= 0){
            console.log('target ID changed!!!');
            setBoardList(null) //리스트 초기화
            setCurrCategoryId(targetId) //Category 변경
            setLoading(true)
            //router.push('/main/list/'+targetId)
        }
        
    }

    //boardItemClick 이벤트
    const boardItemClick = function(item){

        router.push({
            pathname: '/main/detail/'+item.id,
            query: { ct: JSON.stringify(item) },
        })

    }
    
    return (
        <BaseLayout loadingProp={loadingProp}>

            <TopMenu items={categoryList} itemClick={itemClick}></TopMenu>

            <BoardList items={boardList} itemClick={boardItemClick}></BoardList>
            
        </BaseLayout>
    )

}