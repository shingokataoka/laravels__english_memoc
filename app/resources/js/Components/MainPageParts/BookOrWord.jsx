import React, { useCallback, useEffect } from 'react'
import {useLayoutEffect, useState, useRef, forwardRef} from 'react'
import axios from 'axios'

import {css} from '@emotion/react'
import {isDark} from '@/Components/DefaultThemeProvider'

import {Stack} from '@mui/material'
import {TextField} from '@mui/material'

import BookIconButton from '@/Components/MainPageParts/BookOrWordParts/BookIconButton'
import DefaultSpeakingIconButton from "@/Components/MainPageParts/BookOrWordParts/DefaultSpeakingIconButton"
import SlowSpeakingIconButton from "@/Components/MainPageParts/BookOrWordParts/SlowSpeakingIconButton"
import ShowAnswerToggleButton from '@/Components/MainPageParts/BookOrWordParts/ShowAnswerToggleButton'
import DeleteModeContainer from '@/Components/MainPageParts/BookOrWordParts/DeleteModeContainer'
import SortModeContainer from '@/Components/MainPageParts/BookOrWordParts/SortModeContainer'






// 「本or再生アイコンと、英語テキストと日本語テキスト」のJSX
/** @jsxImportSource @emotion/react */
const BookOrWord = React.memo( forwardRef( (props, ref) => {

        const {isEnglishFirstPosition, isShowAllAnswer, index, replacementIndex0, replacementIndex1, setReplacementIndex0, setReplacementIndex1, deleteIndex, setDeleteIndex, bookOrWordDomRefs, bookOrWords, bookOrWord, voices, isProcessing, setIsProcessing, isSortMode, isDeleteMode} = props


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



        // 「日本語を隠す」を押した時の処理。
        const showAnswerToggle = () => {
            // 隠すor表示を切り替え。
            bookOrWord.isShowAnswer = !bookOrWord.isShowAnswer
            // レンダーを起動。
            setToggleAnswerRender( value => !value )
        }



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
        const onChangeWord = useCallback( (e, enOrJaKey) => {
            // bookOrWordを更新する（bookOrWords.currentも更新される）。
            bookOrWord[enOrJaKey] = e.target.value
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
                background: #aaa2;
                padding: 6px;
            }
            fieldset {
                ${
                    isDark()? 'border-color: rgba(255,255,255,0.23) !important;'
                    : 'border-color: rgba(0,0,0,0.23) !important;'
                }
            }
        `




        return (<Stack
                ref={ref}
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                css={css`
                    position: relative;
                    max-width: 500px;
                    width: 100%;
                    border-top: 1px grey solid;
                    padding-top: 12px;
                    padding-bottom: 16px;
                    overflow: hidden;

                `}
            >

                {/* 再生ボタン群or本アイコン */}
                { bookOrWord.type_is_book
                    ? <BookIconButton bookOrWord={bookOrWord} />
                    : <div>
                        <div>
                            <DefaultSpeakingIconButton
                                englishWord={bookOrWord.english_word}
                                voice={null}
                                voicePitch={null}
                                color='green'
                            />
                            <SlowSpeakingIconButton
                                englishWord={bookOrWord.english_word}
                                voice={null}
                                voicePitch={null}
                                color='green'
                                css={css` margin-left: 6px; `}
                            />
                        </div>
                        <div css={css` margin-top: 6px; `}>
                            <DefaultSpeakingIconButton
                                englishWord={bookOrWord.english_word}
                                voice={null}
                                voicePitch={1.4}
                                color='blue'
                            />
                            <SlowSpeakingIconButton
                                englishWord={bookOrWord.english_word}
                                voice={null}
                                voicePitch={1.4}
                                color='blue'
                                css={css` margin-left: 6px; `}
                            />
                        </div>
                        { (0 in voices)
                        ? <>
                            <div css={css` margin-top: 6px; `}>
                                <DefaultSpeakingIconButton
                                    englishWord={bookOrWord.english_word}
                                    voice={voices[0]}
                                    voicePitch={null}
                                    color='indigo'
                                />
                                <SlowSpeakingIconButton
                                    englishWord={bookOrWord.english_word}
                                    voice={voices[0]}
                                    voicePitch={null}
                                    color='indigo'
                                    css={css` margin-left: 6px; `}
                                />
                            </div>
                            <div css={css` margin-top: 6px; `}>
                                <DefaultSpeakingIconButton
                                    englishWord={bookOrWord.english_word}
                                    voice={voices[0]}
                                    voicePitch={1.4}
                                    color='purple'
                                />
                                <SlowSpeakingIconButton
                                    englishWord={bookOrWord.english_word}
                                    voice={voices[0]}
                                    voicePitch={1.4}
                                    color='purple'
                                    css={css` margin-left: 6px; `}
                                />
                            </div>
                        </>
                        : '' }
                    </div>
                }


                {/* 英語入力欄と日本語入力欄 */}
                <div css={css`
                    flex: 1;
                `}>

                    <div
                        ref={ word0DivRef }
                        css={css` overflow: hidden; `}
                    >
                        <TextField
                            multiline
                            placeholder={(isEnglishFirstPosition
                                ? '英語のセリフを入力'
                                : '日本語のセリフを入力'
                            )}
                            value={ (isEnglishFirstPosition)
                            ? bookOrWord.english_word
                            : bookOrWord.japanese_word
                            }
                            onChange={ e => {
                                const EnOrJaKey =(isEnglishFirstPosition)
                                    ? 'english_word'
                                    : 'japanese_word'
                                onChangeWord(e, EnOrJaKey)
                            } }
                            css={ textFieldCss }
                        />
                    </div>

                    <div
                    ref={ word1DivRef }
                        css={css` overflow: hidden; `}
                    >
                        <TextField
                            multiline
                            placeholder={(isEnglishFirstPosition
                                ? '日本語のセリフを入力'
                                : '英語のセリフを入力'
                            )}
                            value={(isEnglishFirstPosition)
                            ? bookOrWord.japanese_word
                            : bookOrWord.english_word
                            }
                            onChange={ e => {
                                const EnOrJaKey =(isEnglishFirstPosition)
                                    ? 'japanese_word'
                                    : 'english_word'
                                onChangeWord(e, EnOrJaKey)
                            } }
                            css={ textFieldCss }
                        />
                    </div>

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
export default BookOrWord
