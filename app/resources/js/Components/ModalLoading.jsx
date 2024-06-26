import {css} from '@emotion/react'

import { Stack } from '@mui/material'
import { useState, useRef, useEffect, useLayoutEffect } from 'react'





/** @jsxImportSource @emotion/react */
export default function ModalLoading({
    /* boolean */ isShow,
    /* string */ text = 'solid',
}) {
    const stackDomRef = useRef(null)
    const iconDomRef = useRef(null)
    const textDomRef = useRef(null)
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [display, setDisplay] = useState('none')



    // 表示切り替え時のフェードイン・フェードアウトのアニメーションをセット。
    useLayoutEffect( () => {
        //  初回レンダリングなら処理しない。
        if (isFirstRender) return

        // アニメーションのため表示しておく必要がある。
        // （フェードインでもフェードアウトでも）
        setDisplay('flex')

        // フェードインなら 0, 1。
        // フェードアウトなら 1, 0。
        const startOpacity =(isShow)? 0 : 1
        const endOpacity =(isShow)? 1 : 0

        // アニメーションをセット。
        stackDomRef.current.animate([
            {opacity: startOpacity},
            {opacity: endOpacity},
        ], 200)

        // フェードアウトなら、アニメーション後に非表示にする。
        let timeoutObj = null
        if (!isShow) {
            timeoutObj = setTimeout( () => {
                setDisplay('none')
            }, 150)
        }

        // クリーンアップ。
        return () => { clearTimeout(timeoutObj) }
    }, [isShow])



    // ローディングアイコンの回転アニメーションをセット。
    useLayoutEffect( () => {
        iconDomRef.current.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ], {
            duration: 1200,
            iterations: Infinity,
        })
    }, [])



    // テキストのゆっくり点滅のアニメーションをセット。
    useLayoutEffect( () => {
        textDomRef.current.animate([
            {opacity: 0.5},
            {opacity: 1},
            {opacity: 0.5},
        ],{
            duration: 1500,
            iterations: Infinity,
        })
    }, [])



    // 初回レンダリング済にする。
    useEffect( () => {
        setIsFirstRender(false)
    }, [])



    return (<Stack
        ref={stackDomRef}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        css={css`
            position: fixed;
            top: 0;
            left: 0;
            display: ${display};
            width: 100%;
            height: 100%;
            background: #0008;
            z-index: 1000;
        `}
    >
        <div
            ref={iconDomRef}
            css={css`
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 3px #c8c8c8 solid;
                border-right-color: #ddd3;
            `}
        />

        <div
            ref={textDomRef}
            css={css` color: #d8d8d8; `}
        >{text}</div>
    </Stack>)


}
