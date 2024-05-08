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



    const englishSpeaking = (e) => {
        speechSynthesis.cancel() /* 前回の再生途中なら完全に止める。 */

        const uttr = new SpeechSynthesisUtterance()
        uttr.text = englishWord
        if (voice !== null){
            uttr.voice = voice
        }
        uttr.pitch =(voicePitch === null)? 1 : voicePitch
        uttr.lang = 'en-US'
        speechSynthesis.speak(uttr)
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
