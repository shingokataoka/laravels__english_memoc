import { css } from "@emotion/react"
import  { DefaultThemeProvider }  from "@/Components/DefaultThemeProvider"

/** @jsxImportSource @emotion/react */
export default function TopPage({auth}){
    return (<DefaultThemeProvider>
        <p css={css`color:red;`}>aa</p>
    </DefaultThemeProvider>)
}
