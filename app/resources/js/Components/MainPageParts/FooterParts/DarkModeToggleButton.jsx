import axios from 'axios'

import { useEffect, useLayoutEffect, useRef, useState, useContext } from "react"
import { BookPageMainContext } from "@/Components/MainPageComponents/BookPageMain"

import { css } from "@mui/material"

import {LoadingButton} from '@mui/lab'
import { usePage } from "@inertiajs/react"



/** @jsxImportSource @emotion/react */
export default function DarkModeButton() {

    const {
        isEnglishFirstPosition,
        isProcessing, setIsProcessing,
    } = useContext(BookPageMainContext)

    const [isLoading, setIsLoading] = useState(false)

    const user_setting = usePage().props.user_setting
    let darkOrLightEnglish =(user_setting.is_dark)? 'Light' : 'Dark'
    let darkOrLightJapanese =(user_setting.is_dark)? 'ライト' : 'ダーク'

    const isFirstRenderRef = useRef(true)
    const word0DivRef = useRef(null)
    const word1DivRef = useRef(null)

    const [word0, setWord0] = useState( isEnglishFirstPosition
        ? `${darkOrLightEnglish} mode`
        : `${darkOrLightJapanese}モードにする`
    )
    const [word1, setWord1] = useState( isEnglishFirstPosition
        ? `${darkOrLightJapanese}モードにする`
        : `${darkOrLightEnglish} mode`
    )


    // ボタンのword0とword1のテキストを設定する処理。
    const changeWord0AndWord1 = () => {
        darkOrLightEnglish =(user_setting.is_dark)? 'Light' : 'Dark'
        darkOrLightJapanese =(user_setting.is_dark)? 'ライト' : 'ダーク'

        if (isEnglishFirstPosition) {
            setWord0(`${darkOrLightEnglish} mode`)
            setWord1(`${darkOrLightJapanese}モードにする`)
        } else {
            setWord0(`${darkOrLightJapanese}モードにする`)
            setWord1(`${darkOrLightEnglish} mode`)
        }
    }

    // 「英語⇄日本語」ボタンを押した時の入替のアニメーションと処理。
    useLayoutEffect( () => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false
            return
        }
        const word0DivRect = word0DivRef.current.getBoundingClientRect()
        const word1DivRect = word1DivRef.current.getBoundingClientRect()

        const word0DivDiffY = word0DivRect.height
        const word1DivDiffY = word0DivRect.height * -1

        word0DivRef.current.animate([
            { transform: `translate(0, ${word0DivDiffY}px)` },
            { transform: `translate(0, 0)` },
        ], 100)
        word1DivRef.current.animate([
            { transform: `translate(0, ${word1DivDiffY}px)` },
            { transform: `translate(0, 0)` },
        ], 100)
        // ボタンのword0とword1のテキストを設定する処理。
        changeWord0AndWord1()

    }, [isEnglishFirstPosition] )




    // 「ダークorライトモードにする」ボタンを押した処理。
    // バックグラウンドでダークorライトモードを切り替えて、このページにページ遷移。
    const handleClick = async () => {
        setIsProcessing(true)
        setIsLoading(true)
        user_setting.is_dark =(user_setting.is_dark)? 0 : 1
        // ボタンのword0とword1のテキストを設定する処理。
        changeWord0AndWord1()

        try {
            const response = await axios.request({
                url: route('api.user_setting.update', {user_setting: user_setting.id}) ,
                method: 'put',
                data: user_setting,
            })

        } catch(error) {
            alert('すいません。ダークモードorライトモードの保存に失敗しました。\r\n'
                + 'インターネット接続が途切れている可能性があります。\r\n'
                + 'インターネット接続ができる環境で試してみてください。'
            )
        }
        setIsProcessing(false)
        setIsLoading(false)
    }


    return (<LoadingButton
        variant='outlined'
        color='secondary'
        loading={isLoading}
        disabled={isProcessing}
        onClick={ handleClick }
        css={css`
            text-transform: none;
            line-height: 1.3em;
        `}
    >
        <div>
            <div ref={ word0DivRef }>{ word0 }</div>
            <div ref={ word1DivRef }>{ word1 }</div>
        </div>
    </LoadingButton>)
}
