import {useContext, useEffect, useState, useRef, } from 'react'

import {css} from '@emotion/react'
import {defaultTheme, isDark} from '@/Components/DefaultThemeProvider'

import SpeakButtons from '@/Components/SpeakButtons'
import TalkInput from '@/Components/TalkToInputFooterComponents/TalkInput'
import JaToEnInput from '@/Components/TalkToInputFooterComponents/JaToEnInput'
import EnToJaInput from '@/Components/TalkToInputFooterComponents/EnToJaInput'
import Show3Button from "./Show3Button"


import {Button} from '@mui/material'

import { TalkToInputFooterContext } from '@/Pages/User/TalkToApp'
import AiLoadingBer from '../TalkToInputFooterComponents/AiLoadingBer'





/** @jsxImportSource @emotion/react */
export default function TalkToInputFooter({

}) {
    const palette = defaultTheme().palette
    const isLight = !isDark()

    // 「送信する」ボタンのdisabledを管理。
    const [disabled, setDisabled] = useState(false)

    // 変数管理する用のuseRef。
    const dataRef = useRef({
        submitUserLine: '', // Gemini（googleのAI）に送るユーザーの英語セリフ。
        submitLine0: '',
        submitLine1: '',
        userVoiceObj: new SpeechSynthesisUtterance(),    // ユーザーの声のオブジェクト。
        apiVoiceObj: new SpeechSynthesisUtterance(),    // アプリの声のオブジェクト。
    })
    // 上記のエイリアス。
    const data = dataRef.current

    // useContextで TalkToInputFooter.jsxから 値を受け取る。
    const {voices, userVoice, apiVoice, inputValue, setInputValue, lines, setLinesAnimateStatus, fetchApiStatus, setFetchApiStatus, showLineStatus, setShowLineStatus} = useContext(TalkToInputFooterContext)






    //ユーザーの声で再生の関数。
    const userVoiceSpeak = (
        text,   // 再生する英文。
    ) => {
        // 英文をセット。
        data.userVoiceObj.text = text

        // テキストがないなら再生しない。
        if (!text) return
        // 愛数字を含まないなら再生しない。
        if ( /[a-zA-Z0-9.]/.test(text) === false ) return

        // 再生を実行。
        speechSynthesis.speak(data.userVoiceObj)
    }



    //アプリの声で再生の関数。
    const apiVoiceSpeak = (
        text,   // 再生する英文。
    ) => {
        // 英文をセット。
        data.apiVoiceObj.text = text

        // テキストがないなら再生しない。
        if (!text) return
        // 愛数字を含まないなら再生しない。
        if ( /[a-zA-Z0-9.]/.test(text) === false ) return

        // 再生を実行。
        speechSynthesis.speak(data.apiVoiceObj)
    }



    // 「送信する」ボタンを押した処理。
    const userLineSubmit = () => {
        // ユーザーのセリフ入力が空なら処理しない。
        if (inputValue === '') return


        // まずfetchApiStatusを通信中にする。
        setFetchApiStatus('processing')
        // Geminiに送信用のユーザー英語セリフに入力文を入れる。
        data.submitUserLine = inputValue

        // 声を再生する。
        userVoiceSpeak(inputValue)

        // 入力した英文のlinesのオブジェクト形式を作成。
        const newLine = {
            index: 2,
            who: 'user',
            englishLine: inputValue,
            japaneseLine: '...和訳まだ...'
        }
        // 入力した英文のlinesオブジェクトをlines[2]に入れる。
        lines[2] = newLine
        //  入力欄を空''にする。
        setInputValue('')
        // linesのアニメ状態を再生中にする。
        setLinesAnimateStatus('playing')
    }



    // voicesが取得されたら、voice系を設定する。
    useEffect( () => {
        // まだないなら処理しない。
        if (userVoice === undefined) return

        // ユーザーの声のオブジェクトを用意。
        data.userVoiceObj.voice = userVoice.voice
        data.userVoiceObj.pitch =(userVoice.voicePitch === null)? 1 : userVoice.voicePitch
        data.userVoiceObj.lang = 'en-US'
        // アプリの声のオブジェクトを用意。
        data.apiVoiceObj.voice = apiVoice.voice
        data.apiVoiceObj.pitch =(apiVoice.voicePitch === null)? 1 : apiVoice.voicePitch
        data.apiVoiceObj.lang = 'en-US'
    }, [voices.length])




    // fetchApiStatusが変わった時の処理。
    // 下記のuseEffect用の非同期の関数。
    const fetchApiTalk = async () => {
        // まず「送信する」ボタンをdisabledにする。
        setDisabled(true)

        try {
            // ユーザーの英語セリフの返答をGeminiからもらう。
            const res = await axios.post( route('api_talk.reply'), {
                userLine: data.submitUserLine,
                line0: data.submitLine0,
                line1: data.submitLine1,
            })

            // 無事成功して英語で返答が来た場合の処理。
            if (res.data.isCorrect === true) {
                // アプリの声で再生する。
                apiVoiceSpeak(res.data.result)
                // 送信したユーザーのセリフに日本語訳を入れる。
                lines[1].japaneseLine = res.data.jaLine
            }
            // 返答の英文のlinesのオブジェクト形式を作成。
            const newLine = {
                index: 2,
                who: 'ai',
                englishLine: res.data.result,
                japaneseLine: res.data.jaResult,
            }
            // linesに入れる。
            lines[2] = newLine

        // axios通信にエラーがあった場合。
        } catch(error) {
            // 返答の英文のlinesのオブジェクト形式を作成。
            const newLine = {
                index: 2,
                who: 'ai',
                englishLine: 'ごめんエラーが出ちゃった。もう一回お願い。',
                japaneseLine: '',
            }
            // linesに入れる。
            lines[2] = newLine

        }
        // data.linesが変わったに設定。
        setLinesAnimateStatus(value => {
            // fetchApiStatusを'none'に戻す。
            setFetchApiStatus('none')
            return 'playing'
        })

    }


    // fetchApiStatusが変わった時の処理。
    useEffect( () => {
        // 'processing'つまり通信中での処理。
        if (fetchApiStatus === 'processing') fetchApiTalk()

        // 処理中じゃない通常状態なら、disabled=false
        if (fetchApiStatus === 'none') { setDisabled(false) }
    }, [fetchApiStatus])





    return (<div css={css`
        background: ${palette.bgBack};
    `}>
        <div css={css`
            max-width: 700px;
            margin: 0 auto;
            padding: 16px 8px 64px 8px;
        `}>

            <div css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
            `}>
                {/* AIが考え中のローディングアイコンと文字。 */}
                <div css={css`
                    height: 0;
                    transition: opacity 0.25s;
                    // opacity: ${(fetchApiStatus === 'processing')? 1 : 0 };
                `}>
                    <AiLoadingBer />
                </div>
                {/* 「英文のみ表示」系ボタン。 */}
                <div css={css`
                    z-index: 10;
                    transition: opacity 0.25s;
                    opacity: ${(fetchApiStatus === 'processing')? 0 : 1 };
                `}>
                    <Show3Button settingText={'設定：'} />
                </div>

            </div>


            <div
                css={css`
                    display: flex;
                    align-items: flex-end;
                    align-items: flex-start;
                    align-items: center;
                    gap: 8px;
                `}
            >
                {/* 再生ボタン一覧。 */}
                <SpeakButtons
                    englishWord={inputValue}
                    voices={voices}
                />

                <div css={css`flex:1;`}>
                    {/* ユーザーが英語セリフを入力する欄。 */}
                    <TalkInput
                        userLineSubmit={userLineSubmit}
                    />
                </div>

                {/* 入力した英語セリフを送信するボタン。 */}
                <Button
                    variant="contained"
                    color="success"
                    disabled={disabled}
                    onClick={userLineSubmit}
                    css={css`
                        font-weight: bold;
                    `}
                >送信</Button>
            </div>

            <div css={css`
                text-align: center;
                opacity: 0.8;
            `}>かんたん辞書</div>

            {/* 日本語の単語などの英語を調べれる入力欄。 */}
            <div css={css`
                padding-bottom: 16px;
            `}>
                <JaToEnInput />
            </div>
            {/* 英語の単語などの日本語を調べれる入力欄。 */}
            <EnToJaInput />
        </div>

    </div>)
}
