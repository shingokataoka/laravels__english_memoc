import { useLayoutEffect, useRef, useState, useContext } from "react"
import { BookPageMainContext } from "@/Components/MainPageComponents/BookPageMain"

import { css } from "@mui/material"

import {Link} from '@inertiajs/react'
import {LoadingButton} from '@mui/lab'



/** @jsxImportSource @emotion/react */
export default function ProfileLinkButton() {

    const {
        isEnglishFirstPosition,
        isProcessing,
    } = useContext(BookPageMainContext)

    const isFirstRenderRef = useRef(true)
    const word0DivRef = useRef(null)
    const word1DivRef = useRef(null)

    const [word0, setWord0] = useState( isEnglishFirstPosition
        ? `Edit profile`
        : `プロフィール編集`
    )
    const [word1, setWord1] = useState( isEnglishFirstPosition
        ? `プロフィール編集`
        : `Edit profile`
    )


    // ボタンのword0とword1のテキストを設定する処理。
    const changeWord0AndWord1 = () => {
        if (isEnglishFirstPosition) {
            setWord0(`Edit profile`)
            setWord1(`プロフィール編集`)
        } else {
            setWord0(`プロフィール編集`)
            setWord1(`Edit profile`)
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





    return (<LoadingButton
        variant='outlined'
        color='secondary'
        disabled={isProcessing}
        component={Link}
        href={ route('profile.edit') }
        css={css`
            text-transform: none;
            line-height: 1.3em;
            text-align: center;
        `}
    >
        <div>
            <div ref={ word0DivRef }>{ word0 }</div>
            <div ref={ word1DivRef }>{ word1 }</div>
        </div>
    </LoadingButton>)
}
