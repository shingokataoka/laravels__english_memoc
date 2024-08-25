import { usePage } from "@inertiajs/react"
import { useState } from "react"

import {Head} from '@inertiajs/react'
import  { DefaultThemeProvider }  from "@/Components/DefaultThemeProvider"

import AllPageComponent from '@/Components/AllPageComponent'

import BookPageHeader from '@/Components/MainPageComponents/BookPageHeader'
import BookPageMain from '@/Components/MainPageComponents/BookPageMain'

import CommonProvider from '@/Components/CommonProvider'



/** @jsxImportSource @emotion/react */
export default function BookPage({auth, book, bookOrWords, booksOfBreadCrumb}){
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
            <Head title={ booksOfBreadCrumb[booksOfBreadCrumb.length-1].japanese_word } />

        <BookPageHeader
            book={ book }
            bookOrWords={ bookOrWords }
            booksOfBreadCrumb={ booksOfBreadCrumb }
            isEnglishFirstPosition={ isEnglishFirstPosition }
            setIsEnglishFirstPosition={ setIsEnglishFirstPosition }
            isShowAllAnswer={ isShowAllAnswer }
            setIsShowAllAnswer={ setIsShowAllAnswer }
        />

        <BookPageMain
            currentBookId={book.id}
            bookOrWords={bookOrWords}
            isEnglishFirstPosition={isEnglishFirstPosition}
            isShowAllAnswer={isShowAllAnswer}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
        />

    </CommonProvider>
    </DefaultThemeProvider>)
}
