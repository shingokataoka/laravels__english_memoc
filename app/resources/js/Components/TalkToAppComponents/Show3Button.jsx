import {useContext} from 'react'
import { Show3ButtonContext } from '@/Pages/User/TalkToApp';

import {css} from '@emotion/react'
import {defaultTheme} from '@/Components/DefaultThemeProvider'


import { Button } from "@mui/material";
import Show3ButtonIcon from './Show3ButtonIcon';


/** @jsxImportSource @emotion/react */
export default function Show3Button({
    showNumber,
    setShowNumber,
    settingText = '',   // オールボタン「設定：」を入れる。
}) {
    const palette = defaultTheme().palette

    // デフォのセリフ文の表示設定を管理useState。
    const {showLineStatus, setShowLineStatus} = useContext(Show3ButtonContext)



    // ボタンのテキスト。
    const buttonText = {
        none: '文の表示なし',
        en: '英文のみ表示',
        'en+ja': '和文も表示',
    }



    const handleClick = e => {
        if (showLineStatus === 'none') setShowLineStatus('en')
        if (showLineStatus === 'en') setShowLineStatus('en+ja')
        if (showLineStatus === 'en+ja') setShowLineStatus('none')
    }



    return (<button
        onClick={handleClick}
        css={css`
            display: flex;
            align-items: center;
            width: 204px;
            border-radius: 4px;
            background: ${palette.primary.main};
            padding: 6px;
            color: ${palette.bgBack};
            font-weight: bold;
        `}
    >
        <Show3ButtonIcon />
        <div css={css`flex: 1;`}>{settingText}{buttonText[showLineStatus]}</div>
    </button>)
}
