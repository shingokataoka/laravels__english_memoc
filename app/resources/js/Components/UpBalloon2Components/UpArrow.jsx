import { css } from "@emotion/react";
import { defaultTheme } from "@/Components/DefaultThemeProvider";


/** @jsxImportSource @emotion/react */
export default function UpArrow({
    upBalloonProps,
    setUpBalloonProps,
}) {
    const palette = defaultTheme().palette

    const {
        showStatus,   // 表示管理。'none'、'processing'=表示準備中(座標計算など)、'show'
        x,   // 絶対座標。表示位置。
        y,   // 絶対座標。表示位置。
        jsx,  // バルーン内に表示するSJXを指定。
    } = upBalloonProps


    return (
        <div css={css`
            display: inline-block;
            border: 8px ${palette.text.disabled} solid;
            border-top-color: #0000;
            border-left-color: #0000;
            border-right-color: #0000;
            z-index: 100;
            position: absolute;
            ${ (showStatus !== 'show')? 'display: none;' : '' }
            top: calc(${y}px - 8px);
            left: calc(${x}px - 8px);
        `} />
    )

}
