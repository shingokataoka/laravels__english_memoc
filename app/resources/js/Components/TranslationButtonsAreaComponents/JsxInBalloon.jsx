import { css } from "@emotion/react";
import {defaultTheme} from '@/Components/DefaultThemeProvider'



/** @jsxImportSource @emotion/react */
export default function JsxInBalloon({
    children,   // 和訳jsxか「辞書にないよjsx」をこのchildrenで受け取る。
}) {

    const palette = defaultTheme().palette


    return (<div css={css`
        text-align: center;
    `}>
        {children}
        <hr css={css` border-color: ${palette.text.disabled} `} />
        <span css={css`font-size: 0.8rem;`}>
            利用辞書
            <a
                target="_blank"
                href="https://kujirahand.com/web-tools/EJDictFreeDL.php"
                css={css`
                    color: ${palette.info.main};
                    font-size: 0.8rem;
                    text-decoration: underline;
                    &:hover{ background: #29b6a633; }
                `}
            >「ejdict-hand」（パブリックドメイン）</a>
            と当サイトが追加した単語集
        </span>
        。
    </div>)

}
