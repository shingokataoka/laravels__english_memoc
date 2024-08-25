import { memo, useState, useEffect, useRef } from "react";

import { css } from "@emotion/react";
import { defaultTheme } from "../DefaultThemeProvider";
import Line from "@/Components/TalkToAppComponents/Line";
import CharacterIcon from "@/Components/CharacterIcon";



// アプリ側のセリフのコンポーネント。
/** @jsxImportSource @emotion/react */
export default function LineOfApp({
    // lineの中身 {
    //     index: 0 or 1 or 2 Lineコンポーネントの英文など表示のアニメをさせない管理で使う,
    //     who: 'ai' or 'user',
    //     englishLine: `英語セリフ`,
    //     japaneseLine: '日本語セリフ'
    // },
    line,
    checkTranslations = false,
    setCheckTranslations = null,
}) {

    const palette = defaultTheme().palette




    return (
        <div
            css={css`
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                padding: 16px 12px;
            `}
        >
            {/* アプリキャラのアイコン。 */}
            <div>
                <CharacterIcon />
            </div>

            {/* 左矢印。 */}
            <div css={css`
                margin-top: 10px;
                border: 5px #0000 solid;
                border-right-color: ${palette.bgSub};
                transform:
                    scaleX(5)
                    rotate(25deg);
            `} />

            {/* セリフを囲む枠線。 */}
            <div css={css`
                margin-left: 9px;
                width: 400px;
                background: ${palette.bgSub};
                border-radius: 8px;
                padding: 12px;
            `}>
                {/* セリフ。 */}
                <Line
                    line={line}
                    checkTranslations={checkTranslations}
                    setCheckTranslations={setCheckTranslations}
                />
            </div>

        </div>
    )


}
