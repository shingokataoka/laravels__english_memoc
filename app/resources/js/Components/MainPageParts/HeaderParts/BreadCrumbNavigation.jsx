import React, {useEffect, useLayoutEffect, useState, useRef } from "react"
import { css } from "@emotion/react"

import {Link} from '@inertiajs/react'
import Button from '@mui/material/Button'

import Nl2br from '@/Functions/Nl2br'

/** @jsxImportSource @emotion/react */
export default function BreadCrumbNavigation({
    /* boolean */ isEnglishFirstPosition,
    /* array */ booksOfBreadCrumb,
}) {

    const booksOfBreadCrumbLength = booksOfBreadCrumb.length



    return (<div>
        { booksOfBreadCrumb.map( (book, index ) => (<React.Fragment key={index}>
            <BreadCrumbButtonComponent
                isEnglishFirstPosition={isEnglishFirstPosition}
                book={book}
            />
            { (booksOfBreadCrumbLength > index + 1)? '>' : '' }
        </React.Fragment>) ) }
    </div>)


}


function BreadCrumbButtonComponent (props) {
    const { isEnglishFirstPosition, book } = props
    const isFirstRenderRef = useRef(true)

    const word0Ref = useRef(null)
    const word1Ref = useRef(null)

    const [word0, setWord0] = useState(
        isEnglishFirstPosition? book.english_word : book.japanese_word
    )
    const [word1, setWord1] = useState(
        isEnglishFirstPosition? book.japanese_word : book.english_word
    )

    useLayoutEffect( () => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false
            return
        }
        // 移動前のword0とword1のサイズ・座標系を取得。
        const word0Rect = word0Ref.current.getBoundingClientRect()
        const word1Rect = word1Ref.current.getBoundingClientRect()

        // 入れ替え後（レンダリング後）からみての移動差分Yを算出。
        const word0DiffY = word0Rect.height
        const word1DiffY = word1Rect.height * -1

        // 移動アニメーションをセット。
        word0Ref.current.animate([
            { transform: `translate(0px, ${word0DiffY}px)` },
            { transform: `translate(0px, 0px)` },
        ], 100)
        word1Ref.current.animate([
            { transform: `translate(0px, ${word1DiffY}px)` },
            { transform: `translate(0px, 0px)` },
        ], 100)

        // 英語と日本語を入れ替え。
        if ( isEnglishFirstPosition ) {
            setWord0(book.english_word)
            setWord1(book.japanese_word)
        } else {
            setWord0(book.japanese_word)
            setWord1(book.english_word)
        }

    }, [isEnglishFirstPosition] )



    return (<Button
        component={Link}
        href={ (book.id === 1)
            ? route('main.top')
            : route('main.book', {book_id: book.id})
        }
        variant="outlined"
        css={css`
            text-transform: none;
            margin-bottom: 6px;
            padding: 2px 3px;
            font-size: 0.8rem;
            line-height: 1em;
        `}
    >
        <div>
            <div ref={word0Ref}>{ Nl2br(word0) }</div>
            <div ref={word1Ref}>{ Nl2br(word1) }</div>
        </div>
    </Button>)
}
