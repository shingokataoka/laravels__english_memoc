import { useState, useContext, useEffect, useRef } from "react";

import { TalksLinesAreaContext } from "@/Pages/User/TalkToApp";

import { css } from "@emotion/react";

import TranslationButtonsArea from "../TranslationButtonsArea";
import SpeakButtons from "@/Components/SpeakButtons";
import { defaultTheme, isDark } from "@/Components/DefaultThemeProvider";



/** @jsxImportSource @emotion/react */
export default function Line({
    line,
    checkTranslations = false,
    setCheckTranslations = null,
}) {

    const palette = defaultTheme().palette
    const isLight = !isDark()

    const {status, englishLine, japaneseLine} = line

    const {voices, apiVoice, upBalloonProps, setUpBalloonProps, showLineStatus, fetchApiStatus} = useContext(TalksLinesAreaContext)



    // 英語divのdom用のRef。
    const enDomRef = useRef(null)
    // 日本語divのdom用のRef。
    const jaDomRef = useRef(null)

    const dataRef = useRef({
        enHeight: 0,
        jaHeight: 0,
    })
    const data = dataRef.current

    // セリフの表示アニメの時間ミリ秒。
    const slideMSec = 150

    const [isFirstRender, setIsFirstRender] = useState(true)


    // 「英文のみ表示」系ボタンの切り替え時のアニメーション処理。
    useEffect(() => {
        // line[2]ならアニメをセットしない。
        // line[2]のslideDownアニメ時に高さを取得するため(TalksLinesArea.jsxでアニメ設定の処理がある)。
        if (line.index === 2) return

        // 初回レンダリング時は処理しない。
        if (isFirstRender === true) return


        // 英語divと日本語divの高さを表示されている時に取得しておく。
        if (showLineStatus !== 'none') data.enHeight = enDomRef.current.getBoundingClientRect().height
        if (showLineStatus === 'en+ja') data.jaHeight = jaDomRef.current.getBoundingClientRect().height

        // 「文の表示なし」なら英語divと日本語divをスライドアップで高さ0な非表示にする。
        if (showLineStatus === 'none') {
            // 英語divのスライドアップ非表示アニメーション。
            enDomRef.current.animate([
                { height: `${data.enHeight}px`, paddingTop: '8px', paddingBottom: '8px', },
                { height: 0, padding: 0 },
            ], slideMSec)
            // 日本語divのスライドアップ非表示アニメーション。
            jaDomRef.current.animate([
                { height: `${data.jaHeight}px`, paddingTop: '8px', paddingBottom: '8px', },
                { height: 0, padding: 0 },
            ], slideMSec)
        }

        // 「英文のみ表示」なら英語divをスライドダウンで高さauto表示にする。
        if (showLineStatus === 'en') {
            enDomRef.current.animate([
                { height: 0, padding: 0 },
                { height: `${data.enHeight}px`, paddingTop: '8px', paddingBottom: '8px', },
            ], slideMSec)
        }

        // 「和文も表示」なら日本語divをスライドダウンで高さauto表示にする。
        if (showLineStatus === 'en+ja') {
            jaDomRef.current.animate([
                { height: 0, padding: 0 },
                { height: `${data.jaHeight}px`, paddingTop: '8px', paddingBottom: '8px', },
            ], slideMSec)
        }

    }, [showLineStatus])






    // 初回のレンダリングを管理。
    useEffect(() => {
        // 初回レンダリングなら、「初回レンダリングじゃない」にする。
        if (isFirstRender === true) setIsFirstRender(false)
    }, [isFirstRender])



    return (<div css={css`
        display: flex;
        align-items: flex-start;
        gap: 8px;
    `}>
        {/* 声一覧。 */}
        <SpeakButtons
            englishWord={line.englishLine}
            voices={voices}
        />

        <div css={css`
            flex: 1;
        `}>
            {/* セリフの英語(各単語は和訳バルーン表示ボタン)。 */}
            <div
                ref={enDomRef}
                css={css`
                    overflow: hidden;
                    padding-top: ${(showLineStatus === 'none')? 0 : '8px'};
                    padding-bottom: ${(showLineStatus === 'none')? 0 : '8px'};
                    height: ${(showLineStatus === 'none')? 0 : 'auto'};
                `}
            >
                <TranslationButtonsArea
                    setUpBalloonProps={setUpBalloonProps}
                    text={englishLine}
                    voices={voices}
                    checkTranslations={checkTranslations}
                    setCheckTranslations={setCheckTranslations}
                />
            </div>

            {/* セリフの日本語 */}
            <div
                ref={jaDomRef}
                css={css`
                    white-space: pre-wrap;
                    overflow: hidden;
                    transition: border ${slideMSec * 0.001}s;
                    border-top: 1px red solid;
                    border-color: ${ (showLineStatus === 'en+ja')
                        ? isLight? '#ccc' : '#777'
                    : '#0000' };
                    padding-top: ${ (showLineStatus === 'en+ja')? '8px' : 0 };
                    padding-bottom: ${ (showLineStatus === 'en+ja')? '8px' : 0 };
                    height: ${ (showLineStatus === 'en+ja')? 'auto' : 0 };
                `}
            >{japaneseLine}</div>
        </div>

    </div>)

}
