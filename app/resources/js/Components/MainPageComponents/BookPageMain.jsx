import React, { useEffect, useState, useRef, createRef, createContext} from 'react'

import {css} from '@emotion/react'

import UpBalloon from '@/Components/MainPageComponents/UpBalloon'
import UpBalloon2 from '@/Components/UpBalloon2'
import WebSpeachApiVoices from '@/Components/WebSpeachApiVoices'

import {Stack} from '@mui/material'
import BookPageFooter from '@/Components/MainPageComponents/BookPageFooter'
import BookPageFooterProfileLinks from '@/Components/MainPageComponents/BookPageFooterProfileLinks'
import BookOrWord from '@/Components/MainPageParts/BookOrWord'
import SortConfirmContainer from '@/Components/MainPageParts/SortConfirmContainer'
import SortCompletedModal from '@/Components/MainPageParts/SortCompletedModal'
import DeleteModeExitContainer from '../MainPageParts/DeleteModeExitContainer'


export const BookPageMainContext = createContext()





/** @jsxImportSource @emotion/react */
export default React.memo( function BookPageMain(props){
    const {currentBookId, bookOrWords, isEnglishFirstPosition, isShowAllAnswer, isProcessing, setIsProcessing} = props

    const [upBalloonProps, setUpBalloonProps] = useState({
        showStatus: 'none',   // 表示管理。'none'、'processing'=表示準備中(座標計算など)、'show'
        x: 0,   // 絶対座標。表示位置。矢印の先端がこの位置になる。
        y: 0,   // 絶対座標。表示位置。矢印の先端がこの位置になる。
        jsx: <>バルーンの中身JSX</>,  // バルーン内に表示するSJXを指定。
    })


    const bookPageMainDomRef = useRef(null)


    const [voices, setVoices] = useState([]) /* BookOrWordコンポーネントに渡す。 */

    const bookOrWordsRef = useRef([])
    const bookOrWordDomRefsRef = useRef([])

    const [isSortMode, setIsSortMode] = useState(false)
    const [isSortCompleted, setIsSortCompleted] = useState(false)
    const [replacementIndex0, setReplacementIndex0] = useState(null)
    const [replacementIndex1, setReplacementIndex1] = useState(null)

    const [isDeleteMode, setIsDeleteMode] = useState(false)
    const [deleteIndex, setDeleteIndex] =  useState(null)

    // DBからのbook_or_wordsの各レコードに以下を持たせる。
    //「日本語を隠す」切替用の変数を追加したのを、useRef変数に入れる。
    useEffect(() => {
        bookOrWords.map( bookOrWord => {
            // DBからの「日本語を隠す」切り替え用変数の値を入れたキーを追加。
            bookOrWord.isShowAnswer = isShowAllAnswer
            bookOrWordsRef.current.push(bookOrWord)
        } )
    }, [])


    // 各BookOrWordのdomのRefを入れた配列を作成。
    bookOrWordsRef.current.map( (row, index) => {
        if (index in bookOrWordDomRefsRef.current) return
        bookOrWordDomRefsRef.current[index] = createRef(null)
    } )





    return (<>
    <WebSpeachApiVoices voices={voices} setVoices={setVoices} />
    <UpBalloon2
        upBalloonProps={upBalloonProps}
        setUpBalloonProps={setUpBalloonProps}
    />
    <Stack
        ref={bookPageMainDomRef}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        css={css`
            margin: 0 auto;
            max-width: 500px;
            padding:0 4px;
            position: relative;
        `}
    >
        {/* <UpBalloon
            bookPageMainDomRef={bookPageMainDomRef}
            upBalloonProps={upBalloonProps}
            setUpBalloonProps={setUpBalloonProps}
            voices={voices}
        /> */}

        { bookOrWordsRef.current.map((bookOrWord, index) => (
            <React.Fragment key={index}>
                <BookOrWord
                    ref={bookOrWordDomRefsRef.current[index]}
                    isEnglishFirstPosition={isEnglishFirstPosition}
                    isShowAllAnswer={isShowAllAnswer}
                    bookOrWordDomRefs={bookOrWordDomRefsRef.current}
                    index={index}
                    replacementIndex0={(replacementIndex0 === index)? index : null }
                    replacementIndex1={(replacementIndex1 === index)? index : null}
                    setReplacementIndex0={setReplacementIndex0}
                    setReplacementIndex1={setReplacementIndex1}
                    deleteIndex={ (deleteIndex === index)? deleteIndex : null }
                    setDeleteIndex={setDeleteIndex}
                    bookOrWords={bookOrWordsRef.current}
                    bookOrWord={bookOrWord}
                    voices={voices}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                    isSortMode={isSortMode}
                    isDeleteMode={isDeleteMode}
                    upBalloonProps={upBalloonProps}
                    setUpBalloonProps={setUpBalloonProps}
                />

            </React.Fragment>)

        ) }


        <BookPageMainContext.Provider value={{
            isEnglishFirstPosition,
            isSortMode, setIsSortMode,
            isDeleteMode, setIsDeleteMode,
            isProcessing, setIsProcessing,
        }}>
            <BookPageFooter
                currentBookId={currentBookId}
                isEnglishFirstPosition={isEnglishFirstPosition}
                bookOrWords={bookOrWordsRef.current}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
            />

            <BookPageFooterProfileLinks
                currentBookId={currentBookId}
                isEnglishFirstPosition={isEnglishFirstPosition}
                bookOrWords={bookOrWordsRef.current}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
            />

        </BookPageMainContext.Provider>

    </Stack>


    <SortConfirmContainer
        bookOrWords={bookOrWordsRef.current}
        isSortMode={isSortMode}
        setIsSortMode={setIsSortMode}
        setIsSortCompleted={setIsSortCompleted}
    />

    <DeleteModeExitContainer
        isDeleteMode={isDeleteMode}
        setIsDeleteMode={setIsDeleteMode}
    />

    <SortCompletedModal
        isSortCompleted={isSortCompleted}
        setIsSortCompleted={setIsSortCompleted}
    />

    </>)
} )




