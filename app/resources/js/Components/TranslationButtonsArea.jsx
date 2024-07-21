import getBalloonWordEnToJa from '@/Components/TranslationButtonsAreaComponents/getBalloonWordEnToJa'
import splitWord from '@/Components/TranslationButtonsAreaComponents/splitWord'

import React from 'react'
import { useRef, useEffect } from 'react'
import { css } from '@emotion/react'
import {defaultTheme} from '@/Components/DefaultThemeProvider'

import { Stack } from '@mui/material'

import DefaultSpeakingIconButton from "@/Components/MainPageParts/BookOrWordParts/DefaultSpeakingIconButton"
import SlowSpeakingIconButton from "@/Components/MainPageParts/BookOrWordParts/SlowSpeakingIconButton"
import TranslationJsxInBalloon from './TranslationButtonsAreaComponents/TranslationJsxInBalloon'
import NoneJsxInBalloon from './TranslationButtonsAreaComponents/NoneJsxInBalloon'
import ShowUpBalloon2Button from './ShowUpBalloon2Button'




/** @jsxImportSource @emotion/react */
export default function TranslationButtonsArea({
    setUpBalloonProps = null,
    text,
    voices = null,
}) {
    const palette = defaultTheme().palette

    // バルーン表示ボタンのcss
    const cssList = {
        normal: css``,
        orange: css`color: ${palette.warning.main};`,
        red: css`color: red; border-color: red;css`,
    }



    // テキストを分割して配列にする（'とアルファベット以外の文字で区切る）。
    const words = text.split(/([^'a-zA-Z])/g)



    // バルーン表示ボタンjsxやその他の文字を入れる配列を作成。
    const buttonsAndWords = []

   // 各単語ごとにループ。
    words.map(word => {
        // アルファベットを含まないなら、そのまま配列に入れる。（改行もそのまま入れる）。
        if ( !word.match(/[a-zA-Z]/i) ) {
            buttonsAndWords.push(word)
            // 次の単語ループへ。
            return
        }

        // バルーン内JSX用の和訳データを取得。
        const balloonWordData = getBalloonWordEnToJa(word)

        // 和訳があれば、和訳バルーンjsx表示のボタンを配列に入れる。
        if (balloonWordData !== null) {
            // バルーン内用の和訳JSXを取得。
            const translationJsx = <TranslationJsxInBalloon
                voices={voices}
                balloonWordData={balloonWordData}
            />
            // 和訳jsxのバルーンを表示するボタンjsxを取得する。
            const buttonJsx = <ShowUpBalloon2Button
                setUpBalloonProps={setUpBalloonProps}
                jsxInBalloon={translationJsx}
                cssObj={cssList[balloonWordData.color]}
            >{word}</ShowUpBalloon2Button>
            // このボタンを配列に入れる。
            buttonsAndWords.push(buttonJsx)
            // 次の単語ループへ。
            return
        }


        // 和訳がなければ(nullなら) の単語を分解して和訳してみる。
        // （"I've"なら"I"と"'ve"にするなど）。


        // 単語を分解する。
        const splitWords = splitWord(word)

        // 分解できなかった場合は。
        if (splitWords === false) {
            // 和訳なしバルーン用のjsxを取得。
            const noneJsx = <NoneJsxInBalloon word={word} />
            // 和訳なしバルーン表示のボタンのjsxを取得。
            const noneButtonJsx = <ShowUpBalloon2Button
                setUpBalloonProps={setUpBalloonProps}
                jsxInBalloon={noneJsx}
                cssObj={cssList.red}
            >{word}</ShowUpBalloon2Button>
            // 配列に入れる。
            buttonsAndWords.push(noneButtonJsx)
            // 次の単語ループへ。
            return
        }

        // 下記ループ内で和訳があるか判定用の変数。
        let isTranslation = false

        // 分解できたなら、全ての分解できたパターンのループで処理をしていく。
        splitWords.map(rowWords => {

            // 単語二つともの バルーン内JSX用の和訳データを取得。
            const balloonWordData0 = getBalloonWordEnToJa(rowWords[0])
            const balloonWordData1 = getBalloonWordEnToJa(rowWords[1])

            // 分解した単語0のバルーン内JSX用の和訳データがないなら次のループへ行く。
            if (balloonWordData0 === null) return

            // 和訳があったから、判定用変数をtrueにする。
            isTranslation = true

            // 分解した単語0の 和訳バルーン用のjsxを取得。
            const translationJsx0 = <TranslationJsxInBalloon
                voices={voices}
                balloonWordData={balloonWordData0}
            />
            // 和訳バルーン表示用のボタンjsxを取得。
            const buttonJsx0 = <ShowUpBalloon2Button
                setUpBalloonProps={setUpBalloonProps}
                jsxInBalloon={translationJsx0}
                cssObj={cssList[balloonWordData0.color]}
            >{rowWords[0]}</ShowUpBalloon2Button>
            // 配列に入れる。
            buttonsAndWords.push(buttonJsx0)

            // 分解した単語1のバルーン内JSX用の和訳データがあるなら。
            if (balloonWordData1 !== null) {
                // 和訳バルーン用のjsxを取得。
                const translationJsx1 = <TranslationJsxInBalloon
                    voices={voices}
                    balloonWordData={balloonWordData1}
                />
                // 和訳バルーン表示用のボタンjsxを取得。
                const buttonJsx1 = <ShowUpBalloon2Button
                    setUpBalloonProps={setUpBalloonProps}
                    jsxInBalloon={translationJsx1}
                    cssObj={cssList[balloonWordData1.color]}
                >{rowWords[1]}</ShowUpBalloon2Button>
                // 配列に入れる。
                buttonsAndWords.push(buttonJsx1)

            // 分解した単語1の和訳がないなら。
            } else {
                // 和訳なしバルーン用のjsxを取得。
                const noneJsx1 = <NoneJsxInBalloon word={rowWords[1]} />
                // 和訳なしバルーン表示のボタンのjsxを取得。
                const buttonJsx1 = <ShowUpBalloon2Button
                    setUpBalloonProps={setUpBalloonProps}
                    jsxInBalloon={noneJsx1}
                    cssObj={cssList.red}
                >{rowWords[1]}</ShowUpBalloon2Button>
                // 配列に入れる。
                buttonsAndWords.push(buttonJsx1)
            }
        })

        // 分解しても和訳がなかったなら。
        if (isTranslation === false) {
            // 分解前の単語の和訳なしバルーン用のjsxを取得。
            const noneJsx0 = <NoneJsxInBalloon word={word} />
            // 和訳なしバルーン表示のボタンのjsxを取得。
            const buttonJsx0 = <ShowUpBalloon2Button
                setUpBalloonProps={setUpBalloonProps}
                jsxInBalloon={noneJsx0}
                cssObj={cssList.red}
            >{word}</ShowUpBalloon2Button>
            // 配列に入れる。
            buttonsAndWords.push(buttonJsx0)
        }

    })





    return (<div css={css`
        text-align: left;
        white-space: pre-wrap;
    `}>
    { buttonsAndWords.map( (buttonAndWord, index) => (<React.Fragment key={index}>
        {buttonAndWord}
    </React.Fragment>) ) }


    </div>)
}
