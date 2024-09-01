import React from 'react'
import { useEffect, useRef, useState} from 'react'

import {css} from '@emotion/react'
import { defaultTheme, DefaultThemeProvider} from '@/Components/DefaultThemeProvider'

import {Button} from '@mui/material'
import DefaultSpeakingIconButton from '@/Components/MainPageParts/BookOrWordParts/DefaultSpeakingIconButton'
import WebSpeachApiVoices from '@/Components/WebSpeachApiVoices'
import { router } from '@inertiajs/react'



/** @jsxImportSource @emotion/react */
export default function TalkToAppSelectVoice({

}){
    const palette = defaultTheme().palette

    const [isShow, setIsShow] = useState(false)
    const currentDomRef = useRef(null)

    // 声の一覧。
    const [voices, setVoices] = useState([])

    // 選択中の声のindex。
    const [selectIndex, setSelectIndex] = useState(null)


    // フェードイン表示。
    useEffect( () => {
        setIsShow(true)
    }, [])




    // 「確定」ボタンを押した処理。
    const decidedVoice = () => {
        // 表示をフェードアウトする。
        setIsShow(false)

        router.visit(
            route('talk_to_app.user_voice_select', {appVoiceIndex: selectIndex}),
            {method: 'get'},
        )
    }





    return (<DefaultThemeProvider>
        {/* 声を取得するためのJSX */}
        <WebSpeachApiVoices voices={voices} setVoices={setVoices} />

        <div
            ref={currentDomRef}
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 16px;
                height: 100vh;
                transition: opacity 0.25s;
                opacity: ${(isShow)? 1 : 0};
            `}
        >
            <div css={css`
                font-size: 1.2rem;
                font-weight: bold;
            `}>アプリの声を選んでください。</div>


            {/* 声の選択ボタン一覧。 */}
            <div
                css={css`
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                `}
            >{ voices.map((row, index) => {
                if (row === null) return ''
                return (
                <label
                    key={index}
                    onClick={e => setSelectIndex(index)}
                    css={css`
                        padding: 4px 50px;
                        background: #8882;
                        border-radius: 4px;
                        outline: 2px #0000 solid;
                        ${ (selectIndex === index)? 'outline-color: #888f;' : '' }

                    `}
                >
                    <DefaultSpeakingIconButton
                        englishWord={"This is AI's voice."}
                        voice={row.voice}
                        voicePitch={row.voicePitch}
                        color={['blue', 'green', 'indigo', 'purple'][index]}
                    />

                </label>
                )

            }) }</div>

            {/* 決定ボタン。 */}
            <Button
                variant="contained"
                color="info"
                disabled={(selectIndex === null)}
                onClick={decidedVoice}
            >確定</Button>

        </div>
    </DefaultThemeProvider>)
}
