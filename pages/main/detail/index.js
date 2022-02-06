import styles from '/styles/main/detail/Detail.module.css'

import BaseLayout from '/components/layout/BaseLayout.js'

//hook
import { useState, useEffect } from 'react';

//router
import { useRouter } from 'next/router'

export default function MainDetail() {

    console.log('[MainDetail] start');
    /**
     * === [Loading Start] ======================================================
     */
     const [loading, setLoading] = useState(false)
     const loadingProp = {loading, setLoading}



    return (
        <BaseLayout loadingProp={loadingProp}>

            {/** 상단 메뉴 **/}
            <div>
                <div>
                    <div>{'<'}</div><div>{'blinded'}</div>
                </div>
                <div>
                    <div>{'ㅁ'}</div><div>{'^'}</div><div>{'...'}</div>
                </div>
            </div>

            {/** 타이틀 **/}
            <div>{'웹툰 백엔드 개발자 형들 상담좀 해줄수있을까'}</div>

            {/** 소속 / 닉네임 **/}
            <div>
                <div>{'삼성전자'}</div><div>{'닉닉닉'}</div>
            </div>

            {/** 시간 **/}
            <div>{'9분'}</div>

            {/** 본문 구분선 상단 **/}
            <div></div>

            {/** 본문 **/}
            <div>{'상담해줄 수 있는 웹툰 백엔드 개발자 형들 있을까?\n\n도메인이 달라서 내가 가진 경험을 어떤식으로 어필하는게 좋을지 고민인데.. 혼자 머리 싸매고 있어봐야 답이 없는것같아\n\n작은조언이라도 너무 도움이 될 것 같아\n부탁할게!'}</div>

            {/** 태그 **/}
            <div>{'#XXX웹툰'}</div>

            {/** 광고 **/}
            <div>{'내 듀오 가입비 5초 확인!!!'}</div>

            {/** 반응 / 공유 **/}
            <div>
                <div>{'좋아요'}</div><div>{'댓글'}</div><div>{'공유하기'}</div>
            </div>

            {/** 본문 구분선 하단 **/}
            <div></div>

            {/** 연관회사 **/}
            <div>
                <div>{'연관 회사'}</div>
                <div>{'XXX웹툰'}</div>
            </div>

            {/** 댓글 입력창 **/}
            <div></div>

            {/** 댓글 디스플레이 **/}
            <div>
                <div>댓글1</div>
                <div>댓글2</div>
                <div>댓글3</div>
            </div>

        </BaseLayout>
    )
}