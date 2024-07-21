import {router} from '@inertiajs/react'

import { css } from "@emotion/react"
import {defaultTheme} from '@/Components/DefaultThemeProvider'

import { Button } from "@mui/material"



/** @jsxImportSource @emotion/react */
export default function MainLinkButton({
    linkUrl = route('main.top'),
    buttonText = 'メインページへ戻る',
    // クリック後に、追加したい処理の関数。
    addFunc = () => {},
}) {
    const palette = defaultTheme().palette



    // 「メインページへ戻る」ボタンを押した処理。
    const topLinkClick = e => {
        addFunc()

        router.visit( linkUrl, {
            method: 'get',
        })
    }




    return (
        <Button
            onClick={topLinkClick}
            css={css`
                box-shadow: 0 0 13px 0 ${palette.primary.main} inset;
            `}
        >{buttonText}</Button>
    )
}
