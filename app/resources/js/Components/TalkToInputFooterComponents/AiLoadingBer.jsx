import { css } from "@emotion/react";

import LoadingIcon from '@/Components/LoadingIcon'
import { useLayoutEffect, useRef } from "react";




/** @jsxImportSource @emotion/react */
export default function AiLoadingBer() {


    // 「...AI考え中...」のDOM。
    const loadingTextDomRef = useRef(null)




    // 「...AI考え中...」のフェード点滅アニメーションをセット。
    useLayoutEffect( () => {
        loadingTextDomRef.current.animate([
            {opacity:0.5},
            {opacity:1},
            {opacity:0.5},
        ],
        {
            duration: 1500,
            iterations: Infinity,
        })
    }, [])





    return (
            <div css={css`
                display:flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
            `}>
                <LoadingIcon />
                <div
                    ref={loadingTextDomRef}
                >...AI考え中...</div>
            </div>


    )
}
