import { usePage } from '@inertiajs/react'

import CssBaseline from '@mui/material/CssBaseline'
import * as colors from '@mui/material/colors'
import {createTheme} from '@mui/material'
import {ThemeProvider} from '@emotion/react'


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
    const isDark = usePage().props.user_setting.is_dark
    return isDark
}





export function defaultTheme() {
    const themeObj = isDark() ? darkTheme : lightTheme
    return createTheme({
        ...themeObj,
        ...breakpointsObj,
    })
}




export function DefaultThemeProvider(props) {
    const theme = defaultTheme()
    return (<>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        { props.children }
    </ThemeProvider>
    </>)
}
