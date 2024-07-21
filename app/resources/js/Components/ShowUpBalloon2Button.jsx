import {css} from '@emotion/react'
import {defaultTheme} from '@/Components/DefaultThemeProvider'
import { useEffect, useRef, useState, } from 'react'


// 英単語コンポーネント。
// クリックすると和訳バルーンが表示される。
/** @jsxImportSource @emotion/react */
export default function ShowUpBalloon2Button({
    setUpBalloonProps,  // UpBalloon2のデータをセットするuseState関数。
    jsxInBalloon,    // バルーン内に入れるjsx。
    cssObj = null, // このコンポーネントのcss。主にbuttonタグの文字色を変えるため。
    children,
}) {

    const palette = defaultTheme().palette

    const dataRef = useRef({
        scrollX: 0,
        scrollY: 0,
    })
    const data = dataRef.current

    const updateScrollPosition = () => {
        data.scrollX = window.scrollX
        data.scrollY = window.scrollY
    }


    useEffect(() => {
        addEventListener('scroll', updateScrollPosition)
        return () => {
          removeEventListener('scroll', updateScrollPosition)
        }
    }, [])



    const handleClick = e => {
        const buttonDom = e.target
        const rect =buttonDom.getBoundingClientRect()

        // まずbuttonタグの下部の絶対位置を取得。
        updateScrollPosition()
        const absoluteX = rect.left + (rect.width / 2) + data.scrollX
        const absoluteY = rect.bottom + data.scrollY

        // バルーンを表示。
        setUpBalloonProps(
            {
                showStatus: 'processing',   // 表示管理。'none'、'processing'=表示準備中(座標計算など)、'show'
                x: absoluteX,   // 絶対座標。表示位置。矢印の先端がこの位置になる。
                y: absoluteY,   // 絶対座標。表示位置。矢印の先端がこの位置になる。
                jsx: jsxInBalloon,  // バルーン内に表示するSJXを指定。
            }
        )
    }





    return (
        <button
            onClick={handleClick}
            css={css`
                margin: 0;
                padding: 0;
                line-height: 1.2;
                border-bottom: 1px #888 solid;
                ${cssObj}
            `}
        >{children}</button>
    )
}
