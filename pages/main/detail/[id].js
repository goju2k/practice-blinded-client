import styles from '/styles/main/detail/Detail.module.css'

import BaseLayout from '/components/layout/BaseLayout.js'

//api
import axios from '/modules/axios'

//hook
import { useState, useEffect } from 'react';

//router
import { useRouter } from 'next/router'

//util
import DateUtil from '/modules/util/Date.js'

export default function MainDetail() {

    const router = useRouter()
    console.log('[MainDetail] start', router.query)
    /**
     * === [Loading Start] ======================================================
     */
    const [loading, setLoading] = useState(false)
    const loadingProp = {loading, setLoading}

    /**
     * === [Deatail Start] ======================================================
     */
     const [detail, setDetail] = useState(null)
    useEffect(async ()=>{

        setLoading(true)
        let {data} = await axios.get('board/detail', {params:{id:router.query.id}})

        if(data){
            Object.assign(data, JSON.parse(router.query.ct))
            data.ok = true
            
        }else{
            data = {ok:false}
        }
        
        console.log('[MainDetail] detail data', data);

        setDetail(data)
        setLoading(false)
        
    }, [])

    const backClick = () => {
        router.back()
    }

    return (
        <BaseLayout loadingProp={loadingProp}>
            {detail && (detail.ok ?
            <div className={styles.main}>

                {/** 상단 메뉴 **/}
                <div className='justBetween topPanel'>
                    <div className='justStart'>
                        <div className={styles.leftArrow} onClick={backClick}></div><div className={'font8 '+styles.logo}>{'blinded'}</div>
                    </div>
                    <div className='justEnd'>
                        <div>{'ㅁ'}</div><div>{'^'}</div><div>{'...'}</div>
                    </div>
                </div>

                {/** 타이틀 **/}
                <div className='font10'>{detail.title}</div>

                {/** 소속 / 닉네임 **/}
                <div className='justStart font3'>
                    <div>{detail.group}</div><div>{detail.nick}</div>
                </div>

                {/** 시간 **/}
                <div className='font3'>{DateUtil.getTimeToApxText(detail.time)}</div>

                {/** 본문 구분선 상단 **/}
                <div className={styles.divContent}></div>

                {/** 본문 **/}
                <div className='wsPre font6'>{detail.content}</div>

                {/** 태그 **/}
                <div className='justStart font6'>
                {detail.tags.map((el, i)=>{
                    return <div className='link' key={i}>{el}</div>
                })}
                </div>
                
                {/** 광고 **/}
                <div className='font6'>{'내 듀오 가입비 5초 확인!!!'}</div>

                {/** 반응 / 공유 **/}
                <div className='justAround font5'>
                    <div>{'좋아요'}</div><div>{'댓글'}</div><div>{'공유하기'}</div>
                </div>

                {/** 본문 구분선 하단 **/}
                <div className={styles.divContent}></div>

                {/** 연관회사 **/}
                <div className='font6'>
                    <div>{'연관 회사'}</div>
                    <div>{'XXX웹툰'}</div>
                </div>

                {/** 댓글 입력창 **/}
                <div className='font6'>
                    <input className={styles.replyInput} placeholder="댓글을 남겨주세요." />
                </div>

                {/** 댓글 디스플레이 **/}
                <div className='font6'>
                    {detail.replyList.map(elem => {
                        return <div><div className={styles.divContent}></div><div key={elem.id} className={styles.replyView} placeholder="댓글을 남겨주세요.">{elem.content}</div></div>
                    })}
                </div>

            </div>
            :<div className='justCenter' style={{width:'100%',height:'100vh',border:'1px solid gray', padding:'20px'}}>No Data</div>
            )}

        </BaseLayout>
    )
}