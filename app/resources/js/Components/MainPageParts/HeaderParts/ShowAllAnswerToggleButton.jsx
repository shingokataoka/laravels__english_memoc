import { usePage } from '@inertiajs/react';
import {useState, useEffect} from 'react'

import {css} from '@emotion/react'
import {defaultTheme} from '@/Components/DefaultThemeProvider'

import Stack from '@mui/material/Stack';
import {Button} from '@mui/material'

import ShowToggleButton from '@/Components/MainPageParts/ShowToggleButton'
import axios from 'axios';

/** @jsxImportSource @emotion/react */
export default function ShowAllAnswerToggleButton({
    /* boolean */ isEnglishFirstPosition,
    /* boolean */ isShowAllAnswer,
    /* boolean */ setIsShowAllAnswer,
    className,
    }) {

    const userSetting = usePage().props.user_setting

    const palette = defaultTheme().palette

    const [secondPositionLanguage, setSecondPositionLanguage] = useState('')


    useEffect(() => {
        setSecondPositionLanguage(
            isEnglishFirstPosition? '日本語' : '英語'
        )
    }, [isEnglishFirstPosition])



    // ボタンを押した時の処理
    const handleClick = e => {
        let currentIsShowAllAnswer = null
        // 答えの表示or非表示の切替。
        setIsShowAllAnswer(value => {
            currentIsShowAllAnswer = !value
            return currentIsShowAllAnswer
        })

        // DBに切替後の 表示=true or 非表示=false を保存。
        userSetting.is_show_all_answers = currentIsShowAllAnswer - 0
        axios.request({
            method: 'put',
            url: route('api.user_setting.update', {user_setting: userSetting.id}),
            data: userSetting,
        }).then(res => {

        }).catch(error => {

        })
    }



    return (<ShowToggleButton
        /* css引き継ぎ用 */ className={className}
        /* function */ onClick={handleClick}
        /* boolean */ isShow={isShowAllAnswer}
        /* string */ showButtonText={`全て${secondPositionLanguage}を見る`}
        /* string */ hideButtonText={`全て${secondPositionLanguage}を隠す`}
    />)
}
