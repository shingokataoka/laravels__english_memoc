import {css} from '@emotion/react'
import { TrendingUpOutlined } from '@mui/icons-material';

import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import axios from 'axios';
import { useState } from 'react';



/** @jsxImportSource @emotion/react */
export default function JaToEnInput()
{

    // 「和単語を入力」の入力文字。
    const [jaInput, setJaInput] = useState('')
    // 「英訳を表示」に表示する文字。
    const [enText, setEnText] = useState('')

    // 「みんなで翻訳extra」とapi通信中ならtrue、通信していないならfalse。
    const [processing, setProcessing] = useState(false)



    // 入力内容を書き換えたらの処理。
    const handleChange = (e) => {
        setJaInput(e.target.value)
    }




    // 「→英訳→」ボタンを押した処理。
    const handleSubmit = async (e) => {
        // 既存のform送信をキャンセルする。
        e.preventDefault()

        // まず通信中にする。
        setProcessing(true)

        try {
            // 非同期通信で「みんなの翻訳extra」から英訳した文字をもらう。
            const res = await axios.post( route('api.translation.japanese_to_english'),
            {
                japaneseText: jaInput,
            } )
            // 受け取った英訳の文字列。
            const enText = res.data

            // 「英訳を表示」に入れる。
            setEnText(enText)

        // 非同期通信失敗の場合。
        } catch(e) {
            setEnText('すいません通信エラーです。\r\nもう一度やり直してください。')
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
                placeholder='和単語を入力'
                value={jaInput}
                onChange={handleChange}
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
                →英訳→
            </LoadingButton>

            <TextField
                multiline
                placeholder='英訳を表示'
                readOnly={true}
                value={enText}
            />
        </form>
    </>)
}
