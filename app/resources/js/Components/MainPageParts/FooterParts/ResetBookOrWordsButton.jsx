import {router, usePage} from '@inertiajs/react'

import { css } from "@mui/material"

import { useLayoutEffect, useRef, useState, useContext } from "react"
import { BookPageMainContext } from "@/Components/MainPageComponents/BookPageMain"

import {Button} from "@mui/material"



/** @jsxImportSource @emotion/react */
export default function ResetBookOrWordsButton({
    /* boolean */ isEnglishFirstPosition,
    // /* boolean */ isProcessing=flase,
}) {
    const userId = usePage().props.auth.user.id
    const _token = usePage().props._token

    const {
        isProcessing, setIsProcessing,
    } = useContext(BookPageMainContext)


    const isFirstRenderRef = useRef(true)
    const word0DivRef = useRef(null)
    const word1DivRef = useRef(null)

    const [word0, setWord0] = useState( isEnglishFirstPosition
        ? 'Reset all Books and words'
        : '本棚全てを最初の状態に戻す'
    )
    const [word1, setWord1] = useState( isEnglishFirstPosition
        ? '本棚全てを最初の状態に戻す'
        : 'Reset all Books and words'
    )


    // ボタンを押した時の処理。
    // DBテーブルbook_or_wordsのこのユーザーのレコードを全部消して、デフォルトの見本を作成する。
    const handleClick = e => {
        if ( !confirm(
            '追加した本とセリフが全て消えて、本一覧が初期の状態になります。\r\n'
            + '本当に実行しますか？'
        ) ) return

        // user1ならアラートを出して処理しない。
        if (userId === 1) {
            alert('user1でこの処理はできません。');
            return
        }

        router.visit(
            route('book_or_words.reset'),
            { method: 'delete' }
        )
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

        if (isEnglishFirstPosition) {
            setWord0('Reset all Books and words')
            setWord1('本棚全てを最初の状態に戻す')
        } else {
            setWord0('本棚全てを最初の状態に戻す')
            setWord1('Reset all Books and words')
        }
    }, [isEnglishFirstPosition] )


    return (<Button
        variant='outlined'
        color='warning'
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
    </Button>)
}
