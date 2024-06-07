import React, { useEffect, useState, useRef, createRef, createContext} from 'react'

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

    const [isFirstRender, setIsFirstRender] = useState(true)

    const [apiVoices, setApiVoices] = useState({})
    const [voices, setVoices] = useState([null, null, null, null]) /* BookOrWordコンポーネントに渡す。 */

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




    // web speach apiの英語の声一覧を取得。
    const appendVoices = () => {
        const tmpApiVoices = speechSynthesis.getVoices()
        const tmpVoices = {}
        tmpApiVoices.map(voice => {
            if (voice.lang === 'en-US') tmpVoices[voice.name] = voice
        })
        setApiVoices(tmpVoices)
    }

    useEffect( () => {
        appendVoices()
        speechSynthesis.onvoiceschanged = e => {
            appendVoices()
        }
    }, [])

    useEffect( () => {
        const colors = ['green', 'blue', 'indigo', 'purple']
        const tmpVoices = [...voices]
        let tmpIndex = 2;

        const pushVoice = (voiceName) => {
            if ( !(voiceName in apiVoices) ) return
            if( tmpIndex >= 4) tmpIndex = 0

            const row = {
                voice: apiVoices[voiceName],
                voicePitch: null,
                color: colors[tmpIndex],
            }
            tmpVoices[tmpIndex] = row
            tmpIndex++
        }

        // 初回レンダリング時のみ。isFirstRender
        if (isFirstRender) {
            // デフォの高い音を追加しておく。
            tmpVoices[0] = {
                voice: null,
                voicePitch: 1.4,
                color: colors[0],
            }
            // 最初にデフォルトの音も追加しておく。
            tmpVoices[1] = {
                voice: null,
                voicePitch: null,
                color: colors[1],
            }
        }

        // Macの良い声を取得し追加する。
        pushVoice('Aaron');
        pushVoice('Samantha');
        pushVoice('Nicky');

        // googleChromeの良い声を取得し追加する。
        pushVoice('Google US English');

        // Microsoft Edgeの良い声を取得し追加する。
        pushVoice('Microsoft AvaMultilingual Online (Natural) - English (United States)');
        pushVoice('Microsoft AndrewMultilingual Online (Natural) - English (United States)');
        pushVoice('Microsoft Christopher Online (Natural) - English (United States)');
        pushVoice('Microsoft Ana Online (Natural) - English (United States)');

        setVoices(tmpVoices)
    }, [apiVoices] )



    useEffect(() => { setIsFirstRender(false) }, [isFirstRender])




    return (<>
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
    >
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




