import {css} from '@emotion/react'
import {defaultTheme, isDark} from '@/Components/DefaultThemeProvider'
import * as colors from '@mui/material/colors'
import Stack from '@mui/material/Stack';
import { Link } from '@inertiajs/react'

import Button from '@mui/lab/LoadingButton';

/** @jsxImportSource @emotion/react */
export default function BookIconButton({bookOrWord}) {
    const palette = defaultTheme().palette


    // 本のページの側面の色
    const bookSideColor = isDark()
        ? colors.blue[400]
        : colors.blue[400]
    // 本のページ側面の土台の色（上気が透過）
    const bookSideBgColor = isDark()? '#ccc' : '#fff'

    // 本の表紙の色
    const bookCoverColor = isDark()
        ? colors.blue[500]
        : colors.blue[600]
    // 本の表紙裏の色
    const bookCoverBackColor = colors.blue[800];
    // 本の表紙の文字色
    const bookCoverFontColor = isDark()
        ? colors.blue[50]
        : colors.blue[50]

    // 本のサイズ
    const bookWidth = '52px'
    const bookHeight = '64px'





    return (<Button
        component={ Link }
        href={route('main.book', {book_id: bookOrWord.id})}
        css={css`
            text-transform: none;
            margin: 30px;
            padding: 0;
            position: relative;
            display: inline-block;
            transition: all 0.2s;
            & > div {
                margin: 0;
            }
            // & > span *:nth-of-type(1){
            //     border-radius: 50% 50%;
            //     box-shadow: 0 0 100px 0 #fff inset;
            // }
        `}
    >

        {/* 上部 */}
        <div css={css`
            width: calc( ${bookWidth} - 1px);
            height: 7px;

            border: 0px ${bookCoverBackColor} solid;
            border-left-width: 9px;
            border-top-width: 2px;
            border-radius: 0 4px 0 0;

            transform-origin: 0% 100%;
            transform: skewX(-60deg);

            box-shadow: 0px 2px 0px 0px ${bookCoverBackColor} inset;
            font-size: 0.9rem;
            color: #0000;
        `}>

            {/* 上部のページ側面 */}
            <div css={css`
                width: calc(100% );
                height: calc(100% - 0px);
                margin-top: 2px;

                background: ${bookSideBgColor};
                box-shadow: 1px 1px 3px 0px ${bookSideColor} inset;
            `}></div>
        </div>


        <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={0}
        >

            {/* 表紙 */}
            <div css={css`
                display:flex;
                align-items: center;
                justify-content: center;

                width: ${bookWidth};
                height: ${bookHeight};

                border:2px ${bookCoverColor} solid;
                border-radius: 3px 5px 0 5px;
                background: ${bookCoverColor};

                text-align: center;
                font-size: 0.85rem;
                color: ${bookCoverFontColor};
            `}>
                Open<br />
                開く
            </div>

            {/* 右部 */}
            <div css={css`
                display: inline-block;
                width: 10px;
                height: calc( ${bookHeight} + 1px );

                border: 0px ${bookCoverBackColor} solid;
                border-right-width: 2px;
                // border-top-width: 2px;
                // border-bottom-width: 1px;
                transform: translate(-1px, -6px);
                box-shadow:
                    -4px 0px 0px 0px ${bookCoverBackColor} inset;
            `}>
                {/* 右部のページ側面 */}
                <div
                    css={css`
                    // display:none;
                        width: calc(100% - 2px);
                        height: calc(100% - 3px);
                        // margin:1px 0;
                        transform-origin: -1px 100%;
                        transform:
                            skew(0deg, -30deg)
                            translate(-0px, 7px);
                        ;
                        background: ${bookSideBgColor};
                        box-shadow: 1px 1px 6px 0px ${bookSideColor} inset;
                    `}
                ></div>
            </div>


        </Stack>




    </Button>)
}
