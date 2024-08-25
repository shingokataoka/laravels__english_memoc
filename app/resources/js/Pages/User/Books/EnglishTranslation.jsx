import { useState, useRef, useEffect } from 'react'

import {css} from '@emotion/react'

import BooksComponent from '@/Components/BooksComponent'
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
    const pageTitle = '英語訳にしてみよう'
    // 入力欄のplaceholder。
    const pagePlaceholder = '英語訳を入力してください'

    // 答えのカラム名。
    const answerColumnName = 'english_word'

    // 問題を入れる。
    const questionsRef = useRef([...bookOrWords])
    // 現在のquestionsRefのindex。
    const [questionIndex, setQuestionIndex] = useState(0)
    // 現在のquestion。
    const [question, setQuestion] = useState(questionsRef.current[questionIndex])
    // 考え中モーダルウィンドウの表示切り替え。
    const [isModalShow, setIsModalShow] = useState(false)
    // 解答欄のuseState。
    const [inputValue, setInputValue] = useState('')

    // 回答後の「他の訳例」か「訳例」のuseState。
    const [exampleAnswerLabel, setExampleAnswerLabel] = useState('')



    // statusが変わった時の処理。
    useEffect( () => {
        //  解答例上の「他の訳例」か「訳例」をセットする。
        if (
            status === 'normal'
            || ( status === 'correct' && question.english_word === inputValue )
        ) { setExampleAnswerLabel('') }
        else if (status === 'correct') { setExampleAnswerLabel('他の例訳：') }
        else if (status === 'incorrect') { setExampleAnswerLabel('例訳：') }
        else if (status === 'finished') { setExampleAnswerLabel('　') }
    }, [status])





    // 「送信するボタン」を押した時の処理の関数。
    const buttonClickforNormal = async () => {
        // -- 入力が空なら処理しない。 --
        if (inputValue === '') return
        // 考え中なら処理しない。
        if (isModalShow === true) return

        // -- DBの正解ならstatusに'correct'をセットする。 --
        if (inputValue === question.english_word) {
            setStatus('correct')
            return
        }

        // -- DBの正解でないなら、AIで正解か判定する。 --
        // まずloading画面にする。
        setIsModalShow(true)
        // 非同期通信でAIから"true"か"false"をもらう。
        const result = await axios({
            url: route('api.translation_correct.english_answer'),
            method: 'post',
            data: {
                japaneseText: question.japanese_word,
                englishText: inputValue
            },
        })
        // ローディングを消す。
        setIsModalShow(false)
        // AIの返答が"true"ならstatusに"correct"をセットする。
        if (result.data === true) {
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
        isEnglishSpeak={false}
        isAnswerEnglishSpeak={true}
        upBalloonProps={upBalloonProps}
        setUpBalloonProps={setUpBalloonProps}
    >
                    {/* 英文の各英単語の和訳表示ボタン */}
                    <div css={css` flex: 1; `}>
                        {question.japanese_word}
                    </div>
    </BooksComponent>
    </CommonProvider>)
}
