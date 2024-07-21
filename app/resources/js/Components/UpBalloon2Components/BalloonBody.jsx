import { css } from "@emotion/react";
import { defaultTheme } from "@/Components/DefaultThemeProvider";
import { useEffect, useState, useRef } from "react";




/** @jsxImportSource @emotion/react */
export default function BalloonBody({
    upBalloonProps,
    setUpBalloonProps,
}) {

    const {
        showStatus,   // 表示管理。'none'、'processing'=表示準備中(座標計算など)、'show'
        x,   // 絶対座標。表示位置。
        y,   // 絶対座標。表示位置。
        jsx,  // バルーン内に表示するSJXを指定。
    } = upBalloonProps

    const palette = defaultTheme().palette

    // このバルーンのDOM用のuseRef。
    const currentDomRef = useRef(null)

    // このバルーンの座標系データ。
    const dataRef = useRef({
        x: 0,
        w: 0,
        hover: false,   // バルーンにホバーしてる=true 、ホバーしていないならfalse。
    })
    // 上記のエイリアス。
    const data = dataRef.current



    // showStatusが変化した時の処理。
    useEffect( () => {
        // 'none'の時の処理。dataRefの各値を初期化する。
        if (showStatus === 'none') {
            data.x = 0
            data.w = 0
            setUpBalloonProps(value => {
                return {...value,
                    x: 0,
                    y: 0,
                    jsx: <></>,
                }
            })
        }

        // 'processing'の時の処理。座標系を算出する。
        if (showStatus === 'processing') {
            // 「ビューポートの幅 - 20px」を算出。
            // スクロール幅ぶんを余裕をみて引いておいてる。
            const viewportW = document.documentElement.clientWidth - 20

            // バルーンの幅を取得。
            data.w = currentDomRef.current.getBoundingClientRect().width

            // バルーンの幅がビューポート幅を超えてるなら収める。
            // バルーンがビューポート幅を超えていても、showStatus='show'ではwhite-space: nowrap;を消すので自動でビューポート幅以内に収まる。
            // が、位置計算のため、data.wはビューポート幅内に収める。
            if (data.w > viewportW) data.w = viewportW

            //  バルーンのx座標を矢印の中心にする。
            data.x = x - (data.w / 2)

            // バルーンの右側の座標を算出。
            const rightX = data.x + data.w

            // もしバルーンが左側に はみ出るなら納める。
            if (data.x < 0) data.x = 0
            // もしバルーンが右側に はみ出るなら収める。
            if ( rightX > viewportW) data.x -= rightX - viewportW

            setUpBalloonProps(value => {
                return {...value, showStatus: 'show'}
            })

        }

    }, [showStatus])



    // バルーン以外をクリックで、バルーンを消す。
    document.querySelector('body').onclick = function() {
        // バルーンにホバーしているなら処理しない。
        if (data.hover === true) return

        setUpBalloonProps(value => {
            // showStatusが'show'以外なら処理しない。
            if (showStatus !== 'show') return {...value}

            // バルーンを消す。
            return {...value, showStatus: 'none'}
        })

    }





    return (<div
        ref={currentDomRef}
        onMouseEnter={ e => { data.hover = true } }
        onMouseLeave={ e => { data.hover = false } }
        css={css`
            display: inline-block;
            border: 1px ${palette.text.disabled} solid;
            border-radius: 5px;
            background: ${palette.bgSub};
            z-index: 100;
            margin: 0;
            padding: 2px 8px;
            line-height: 2rem;
            position: absolute;
            ${ (showStatus !== 'show')? 'white-space: nowrap; ' : '' }
            ${ (showStatus === 'none')? 'display: none; ' : '' }
            ${ (showStatus === 'processing')? 'visibility:hidden;' : ''
            }
            top: calc(${y}px + 8px);
            left: calc(${data.x}px);
        `}
    >
        {jsx}
    </div>)

}
