import { css } from "@mui/material"

import { useEffect, useLayoutEffect, useRef, useState, useContext } from "react"
import { BookPageMainContext } from "@/Components/MainPageComponents/BookPageMain"

import {Button} from "@mui/material"



/** @jsxImportSource @emotion/react */
export default function RearrangeButton({
    /* boolean */ isEnglishFirstPosition,
    // /* boolean */ isProcessing=flase,
}) {

    const {
        isSortMode, setIsSortMode,
        isProcessing, setIsProcessing,
    } = useContext(BookPageMainContext)


    const isFirstRenderRef = useRef(true)
    const word0DivRef = useRef(null)
    const word1DivRef = useRef(null)

    const [word0, setWord0] = useState( isEnglishFirstPosition
        ? 'Rearrange'
        : '並び替えをする'
    )
    const [word1, setWord1] = useState( isEnglishFirstPosition
        ? '並び替えをする'
        : 'Rearrange'
    )



    // 「並び替えをする」モードが切り替わった時の処理
    useEffect( () => {
        // 並び替えモードになった時の処理。
        if (isSortMode) {
            setIsProcessing(true)
            return
        }
        // 並び替えモードじゃなくなった時の処理。
        setIsProcessing(false)

    }, [isSortMode] )





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

        if (isEnglishFirstPosition) {
            setWord0('Rearrange')
            setWord1('並び替えをする')
        } else {
            setWord0('並び替えをする')
            setWord1('Rearrange')
        }
    }, [isEnglishFirstPosition] )


    return (<Button
        variant='outlined'
        color='secondary'
        disabled={isProcessing}
        onClick={ e => setIsSortMode(true) }
        css={css`
            text-transform: none;
            line-height: 1.3em;
        `}
    >
        <div>
            <div ref={ word0DivRef }>{ word0 }</div>
            <div ref={ word1DivRef }>{ word1 }</div>
        </div>
    </Button>)
}
