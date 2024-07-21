import React from 'react'

import {css} from '@emotion/react'

import { Stack } from '@mui/material'

import DefaultSpeakingIconButton from '@/Components/MainPageParts/BookOrWordParts/DefaultSpeakingIconButton'
import SlowSpeakingIconButton from '@/Components/MainPageParts/BookOrWordParts/SlowSpeakingIconButton'
import JsxInBalloon from '@/Components/TranslationButtonsAreaComponents/JsxInBalloon'





/** @jsxImportSource @emotion/react */
export default function TranslationJsxInBalloon({
    voices,
    balloonWordData,    // バルーン内jsx用の和訳系データ。
}){


    const {
        word, // 元テキストの英単語、つまりボタンのテキスト。
        balloonWord,  // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
        discription, // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
        japaneseText,    // 辞書にある日本語訳。なければ''にする。
        color,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
    } = balloonWordData


    // グレーの区切り線のcss。
    const hrSubLineCss = css`border-color:#888b;`





    // 和訳の「/」を<hr />改行にしたjsxを作成。
    // const japaneseTranslation =
    const japaneseTextJsx = japaneseText.split(/(\/)/).map((row, index) => {
        return (<React.Fragment key={index}>
            { row.match(/(\/)/)
                ? <hr css={hrSubLineCss} />
                : row
            }
        </React.Fragment>)
    })





    return (<JsxInBalloon>
        <div css={css`text-align:center;`}>
            {balloonWord}{discription}

            {/* 再生ボタンのJSX。             */}
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0.8}
            >
            {voices.map((voiceObj, index) => (voiceObj === null)? '' :
                <DefaultSpeakingIconButton
                    key={index}
                    englishWord={word}
                    voice={voiceObj.voice}
                    voicePitch={voiceObj.voicePitch}
                    color={voiceObj.color}
                />
            )}
            </Stack>
            {/* スロー再生ボタンのJSX。             */}
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0.8}
                css={css`margin: 5px 0 3px 0;`}
            >
            {voices.map((voiceObj, index) => (voiceObj === null)? '' :
                <SlowSpeakingIconButton
                    key={index}
                    englishWord={word}
                    voice={voiceObj.voice}
                    voicePitch={voiceObj.voicePitch}
                    color={voiceObj.color}
                />
            )}
            </Stack>
        </div>
        <hr css={hrSubLineCss} />
        {japaneseTextJsx}
    </JsxInBalloon>)

}
