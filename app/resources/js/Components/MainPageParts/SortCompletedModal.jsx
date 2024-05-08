
import { defaultTheme } from '@/Components/DefaultThemeProvider'
import {css} from '@emotion/react'
import { useRef, useLayoutEffect } from 'react'

import { Button } from '@mui/material'

/** @jsxImportSource @emotion/react */
export default function SortCompletedModal({isSortCompleted, setIsSortCompleted}) {

    const palette = defaultTheme().palette

    const domRef = useRef(null)



    // 並び替え完了表示になった時のアニメーション。
    useLayoutEffect( () => {
        if (!isSortCompleted) return
        domRef.current.animate([
            {opacity: 0},
            {opacity: 1},
        ], 100)

    }, [isSortCompleted])





    if (!isSortCompleted) return ('')

    return (<div
        ref={domRef}
        css={css`
            position: fixed;
            background: #0003;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        `}
    >

        <div css={css`
            background: ${palette.bgSub};
            padding: 16px 12px;
            border-radius: 4px;
            text-align: center;
        `}>
            <div>並び替えが適用されました。</div>
            <Button
                variant="contained"
                color="secondary"
                onClick={ e => setIsSortCompleted(false) }
                css={css` margin-top: 16px; `}
            >OK</Button>
        </div>

    </div>)
}
