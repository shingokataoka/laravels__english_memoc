import { useEffect, useLayoutEffect, useState, useRef, createRef } from 'react'
import axios from 'axios'

import {css} from '@emotion/react'
import { defaultTheme } from '@/Components/DefaultThemeProvider'

import { LoadingButton } from '@mui/lab'

import BookOrWordBlurContainer from '@/Components/MainPageParts/BookOrWordParts/BookOrWordBlurContainer'




/** @jsxImportSource @emotion/react */
export default function DeleteModeContainer({index, bookOrWords, bookOrWord, bookOrWordDom, isDeleteMode, deleteIndex, setDeleteIndex}) {

    const palette = defaultTheme().palette


    const [cssDisplay, setCssDisplay] = useState('none')
    const [cssOpacity, setCssOpacity] = useState(0)

    const domRef = useRef(null)
    const buttonDomRef = useRef(null)


    // 「削除 実行」を押した時の処理。非同期にDBから対象のbookOrWordを削除する。
    const deleteBookOrWord = async() => {
        if (buttonDomRef.current.disabled === true) return
        // ボタン無効。
        buttonDomRef.current.disabled = true
        // 高さ0へのアニメーションをセット。
        const animateMSec = 1300
        const oldHeight = bookOrWordDom.getBoundingClientRect().height
        bookOrWordDom.animate([
            {height:`${oldHeight}px` },
            {height:0, padding:0, },
        ], animateMSec)
        // 背景色を赤っぽい〜フェードアウトするアニメーション。
        domRef.current.animate([
            { background: palette.warning.main, opacity: 0.8 },
            { background: palette.warning.main, opacity: 0 },
        ], animateMSec)


        // bookOrWordsから削除してレンダリング。（アニメーション終了後にセット）。
        const timeoutObj = setTimeout( () => {
            bookOrWords.splice(index, 1)
            buttonDomRef.current.disabled = false
            setDeleteIndex(index)
        }, animateMSec)

        // DBのレコードを削除。
        try {
            const res = await axios.request({
                method: 'delete',
                url: route('api.book.delete', {book_id: bookOrWord.id})
            })
        } catch (error) {
            console.log('失敗: ', error.data)
        }

         return () => {
            clearTimeout(timeoutObj)
         }
    }



    // 「削除実行」アニメーション後のuseState処理。
    useEffect( () => {
        if (deleteIndex !== index) return
        setDeleteIndex(null)
    }, [deleteIndex] )



    // 削除モード切り替え時の表示、非表示とアニメーションの処理。
    useEffect( () => {
        let timeoutObj0
        let timeoutObj1
        // フェードインの表示のアニメーションの処理。
        if (isDeleteMode) {
            setCssDisplay('flex')
            timeoutObj0 = setTimeout( () => { setCssOpacity(1) }, 1)
        // フェードアウトの表示のアニメーションの処理。
        } else {
            setCssOpacity(0)
            timeoutObj1 = setTimeout( () => { setCssDisplay('none') }, 250)
        }
        // クリーンアップ処理。
        return () => {
            clearTimeout(timeoutObj0)
            clearTimeout(timeoutObj1)
        }
    }, [isDeleteMode] )





    // ボタンにアニメーション（ループ）。
    useLayoutEffect( () => {
        // ボタンにアニメーション（ループ）。
        buttonDomRef.current.animate([
            {opacity: 0.7},
            {opacity: 1},
            {opacity: 0.7},
        ], {
            duration: 1450,
            iterations: Infinity,
        })
    }, [] )






    return (<BookOrWordBlurContainer
        ref={domRef}
        css={css`
            transition: opacity 0.2s;
            opacity: ${cssOpacity};
            display: ${cssDisplay};
            align-items: center;
            padding-left: 12px;
        `}
    >

        <LoadingButton
            ref={buttonDomRef}
            variant="contained"
            color="warning"
            onClick={ deleteBookOrWord }
        >削除<br />実行</LoadingButton>

    </BookOrWordBlurContainer>)
}
