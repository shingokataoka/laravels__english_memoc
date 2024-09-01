import {useState, useRef, useEffect} from 'react'

import {css} from '@emotion/react'
import { defaultTheme } from '@/Components/DefaultThemeProvider'

import {Button} from '@mui/material'
import {Link} from '@inertiajs/react'



// 「アプリと英会話する」リンクボタン。
/** @jsxImportSource @emotion/react */
export default function ApiTalkLinkButton({}) {
    const palette = defaultTheme().palette




    return (<>
        <Button variant="outlined"
            component={Link}
            href={route('talk_to_app.voice_select')}
            css={css`
                border: 1px ${palette.primary.main} solid;
                font-weight: bold;
            `}
        >アプリと英会話する</Button>
      </>)
}
