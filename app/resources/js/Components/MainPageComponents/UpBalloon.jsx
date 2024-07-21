import {useEffect, useLayoutEffect, useState, useRef, forwardRef} from 'react'

import {defaultTheme} from '@/Components/DefaultThemeProvider'
import {css} from '@emotion/react'


/** @jsxImportSource @emotion/react */
export default function UpBalloon({
    bookPageMainDomRef,
    upBalloonProps,
    setUpBalloonProps,
}) {
    const palette = defaultTheme().palette

    const dummyDomRef = useRef(null)

    const {dummyW, isShow, wordIndex} = {...upBalloonProps}


    // 座標を算出する。

    // まずBookPageMainの座標・サイズ情報を取得しておく。
    let bookPageMainRect = null
    let bookPageMainLeft = 0
    let bookPageMainTop = 0
    if (bookPageMainDomRef.current !== null) {
        bookPageMainRect = bookPageMainDomRef.current.getBoundingClientRect()
        bookPageMainLeft = bookPageMainRect.left
        bookPageMainTop = bookPageMainRect.top + window.scrollY
    }


    // 英単語の中心x位置。
    const wordCenterX = - bookPageMainLeft + upBalloonProps.x - 8
    // 英単語の下部分Y位置。
    const wordBottomY = upBalloonProps.y - bookPageMainTop


    // フォーカスされたらダミーバルーンの幅を取得する。
    useEffect( () => {
        if (wordIndex === null) return

        const dummyRect = dummyDomRef.current.getBoundingClientRect()
        setUpBalloonProps(value => {
            return {
                ...value,
                dummyW: dummyRect.width,
            }
        })
    }, [wordIndex])



    // フォーカス後にダミーバルーンの幅が更新されたら、バルーンを表示する。
    useEffect( () => {
        if (wordIndex === null) return

        setUpBalloonProps(value => {
            return {
                ...value,
                isShow: true,
            }
        })
    }, [dummyW])


    return (<>
        <UpArrow
            isShow={isShow}
            wordCenterX={wordCenterX}
            wordBottomY={wordBottomY}
        />

        <DummyBalloon
            ref={dummyDomRef}
            bookPageMainDomRef={bookPageMainDomRef}
            upBalloonProps={upBalloonProps}
        />

        <Balloon
            upBalloonProps={upBalloonProps}
            setUpBalloonProps={setUpBalloonProps}
            bookPageMainLeft={bookPageMainLeft}
            wordCenterX={wordCenterX}
            wordBottomY={wordBottomY}
        />
    </>)

}




// 上矢印のコンポーネント。
const UpArrow = ({
    isShow,
    wordCenterX,
    wordBottomY,
}) => {

    if (!isShow) return ''

    const palette = defaultTheme().palette

    const y = wordBottomY - 6
    const x = wordCenterX


    return (<>
        <div css={css`
            display: inline-block;
            border: 8px ${palette.text.disabled} solid;
            border-top-color: #0000;
            border-left-color: #0000;
            border-right-color: #0000;
            z-index: 100;
            position: absolute;
            top: ${y}px;
            left: ${x}px;
        `} />
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





// 下記バルーンをダミーにしたコンポーネント。
// サイズ測定用
// バルーン本体（テキストを囲む部分）のコンポーネント。
const DummyBalloon = forwardRef( ({
    upBalloonProps,
}, ref) => {
    const {text} = {...upBalloonProps}

    const cssY = 0
    const cssX =  0

    const cssObj = css`
        ${ cssForBalloon({cssX, cssY}) }
        user-select: none;
    `


    return (<div css={css`
        position: fixed;
        top:0;
        left:0;
        visibility: hidden;
        // background:pink;
        width: 500%;
        height: 200px;
        z-index: 100;
    `}>

        <div
            ref={ref}
            css={ cssObj }
        >{text}</div>

    </div>)
})





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
        // console.log('発動')
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




