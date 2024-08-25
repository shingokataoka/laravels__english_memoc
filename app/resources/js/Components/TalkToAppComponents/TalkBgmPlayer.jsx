import { useState, useContext, useEffect } from 'react';


import {css} from '@emotion/react'
import { defaultTheme, isDark } from '@/Components/DefaultThemeProvider';


import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeDown from '@mui/icons-material/VolumeDown';
import Slider from '@mui/material/Slider'

import AudioControls from '@/Components/TalkToAppComponents/AudioControls';

import { TalkToHeaderContext } from '@/Pages/User/TalkToApp';




/**  @jsxImportSource @emotion/react */
export default function TalkBgmPlayer() {
    const palette = defaultTheme().palette
    const isLight = !isDark()

    // TalkToHeader.jsx以下のuseContextの値を受け取る。
    const {isOnBgm} = useContext(TalkToHeaderContext)

    // 再生中='playing'、次へ='skipNext'、停止中='paused'、を管理。
    const [bgmStatus, setBgmStatus] = useState('paused')

    // 次曲ボタンの押下の許可を管理（連続クリック防止のため）。
    const [isSkipNextClick, setIsSkipNextClick] = useState(true)

    // スライダーの値。
    const [sliderValue, setSliderValue] = useState(100)

    // スライダーの色。
    const [sliderColor, setSliderColor] = useState('disabled')



    // 音量スライダーの値が変わった場合の処理。
    const volumeChange = (e, value) => {
        setSliderValue(value)
    }


    // 次曲ボタンを押した処理。
    const clickSkipNext = e => {
        // クリック許可がなければ処理しない。
        if (isSkipNextClick === false) return

        // bgmStatusを'skipNext'にする。
        setBgmStatus('skipNext')

        // クリックを禁止する。
        setIsSkipNextClick(false)
        // 少しの時間でクリックを解除する。
        setTimeout(() => {
            setIsSkipNextClick(true)
        }, 500)
    }



    // 最初のモーダルで「Let's talk♪」を押したならの処理。
    useEffect(() => {
        if (isOnBgm === true) setBgmStatus('playing')
    }, [isOnBgm])





    return (<div css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        background: ${isLight? '#dadada' : '#888'};
        color: ${isLight? '#aaa' : palette.text.primary};
        border-radius: 18px;
        padding: 0 12px;
        & > *:hover {
            background: ${isLight? '#ccc' : '#999'};
        }
    `}>
        {/* // 実際にオーディオの操作・処理を行う。 */}
        <AudioControls
            bgmStatus={bgmStatus}
            setBgmStatus={setBgmStatus}
            sliderValue={sliderValue}
        />

        {/* 一時停止ボタン。 */}
        <div
            onClick={e => setBgmStatus('paused')}
        >
            <PauseIcon color={(bgmStatus === 'paused')? 'primary' : 'inherit'} />
        </div>

        {/* 再生ボタン。 */}
        <div
             onClick={e => setBgmStatus('playing')}
        >
            <PlayArrowIcon color={(bgmStatus === 'playing')? 'primary' : 'inherit'} />
        </div>

        {/* 次へボタン。 */}
        <div
            onClick={clickSkipNext}
        >
            <SkipNextIcon color={(isSkipNextClick === true)? 'inherit' : 'primary'} />
        </div>

        {/* 音量のスピーカーアイコン。 */}
        <div css={css`
            margin-left: 6px;
            background: #0000 !important;
        `}><VolumeDown /></div>

        {/* 音量用のスライダー。 */}
        <Slider
            size="small"
            value={sliderValue}
            aria-label="Small"
            valueLabelDisplay="auto"
            color={sliderColor}
            onChange={volumeChange}
            onMouseEnter={e => setSliderColor('primary')}
            onMouseLeave={e => setSliderColor('disabled')}
            css={css`
                background: #0000 !important;
                transition: color 0.25s;
                width: 60px;
            `}
        />
    </div>)
}
