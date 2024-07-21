import {css} from '@emotion/react'
import { TrendingUpOutlined } from '@mui/icons-material';

import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import axios from 'axios';
import { useState } from 'react';



/** @jsxImportSource @emotion/react */
export default function JaToEnInput()
{

    // 「英単語を入力」の入力文字。
    const [EnInput, setEnInput] = useState('')
    // 「和訳を表示」に表示する文字。
    const [jaText, setJaText] = useState('')

    // 「みんなで翻訳extra」とapi通信中ならtrue、通信していないならfalse。
    const [processing, setProcessing] = useState(false)



    // 「→和訳→」ボタンを押した処理。
    const handleSubmit = async (e) => {
        // デフォルトのform送信の処理をキャンセル。
        e.preventDefault()
        // まず通信中にする。
        setProcessing(true)

        try {
            // 非同期通信で「みんなの翻訳extra」から英訳した文字をもらう。
            const res = await axios.post( route('api.translation.english_to_japanese'),
            {
                englishText: EnInput,
            } )
            // 受け取った英訳の文字列。
            const jaText = res.data

            // 「和訳を表示」に入れる。
            setJaText(jaText)

        // 非同期通信失敗の場合。
        } catch(e) {
            setJaText('すいません通信エラーです。\r\nもう一度やり直してください。')
        }

        // 通信中を解除。
        setProcessing(false)
    }





    return(<>
        <form
            onSubmit={handleSubmit}
            css={css`
                display: flex;
                justify-content: center;
            `}
        >
            <TextField
                placeholder='英単語を入力'
                value={EnInput}
                onChange={ e => setEnInput(e.target.value) }
                inputProps={{
                    maxLength: 45,
                }}
            />

            <LoadingButton
                variant="outlined"
                color="secondary"
                loading={processing}
                type="submit"
                css={css`
                    font-weight: bold;
                    min-width: 95px;
                `}
            >
                →和訳→
            </LoadingButton>

            <TextField
                multiline
                placeholder='和訳を表示'
                readOnly={true}
                value={jaText}
            />
        </form>
    </>)
}
