import {css} from '@emotion/react'
import {defaultTheme} from '@/Components/DefaultThemeProvider'

import Stack from '@mui/material/Stack';
import {Button} from '@mui/material'

/** @jsxImportSource @emotion/react */
export default function ShowToggleButton({
    /* function */ onClick,
    /* boolean */ isShow,
    /* string */ showButtonText,
    /* string */ hideButtonText,
    className,
    }) {
    const palette = defaultTheme().palette

    const displayText = isShow? hideButtonText : showButtonText



    return (<>

    <Button
        onClick={onClick}
        variant="contained"
        color="info"
        className={ className }
        css={css`
            padding: 6px 4px 6px 3px;
            text-transform: none;
            font-size:0.7rem;
            width: calc(10em);
        `}
    >

        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
        >
            <div
                css={css`
                    padding-right: 1px;
                    transition: all 0.25s;
                    transform-origin: 50% 46%;
                    ${ isShow ? 'transform: rotate(180deg);' : ''}
                `}
            >
                ▼
            </div>
            <div>
                {displayText}
            </div>
        </Stack>
    </Button>

    </>)
}
