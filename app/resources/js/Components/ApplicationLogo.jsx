import { usePage } from '@inertiajs/react';

import { css } from '@emotion/react'
import { defaultTheme } from '@/Components/DefaultThemeProvider';


/** @jsxImportSource @emotion/react */
export default function ApplicationLogo(props) {

    const appName = usePage().props.config.name
    const palette = defaultTheme().palette




    return (<div css={css`
        display: inline-block;
        text-align: center;
        background: ${ palette.bgSub }99;
        padding: 12px;
        border-radius: 4px;
        &:hover { background: ${palette.bgSub}; }
    `}>
        <div css={css`
            font-weight: bold;
            font-size: 1.5rem;
        `}>{ appName }</div>
        <div css={css`
            font-size: 1rem;
        `}>英会話をメモして再生できるwebアプリ</div>
    </div>
    );
}
