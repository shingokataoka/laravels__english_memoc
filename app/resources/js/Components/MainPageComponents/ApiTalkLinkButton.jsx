import {useState} from 'react'

import {css} from '@emotion/react'
import { defaultTheme } from '@/Components/DefaultThemeProvider'

import {Button} from '@mui/material'
import {Link} from '@inertiajs/react'
import WebSpeachApiVoices from '../WebSpeachApiVoices'



// 「アプリと英会話する」リンクボタン。
/** @jsxImportSource @emotion/react */
export default function ApiTalkLinkButton({}) {
    const palette = defaultTheme().palette

    // 声の一覧。
    const [voices, setVoices] = useState([])

    // 声の数が複数なら声選択ページURLにする。
    // 声が一つならAIとトーク練習ページURLにする。
    const url =(voices.length)
        ? route('talk_to_app.voice_select')
        : route('talk_to_app.index', {appVoiceIndex: 0, userVoiceIndex: 1})

    return (<>
        {/* 声を取得するためのJSX */}
        <WebSpeachApiVoices voices={voices} setVoices={setVoices} />

        <Button variant="outlined"
            component={Link}
            href={url}
            css={css`
                border: 1px ${palette.primary.main} solid;
                font-weight: bold;
            `}
        >アプリと英会話する</Button>
      </>)
}
