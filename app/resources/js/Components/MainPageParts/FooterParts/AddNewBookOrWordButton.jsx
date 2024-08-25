import { LoadingButton } from "@mui/lab"
import { css } from "@mui/material"
import {defaultTheme} from '@/Components/DefaultThemeProvider'

import { Button } from "@mui/material"
import { useLayoutEffect, useRef, useState } from "react"





/** @jsxImportSource @emotion/react */
export default function AddNewBookOrWordButton({
    /* numeric */ currentBookId,
    /* boolean */ isEnglishFirstPosition,
    /* string */ englishLabel,
    /* string */ japaneseLabel,
    /* ステートのboolean */ isProcessing=false,
    /* 上記ステートのset関数 */ setIsProcessing,
    /* 0 or 1 */ addTypeIsBook,
    /* useRefの配列で、book_or_wordsのレコード群 */ bookOrWords,
}) {
    const palette = defaultTheme().palette

    const isFirstRenderRef = useRef(true)
    const word0DivRef = useRef(null)
    const word1DivRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false)

    const [word0, setWord0] = useState( isEnglishFirstPosition
        ? englishLabel
        : japaneseLabel
    )
    const [word1, setWord1] = useState( isEnglishFirstPosition
        ? japaneseLabel
        : englishLabel
    )



    const addBookOrWord = () => {
        // bookOrWordsが15個以上なら追加できない表示をして、処理しない。
        if (bookOrWords.length >= 15) {
            alert('一つの本に追加できるのは15個までです。')
            return
        }

        setIsProcessing(true)
        setIsLoading(true)
        // 追加するレコードを作成。idは仮で0にしとく。
        const newBookOrWord = {
            id: 0,
            book_id: currentBookId,
            sort_order_number: bookOrWords.length + 1,
            type_is_book: addTypeIsBook,
            english_word: '',
            japanese_word: '',
        }

        // 追加を送信
        axios.request({
            method: 'post',
            url: route('api.book.store'),
            data: newBookOrWord,
        // 追加保存に成功後の処理。
        }).then(res => {
            // 追加して返ってきたDBのレコードをbookOrWordsに追加する。
            const newBookOrWord = res.data
            newBookOrWord.isShowAnswer = true
            bookOrWords.push(newBookOrWord)

            // 「送信処理中」と「ボタン無効」を終了する。
            setIsProcessing(false)
            setIsLoading(false)
        }).catch(error => {
            alert('すいません。会話または本の追加に失敗しました。\r\n'
                + 'インターネット接続が途切れている可能性があります。\r\n'
                + 'インターネット接続ができる環境で試してみてください。'
            )
        })
    }




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
            setWord0(englishLabel)
            setWord1(japaneseLabel)
        } else {
            setWord0(japaneseLabel)
            setWord1(englishLabel)
        }
    }, [isEnglishFirstPosition] )





    return (<LoadingButton
        variant='outlined'
        color='secondary'
        disabled={isProcessing}
        loading={isLoading}
        // bookOrWordsが15個以上ならクリック時の波紋を非表示にする。
        disableRipple={bookOrWords.length >= 15}
        css={css`
            text-transform: none;
            line-height: 1.3em;
            ${/* bookOrWordsが15個以上ならdisabledな見た目にする。*/
                (bookOrWords.length >= 15)
                    ? `
                        color: ${palette.text.disabled};
                        border-color: ${palette.text.disabled};
                        // hover時の色を消す。
                        &:hover {
                            background: none;
                            border-color: ${palette.text.disabled};
                        }
                    `
                    : ''
            }
        `}
        onClick={ e => addBookOrWord() }
    >
        <div>
            <div ref={ word0DivRef }>{ word0 }</div>
            <div ref={ word1DivRef }>{ word1 }</div>
        </div>
    </LoadingButton>)
}
