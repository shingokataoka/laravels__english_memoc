import {usePage} from '@inertiajs/react'
import {css} from '@emotion/react'

import { defaultTheme } from '@/Components/DefaultThemeProvider'

import {Stack} from '@mui/material'
import {Button} from '@mui/material'
import {Link} from '@inertiajs/react'

import ShowAllAnswerToggleButton from '@/Components/MainPageParts/HeaderParts/ShowAllAnswerToggleButton'
import EnglishPositionToggleButton from '@/Components/MainPageParts/HeaderParts/EnglishPositionToggleButton'
import ApiTalkLinkButton from './ApiTalkLinkButton'



/** @jsxImportSource @emotion/react */
export default function TopPageHeader({
    /* useState boolean */ isEnglishFirstPosition,
    /* useState setFunction */ setIsEnglishFirstPosition,
    /* useState boolean */ isShowAllAnswer,
    /* useState setFunction */ setIsShowAllAnswer,
}) {
    const palette = defaultTheme().palette

    const appName = usePage().props.config.name
    return (<Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        css={css` padding: 8px 0 ; `}
    >


        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
        >

            <Button
                component={Link}
                href="/"
                css={css`
                    box-shadow: 0 0 13px 0 ${palette.primary.main} inset;
                `}
            >使い方</Button>

            <h1 css={css` font-weight: bold; `}>{ appName }</h1>
        </Stack>

        <ApiTalkLinkButton />



        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0}
        >
            <EnglishPositionToggleButton
                isEnglishFirstPosition={isEnglishFirstPosition}
                setIsEnglishFirstPosition={ setIsEnglishFirstPosition }
                css={css` margin-right: 2px; `}
            />
            <ShowAllAnswerToggleButton
                isEnglishFirstPosition={isEnglishFirstPosition}
                isShowAllAnswer={ isShowAllAnswer }
                setIsShowAllAnswer={setIsShowAllAnswer}
            />

        </Stack>
    </Stack>)
}
