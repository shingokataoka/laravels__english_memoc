import { useEffect, useState } from 'react'

import {css} from '@mui/material'
import {Button} from '@mui/material'
import axios from 'axios'
import { usePage } from '@inertiajs/react'

/** @jsxImportSource @emotion/react */
export default function EnglishPositionToggleButton({
    className,
    /* boolean */ isEnglishFirstPosition,
    /* 上記のuseStateのset〇〇 */ setIsEnglishFirstPosition,
}) {
    const userSetting = usePage().props.user_setting

    const getCurrentButtonText = () => {
        return isEnglishFirstPosition ? '英語⇄日本語' : '日本語⇄英語'
    }

    const [buttonText, setButtonText] = useState(value => {
         return getCurrentButtonText()
    })

    useEffect(() => {
        setButtonText( getCurrentButtonText() )
    }, [isEnglishFirstPosition])



    const handleClick = e => {
        let currentIsEnglishFirstPosition = null
        // 英語が上側=true or false を切り替え。
        setIsEnglishFirstPosition(value => {
            currentIsEnglishFirstPosition = !value - 0
            return currentIsEnglishFirstPosition
        })
        // DBのuser_settingsのis_english_first_positionを 切替後のに更新する。
        userSetting.is_english_first_position = currentIsEnglishFirstPosition
        axios.request({
            method: 'put',
            url: route('api.user_setting.update', {user_setting: userSetting.id}),
            data: userSetting,
        }).then(res => {

        }).catch(error => {

        })
    }





    return (<Button
        variant="contained"
        color="info"
        onClick={ handleClick }
        css={css`
            padding-left: 5px;
            padding-right: 5px;
            text-transform: none;
            font-size: 0.7rem;
        `}
        className={className}
    >
        { buttonText }
    </Button>)
}
