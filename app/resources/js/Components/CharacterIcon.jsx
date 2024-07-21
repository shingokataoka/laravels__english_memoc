import {css} from '@emotion/react'



/** @jsxImportSource @emotion/react */
export default function CharacterIcon() {





    // キャラアイコン画像JSX。
    return (
        <div css={css`
            display: inline-block;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            background-image: url('/images/characters/life_gauge.jpg');
            background-size: 95px 95px;
            background-position: center -20px;
            background-repeat: no-repeat;
        `} />
    )

}
