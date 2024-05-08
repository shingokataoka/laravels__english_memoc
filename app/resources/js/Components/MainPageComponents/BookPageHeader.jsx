import {useState, useRef, useLayoutEffect} from 'react'

import {css} from '@emotion/react'
import { defaultTheme } from '@/Components/DefaultThemeProvider'

import {Stack} from '@mui/material'

import ShowAllAnswerToggleButton from '@/Components/MainPageParts/HeaderParts/ShowAllAnswerToggleButton'
import BreadCrumbNavigation from '@/Components/MainPageParts/HeaderParts/BreadCrumbNavigation'
import EnglishPositionToggleButton from '@/Components/MainPageParts/HeaderParts/EnglishPositionToggleButton'
import Nl2br from '@/Functions/Nl2br'




/** @jsxImportSource @emotion/react */
export default function BookPageHeader({
    /* obj */ book,
    /* obj */ booksOfBreadCrumb,

    /* useState boolean */ isEnglishFirstPosition,
    /* useState setFunction */ setIsEnglishFirstPosition,
    /* useState boolean */ isShowAllAnswer,
    /* useState setFunction */ setIsShowAllAnswer,

}) {
    const isFirstRenderRef = useRef(true)

    const palette = defaultTheme().palette

    const word0DivRef = useRef(null)
    const word1DivRef = useRef(null)


    // 「英語⇄日本語」で合う方のowrd0をセット。
    const [word0, setWord0] = useState(
        isEnglishFirstPosition? book.english_word : book.japanese_word
    )
    // 「英語⇄日本語」で合う方のowrd01をセット。
    const [word1, setWord1] = useState(
        isEnglishFirstPosition? book.japanese_word : book.english_word
    )


    useLayoutEffect( () => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false
            return
        }
        // 移動前のword0とword1のサイズ・座標系を取得。
        const word0Rect = word0DivRef.current.getBoundingClientRect()
        const word1Rect = word1DivRef.current.getBoundingClientRect()

        // 入れ替え後（レンダリング後）からみての移動差分Yを算出。
        const word0DiffY = word0Rect.height
        const word1DiffY = word1Rect.height * -1

        // 移動アニメーションをセット。
        word0DivRef.current.animate([
            { transform: `translate(0px, ${word0DiffY}px)` },
            { transform: `translate(0px, 0px)` },
        ], 100)
        word1DivRef.current.animate([
            { transform: `translate(0px, ${word1DiffY}px)` },
            { transform: `translate(0px, 0px)` },
        ], 100)

        // 英語と日本語を入れ替え。
        if ( isEnglishFirstPosition ) {
            setWord0(book.english_word)
            setWord1(book.japanese_word)
        } else {
            setWord0(book.japanese_word)
            setWord1(book.english_word)
        }

    }, [isEnglishFirstPosition] )



    return (<Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        css={css`
            padding: 8px 0 ;
        `}
    >

        <BreadCrumbNavigation
            isEnglishFirstPosition={ isEnglishFirstPosition }
            booksOfBreadCrumb={ booksOfBreadCrumb }
        />

        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
        >

            <h1 css={css`
                font-weight: bold;
                text-align: center;
            `}>
                <div ref={word0DivRef}>{ Nl2br(word0) }</div>
                <div ref={word1DivRef}>{ Nl2br(word1) }</div>
            </h1>
        </Stack>


        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0}
        >
            <EnglishPositionToggleButton
                isEnglishFirstPosition={isEnglishFirstPosition}
                setIsEnglishFirstPosition={ setIsEnglishFirstPosition }
                css={css` margin-right: 2px; `}
            />
            <ShowAllAnswerToggleButton
                isEnglishFirstPosition={isEnglishFirstPosition}
                isShowAllAnswer={ isShowAllAnswer }
                setIsShowAllAnswer={setIsShowAllAnswer}
            />

        </Stack>
    </Stack>)
}
