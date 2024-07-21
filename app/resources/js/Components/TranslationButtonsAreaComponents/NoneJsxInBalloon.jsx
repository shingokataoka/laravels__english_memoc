import React from 'react'

import {css} from '@emotion/react'

import { Stack } from '@mui/material'

import DefaultSpeakingIconButton from '@/Components/MainPageParts/BookOrWordParts/DefaultSpeakingIconButton'
import SlowSpeakingIconButton from '@/Components/MainPageParts/BookOrWordParts/SlowSpeakingIconButton'
import JsxInBalloon from '@/Components/TranslationButtonsAreaComponents/JsxInBalloon'





/** @jsxImportSource @emotion/react */
export default function NoneJsxInBalloonß({
    word,    // 辞書にない単語。
}){





    return (<JsxInBalloon>
        "{word.toLowerCase()}" は当サイト利用の辞書にはありません。<br />
        固有名詞（名前）などなら気にしないでください。
    </JsxInBalloon>)

}
