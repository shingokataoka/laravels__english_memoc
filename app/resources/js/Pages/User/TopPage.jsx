import {usePage} from '@inertiajs/react'
import { useContext, useState } from "react"

import  { DefaultThemeProvider }  from "@/Components/DefaultThemeProvider"

import AllPageComponent from '@/Components/AllPageComponent'

import TopPageHeader from '@/Components/MainPageComponents/TopPageHeader'
import BookPageMain from '@/Components/MainPageComponents/BookPageMain'

// 全てで共通の値 一覧のjsx。
import CommonProvider from '@/Components/CommonProvider'





/** @jsxImportSource @emotion/react */
export default function TopPage({auth, bookOrWords}){

    const userSetting = usePage().props.user_setting

    const [isEnglishFirstPosition, setIsEnglishFirstPosition] = useState(
        userSetting.is_english_first_position
    )
    const [isShowAllAnswer, setIsShowAllAnswer] = useState(
        userSetting.is_show_all_answers
    )

    const [isProcessing, setIsProcessing] = useState(false)




    return (<DefaultThemeProvider>
    <CommonProvider>
        <AllPageComponent />

        <TopPageHeader
            isEnglishFirstPosition={ isEnglishFirstPosition }
            setIsEnglishFirstPosition={ setIsEnglishFirstPosition }
            isShowAllAnswer={ isShowAllAnswer }
            setIsShowAllAnswer={ setIsShowAllAnswer }
        />


        <BookPageMain
            currentBookId={1}
            bookOrWords={bookOrWords}
            isEnglishFirstPosition={isEnglishFirstPosition}
            isShowAllAnswer={isShowAllAnswer}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
        />

    </CommonProvider>
    </DefaultThemeProvider>)
}
