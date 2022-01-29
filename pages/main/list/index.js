//css
import styles from '/styles/main/list/List.module.css'

//components
import BaseLayout from '/components/layout/BaseLayout.js'
import TopMenu from '/components/menu/TopMenu.js'

//api
import api from '/modules/api'
import axios from 'axios'

//hook
import { useState, useEffect } from 'react';

export default function MainList() {
    
    console.log('[MainList] start');

    //category 초기화
    const [categoryList, setCategoryList] = useState()
    let data = api.get('/category/list')
    if(data && categoryList != data){
        
        data && data.forEach(elem => {
            if(elem.id == 1){
                elem.focus = true
            }else{
                elem.focus = false
            }
        });

        setCategoryList(data)
    }

    //boardList 초기화
    const [boardList, setBoardList] = useState()
    console.log('boardList => ',boardList);
    if(boardList === undefined){
        //setBoardList(api.get('/board/list'))
    }
    
    const itemClick = function(item, items, setItems){

        let targetId

        console.log('click item => ',item);
        console.log('click item list => ',items);

        items.forEach((i)=>{
            if(item.id != i.id){
                i.focus = false;
            }else{
                i.focus = true;
                targetId = i.id
            }
        })
        api.get('/category/list')
        if(targetId >= 0){
            axios.get('/api/board/list',  {params: {inqType:'1', id:targetId}}).then((res)=>{
                setBoardList(res.data)
            })
        }
        setItems([...items])

    }
    
    return (
        <BaseLayout>

          <TopMenu initItems={data} itemClick={itemClick}></TopMenu>
          {console.log('[render] boardList => ', boardList)}
          {!boardList ? <div style={{padding:'15px 10px'}}>loading...</div> : boardList.map((item, i) => {
                return <div style={{padding:'15px 10px'}} key={item.cid} >{item.title}</div>
            })}

        </BaseLayout>
    )

}