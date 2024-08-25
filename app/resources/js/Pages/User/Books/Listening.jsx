import { useState, useRef, useEffect } from 'react'

import convertNumbersToWords from '@/Functions/convertNumbersToWords'

import {css} from '@emotion/react'

import BooksComponent from '@/Components/BooksComponent'
import DefaultSpeakingIconButton from '@/Components/MainPageParts/BookOrWordParts/DefaultSpeakingIconButton'
import SlowSpeakingIconButton from '@/Components/MainPageParts/BookOrWordParts/SlowSpeakingIconButton'

import CommonProvider from '@/Components/CommonProvider'



/** @jsxImportSource @emotion/react */
export default function Listening({auth, bookOrWords, parentBookId}) {
    const [voices, setVoices] = useState([])

    const [upBalloonProps, setUpBalloonProps] = useState({
        showStatus: 'none',   // 表示管理。'none'、'processing'=表示準備中(座標計算など)、'show'
        x: 0,   // 絶対座標。表示位置。矢印の先端がこの位置になる。
        y: 0,   // 絶対座標。表示位置。矢印の先端がこの位置になる。
        jsx: <>バルーンの中身JSX</>,  // バルーン内に表示するSJXを指定。
    })

    // 最初の順指定='selectSort'、普通='normal'、正解='correct'、不正解='incorrect'。
    // 全ての問題終了='finished'
    const [status, setStatus] = useState('selectSort')

    // ページタイトル。
    const pageTitle = '聞こえた通りに入力しよう'
    // 入力欄のplaceholder。
    const pagePlaceholder = '英語を入力してください'

    // 答えのカラム名。
    const answerColumnName = 'english_word'

    // 問題を入れる。
    const questionsRef = useRef([...bookOrWords])
    // 現在のquestionsRefのindex。
    const [questionIndex, setQuestionIndex] = useState(0)
    // 現在のquestion。
    const [question, setQuestion] = useState()
    // 考え中モーダルウィンドウの表示切り替え。
    const [isModalShow, setIsModalShow] = useState(false)
    // 解答欄のuseState。
    const [inputValue, setInputValue] = useState('')

    // 回答後の「他の訳例」か「訳例」のuseState。
    const [exampleAnswerLabel, setExampleAnswerLabel] = useState('')

    // 解凍後に表示する日本語訳のuseState。
    const [answerInJapanese, setAnswerInJapanese] = useState('')


    // statusが変わった時の処理。
    useEffect( () => {
        //  解答例上の「他の訳例」か「訳例」をセットする。
        if (
            status === 'normal'
            || ( status === 'correct' && question[answerColumnName] === inputValue )
        ) { setExampleAnswerLabel('') }
        // else if (status === 'correct') { setExampleAnswerLabel('他の例訳：') }
        else if (status === 'incorrect') { setExampleAnswerLabel('答え：') }
        else if (status === 'finished') { setExampleAnswerLabel('　') }

        // 正解なら「日本語訳」を表示する。
        if (status === 'correct') { setAnswerInJapanese(question.japanese_word) }
        else { setAnswerInJapanese('') }
    }, [status])






    // 「送信するボタン」を押した時の処理の関数。
    const buttonClickforNormal = async () => {
        // -- 入力が空なら処理しない。 --
        if (inputValue === '') return

        speechSynthesis.cancel() /* 前回の再生途中なら完全に止める。 */

        // -- DBの正解ならstatusに'correct'をセットする。 --
        if (inputValue === question.english_word) {
            setStatus('correct')
            return
        }

        // -- 以下の方法でDBと同じなら'correct'にする。 --
        // 両方とも数字を英語綴りにする。
        let tmpDBAnswer = convertNumbersToWords(question.english_word)
        let tmpInputValue = convertNumbersToWords(inputValue)
        // 両方とも「,」「.」「?」「!」を「.」にする。
        tmpDBAnswer = tmpDBAnswer.replaceAll(/[,\?!]/g, '.')
        tmpInputValue = tmpInputValue.replaceAll(/[,\?!]/g, '.')
        // 両方とも全て小文字にする。
        tmpDBAnswer = tmpDBAnswer.toLowerCase()
        tmpInputValue = tmpInputValue.toLowerCase()
        // そして比較する。
        if (tmpDBAnswer === tmpInputValue) {
            setStatus('correct')
            return
        }

        // -- 不正解ならstatusに'incorrect'をセットする。 --
        setStatus('incorrect')
    }



    return (<CommonProvider>
    <BooksComponent
        auth={auth}
        bookOrWords={bookOrWords}
        parentBookId={parentBookId}
        voices={voices}
        setVoices={setVoices}
        questionsRef={questionsRef}
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
        question={question}
        setQuestion={setQuestion}
        buttonClickforNormal={buttonClickforNormal}
        isModalShow={isModalShow}
        inputValue={inputValue}
        setInputValue={setInputValue}
        status={status}
        setStatus={setStatus}
        pageTitle={pageTitle}
        pagePlaceholder={pagePlaceholder}
        answerColumnName={answerColumnName}
        exampleAnswerLabel={exampleAnswerLabel}
        setExampleAnswerLabel={setExampleAnswerLabel}
        answerInJapanese={answerInJapanese}
        upBalloonProps={upBalloonProps}
        setUpBalloonProps={setUpBalloonProps}
    >

                    {/* // 声再生アイコンを表示。 */}
                    <div>
                        {voices.map((row, index) => (row === null)? '' :
                            <div key={index} css={css` margin-top: 6px; `}>
                                <DefaultSpeakingIconButton
                                    englishWord={question.english_word}
                                    voice={row.voice}
                                    voicePitch={row.voicePitch}
                                    color={row.color}
                                />
                                <SlowSpeakingIconButton
                                    englishWord={question.english_word}
                                    voice={row.voice}
                                    voicePitch={row.voicePitch}
                                    color={row.color}
                                    css={css` margin-left: 6px; `}
                                />
                            </div>
                        )}
                    </div>

    </BooksComponent>
    </CommonProvider>)
}
