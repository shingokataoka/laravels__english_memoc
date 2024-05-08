import {css} from '@emotion/react'
import {isDark} from '@/Components/DefaultThemeProvider'
import { colors } from '@mui/material';

import ForwardIcon from '@mui/icons-material/Forward';
import { useEffect, useLayoutEffect, useRef } from 'react';





/** @jsxImportSource @emotion/react */
export default function SortOrderButton(props) {

    const { direction, index, replacementIndex0, replacementIndex1, setReplacementIndex0, setReplacementIndex1, bookOrWordDomRefs, bookOrWords, bookOrWord } = props

    const buttonRef = useRef(null)

    const activeBgColor = isDark()? colors.grey[400] : colors.grey[100]
    const defaultBgColor = isDark()? colors.grey[300] : colors.grey[200]
    const fontColor = isDark()? colors.grey[500] : colors.grey[200]

    const arrowRotate = (direction === 'down')? '90deg' : '-90deg'

    const replacementIndex =(direction === 'down')? index + 1 : index - 1



    // ボタンのopacityアニメーションをセットする。
    useEffect( () => {
        buttonRef.current.animate([
            {opacity: 0.7},
            {opacity: 1},
            {opacity: 0.7},
        ], {
            duration: 1200,
            iterations: Infinity,
        })
    }, [])



    // 並び替えの実装
    // bookOrWordsのindexとindex-1(or+1)を入れ替える。
    // アニメーションもセットする。
    // アニメーション終了後に、入替レンダリング用のuseStateをnullに戻す。
    const replacementBookOrWord = () => {
        // index-1(or+1)がなければ処理しない。
        if ( !(replacementIndex in bookOrWordDomRefs) ) return
        // レンダリングのため、useStateにこのindexと相手のindexを入れる。
        setReplacementIndex0(index)
        setReplacementIndex1(replacementIndex)

        // indexとindex-1(or+1)のbookOrWordを入れ替える。
        bookOrWords[index] = bookOrWords[replacementIndex]
        bookOrWords[replacementIndex] = bookOrWord

                // このbookOrWordのdomと入れ替え相手のdomを取得
        const currentDom = bookOrWordDomRefs[index].current
        const replacementDom = bookOrWordDomRefs[replacementIndex].current

        // このbookOrWordの高さと入れ替え相手の高さを取得。
        const currentH = currentDom.getBoundingClientRect().height
        const replacementH = replacementDom.getBoundingClientRect().height

        // 移動距離を算。
        const diffY0 =(direction === 'down')? currentH : currentH * -1
        const diffY1 =(direction === 'down')? replacementH * -1 : replacementH

        // アニメーションをセット。
        const animateMSec = 150
        currentDom.animate([
            { transform: `translate(0, ${diffY0}px)` },
            { transform: `translate(0, 0)` },
        ], animateMSec)
        replacementDom.animate([
            { transform: `translate(0, ${diffY1}px)` },
            { transform: `translate(0, 0)` },
        ], animateMSec)

        // アニメーションが終わったら、レンダリング用useStateをnullに戻す。
        const timeoutObj = setTimeout( () => {
            setReplacementIndex0(null)
            setReplacementIndex1(null)
            clearTimeout(timeoutObj)
        }, animateMSec )

    }





    return (<button
        ref={buttonRef}
        onClick={ replacementBookOrWord }
        css={css`
            border-radius: 50% !important;
            width:60px;
            height:32px;
            background: ${defaultBgColor};
            &:active {
                background: ${activeBgColor};
            }
        `}
    >
        <ForwardIcon
            css={css`
                transform: rotate(${arrowRotate});
                color: ${fontColor};

            `}
        />
    </button>)
}
