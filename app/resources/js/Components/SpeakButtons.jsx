import {useState, useContext} from 'react'

import {css} from '@emotion/react'
import { defaultTheme } from '@/Components/DefaultThemeProvider'

import DefaultSpeakingIconButton from "@/Components/MainPageParts/BookOrWordParts/DefaultSpeakingIconButton"
import SlowSpeakingIconButton from "@/Components/MainPageParts/BookOrWordParts/SlowSpeakingIconButton"






// 「本or再生アイコンと、英語テキストと日本語テキスト」のJSX
/** @jsxImportSource @emotion/react */
export default function SpeakButtons({
    englishWord,
    voices,
}) {

    const palette = defaultTheme().palette

    // const [voices, setVoices] = useState([])




    if ( Array.isArray(voices) === false ) return (<></>)



    return (<>
        {/* 声を取得するためのJSX */}
        {/* <WebSpeachApiVoices voices={voices} setVoices={setVoices} /> */}

        {/* 声再生アイコンの一覧。 */}
        <div css={css`
            padding-bottom: 8px;
        `}>
            {voices.map((row, index) => (row === null)? '' :
                <div key={index} css={css` margin-top: 6px; `}>
                    <DefaultSpeakingIconButton
                        englishWord={englishWord}
                        voice={row.voice}
                        voicePitch={row.voicePitch}
                        color={row.color}
                    />
                    <SlowSpeakingIconButton
                        englishWord={englishWord}
                        voice={row.voice}
                        voicePitch={row.voicePitch}
                        color={row.color}
                        css={css` margin-left: 6px; `}
                    />
                </div>
            )}
        </div>
    </>)





}










