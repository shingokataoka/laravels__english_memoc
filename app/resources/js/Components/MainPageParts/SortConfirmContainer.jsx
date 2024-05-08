import {useEffect, useRef, useState} from 'react'
import axios from 'axios'

import {css} from '@emotion/react'

import { LoadingButton } from '@mui/lab'




/** @jsxImportSource @emotion/react */
export default function SortConfirmContainer({bookOrWords, isSortMode, setIsSortMode, setIsSortCompleted}) {

    const [isLoading, setIsLoading] = useState(false)
    const domRef = useRef(null)



    // 並びを「確定する」ボタンを押した時の処理。
    // 全てのbookOrWordのsortOrderを順番に直して、DBに上書き保存する。
    const confirmSortOrder = async () => {
        // ボタンを読み込み中にする。
        setIsLoading(true)

        // まずsort_order_numberを振り直す。
        let i = 1
        bookOrWords.map( (bookOrWord, index) => {
            bookOrWord.sort_order_number = i++
        } )

        // DBに保存する。
        try {
            const response = await axios.request({
                method: 'patch',
                url: route('api.book.all_sort_update'),
                data: {bookOrWords},
            })
            // 並び替え完了表示のコンポーネントを表示する。
            setIsSortCompleted(true)
        } catch (error) {
            alert('すいません。並び替えの保存に失敗しました。\r\n'
                + 'インターネット接続が途切れている可能性があります。\r\n'
                + 'インターネット接続ができる環境で試してみてください。'
            )
        }

        // ボタンの読み込み中を解除する。
        setIsLoading(false)
        // 並び替えモードを終了する。
        setIsSortMode(false)
    }


    // 並び替えモードに切り替え時の処理。
    // 表示アニメーションをセットする。
    useEffect( () => {
        if (!isSortMode) return

        domRef.current.animate([
            {opacity: 0},
            {opacity: 1},
        ], 100)

    }, [isSortMode])





    if (!isSortMode) return ('')

    return (<LoadingButton
        ref={domRef}
        variant="contained"
        color="secondary"
        loading={isLoading}
        onClick={ confirmSortOrder }
        css={css`
            position: fixed;
            bottom: 40%;
            right: max( calc(50% - 250px + 24px), 24px );
            min-width: 0;
            padding: 16px;
            writing-mode: vertical-rl;
        `}
    >
        確定する
    </LoadingButton>)
}
