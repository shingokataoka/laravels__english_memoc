import { memo, useState, } from "react";

import { css } from "@emotion/react";
import { defaultTheme, isDark, } from "../DefaultThemeProvider";
import Line from "@/Components/TalkToAppComponents/Line";



// アプリ側のセリフのコンポーネント。
/** @jsxImportSource @emotion/react */
export default memo(LineOfUser)
function LineOfUser({
    line,
    checkTranslations = false,
    setCheckTranslations = null,
}) {

    const palette = defaultTheme().palette
    const isLight = !isDark()





    return (
        <div css={css`
            display: flex;
            flex-direction: row-reverse;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 16px 12px;
            // アニメーションでx方向スクロールバーになるのを防ぐpadding-right。
            // 理由は、transformで右矢印変形してるから、右にはみ出るから。
            padding-right: 35px;
        `}>

            {/* 右矢印。 */}
            <div css={css`
                margin-top: 10px;
                border: 5px #0000 solid;
                border-left-color: ${isLight? '#dfd' : '#255'};
                transform:
                    scaleX(5)
                    rotate(-25deg);
            `} />
            {/* セリフを囲む枠線。 */}
            <div css={css`
                margin-right: 9px;
                width: 400px;
                background: ${isLight? '#dfd' : '#255'};
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
