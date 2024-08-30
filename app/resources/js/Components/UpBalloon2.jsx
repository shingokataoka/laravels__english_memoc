import {useEffect, useLayoutEffect, useState, useRef, forwardRef} from 'react'

import {defaultTheme} from '@/Components/DefaultThemeProvider'
import {css} from '@emotion/react'
import UpArrow from './UpBalloon2Components/UpArrow'
import BalloonBody from '@/Components/UpBalloon2Components/BalloonBody'


// 設計・使い方。
// 配置する場所。
//     そのページの一番親階層の左上x=0, y=0にこの<upBalloon2 />を置く。
//     上記の一番親階層の要素をposition: relative; にする必要がある。
// バルーンのpropsで制御する
/*
const [upBalloonProps, setUpBalloonProps] = useState( {
    showStatus: 'none',   // 表示管理。'none'、'processing'=表示準備中(座標計算など)、'show'
    x: 0,   // 絶対座標。表示位置。矢印の先端がこの位置になる。
    y: 0,   // 絶対座標。表示位置。矢印の先端がこの位置になる。
    jsx: <>バルーンの中身JSX</>,  // バルーン内に表示するSJXを指定。
} )
*/

// 非表示の条件。
//     バルーンの外でクリック（つまりバルーンにホバーしてない状態でクリック）
// 要素の幅。
//     BalloonDummyダミーバルーンを作成。

// バルーンのコンポーネント構成。
//     バルーンのコンテナ（座標や幅は管理しない。）
//     バルーン本体（ここで座標と幅を管理）、子にバルーンコンテナ。
//     ダミーバルーン（ここで幅を取得）、子にバルーンコンテナ。



/** @jsxImportSource @emotion/react */
export default function UpBalloon2({
    upBalloonProps,
    setUpBalloonProps,
}) {
    const palette = defaultTheme().palette








    return (<>

        <UpArrow
            upBalloonProps={upBalloonProps}
            setUpBalloonProps={setUpBalloonProps}
        />

        <BalloonBody
            upBalloonProps={upBalloonProps}
            setUpBalloonProps={setUpBalloonProps}
        />


    </>)

}









// cssオブジェクトを返す関数。ダミーバルーンとバルーン共通
const cssForBalloon = ({cssX, cssY}) => {
    const palette = defaultTheme().palette

    return css`
            display: inline-block;
            border: 1px ${palette.text.disabled} solid;
            border-radius: 5px;
            background: ${palette.bgSub};
            margin: 0;
            padding: 2px 8px;
            line-height: 2rem;
            position: absolute;
            top: ${cssY}px;
            left: ${cssX}px;
        `
}





// バルーン本体（テキストを囲む部分）のコンポーネント。
const Balloon = ({
    upBalloonProps,
    setUpBalloonProps,
    bookPageMainLeft,
    wordCenterX,
    wordBottomY,
}) => {
    const {isBalloonHover, hoverWordIndex, isShow, dummyW, text} = {...upBalloonProps}


    const currentDomRef = useRef(null)


    // バルーンの幅を算出
    // まずは普通の幅に設定。
    let w = dummyW

    // htmlタグの幅 - 8x2 を超えるなら、この幅にする。
    if (dummyW > window.innerWidth - 8 * 2 - 8 * 2)
    { w = window.innerWidth - 8 * 2 - 8 * 2 }



    // バルーンのx位置を算出
    // まずは、英単語に対してセンター位置。
    let cssX =  wordCenterX - w / 2
    let x = cssX + bookPageMainLeft
    // 左がはみ出た場合は、画面左端から8pxにずらす。
    if (x < 8){
        cssX = -bookPageMainLeft + 8
        x = cssX + bookPageMainLeft
    }


    const viewRight = document.querySelector('html').clientWidth - 8
    //右がはみ出た場合は、画面右端から8pxにずらす。
    if (x + w > viewRight) {
        // はみ出た幅のぶんを算出。
        const diffW = (x + w) - viewRight
        // はみ出た幅の分をx座標から引く。
        cssX = cssX - diffW
        x = cssX + bookPageMainLeft
    }


    const cssY = wordBottomY + 10


    const cssObj = css`
        ${ cssForBalloon({cssX ,cssY}) }
        width: ${w}px;
        z-index: 100;
    `


    // バルーンにホバーしたら
    const handleMouseEnter = () => {
        setUpBalloonProps(value => {
            return {
                ...value,
                isBalloonHover: true,
            }
        })
    }
    // バルーンのホバーが外れたら
    const handleMouseLeave = () => {
        setUpBalloonProps(value => {
            return {
                ...value,
                isBalloonHover: false,
            }
        })
    }


    // バルーンを消す関数。
    const hideUpBalloon = () => {
        setUpBalloonProps({
            isBalloonHover: false,
            hoverWordIndex: null,
            dummyW: 0,
            isShow: false,
            x: 0,
            y: 0,
            wordIndex: null,
            text: 'なし',
        })
    }




    // 英単語とバルーン以外をクリックしたら、バルーンを消す。
    // useEffectに登録する用の関数。
    const clickHideUpBalloon = () => {
        // 英単語にホバーしているなら処理しない。
        if (hoverWordIndex === upBalloonProps.wordIndex) return

        // バルーンにホバーしているなら処理しない。
        if (isBalloonHover === true) return

        hideUpBalloon()
    }

    // 関数clickHideUpBalloonをイベントリスナに登録。
    useEffect( () => {
        window.addEventListener('mousedown', clickHideUpBalloon)
        return () => {
            window.removeEventListener('mousedown', clickHideUpBalloon)
        }
    }, [upBalloonProps])



    // ブラウザ幅を変えたらバルーンを消す。
    useEffect( () => {
        window.addEventListener('resize', hideUpBalloon)
        return () => {
            window.removeEventListener('resize', hideUpBalloon)
        }
    }, [])



    if (!isShow) return ''


    return (<div
        ref={currentDomRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        css={cssObj}
    >{text}</div>)
}




