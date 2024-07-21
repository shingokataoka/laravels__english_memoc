import {useState, useContext, memo} from 'react'

import {css} from '@emotion/react'
import {defaultTheme, isDark} from '@/Components/DefaultThemeProvider'

import TranslationButtonsArea from '@/Components/TranslationButtonsArea'

import { TextField } from "@mui/material"


import { TalkToInputFooterContext } from '@/Pages/User/TalkToApp'





// 英語の入力欄のコンポーネント
/** @jsxImportSource @emotion/react */
export default function TalkInput({
    userLineSubmit,
}) {
    const palette = defaultTheme().palette
    const focusLineColor = isDark()? palette.info.light : 'rgba(0, 250, 255, 1)'
    const isLight = !isDark()

    const [isShowTextField, setIsShowTextField] = useState(false)
    const [isShowSpellJsx, setIsShowSpellJsx] = useState(true)


    // useContext。TalkToInputFooter.jsxから値を受け取る。
    const {inputValue, setInputValue} = useContext(TalkToInputFooterContext)



    const textFieldCss = css`
        textarea { box-shadow: none; }
        width: 100%;
        & > div {
            background: none;
            padding: 6px;
        }
        fieldset {
            ${
                isDark()? 'border-color: rgba(255,255,255,0.23) !important;'
                : 'border-color: rgba(0,0,0,0.23) !important;'
            }
        }
    `



    const fontCss = css`
        font-size: 1rem;
        font-family: "Helvetica Neue",
            Arial,
            "Hiragino Kaku Gothic ProN",
            "Hiragino Sans",
            Meiryo,
            sans-serif;
    `




    // TextFiledにフォーカス時の処理。
    const handleFocus = e => {
        setIsShowSpellJsx(false)
        setIsShowTextField(true)
    }



    // TextFieldのフォーカスが外れた時の処理。
    const handleBlur = e => {
        setIsShowSpellJsx(true)
        setIsShowTextField(false)
    }



    // 入力欄のテキストが変わったら、useStateにテキストを入れる。
    const handleChange = e => {
        // 元のvalue + 改行なら「送信」ボタン押下イベントを実行。
        if (
            inputValue + '\r\n' === e.target.value
            || inputValue + '\r' === e.target.value
            || inputValue + '\n' === e.target.value
        ) {
            userLineSubmit()
            return
        }

        // 元のvalue + 改行 でなければ、念の為改行を除いて入力文字列を更新。
        const tmpValue = (e.target.value + '').replace(/(\r\n|\n|\r)/gm, '')
        setInputValue(tmpValue)
    }





    return (<div css={css`
        position: relative;
    `}>

        <div css={css`
            position: absolute;
            top: 0;
            bottom: 1px;
            left: 0;
            right: 0;

            ${fontCss}
            display:${isShowSpellJsx? 'block' : 'none'};
            width: 100%;
            padding: 6px;

            border-radius: 3px;
            background: ${palette.bgTextField};
        `}>
            <TranslationButtonsArea
                text={inputValue}
            />
        </div>

        <TextField
            multiline
            placeholder={'英語のセリフを入力'}
            value={inputValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            inputProps={{
                maxLength: 200,
            }}
            css={css`
                ${textFieldCss}
                ${fontCss}
                & > div {
                    ${ isShowTextField
                        ? `box-shadow: inset 0px 0px 7px 1px ${focusLineColor};`
                        : ''
                    }
                }
                & textarea {
                    ${fontCss}
                    line-height: 1.5rem;
                    ${ isShowTextField? '' : 'color: #0000;' }
                    :: placeholder {
                        color: ${ isLight? '#555' : '#fff' };
                    }
                }
            `}
        />

    </div>)
}
