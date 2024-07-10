import { useState, useRef, useEffect } from 'react'

import {css} from '@emotion/react'

import BooksComponent from '@/Components/BooksComponent'
import DefaultSpeakingIconButton from '@/Components/MainPageParts/BookOrWordParts/DefaultSpeakingIconButton'
import SlowSpeakingIconButton from '@/Components/MainPageParts/BookOrWordParts/SlowSpeakingIconButton'

import UpBalloon from '@/Components/MainPageComponents/UpBalloon'
import HighlightSpellError from '@/Components/MainPageParts/BookOrWordParts/HighlightSpellError'





/** @jsxImportSource @emotion/react */
export default function Listening({auth, bookOrWords, parentBookId}) {
    const [voices, setVoices] = useState([])

    const [upBalloonProps, setUpBalloonProps] = useState({
        isBalloonHover: false,
        hoverWordIndex: null,
        dummyW: 0,
        isShow: false,
        x: 0,
        y: 0,
        wordIndex: null,
        text: 'テストテキスト。テストテキスト。テストテキスト。テストテキスト。テストテキスト。',
    })

    // 最初の順指定='selectSort'、普通='normal'、正解='correct'、不正解='incorrect'。
    // 全ての問題終了='finished'
    const [status, setStatus] = useState('selectSort')

    // ページタイトル。
    const pageTitle = '日本語訳にしてみよう'
    // 入力欄のplaceholder。
    const pagePlaceholder = '日本語訳を入力してください'

    // 答えのカラム名。
    const answerColumnName = 'japanese_word'

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
            || ( status === 'correct' && question.japanese_word === inputValue )
        ) { setExampleAnswerLabel('') }
        else if (status === 'correct') { setExampleAnswerLabel('他の例訳：') }
        else if (status === 'incorrect') { setExampleAnswerLabel('例訳：') }
        else if (status === 'finished') { setExampleAnswerLabel('　') }
    }, [status])



    // 次のquestionに変わったら、英語読み上げ再生する。
    useEffect( () => {
        // 声がまだないなら処理しない。
        if (voices.length === 0) return
        // statusが'normal'以外なら処理しない。
        if (status !== 'normal') return

        speechSynthesis.cancel() /* 前回の再生途中なら完全に止める。 */

        const englishWord = question.english_word
        const rowVoice = voices[ Math.floor(Math.random() * voices.length) ]

        const uttr = new SpeechSynthesisUtterance()
        // 英語セリフが空文字の再生テキスト・速度・言語をセット。
        if (!englishWord) {
            uttr.text = '英語のセリフがありません。'
            uttr.rate = 1.5
            uttr.lang = 'ja-JP'
        // 英語セリフに英語を含まない場合の再生テキスト・速度・言語をセット。
        } else if ( /[a-zA-Z0-9.]/.test(englishWord) === false ) {
            uttr.text = '英語のセリフに英語が含まれていません。'
            uttr.rate = 1.5
            uttr.lang = 'ja-JP'
        // 正常なら、英語セリフ・言語・あるならvoiceをセット。
        } else {
            uttr.text = englishWord
            if (rowVoice.voice !== null){
                uttr.voice = rowVoice.voice
            }
            uttr.pitch =(rowVoice.voicePitch === null)? 1 : rowVoice.voicePitch
            uttr.rate = 1
            uttr.lang = 'en-US'
        }

        // 再生を実行。
        speechSynthesis.speak(uttr)
    }, [question, voices])



    // 「送信するボタン」を押した時の処理の関数。
    const buttonClickforNormal = async () => {
        // -- 入力が空なら処理しない。 --
        if (inputValue === '') return
        // 考え中なら処理しない。
        if (isModalShow === true) return

        // -- DBの正解ならstatusに'correct'をセットする。 --
        if (inputValue === question.japanese_word) {
            setStatus('correct')
            return
        }

        // -- DBの正解でないなら、AIで正解か判定する。 --
        // まずloading画面にする。
        setIsModalShow(true)
        // 非同期通信でAIから"true"か"false"をもらう。
        const result = await axios({
            url: route('api.translation_correct.japanese_answer'),
            method: 'post',
            data: {
                englishText: question.english_word,
                japaneseText: inputValue
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



    return (<BooksComponent
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

        {/* 英文の各英単語の和訳表示ボタン */}
        <div css={css` flex: 1; `}>
            <HighlightSpellError
                questionIndex={question.id}
                upBalloonProps={upBalloonProps}
                setUpBalloonProps={setUpBalloonProps}
                text={question.english_word}
                voices={voices}
            />
        </div>
    </BooksComponent>)
}
