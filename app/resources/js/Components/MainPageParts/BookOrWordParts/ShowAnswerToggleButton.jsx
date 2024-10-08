import {useRef, useEffect, useState} from 'react'

import {css} from '@emotion/react'
import {defaultTheme} from '@/Components/DefaultThemeProvider'

import Stack from '@mui/material/Stack';
import {Button} from '@mui/material'

import ShowToggleButton from '@/Components/MainPageParts/ShowToggleButton'

/** @jsxImportSource @emotion/react */
export default function ShowAnswerToggleButton({
    /* boolean */ isEnglishFirstPosition,
    /* useRefの配列内のObj */ bookOrWord,
    /* useState setFunction */ setToggleAnswerRender,
    className,
    }) {

    const answerLanguageRef = useRef('')
    const [answerLanguage, setIsAnswerLanguage] = useState( isEnglishFirstPosition
        ? '日本語'
        : '英語'
    )

    useEffect( () => {
        setIsAnswerLanguage( isEnglishFirstPosition? '日本語' : '英語')
    }, [isEnglishFirstPosition])


    // 「日本語を見る」or「日本語を隠す」ボタンを押した時の表示の切替。
    const toggleShow = () => {
        bookOrWord.isShowAnswer = ! bookOrWord.isShowAnswer
        setToggleAnswerRender(value => !value)
    }




    return (<ShowToggleButton
    /* function */ onClick={ toggleShow }
    /* boolean */ isShow={bookOrWord.isShowAnswer}
    /* string */ showButtonText={ `${answerLanguage}を見る` }
    /* string */ hideButtonText={ `${answerLanguage}を隠す` }
    className={className}
    />)
}
