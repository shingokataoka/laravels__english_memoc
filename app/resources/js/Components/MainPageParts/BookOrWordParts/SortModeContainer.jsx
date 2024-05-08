import {css} from '@emotion/react'

import { useEffect, useRef } from 'react'

import BookOrWordBlurContainer from '@/Components/MainPageParts/BookOrWordParts/BookOrWordBlurContainer'
import SortOrderButton from '@/Components/MainPageParts/BookOrWordParts/SortOrderButton'

/** @jsxImportSource @emotion/react */
export default function SortModeContainer(props) {

    const {index, replacementIndex0, replacementIndex1, setReplacementIndex0, setReplacementIndex1, bookOrWordDomRefs, bookOrWords, bookOrWord, isSortMode} = props

    const domRef = useRef(null)




    // 並び替えモードになった時のアニメーション処理。
    useEffect( () => {
        if (!isSortMode) return
        domRef.current.animate([
            {opacity: 0},
            {opacity: 1},
        ], 100)
    }, [isSortMode])





    if (!isSortMode) return

    return (<BookOrWordBlurContainer
        ref={domRef}
        css={css`
            padding: 0 3px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 12px;
        `}
    >
        <SortOrderButton
            index={index}
            replacementIndex0={replacementIndex0}
            replacementIndex1={replacementIndex1}
            setReplacementIndex0={setReplacementIndex0}
            setReplacementIndex1={setReplacementIndex1}
            bookOrWordDomRefs={bookOrWordDomRefs}
            bookOrWords={bookOrWords}
            bookOrWord={bookOrWord}
        />
        <SortOrderButton direction="down"
            index={index}
            replacementIndex0={replacementIndex0}
            replacementIndex1={replacementIndex1}
            setReplacementIndex0={setReplacementIndex0}
            setReplacementIndex1={setReplacementIndex1}
            bookOrWordDomRefs={bookOrWordDomRefs}
            bookOrWords={bookOrWords}
            bookOrWord={bookOrWord}
        />
    </BookOrWordBlurContainer>)
}
