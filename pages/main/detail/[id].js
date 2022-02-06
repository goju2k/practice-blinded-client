import styles from '/styles/main/detail/Detail.module.css'

import BaseLayout from '/components/layout/BaseLayout.js'

//api
import axios from '/modules/axios'

//hook
import { useState, useEffect } from 'react';

//router
import { useRouter } from 'next/router'

const testreplay = []
for(let i = 0 ; i < 50 ; i++){
    testreplay.push(i)
}

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
        const {data} = await axios.get('board/detail', {params:{id:router.query.id}})
        setDetail(data)
        setLoading(false)
        
    }, [])

    const backClick = () => {
        router.back()
    }

    return (
        <BaseLayout loadingProp={loadingProp}>

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
                <div className='font10'>{'오늘의웹툰 백엔드 개발자 형들 상담좀 해줄수있을까'}</div>

                {/** 소속 / 닉네임 **/}
                <div className='justStart font3'>
                    <div>{'삼성전자'}</div><div>{'닉닉닉'}</div>
                </div>

                {/** 시간 **/}
                <div className='font3'>{'9분'}</div>

                {/** 본문 구분선 상단 **/}
                <div className={styles.divContent}></div>

                {/** 본문 **/}
                <div className='wsPre font6'>{'상담해줄 수 있는 웹툰 백엔드 개발자 형들 있을까?\n\n도메인이 달라서 내가 가진 경험을 어떤식으로 어필하는게 좋을지 고민인데.. 혼자 머리 싸매고 있어봐야 답이 없는것같아\n\n작은조언이라도 너무 도움이 될 것 같아\n부탁할게!'}</div>

                {/** 태그 **/}
                <div className='link font6'>{'#XXX웹툰'}</div>

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
                    {testreplay.map(elem => {
                        return <div><div className={styles.divContent}></div><div key={elem} className={styles.replyView} placeholder="댓글을 남겨주세요.">{'댓글 '+elem}</div></div>
                    })}
                </div>

            </div>

        </BaseLayout>
    )
}