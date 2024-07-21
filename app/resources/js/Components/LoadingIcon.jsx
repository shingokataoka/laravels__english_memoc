import {useLayoutEffect, useRef} from 'react'

import {css} from '@emotion/react'




/** @jsxImportSource @emotion/react */
export default function LoadingIcon() {

    // ローディングアイコンのdom。
    const iconDomRef = useRef(null)

    // ローディングアイコンの回転アニメーションをセット。
    useLayoutEffect( () => {
        iconDomRef.current.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ], {
            duration: 1200,
            iterations: Infinity,
        })
    }, [])



    return (
        <div
            ref={iconDomRef}
            css={css`
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 3px #c8c8c8 solid;
                border-right-color: #ddd3;
            `}
        />
    )

}
