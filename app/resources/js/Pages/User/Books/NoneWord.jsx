import {router} from '@inertiajs/react'

import {defaultTheme, DefaultThemeProvider} from '@/Components/DefaultThemeProvider'
import {css} from '@emotion/react'

import {Link} from '@inertiajs/react'

import { Stack } from '@mui/material'
import {Button} from '@mui/material'



/** @jsxImportSource @emotion/react */
export default function NoneWord({backUrl}) {





    return (<DefaultThemeProvider>
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        css={css`
            height: 100vh;
        `}
    >
        <div>まだ本の中身にセリフがありません。</div>
        <Button
            variant="contained"
            color="secondary"
            component={Link}
            href={backUrl}
        >戻る</Button>
    </Stack>
    </DefaultThemeProvider>)
}
