import { useState, useRef, useLayoutEffect } from 'react'
import {css} from '@emotion/react'
import { isDark, defaultTheme } from '@/Components/DefaultThemeProvider'

import { Button } from '@mui/material'




/** @jsxImportSource @emotion/react */
export default function StartTalkModal({
    setIsOnBgm,
}) {
    const palette = defaultTheme().palette
    const isLight = !isDark()

    // このコンポーネント自体の表示状態。
    // 'show'=表示中 'fadeout'=フェードアウトにアニメ。 'hidden'=非表示
    const [showStatus, setShowStatus] = useState('show')
    // const [showStatus, setShowStatus] = useState('hidden')

    // このDOMのuseRef。
    const currentDomRef = useRef(null)



    // 「Let's talk♪」を押した時の処理。
    const handleClickAndBgm = e => {
        setShowStatus('fadeout')
        setIsOnBgm(true)
    }



    // 「Yes.」を押した処理。
    const handleClick = e => {
        setShowStatus('fadeout')
    }



    // showStatus='fadeout'時の処理。
    useLayoutEffect( () => {
        // showStatusが'fadeout'時の処理。
        if (showStatus === 'fadeout') {
            // フェードアウトのアニメーションをセット。
             const animation = currentDomRef.current.animate([
                {opacity: 1},
                {opacity: 0},
            ], 0)

            // アニメーション後に、非表示にする。
            animation.finished.then( () => {
                currentDomRef.current.style.display = 'none'
                setShowStatus('hidden')
            })
        }
    }, [showStatus])


    if (showStatus === 'hidden') return ''



    return (<div
        ref={currentDomRef}
        css={css`
            background: ${isLight? palette.bgMain : '#000'};
            position: fixed;
            z-index: 10000;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        `}
    >
        <div css={css`
            border-radius: 6px;
            border: 1px ${isLight? palette.bgBack : '#888' } solid;
            background: ${isLight? palette.bgSub : '#333'};
            width: 100%;
            height: 100%;
            max-width: 400px;
            max-height: 200px;
            padding: 8px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            align-items: center;
            justify-content: center;
        `}>
            <div css={css`
                font-size: 1.3rem;
                padding-bottom: 16px;
            `}>今日も英会話を楽しもう！</div>

            <Button variant="outlined"
                onClick={handleClickAndBgm}
                css={css`
                    text-transform: none;
                `}
            >Let's talk♪</Button>
            <Button variant="outlined"
                onClick={handleClick}
                css={css`
                    text-transform: none;
                `}
            >Yes.</Button>

        </div>
    </div>)
}
