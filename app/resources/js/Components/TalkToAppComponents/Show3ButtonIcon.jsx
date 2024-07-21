import {useContext} from 'react'
import { Show3ButtonContext } from '@/Pages/User/TalkToApp';

import {css} from '@emotion/react'
import {defaultTheme, isDark} from '@/Components/DefaultThemeProvider'


import { Button } from "@mui/material";


/** @jsxImportSource @emotion/react */
export default function Show3ButtonIcon({

}) {
    const palette = defaultTheme().palette
    const isLight = !isDark()

    // デフォのセリフ文の表示設定を管理useState。
    const {showLineStatus, setShowStatus} = useContext(Show3ButtonContext)


    // 奥義が一つ分を回る時間ミリ秒。
    const rotateMSec = 250


    // 扇形divの共通css 。
    const iconCss = css`
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        border: 10px #0000 solid;
    `



    // topが回転するかを返す関数。
    // topは2コマ（180度）右に回る。
    const isTopRotate = () => {
        if (showLineStatus === 'en+ja') return true
        else if (showLineStatus === 'en') return true
        else if (showLineStatus === 'none') return false
    }



    // rightが回転するかを返す関数。
    // rightは1コマ（90度）右に回る。
    const isRightRotate = () => {
        if (showLineStatus === 'en+ja') return true
        else if (showLineStatus === 'en') return false
        else if (showLineStatus === 'none') return false
    }


    // 奥義カラー１。
    const color1 = isLight? '#aaa' : '#888'
    // 奥義カラー２。
    const color2 = isLight? '#888' : '#555'




    return (
    <div css={css`
        position: relative;
        border-radius: 50%;
        box-shadow: 0 0 0 1px ${color1} inset;
        outline: 1px ${color2} solid;
        width: 20px;
        height: 20px;
        transform: rotate(45deg);
    `}>
        <div css={css`
            ${iconCss}
            border-top-color: ${color1};
            transition: transform ${rotateMSec * 1.5 * 0.001}s;
            transform: rotate(${isTopRotate()? 180 : 0}deg);
        `}/>

        <div css={css`
            ${iconCss}
            border-right-color: ${color1};
            transition: transform ${rotateMSec * 0.001}s;
            transform: rotate(${isRightRotate()? 90 : 0}deg);
        `}/>

        <div css={css`
            ${iconCss}
            border-bottom-color: ${color2};
            transform: scale(1.1) translate(-0.5px, -1px);
        `}/>

        <div css={css`
            ${iconCss}
            border-left-color: ${color2};
            // border-left-color: #f00;
            transform: scale(1.1) translate(0.5px);
        `}/>
    </div>
    )
}
