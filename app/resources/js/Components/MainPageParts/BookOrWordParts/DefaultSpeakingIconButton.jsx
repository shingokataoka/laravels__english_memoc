import {useRef, useEffect} from 'react'

import { css } from '@emotion/react';
import { defaultTheme, isDark } from '@/Components/DefaultThemeProvider';
import * as colors from '@mui/material/colors'

import Stack from '@mui/material/Stack';
import Button from '@mui/lab/LoadingButton'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';

/** @jsxImportSource @emotion/react */
export default function DefaultSpeakingIconButton({
        className,
        /* string */ englishWord,
        /* obj */ voice,
        /* number (0 ~ 2.0) */ voicePitch,
        /* 'blue' or 'green' or 'purple */  color,
    }) {
    const palette = defaultTheme().palette

    // このコンポーネント内の変数。
    const dataRef = useRef({
        uttr: null,   // webSpeechApiの再生系オブジェクトを入れる変数。
    })
    // 上記のエイリアス。
    const data = dataRef.current



    let defaultBgColor
    let activeBgColor
    let fontColor
    if (color === 'green') {
        defaultBgColor = isDark()? colors.green[800] : colors.green[100]
        activeBgColor = isDark()? colors.green[600] : colors.green[200]
        fontColor = isDark()? colors.green[300] : colors.green[800]
    } else if (color === 'blue') {
        defaultBgColor = isDark()? colors.blue[700] : colors.blue[100]
        activeBgColor = isDark()? colors.blue[600] : colors.blue[200]
        fontColor = 'primary'
    } else if (color === 'indigo') {
        defaultBgColor = isDark()? colors.indigo[700] : colors.indigo[100]
        activeBgColor = isDark()? colors.indigo[600] : colors.indigo[200]
        fontColor = isDark()? colors.indigo[200] : colors.indigo[500]
    } else if (color === 'purple') {
        defaultBgColor = isDark()? colors.purple[700] : colors.purple[100]
        activeBgColor = isDark()? colors.purple[600] : colors.purple[200]
        fontColor = 'secondary'
    }




    // 初回か英文が変わったら、声のオブジェクトを生成しておく。
    useEffect( () => {

        // 英語セリフが空文字の再生テキスト・速度・言語をセット。
        if (!englishWord) {
            data.uttr = new SpeechSynthesisUtterance('英語のセリフがありません。')
            data.uttr.rate = 1.5
            data.uttr.lang = 'ja-JP'
        // 英語セリフに英語を含まない場合の再生テキスト・速度・言語をセット。
        } else if ( /[a-zA-Z0-9.]/.test(englishWord) === false ) {
            data.uttr = new SpeechSynthesisUtterance('英語のセリフに英語が含まれていません。')
            data.uttr.rate = 1.5
            data.uttr.lang = 'ja-JP'
        // 正常なら、英語セリフ・言語・あるならvoiceをセット。
        } else {
            data.uttr = new SpeechSynthesisUtterance(englishWord)
            if (voice !== null){
                data.uttr.voice = voice
            }
            data.uttr.pitch =(voicePitch === null)? 1 : voicePitch
            data.uttr.rate = 1
            data.uttr.lang = 'en-US'
        }

    // 第二引数voiceは、voices読み込みが完全に完了してからの再生系オブジェクトを生成したいから。
    }, [englishWord, voice])






    const englishSpeaking = (e) => {
        speechSynthesis.cancel() /* 前回の再生途中なら完全に止める。 */

        // 再生を実行。
        speechSynthesis.speak(data.uttr)
    }





    return (<Button
        onClick={ e => englishSpeaking(e) }
        className={className}
        css={css`
            padding: 0;
            margin:0;
            text-transform: none;
            min-width: 0px;
            width: 30px;
            height: 20px;
            border-radius: 50%;
            // transform: scaleY(0.8);
        `}
    >
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            css={css`
                width:100%;
                height:100%;
                border-radius: 50%;
                background: ${defaultBgColor};
                &:active {
                    background: ${activeBgColor};
                }
            `}
        >
            { (fontColor[0] === '#')
            ? <VolumeUpRoundedIcon css={css` color:${fontColor} `} />
            : <VolumeUpRoundedIcon color={fontColor} />
            }

        </Stack>
    </Button>)
}
