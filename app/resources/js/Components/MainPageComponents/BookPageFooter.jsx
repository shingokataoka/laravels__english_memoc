import React, {useEffect, useLayoutEffect, useState, useRef } from "react"
import { css } from "@emotion/react"

import { Stack } from "@mui/material"
import AddNewBookOrWordButton from "@/Components/MainPageParts/FooterParts/AddNewBookOrWordButton"
import RearrangeButton from '@/Components/MainPageParts/FooterParts/RearrangeButton'
import DeleteModeButton from '@/Components/MainPageParts/FooterParts/DeleteModeButton'
import DarkModeToggleButton from '@/Components/MainPageParts/FooterParts/DarkModeToggleButton'
import ResetBookOrWordsButton from '@/Components/MainPageParts/FooterParts/ResetBookOrWordsButton'


/** @jsxImportSource @emotion/react */
export default function BookPageFooter({
    /* numeric */ currentBookId,
    /* boolean */ isEnglishFirstPosition,
    /* useRefの.current内の配列 */ bookOrWords,
    /* useStateのboolean */ isProcessing,
    /* useStateのset */ setIsProcessing,
}) {





    return (
    <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={2}
    css={css`
        margin: 0 auto;
        width: 100%;
        max-width: 500px;
        border-top: 1px grey solid;
        padding: 6px;
    `}
    >

    <AddNewBookOrWordButton
        currentBookId={currentBookId}
        isEnglishFirstPosition={isEnglishFirstPosition}
        englishLabel='Add a new line'
        japaneseLabel='新しいセリフを追加する'
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        addTypeIsBook={0}
        bookOrWords={bookOrWords}
    />
    <AddNewBookOrWordButton
        currentBookId={currentBookId}
        isEnglishFirstPosition={isEnglishFirstPosition}
        englishLabel='Add a new book'
        japaneseLabel='新しい本を追加する'
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        addTypeIsBook={1}
        bookOrWords={bookOrWords}
    />

    <RearrangeButton
        isEnglishFirstPosition={isEnglishFirstPosition}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
    />

    <DeleteModeButton
        isEnglishFirstPosition={isEnglishFirstPosition}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
    />

    <ResetBookOrWordsButton
        isEnglishFirstPosition={isEnglishFirstPosition}
    />

    <DarkModeToggleButton />

    </Stack>)
}
