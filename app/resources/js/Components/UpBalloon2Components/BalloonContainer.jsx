import { css } from "@emotion/react";
import { defaultTheme } from "@/Components/DefaultThemeProvider";


/** @jsxImportSource @emotion/react */
export default function BalloonContainer() {
    const palette = defaultTheme().palette


    return (<div css={css`
        display: inline-block;
        border: 1px ${palette.text.disabled} solid;
        border-radius: 5px;
        background: ${palette.bgSub};
        margin: 0;
        padding: 2px 8px;
        line-height: 2rem;
        position: absolute;
    `}>

    </div>)
}
