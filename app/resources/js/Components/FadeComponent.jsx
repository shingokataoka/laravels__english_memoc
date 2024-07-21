import {useEffect, memo} from 'react'

import {css} from '@emotion/react'



/** @jsxImportSource @emotion/react */
export default memo(FadeComponent)


function FadeComponent({
    // 表示を管理するステータス。'fade-in'、'fade-out'、'none'、'show'。
    showStatus,
    // 上記useStateのセット関数。
    setShowStatus,
    // フェードイン アニメのミリ秒時間。
    fadeMSec = 250,
    children,
}) {

    // 要素を表示するかを返す関数。
    const isShowDom = () => {
        if (showStatus === 'show') return true
        else if (showStatus === 'fade-in') return true
        else if (showStatus === 'fade-out') return true
        return false
    }


    // opacityを0にするかを返す関数。
    const isOpacity0 = () => {
        if (showStatus === 'none') return true
        else if (showStatus === 'fade-out') return true
        return false
    }



    // showStatusが変わった時の処理。
    useEffect( () => {
        // フェードインの処理。
        if (showStatus === 'fade-in') {
            // フェードイン後に処理。
            const timeoutObj = setTimeout( () => {
                setShowStatus('show')
                clearTimeout(timeoutObj)
            }, fadeMSec)
        }

        // フェードアウト処理。
        if (showStatus === 'fade-out') {
            // フェードアウト後に非表示にする。
            const timeoutObj = setTimeout( () => {
                setShowStatus('none')
                clearTimeout(timeoutObj)
            }, fadeMSec)
        }
    }, [showStatus])






    return (<div
        css={css`
            visibility: ${isShowDom()? 'visibile' : 'hidden'};
            // overflow: ${isShowDom()? 'auto' : 'hidden'};
            height: ${isShowDom()? '100vh' : 0};
            transition: opacity ${fadeMSec * 0.001}s;
            opacity: ${isOpacity0()? 0: 1};
        `}
    >
       {children}
    </div>)
}
