import React, { useCallback, useEffect } from 'react'
import {useLayoutEffect, useState, useRef, forwardRef} from 'react'
import axios from 'axios'

import {css} from '@emotion/react'
import {isDark} from '@/../../resources/js/Components/DefaultThemeProvider'
import { defaultTheme } from '@/../../resources/js/Components/DefaultThemeProvider'

import {Stack} from '@mui/material'
import {TextField} from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview';
import InsightsIcon from '@mui/icons-material/Insights';
import {Button} from '@mui/material'

import BookIconButton from '@/Components/MainPageParts/BookOrWordParts/BookIconButton'
import DefaultSpeakingIconButton from "@/Components/MainPageParts/BookOrWordParts/DefaultSpeakingIconButton"
import SlowSpeakingIconButton from "@/Components/MainPageParts/BookOrWordParts/SlowSpeakingIconButton"
import ShowAnswerToggleButton from '@/Components/MainPageParts/BookOrWordParts/ShowAnswerToggleButton'
import DeleteModeContainer from '@/Components/MainPageParts/BookOrWordParts/DeleteModeContainer'
import SortModeContainer from '@/Components/MainPageParts/BookOrWordParts/SortModeContainer'

import HighlightSpellError from '@/Components/MainPageParts/BookOrWordParts/HighlightSpellError'

import ModalLoading from '@/Components/ModalLoading'
import { Link } from '@inertiajs/react'
import TranslationButtonsArea from '../TranslationButtonsArea'



// 「本or再生アイコンと、英語テキストと日本語テキスト」のJSX
/** @jsxImportSource @emotion/react */
const BookOrWord = React.memo( forwardRef( ({isEnglishFirstPosition, isShowAllAnswer, index, replacementIndex0, replacementIndex1, setReplacementIndex0, setReplacementIndex1, deleteIndex, setDeleteIndex, bookOrWordDomRefs, bookOrWords, bookOrWord, voices, isProcessing, setIsProcessing, isSortMode, isDeleteMode, upBalloonProps, setUpBalloonProps}, ref) => {


    const palette = defaultTheme().palette

    const isFirstRenderRef = useRef(true)
    const autoSaveTimer = useRef(null)

    const word0DivRef = useRef(null)
    const word1DivRef = useRef(null)


    const [toggleAnswerRender, setToggleAnswerRender] = useState(true)

    // 日本語or英語の書き換え時のレンダリング用useState
    const [wordRender, setWordRender] = useState(false)




    // 「全て英語を隠す」を押した時の処理。
    useEffect( () => {
    // 初回レンダリング時はisShowAllAnswerを各自に適応しない。
    if (isFirstRenderRef.current) return

    bookOrWord.isShowAnswer = isShowAllAnswer
    setToggleAnswerRender(value => !value)
    }, [isShowAllAnswer])






    // 「英語or日本語を隠す」を切り替えた時のアニメーション。
    useLayoutEffect( () => {
        // 初回レンダリング時はアニメーション時間0mSec
        let animateMSec =(isFirstRenderRef.current)? 0 : 100
        // 並び替えモード処理時のアニメーション時間0mec
        if (replacementIndex0 === index) animateMSec = 0
        if (replacementIndex1 === index) animateMSec = 0

        // First。元の高さを取得。
        const FirstHeight = word1DivRef.current.getBoundingClientRect().height
        // 高さを変更する。
        word1DivRef.current.style.height = bookOrWord.isShowAnswer? 'auto' : '0px'
        // Last。変更後の高さを取得。
        const LastHeight = word1DivRef.current.getBoundingClientRect().height
        // Invert。アニメーションを実行する。
        word1DivRef.current.animate([
            { height: `${FirstHeight}px` },
            { height: `${LastHeight}px` },
        ], animateMSec)
    }, [toggleAnswerRender, replacementIndex0, replacementIndex1] )



    // 英語か日本語を書き換えたら自動保存or追加or削除。
    const autoSaveBookOrWord = (BookOrWord) => {
    // まず、前回の更新タイマーを消しておく。連続保存防止のため。
    if ( autoSaveTimer.current )
    { clearTimeout(autoSaveTimer.current) }

    // 更新のタイマーをセット。入力が終われば1秒後に保存を送信する。
    autoSaveTimer.current = setTimeout( () => {
        axios.request({
            method: 'put',
            url: route('api.book.update', {book_id: BookOrWord.id}),
            data: {
                ...BookOrWord,
            }
        }).then(res => {
        }).catch(error => {
            alert('すいません。英語または日本語の保存に失敗しました。\r\n'
                + 'インターネット接続が途切れている可能性があります。\r\n'
                + 'インターネット接続ができる環境で試してみてください。'
            )
        })
        clearTimeout(autoSaveTimer.current)
    }, 1000)
    }



    // 日本語or英語を書き換え時の処理。
    // bookOrWordを更新するのと
    // DBへ自動保存の処理。
    const onChangeWord = useCallback( (newWord, enOrJaKey) => {
        // bookOrWordを更新する（bookOrWords.currentも更新される）。
        bookOrWord[enOrJaKey] = (newWord + '').replace(/(\r\n|\n|\r)/gm, '')
        // レンダリング用useState。
        setWordRender(value => !value)
        // 自動保存の関数を実行
        autoSaveBookOrWord(bookOrWord)
    } )



    // 「英語⇄日本語」を押した時の入れ替えとアニメーションを実行。
    useLayoutEffect( () => {
        if (isFirstRenderRef.current) return

        // まず、word0とword1の各親divのサイズ・座標などを取得。
        const div0H = word0DivRef.current.getBoundingClientRect().height
        const div1H = word1DivRef.current.getBoundingClientRect().height
        // word1の隠していないサイズを取得。
        const div1ShowH = word1DivRef.current.scrollHeight

        // 各要素の入れ替え後からみて、移動開始Y差分を算出。
        const div0DiffY = div1ShowH
        const div1DiffY =(div1H === 0)? 0 : div0H * -1

        // 各要素の高さの変化量を算出。
        const div0H0 =(div1H === 0)? 0 : div0H
        const div0H1 = div0H
        const div1H0 = div1ShowH
        const div1H1 =(div1H === 0)? 0 : div1ShowH

        word0DivRef.current.animate([
            {
                transform: `translate(0px, ${div0DiffY}px)`,
                height: `${div0H0}px`,
            },
            {
                transform: `translate(0px, 0px)`,
                height: `${div0H1}px`,
            },
        ], 100)
        word1DivRef.current.animate([
            {
                transform: `translate(0px, ${div1DiffY}px)`,
                height: `${div1H0}px`
            },
            {
                transform: `translate(0px, 0px)`,
                height: `${div1H1}px`
            },
        ], 100)

    }, [isEnglishFirstPosition] )



    // 初回レンダリング済みにする。
    useEffect( () => {
        isFirstRenderRef.current = false
    }, [])



    const textFieldCss = css`
        padding-top: 8px;
        textarea { box-shadow: none; }
        width: 100%;
        & > div {
            background: ${palette.bgTextField};
            padding: 6px;
        }
        fieldset {
            ${
                isDark()? 'border-color: rgba(255,255,255,0.23) !important;'
                : 'border-color: rgba(0,0,0,0.23) !important;'
            }
        }
    `



    // ボタン「和訳」「英訳」「リスニング」のCSS。
    const LinkButtonCss = css`
        font-weight: bold;
        padding-left: 0;
        padding-right: 0;
        border-color: ${palette.warning.main}
    `





    return (<Stack
        ref={ref}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        css={css`
            position: relative;
            width: 100%;
            border-top: 1px grey solid;
            padding-top: 12px;
            padding-bottom: 16px;
            ${ isDeleteMode? 'overflow: hidden;' : '' }
        `}
    >

        { bookOrWord.type_is_book
            // 本アイコンと和訳・英訳・リスニングボタンを表示。
            ? (<Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <BookIconButton bookOrWord={bookOrWord} />
                <Button variant="outlined" color="warning" component={Link}
                    href={route('book.japanese_translation', {book_id: bookOrWord.id})}
                css={LinkButtonCss}>和訳</Button>
                <Button variant="outlined" color="warning" component={Link}
                    href={route('book.english_translation', {book_id: bookOrWord.id})}
                css={LinkButtonCss}>英訳</Button>
                <Button variant="outlined" color="warning" component={Link}
                    href={route('book.listening', {book_id: bookOrWord.id})}
                css={LinkButtonCss}>聴き取り</Button>
            </Stack>)
            // 声再生アイコンを表示。
            : <div>
                {voices.map((row, index) => (row === null)? '' :
                    <div key={index} css={css` margin-top: 6px; `}>
                        <DefaultSpeakingIconButton
                            englishWord={bookOrWord.english_word}
                            voice={row.voice}
                            voicePitch={row.voicePitch}
                            color={row.color}
                        />
                        <SlowSpeakingIconButton
                            englishWord={bookOrWord.english_word}
                            voice={row.voice}
                            voicePitch={row.voicePitch}
                            color={row.color}
                            css={css` margin-left: 6px; `}
                        />
                    </div>
                )}
            </div>
        }


        {/* 英語入力欄と日本語入力欄 */}
        <div css={css`
            flex: 1;
        `}>

            <div
                ref={ word0DivRef }
                css={css` overflow:hidden; position:relative; `}
            >{ (isEnglishFirstPosition)
                ? <EnglishTextField
                    bookOrWordIndex={index}
                    upBalloonProps={upBalloonProps}
                    setUpBalloonProps={setUpBalloonProps}
                    onChangeWord={onChangeWord}
                    english_word={bookOrWord.english_word}
                    japanese_word={bookOrWord.japanese_word}
                    textFieldCss={textFieldCss}
                    voices={voices}
                />
                : <JapaneseTextField
                    bookOrWordIndex={index}
                    onChangeWord={onChangeWord}
                    english_word={bookOrWord.english_word}
                    japanese_word={bookOrWord.japanese_word}
                    textFieldCss={textFieldCss}
                />
            }
            </div>

            <div
            ref={ word1DivRef }
                css={css` overflow:hidden; position:relative; `}
            >{ (isEnglishFirstPosition)
                ? <JapaneseTextField
                    bookOrWordIndex={index}
                    onChangeWord={onChangeWord}
                    english_word={bookOrWord.english_word}
                    japanese_word={bookOrWord.japanese_word}
                    textFieldCss={textFieldCss}
                />
                : <EnglishTextField
                    bookOrWordIndex={index}
                    upBalloonProps={upBalloonProps}
                    setUpBalloonProps={setUpBalloonProps}
                    onChangeWord={onChangeWord}
                    english_word={bookOrWord.english_word}
                    japanese_word={bookOrWord.japanese_word}
                    textFieldCss={textFieldCss}
                    voices={voices}
                />
            }
            </div>

            {/* 日本語を見るボタン。 */}
            <ShowAnswerToggleButton
                isEnglishFirstPosition={isEnglishFirstPosition}
                bookOrWord={bookOrWord}
                setToggleAnswerRender={setToggleAnswerRender}
                css={css`
                    margin-top: 6px;
                    box-sizing: border-box !important;
                `}
            />
        </div>

        <DeleteModeContainer
            index={index}
            bookOrWords={bookOrWords}
            bookOrWord={bookOrWord}
            bookOrWordDom={bookOrWordDomRefs[index].current}
            isDeleteMode={isDeleteMode}
            deleteIndex={deleteIndex}
            setDeleteIndex={setDeleteIndex}
        />
        <SortModeContainer
            index={index}
            replacementIndex0={replacementIndex0}
            replacementIndex1={replacementIndex1}
            setReplacementIndex0={setReplacementIndex0}
            setReplacementIndex1={setReplacementIndex1}
            bookOrWordDomRefs={bookOrWordDomRefs}
            bookOrWords={bookOrWords}
            bookOrWord={bookOrWord}
            isSortMode={isSortMode}
        />

    </Stack>)


} ) )



// 英語の入力欄のコンポーネント
const EnglishTextField = ({
    bookOrWordIndex,
    upBalloonProps,
    setUpBalloonProps,
    onChangeWord,
    english_word,
    japanese_word,
    textFieldCss,
    voices,
}) => {
    const palette = defaultTheme().palette
    const focusLineColor = isDark()? palette.info.light : 'rgba(0, 250, 255, 1)'

    const [isModalShow, setIsModalShow] = useState(false)

    const [translationColor, setTranslationColor] = useState('#29b6f6')
    const [penIconColor, setPenIconColor] = useState('#29b6f6')
    const [isShowTextField, setIsShowTextField] = useState(false)
    const [isShowSpellJsx, setIsShowSpellJsx] = useState(true)

    const [translationDisplay, setTranslationDisplay] = useState(value => {
        return (english_word === '' && japanese_word !== '')? 'inline-block' : 'none'
    })
    const [inputLabelText, setInputLabelText] = useState(value => {
        return (english_word === '')? '入力' : '編集'
    })


    // TranslationButtonArea.jsxに渡すuseState変数。
    // true=ない英単語があるかチェックして、あればAPIから取得してDB保存をONなら。
    const [checkTranslations, setCheckTranslations] = useState(false)



    // TextFiledにフォーカス時の処理。
    const handleFocus = e => {
        setPenIconColor(palette.text.primary)
        setIsShowSpellJsx(false)
        setIsShowTextField(true)
    }



    // TextFieldのフォーカスが外れた時の処理。
    const handleBlur = e => {
        setPenIconColor('#29b6f6')
        setIsShowSpellJsx(true)
        setIsShowTextField(false)

        // ない英単語があるかチェックして、あればAPIから取得してDB保存をON。
        setCheckTranslations(true)
    }



    // 日本語が書きかわったらボタン表示「入力」か「編集」を切り替える。
    useEffect( () => {
        if (english_word === '') { setInputLabelText('入力') }
        else { setInputLabelText('編集') }
    }, [english_word])




    // 「自動英訳」ボタンを押した処理。
    const autoTranslation = async () => {
        // ローディングモーダルウィンドウを表示する。
        setIsModalShow(true)
        // 「自動英訳」の文字色を変える。
        setTranslationColor(palette.text.primary)

        // API「みんなの翻訳@texTra」で日本語に翻訳する。
        const response = await axios.request({
            method: 'post',
            url: route('api.translation.japanese_to_english'),
            data: { japaneseText: japanese_word }
        })
        const newEnglishWord = response.data
        // BookOrWordのenglish_wordに自動翻訳の英語をセット。
        onChangeWord(newEnglishWord, 'english_word')
        // 「自動英訳」の文字色を元に戻す。
        setTranslationColor('#29b6f6')
        // ローディングモーダルウィンドウを非表示にする。
        setIsModalShow(false)
    }




    // 英語か日本語が書き変わったら、自動英訳ボタンの表示有無を切り替える。
    useEffect( () => {
        const tmp =(english_word === '' && japanese_word !== '')? 'inline-block' : 'none'
            setTranslationDisplay(tmp)
    }, [english_word, japanese_word])


    const buttonCss = css`
        display:inline-block;
        border-radius: 4px;
        margin: 0 6px;
        padding: 4px;
        font-weight: bold;
        user-select: none;
        border: 1px #000 solid;
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


    return (<>
        {/* ローディングモーダルのコンポーネント */}
        <ModalLoading
            isShow={isModalShow}
            text={<>Translating...<br />翻訳中...</>}
        />

        <TextField
            id={'englishTextField-' + bookOrWordIndex}
            multiline
            placeholder={'英語のセリフを入力'}
            value={english_word}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={checkTranslations}
            onChange={ e => {
                const EnOrJaKey='english_word'
                onChangeWord(e.target.value, EnOrJaKey)
            } }
            css={css`
                ${textFieldCss}
                ${fontCss}
                padding: 4px;
                & > div {
                    ${ isShowTextField
                        ? `box-shadow: inset 0px 0px 7px 1px ${focusLineColor};`
                        : ''
                    }
                }
                & textarea {
                    ${fontCss}
                    padding: 32px 0 0 0;
                    line-height: 1.5rem;
                    ${ isShowTextField? '' : 'color: #0000;' }
                }
            `}
        />

        <div css={css`
            position: absolute;
            top: 8px;
            left: 6px;
            right: 10px;
        `}>


            {/* 英語(入力 or 編集)ボタン */}
            <label
                htmlFor={'englishTextField-' + bookOrWordIndex}
                css={css`
                    ${buttonCss}
                    color: ${penIconColor};
                    border: 1px ${penIconColor} solid;

                    ${(checkTranslations)
                        // 英単語のチェック中のカラー。
                        ? `
                            color: ${palette.text.disabled};
                            border-color: ${palette.text.disabled};
                        `
                        : ''}
                `}
            >
                <RateReviewIcon css={css`
                    color: ${penIconColor};
                    ${(checkTranslations)? `color: ${palette.text.disabled};` : ''}
                `} />
                <span> 英語{inputLabelText}</span>
            </label>

            {/* 自動英訳ボタン */}
            <button
                onClick={autoTranslation}
                css={css`
                    ${buttonCss}
                    display: ${translationDisplay};
                    color: ${translationColor};
                    border-color: ${translationColor};
                `}
            >
                <InsightsIcon />
                <span> 自動英訳</span>
            </button>

            {/* 入力済み英文の各英単語の和訳表示ボタン */}
            <div css={css`
                ${fontCss}
                display:${isShowSpellJsx? 'block' : 'none'};
                margin: -1px 0 0 4px;
                padding: 0px 3px 0 0;
                background: ${palette.bgTextField};
            `}>
                <TranslationButtonsArea
                    setUpBalloonProps={setUpBalloonProps}
                    text={english_word}
                    voices={voices}
                    checkTranslations={checkTranslations}
                    setCheckTranslations={setCheckTranslations}
                />
            </div>
        </div>

    </>)
}




// 日本語の入力欄のコンポーネント
const JapaneseTextField = ({
    bookOrWordIndex,
    onChangeWord,
    english_word,
    japanese_word,
    textFieldCss,
}) => {
    const palette = defaultTheme().palette
    const focusLineColor = isDark()? palette.info.light : 'rgba(0, 250, 255, 1)'

    const [isModalShow, setIsModalShow] = useState(false)

    const [translationColor, setTranslationColor] = useState('#29b6f6')
    const [penIconColor, setPenIconColor] = useState('#29b6f6')
    const [isShowTextField, setIsShowTextField] = useState(false)
    const [isShowSpellJsx, setIsShowSpellJsx] = useState(true)

    const [translationDisplay, setTranslationDisplay] = useState(value => {
        return (english_word === '' && japanese_word !== '')? 'inline-block' : 'none'
    })
    const [inputLabelText, setInputLabelText] = useState(value => {
        return (japanese_word === '')? '入力' : '編集'
    })

    // TextFiledにフォーカス時の処理。
    const handleFocus = e => {
        setPenIconColor(palette.text.primary)
        setIsShowSpellJsx(false)
        setIsShowTextField(true)
    }



    // TextFieldのフォーカスが外れた時の処理。
    const handleBlur = e => {
        setPenIconColor('#29b6f6')
        setIsShowSpellJsx(true)
        setIsShowTextField(false)
    }



    // 「自動和訳」ボタンを押した処理。
    const autoTranslation = async () => {
        // ローディングモーダルウィンドウを表示する。
        setIsModalShow(true)
        // 「自動和訳」の文字色を変える。
        setTranslationColor(palette.text.primary)

        // API「みんなの翻訳@texTra」で英語に翻訳する。
        const response = await axios.request({
            method: 'post',
            url: route('api.translation.english_to_japanese'),
            data: { englishText: english_word }
        })
        const newJapaneseWord = response.data
        // BookOrWordのenglish_wordに自動翻訳の英語をセット。
        onChangeWord(newJapaneseWord, 'japanese_word')
        // 「自動和訳」の文字色を元に戻す。
        setTranslationColor('#29b6f6')
        // ローディングモーダルウィンドウを非表示にする。
        setIsModalShow(false)
    }



    // 日本語が書きかわったら、ボタン表示「入力」か「編集」を切り替える。
    useEffect(() => {
            if (japanese_word === '') { setInputLabelText('入力') }
            else { setInputLabelText('編集') }
    }, [japanese_word])



    // 日本語か英語が書き変わったら、自動英訳ボタンの表示有無を切り替える。
    useEffect( () => {
        const tmp =(japanese_word === '' && english_word !== '')? 'inline-block' : 'none'
            setTranslationDisplay(tmp)
    }, [english_word, japanese_word])



    const buttonCss = css`
        display:inline-block;
        border-radius: 4px;
        margin: 0 6px;
        padding: 4px;
        font-weight: bold;
        user-select: none;
        border: 1px #000 solid;
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


    return (<>
        {/* ローディングモーダルのコンポーネント */}
        <ModalLoading
            isShow={isModalShow}
            text={<>Translating...<br />翻訳中...</>}
        />

        <TextField
            id={'japaneseTextField-' + bookOrWordIndex}
            multiline
            placeholder={'日本語のセリフを入力'}
            value={japanese_word}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={ e => {
                const EnOrJaKey='japanese_word'
                onChangeWord(e.target.value, EnOrJaKey)
            } }
            css={css`
                ${textFieldCss}
                ${fontCss}
                padding: 4px;
                & > div {
                    ${ isShowTextField
                        ? `box-shadow: inset 0px 0px 7px 1px ${focusLineColor};`
                        : ''
                    }
                }
                & textarea {
                    ${fontCss}
                    padding: 32px 0 0 0;
                    line-height: 1.5rem;
                    ${ isShowTextField? '' : 'color: #0000;' }
                }
            `}
        />

        <div css={css`
            position: absolute;
            top: 8px;
            left: 6px;
            right: 10px;
        `}>


            {/* 日本語(入力 or 編集)ボタン */}
            <label
                htmlFor={'japaneseTextField-' + bookOrWordIndex}
                css={css`
                    ${buttonCss}
                    color: ${penIconColor};
                    border: 1px ${penIconColor} solid;

                `}
            >
                <RateReviewIcon css={css` color: ${penIconColor}; `} />
                <span> 日本語{inputLabelText}</span>
            </label>

            {/* 自動和訳ボタン */}
            <button
                onClick={autoTranslation}
                css={css`
                    ${buttonCss}
                    display: ${translationDisplay};
                    color: ${translationColor};
                    border-color: ${translationColor};
                `}
            >
                <InsightsIcon />
                <span> 自動和訳</span>
            </button>

            <div css={css`
                ${fontCss}
                display:${isShowSpellJsx? 'block' : 'none'};
                margin: -1px 0 0 4px;
                padding-top: 0px 0 0 0;
                white-space: pre-wrap;
                background: ${palette.bgTextField};
            `}>{japanese_word}</div>
        </div>

    </>)
}





export default BookOrWord
