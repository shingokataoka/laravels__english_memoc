import { usePage } from '@inertiajs/react'

import {css} from '@emotion/react'

import CssBaseline from '@mui/material/CssBaseline'
import * as colors from '@mui/material/colors'
import {createTheme} from '@mui/material'
import {ThemeProvider} from '@emotion/react'
import useMediaQuery from '@mui/material/useMediaQuery'

// ブレークポイントを設定
const breakpointsObj = {
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 640,
            laptop: 1024,
            desktop: 1200,
        },
    },
}





// lightモードの自作デフォルトthemeのカラーを指定
const lightTheme = {
    palette: {
        mode: 'light',
        // デフォルトのフォントカラー
        text: {primary: '#333'},
        bgMain: colors.grey[100],
        bgSub: colors.grey[200],
        bgBack: colors.grey[300],
    },
}





// darkモードの自作デフォルトthemeのカラー設定
const darkTheme = {
    palette: {
        mode: 'dark',
        // デフォルトのフォントカラー
        text: {primary: '#eee'},
        bgMain: colors.grey[700],
        bgSub: colors.grey[800],
        bgBack: colors.grey[900],
    }
}





export function isDark() {
    // ダークモード=true、普通モード=false を取得
    // useMediaQuery()は、コンポーネントまたはカスタムフック内のトップレベルに書くこと
    // ログイン済みなら、ユーザー設定のis_darkを返す。
    if( usePage().props.user_setting ) {
        const isDark = usePage().props.user_setting.is_dark
        return isDark
    }
    // 未ログインなら、スマホやPCの設定がダークモードならtrueを返す。
    return useMediaQuery('(prefers-color-scheme: dark)');
}





export function defaultTheme() {
    const themeObj = isDark() ? darkTheme : lightTheme
    return createTheme({
        ...themeObj,
        ...breakpointsObj,
    })
}



/** @jsxImportSource @emotion/react */
export function DefaultThemeProvider(props) {
    const theme = defaultTheme()
    return (<div css={css`
        transition: all 0.25s;
        background: ${theme.palette.background.default};
        min-height: 100vh;
        margin:0;
        padding:0;
    `}>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        { props.children }
    </ThemeProvider>
    </div>)
}
