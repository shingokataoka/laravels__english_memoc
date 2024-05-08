import { css } from '@emotion/react';
import { defaultTheme, isDark } from '@/Components/DefaultThemeProvider';
import * as colors from '@mui/material/colors'

import Stack from '@mui/material/Stack';
import Button from '@mui/lab/LoadingButton'

/** @jsxImportSource @emotion/react */
export default function SlowSpeakingIconButton({
        className,
        /* string */ englishWord,
        /* obj */ voice,
        /* number(0 ~ 2.0) */ voicePitch,
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
        fontColor = isDark()? colors.blue[200] : colors.blue[800]
    } else if (color === 'indigo') {
        defaultBgColor = isDark()? colors.indigo[700] : colors.indigo[100]
        activeBgColor = isDark()? colors.indigo[600] : colors.indigo[200]
        fontColor = isDark()? colors.indigo[200] : colors.indigo[500]
    } else if (color === 'purple') {
        defaultBgColor = isDark()? colors.purple[700] : colors.purple[100]
        activeBgColor = isDark()? colors.purple[600] : colors.purple[200]
        fontColor = isDark()? colors.purple[200] : colors.purple[500]
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
        uttr.rate = 0.1
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
                padding:5px;
                border-radius: 50%;
                background: ${defaultBgColor};
                &:active {
                    background: ${activeBgColor};
                }
            `}
        >

            <svg
                style={{
                    // fill: palette.primary.main,
                    fill: fontColor,
                    transformOrigin: '50% 50%',
                    transform: `
                        scaleX(-1)
                    `,
               }}
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

                <path d="M511.325,275.018c-0.416-0.982-0.974-1.799-1.54-2.432c-1.117-1.241-2.199-1.891-3.157-2.382
                    c-1.808-0.892-3.391-1.274-5.107-1.633c-2.982-0.592-6.348-0.916-10.13-1.183c-5.64-0.4-12.13-0.633-18.419-1.016
                    c-3.166-0.192-6.29-0.433-9.18-0.734c0.3-1.449,0.474-2.932,0.467-4.432c0.008-3.732-0.975-7.447-2.725-10.896
                    c-1.757-3.458-4.24-6.698-7.372-9.831c-2.991-2.982-6.69-7.489-10.847-12.979c-7.289-9.613-16.045-22.243-26.233-35.738
                    c-15.311-20.252-33.847-42.503-56.24-59.93c-11.196-8.714-23.376-16.212-36.63-21.56c-13.246-5.339-27.574-8.505-42.853-8.505
                    c-23.292-0.008-44.302,7.356-62.796,18.544c-13.896,8.398-26.45,18.935-37.813,30.307c-17.036,17.045-31.44,35.955-43.486,52.45
                    c-6.023,8.239-11.454,15.878-16.27,22.326c-2.757,3.69-5.314,6.981-7.648,9.763c-0.783-0.741-1.549-1.475-2.283-2.208
                    c-3.582-3.599-6.489-7.139-8.672-12.03c-2.174-4.89-3.699-11.33-3.706-20.876c-0.009-8.781,1.332-20.143,4.673-34.872
                    c0.642-2.832,0.95-5.656,0.95-8.43c0-6.448-1.691-12.571-4.573-17.961c-4.323-8.114-11.205-14.653-19.318-19.235
                    c-8.139-4.574-17.578-7.214-27.316-7.223c-9.863-0.008-20.077,2.79-29.032,9.146c-8.181,5.824-13.979,11.18-17.953,16.495
                    c-1.974,2.658-3.491,5.315-4.531,8.023C0.542,148.685,0,151.442,0,154.141c-0.008,3.124,0.742,6.106,1.974,8.672
                    c1.075,2.258,2.491,4.216,4.057,5.906c2.741,2.966,5.94,5.182,9.139,6.998c4.816,2.691,9.722,4.449,13.496,5.599
                    c0.332,0.1,0.649,0.2,0.974,0.283c1.442,21.226,4.307,38.638,8.081,53.033c6.131,23.392,14.728,38.87,23.317,49.425
                    c4.282,5.274,8.547,9.305,12.346,12.462c3.799,3.158,7.156,5.474,9.464,7.215c5.465,4.098,10.696,7.047,15.687,8.996
                    c3.673,1.433,7.223,2.316,10.613,2.683v0.009c4.799,2.874,16.695,9.555,35.147,16.694c-0.183,0.666-0.5,1.491-0.925,2.4
                    c-1.124,2.432-2.99,5.464-5.123,8.463c-3.232,4.541-7.089,9.08-10.113,12.437c-1.516,1.675-2.808,3.058-3.724,4.024
                    c-0.467,0.484-0.816,0.85-1.075,1.084l-0.15,0.166c-0.016,0.017-0.091,0.1-0.2,0.208c-0.792,0.758-3.816,3.69-6.956,7.898
                    c-1.766,2.4-3.599,5.198-5.074,8.389c-1.458,3.199-2.616,6.798-2.64,10.888c-0.017,2.899,0.666,6.056,2.274,8.93
                    c0.883,1.608,2.007,2.933,3.224,4.041c2.124,1.958,4.54,3.357,7.09,4.482c3.857,1.699,8.097,2.824,12.546,3.582
                    c4.448,0.758,9.056,1.124,13.504,1.124c5.298-0.016,10.313-0.5,14.778-1.675c2.233-0.616,4.332-1.39,6.365-2.607
                    c1.016-0.608,2.008-1.342,2.949-2.308c0.925-0.933,1.808-2.133,2.441-3.599c0.366-0.883,1.1-2.466,2.049-4.44
                    c3.316-6.94,9.297-18.802,14.404-28.857c2.566-5.04,4.907-9.63,6.606-12.954c0.85-1.674,1.55-3.024,2.033-3.965
                    c0.475-0.924,0.733-1.442,0.733-1.442l0.016-0.033l0.042-0.042c0.033-0.067,0.075-0.142,0.092-0.217
                    c23.226,4.758,50.517,8.048,81.565,8.048c1.641,0,3.266,0,4.907-0.025h0.025c23.184-0.274,43.978-2.416,62.23-5.606
                    c2.25,4.39,7.597,14.812,12.804,25.15c2.657,5.256,5.274,10.497,7.414,14.87c1.092,2.174,2.05,4.148,2.824,5.79
                    c0.774,1.624,1.383,2.956,1.716,3.723c0.624,1.466,1.491,2.666,2.432,3.599c1.666,1.666,3.433,2.699,5.256,3.507
                    c2.75,1.2,5.69,1.9,8.84,2.383c3.157,0.475,6.514,0.7,9.98,0.7c6.814-0.016,13.937-0.833,20.318-2.64
                    c3.174-0.917,6.181-2.083,8.93-3.691c1.383-0.808,2.691-1.732,3.907-2.857c1.199-1.108,2.324-2.433,3.215-4.041
                    c1.625-2.874,2.283-6.031,2.266-8.93c0-4.09-1.158-7.689-2.616-10.888c-2.215-4.774-5.223-8.722-7.681-11.638
                    c-2.099-2.457-3.799-4.132-4.374-4.648v-0.016c-0.016-0.026-0.033-0.042-0.05-0.059c-0.024-0.016-0.024-0.033-0.042-0.033
                    c-0.033-0.042-0.05-0.058-0.091-0.1c-0.991-0.991-5.665-5.806-10.422-11.654c-2.641-3.232-5.274-6.772-7.306-10.039
                    c-0.7-1.107-1.308-2.199-1.832-3.215c20.868-7.689,33.806-15.295,38.438-18.227c0.883-0.05,1.848-0.125,2.907-0.225
                    c7.248-0.725,18.752-2.816,30.956-7.847c6.098-2.516,12.354-5.774,18.269-10.022c5.914-4.249,11.488-9.497,16.103-15.953
                    l0.166-0.242l0.158-0.258c0.341-0.575,0.666-1.241,0.916-2.024c0.241-0.776,0.408-1.683,0.408-2.641
                    C512,277.21,511.759,276.027,511.325,275.018z" />
            </svg>

        </Stack>
    </Button>)
}
