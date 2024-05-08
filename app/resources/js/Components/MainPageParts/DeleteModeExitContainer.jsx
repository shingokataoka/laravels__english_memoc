import {useEffect, useRef, useState} from 'react'
import axios from 'axios'

import {css} from '@emotion/react'

import { LoadingButton } from '@mui/lab'
import { Button } from '@mui/material'



/** @jsxImportSource @emotion/react */
export default function DeleteModeExitContainer({ isDeleteMode, setIsDeleteMode }) {

    const domRef = useRef(null)

    const [isDisplay, setIsDisplay] = useState(false)


// 表示
// isDeleteMode=tureなら
// isDisplay=trueして
// フェードインアニメーションをセット。

// 消す時。
// isDeleteMode=falseなら
// フェードアウトアニメーションをセット。
// アニメーション後にisDisplay=falseにする。



    // 削除モードを「終了する」ボタンを押した時の処理。
    const exitDeleteMode = async () => {
        // 削除モードを解除する。
        setIsDeleteMode(false)

        // フェードアウトアニメーションをセットする。
        const animateMSec = 250
        domRef.current.animate([
            { opacity: 1 },
            { opacity: 0 },
        ], animateMSec)

        // アニメーション後に非表示に切り替える。
        const timeoutObj = setTimeout( () => {
            setIsDisplay(false)
            clearTimeout(timeoutObj)
        }, animateMSec)

    }



    // 表示になった時の処理。
    useEffect( () => {
        if (!isDisplay) return

        // 表示アニメーションをセットする。
        domRef.current.animate([
            {opacity: 0},
            {opacity: 1},
        ], 100)

    }, [isDisplay])




    // 削除モード切り替え時の処理。
    useEffect( () => {

        // 削除モードになった時、表示にする。
        if (isDeleteMode) {
            setIsDisplay(true)
            return
        }

    }, [isDeleteMode] )




    if (!isDisplay) return ('')

    return (<Button
        ref={domRef}
        variant="contained"
        color="secondary"
        onClick={ exitDeleteMode }
        css={css`
            position: fixed;
            bottom: 40%;
            right: max( calc(50% - 250px + 24px), 24px );
            min-width: 0;
            padding: 16px;
            writing-mode: vertical-rl;
        `}
    >
        終了する
    </Button>)
}
