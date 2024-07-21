
import { css } from "@emotion/react"
import { defaultTheme } from "../DefaultThemeProvider"

import MainLinkButton from "./MainLinkButon"
import CharacterIcon from "../CharacterIcon"
import TalkBgmPlayer from "./TalkBgmPlayer"



/** @jsxImportSource @emotion/react */
export default function TalkToAppHeader({

}) {
    const palette = defaultTheme().palette




    return (
    <div css={css`
            padding: 16px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 16px;
            background: ${palette.bgSub};
        `}>
        {/* 「トップページへ戻る」ボタン */}
        <MainLinkButton />

        {/* キャラのアイコンとページタイトル「英会話モード」。 */}
        <div css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
        `}>
            <CharacterIcon />
            <span css={css`
                font-size: 1.2rem;
                font-weight: bold;
            `}>英会話モード</span>
        </div>

        {/* BGM再生プレイヤー。 */}
        <TalkBgmPlayer />
    </div>
    )
}
