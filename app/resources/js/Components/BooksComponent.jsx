import React, {useEffect, useRef, useState} from 'react'

import {defaultTheme, DefaultThemeProvider, isDark} from '@/Components/DefaultThemeProvider'
import {css} from '@emotion/react'
import {router} from '@inertiajs/react'

import UpBalloon from '@/Components/MainPageComponents/UpBalloon'
import UpBalloon2 from '@/Components/UpBalloon2'

import WebSpeachApiVoices from '@/Components/WebSpeachApiVoices'

import { TextField } from '@mui/material'
import {Stack} from '@mui/material'
import {Button} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ModalLoading from '@/Components/ModalLoading'
import CharacterIcon from './CharacterIcon'





/** @jsxImportSource @emotion/react */
export default function BooksComponent({
    children,
    auth,
    bookOrWords,
    parentBookId,
    voices,
    setVoices,
    questionsRef,
    questionIndex,
    setQuestionIndex,
    question,
    setQuestion,
    buttonClickforNormal,
    isModalShow,
    inputValue,
    setInputValue,
    status,
    setStatus,
    pageTitle,
    pagePlaceholder,
    answerColumnName,
    exampleAnswerLabel,
    upBalloonProps = null,
    setUpBalloonProps = null,
    answerInJapanese = '',
    isEnglishSpeak = true,
    isAnswerEnglishSpeak = false,
}) {

    const palette = defaultTheme().palette
    const isLight = !isDark()

    const currentDomRef = useRef(null)

    const focusLineColor = (!isLight)? palette.info.light : 'rgba(0, 250, 255, 1)'
    const [focusTextField, setFocusTextField] = useState(false)



    // 親本へのURL（なければトップへのURL）。
    const parentUrl =(parentBookId === null || parentBookId >= 1)
        ? route('main.top')
        : route('main.book', {book_id: parentBookId})

    // フェードイン・アウト時の片往復のミリ秒時間
    const fadeMSec = 250

    // 問題の英文を読み上げを管理するtrueかfalseを切り替えれば読み上げ。
    const [questionSpeakToggle, setQuestionSpeakToggle] = useState(false)

    // 回答欄のDOMのref
    const textFieldDomRef = useRef(null)
    // 「送信する」か「次へ」ボタンのDOMのref
    const answerButtonDomRef = useRef(null)

    // 問題の数。
    const questionNumber = useRef(bookOrWords.length)
    // 正解数を入れるref。
    const correctNumberRef = useRef(0)
    // 不正解数を入れるref。
    const incorrectNumberRef = useRef(0)
    // 正解ゲージのパーセント。
    const [correctPercent, setCorrectPercent] = useState(0)


    // 送信ボタンの文字。「送信する」か「次へ」。
    const [buttonLabel, setButtonLabel] = useState('送信する')

    // メッセージ横のアイコン。
    const [messageIcon, setMessageIcon] = useState(null)

    // 正解時の効果音。
    const correctSound = new Audio('/sounds/correct.mp3')
    // 不正解時の効果音。
    const incorrectSound = new Audio('/sounds/incorrect.mp3')

    // 回答後のメッセージのuseState。
    const [answerdMessage, setAnsweredMessage] = useState('')

    // 回答後の解答例のuseState。
    const [exampleAnswer, setExampleAnswer] = useState('')

    // 終了後に表示するキャラ画像ファイル名。
    const [filename, setFilename] = useState('000.jpg')
    // 終了後に表示するキャラのセリフ。
    const [characterLine, setCharacterLine] = useState('あぁ..ぁ...')
    // 終了後に表示するナレーターのセリフ。
    const [narratorLine, setNarratorLine] = useState('あぁ..ぁ...')

    // 「送信する」ボタンの色。
    const [buttonColor, setButtonColor] = useState(palette.primary.main)
    // 「送信する」ボタンのカラー名。
    const [buttonColorName, setButtonColorName] = useState('primary')
    // footerのbox-shadowの色。
    const [boxShadowColor, setBoxShadowColor] = useState(palette.bgSub)
    // footerの背景色。
    const [footerBgColor, setFooterBgColor] = useState('#0000')







    // questionIndexが変わった時の処理。
    useEffect( () => {
        setQuestion(questionsRef.current[questionIndex])
    }, [questionIndex, questionsRef.current])



    //statusが変わった時の処理。
    useEffect( () => {
        // 間違えた問題をquestionsの最後に追加する。
        if (status === 'incorrect') questionsRef.current.push(question)

        // 正解数をカウントする。
        if (status === 'correct') correctNumberRef.current += 1
        // 不正解数をカウントする。
        if (status === 'incorrect') incorrectNumberRef.current += 1

        // 正解率を算出する（正解数 / 元のbookOrWordsの数 に x100して%にする）。
        setCorrectPercent(value => {
            return correctNumberRef.current / bookOrWords.length * 100
        })


        // 終了時の処理。
        if (status === 'finished') {
            let lineIndex = 0
            // 最後に表示のキャラ画像のファイル名のリスト。
            let characterImages = [
                '000.jpg',
                '001.jpg',
                '011.jpg',
                '030.jpg',
                '060.jpg',
                '070.jpg',
                '090.jpg',
                '095.jpg',
            ]
            // 満点の場合のキャラ画像のファイル名のリスト。
            if (incorrectNumberRef.current === 0) {
                characterImages = ['100.jpg']
            }
            // 画像をセット。
            lineIndex = Math.floor( Math.random() * characterImages.length )
            setFilename(characterImages[lineIndex])


            // 最後に表示のキャラのセリフとナレーターのセリフのパターン。
            let lines = [
                [<>おつかれさま<br />また明日ね！</>, '期待しているようです。'],
                [<>今日もがんばったね<br />スィーユゥ</>, 'どうやら「See you（またね）」と言っているようです。'],
                ['やったね！', 'ハグしたいようです。'],

                ['今日もいいね！', 'また良い一日でありますように。'],
                ['やりきって素晴らしい', '明日も待っているようです。'],
                ['おつかれさま！休憩も忘れないでね', '実は眠りたいようです。'],

                [<>おつかれさま<br />Happy!</>, 'すごいね！ おつかれさま'],
                [<>今日もがんばったね<br />Good!</>, 'Nice!'],
                [<>やったね<br />Yay!</>, ],
                [<>It's cool!</>, ''],
                [<>You are very good!</>, ''],

                [<>イヤッホーィ！<br />wonderful!</>, '羽ばたくほどの英語力！'],
                [<>良い風だ〜</>, 'Nice wind! 良い風が吹いている。'],
                [<>はばたくのさ〜♪</>, 'We can fly!'],
            ]
            // 満点ならこっちのセリフのパターン。
            if (incorrectNumberRef.current === 0) {
                lines = [
                    [<>おぉ..！<br />ありがとう</>, <>You are perfect! Amazing!</>],
                    [<>余は満足じゃ☆</>, <>超竜形態は快適なようです。</>],
                    [<>英語みなぎり幸福パワー！</>, <>あなたの英語力が幸せを与えました。</>],
                ]
            }

            // 最後の画面のセリフとナレーターをセット。
            lineIndex = Math.floor( Math.random() * lines.length )
            setCharacterLine(lines[lineIndex][0])
            setNarratorLine(lines[lineIndex][1])


            // 終了画面の音。
            const finishedSound = new Audio('/sounds/finisheds/095.mp3')
            finishedSound.volume = 0.3
            // フェードイン後に鳴らす。
            const timeObj = setTimeout( () => {
                finishedSound.play()
                clearTimeout(timeObj)
            }, 240)
        }

        // ボタンの文字を「送信する」か「次へ」にセットする。
        if (status === 'normal') { setButtonLabel('送信する') }
        else if (status === 'finished') { setButtonLabel('メインページへ') }
        else { setButtonLabel('次へ') }

        // 「次へ」を押したあと回答欄を空にする。
        if (status === 'normal') setInputValue('')

        // 「次へ」を押したあと回答欄にフォーカスする。
        if (status === 'selectSort') {}
        else if (status === 'normal') { textFieldDomRef.current.querySelector('textarea').focus() }
        // 「送信する」を押した（Enter送信した）あとボタンにフォーカスする。
        else if (status !== 'normal') { answerButtonDomRef.current.focus() }

        const tmpIndex = Math.floor(Math.random() * 3)
        // 正解時のメッセージをランダムに生成。
        const correctMessage = ['正解！', '素晴らしい！', 'ナイス!'][tmpIndex]
        // 不正解時のメッセージをランダムに生成。
        const incorrectMessage = ['また覚えればいいよ。', '残念　次があるよ'][tmpIndex]

        // 回答後のメッセージをセットする。
        if (status === 'normal') setAnsweredMessage('')
        if (status === 'correct') setAnsweredMessage(correctMessage)
        if (status === 'incorrect') setAnsweredMessage(incorrectMessage)
        if (status === 'finished') setAnsweredMessage('　')

        // 回答後のメッセージ横のアイコンをセットする。
        if (status === 'normal') setMessageIcon('')
        if (status === 'correct') setMessageIcon(<CheckIcon />)
        if (status === 'incorrect') setMessageIcon(<CloseOutlinedIcon />)
        if (status === 'finished') setMessageIcon('　')


        // 解答例をセットする。
        if (
            status === 'normal'
            || ( status === 'correct' && question[answerColumnName] === inputValue )
        ) { setExampleAnswer('') }
        else if (status === 'correct') { setExampleAnswer(question[answerColumnName])}
        else if (status === 'incorrect') { setExampleAnswer(question[answerColumnName])}
        else if (status === 'finished') { setExampleAnswer('　')}

        // 「送信する」ボタンの色をセットする。
        if (status === 'normal') setButtonColor(palette.primary.main) // 普通の色
        if (status === 'correct') setButtonColor(palette.success.main)   // 正解時の色
        if (status === 'incorrect') setButtonColor(palette.error.main)    // 不正解時の色
        if (status === 'finished') setButtonColor(palette.info.main) // 終了時の色

        // 送信するボタンのcolor=""の値。
        if (status === 'normal') setButtonColorName('primary') // 普通のカラー名
        if (status === 'correct') setButtonColorName('success')   // 正解時のカラー名
        if (status === 'incorrect') setButtonColorName('error')    // 不正解時のカラー名
        if (status === 'finished') setButtonColorName('info')    // 終了時のカラー名

        // フッターのbox-shadowの色をセット。
        if (status === 'normal') setBoxShadowColor( isLight? '#aaa' : palette.bgSub) // 普通の色
        if (status === 'correct') setBoxShadowColor(palette.success.main)   // 正解時の色
        if (status === 'incorrect') setBoxShadowColor(palette.error.main)    // 不正解時の色
        if (status === 'finished') setBoxShadowColor(palette.primary.main) // 普通の色

        // フッターの背景色をセット。
        if (status === 'normal') setFooterBgColor( isLight? '#fff' : '#0000')
        if (status === 'correct') setFooterBgColor( isLight? '#32CD3233' : palette.bgBack )
        if (status === 'incorrect') setFooterBgColor( isLight? '#ffc0bc77' : palette.bgBack )

        // 効果音を鳴らす。
        if (status === 'correct') correctSound.play()
        if (status === 'incorrect') incorrectSound.play()

    }, [status])



    // 次のquestionに変わったら、英語読み上げ再生する。
    useEffect( () => {
        // 自動読み上げOFFなら処理しない。
        if (isEnglishSpeak === false) return
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
    }, [questionSpeakToggle, question, voices])



    // 答えの英語を正解したら、英語読み上げ。
    useEffect( () => {
        // 答え英語の読み上げOFFなら処理しない。
        if (isAnswerEnglishSpeak === false) return
        // 声がまだないなら処理しない。
        if (voices.length === 0) return
        // statusが'correct'以外なら処理しない。
        if (status !== 'correct') return

        speechSynthesis.cancel() /* 前回の再生途中なら完全に止める。 */

        const englishWord = inputValue
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
    }, [status])



    // 「メインページへ戻る」ボタンを押した処理。
    const topLinkClick = e => {
        if ( !confirm('途中から再開できません。\r\n本当にトップページに戻りますか？') ) return

        router.visit( parentUrl, {
            method: 'get',
        })
    }



    // TextFiledにフォーカス時の処理。
    const handleFocus = e => {
        setFocusTextField(true)

        // statusが次へなら、ボタンをフォーカスする。
        if (status === 'correct' || status === 'incorrect') answerButtonDomRef.current.focus()
    }



    // TextFieldのフォーカスが外れた時の処理。
    const handleBlur = e => {
        setFocusTextField(false)
    }



    // 回答欄の入力が変わった時の処理。
    const changeTextField = e => {
        // 「...考え中」なら処理しない。
        if (isModalShow === true) return


        // 元の回答+改行なら、「送信する」ボタンを押した処理をする。
        if (
            inputValue + '\r\n' === e.target.value
            || inputValue + '\r' === e.target.value
            || inputValue + '\n' === e.target.value
        ) {
            buttonClickforNormal()
            return
        }
        // 元の回答+改行じゃなければ、改行以外を入れる。
        setInputValue( e.target.value.replace(/(\r\n|\n|\r)/gm, '') )
    }




    // 「順番通り」か「ランダム順」を押した処理。
    const selectSortButtonClick = (selectSort) =>  {
        // まずはフェードアウト・インのアニメーションをする。
        currentDomRef.current.animate([
            {opacity: 1},
            {opacity: 0},
            {opacity: 1},
        ], fadeMSec * 2)

        // フェードアウトしてから処理する。
        const timeoutObj = setTimeout( () => {
            // 押したのが「ランダム順」ならランダム順にする。
            if (selectSort === 'sort_random') {
                questionsRef.current = [...questionsRef.current].sort(() => Math.random() - 0.5)
            }
            setQuestion(questionsRef.current[questionIndex])
            setStatus('normal')
            // 英文を再生する。
            setQuestionSpeakToggle(value => !value)


            clearTimeout(timeoutObj)
        }, fadeMSec)
    }



    // 「次へ」ボタンを押した時の処理の関数。
    const buttonClickforNotNormal = () => {
        // まずはフェードアウト・インのアニメーションをする。
        currentDomRef.current.animate([
            {opacity: 1},
            {opacity: 0},
            {opacity: 1},
        ], fadeMSec * 2)

        // フェードアウトしてから処理する。
        const timeoutObj = setTimeout( () => {
            // 次の問題がなければ全問題を終了にする。
            if ( questionsRef.current.length <= questionIndex + 1 ) {
                setStatus('finished')
                clearTimeout(timeoutObj)
                return
            }
            // statusを'normal'に戻す。
            setStatus('normal')

            // 次の問題に進める。
            setQuestionIndex(value => value + 1)
            // 英文読み上げをする。
            setQuestionSpeakToggle(value => !value)

            clearTimeout(timeoutObj)
        }, fadeMSec)

    }



    // 「送信する」か「次へ」か「メインページへ」(終了画面)ボタンを押した時の処理。
    const answerButtonClick = (e) => {
        e.preventDefault()
        // 「送信する」ボタンを押した処理。
        if (status === 'normal') { buttonClickforNormal() }
        // 「メインページへ」(終了画面)を押した処理。
        else if (status === 'finished') { router.visit(parentUrl, {method: 'get'}) }
        // 「次へ」ボタンを押した時の処理。
        else { buttonClickforNotNormal() }
    }



    const fontCss = css`
        font-size: 1rem;
        font-family: "Helvetica Neue",
            Arial,
            "Hiragino Kaku Gothic ProN",
            "Hiragino Sans",
            Meiryo,
            sans-serif;
    `



    const textFieldCss = css`
        width: 100%;
        fieldset {
            ${
                (!isLight)? 'border-color: rgba(255,255,255,0.23) !important;'
                : 'border-color: rgba(0,0,0,0.23) !important;'
            }
        }
        & > div {
            background: ${ isLight? '#fff' : palette.bgTextField};
            padding: 6px;
            ${ focusTextField
                ? `box-shadow: inset 0px 0px 7px 1px ${focusLineColor};`
                : ''
            }
        }
        & textarea {
            ${fontCss}
            box-shadow: none;
            line-height: 1.5rem;
        }
    `



    // 現在ライフのJSX。
    const LifeGaugeJsx = (<div css={css`
        display: flex;
        align-items: center;
        margin: 0 auto;
        max-width: 700px;
        width: 100%;
    `}>
        {/* キャラアイコン画像 */}
        <CharacterIcon />

        {/* ライフゲージ */}
        <div css={css`
            flex: 1;
            margin: 0 8px;
            height: 20px;
            border-radius: 8px;
            background: ${isLight? '#aaa' : '#333'};
        `}>
            <div css={css`
                transition: all 0.5s;
                width: ${correctPercent}%;
                height: 20px;
                border-radius: 8px;
                background: ${isLight? '#0fa' : '#0b9'};
            `} />
        </div>
    </div>)




    // 全問題終了時のJSX。
    const finishedJsx = (<Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        css={css`
            padding-top: 64px;
            padding-bottom: 16px;
            background: ${ isLight? palette.bgMain : palette.bgSub};
            text-align: center;
        `}
    >

        {/* キャラクター画像 */}
        <img
            src={ `/images/characters/${filename}` }
            css={css`
                border-radius: 50%;
                width: 150px;
                height: 150px;
            `}
        />

        <div>
            {/* キャラクターのセリフ上の矢印。 */}
            <div css={css`
                margin: 0 auto;
                margin-bottom: -0px;
                width:0px;
                height: 0px;
                box-sizing: border-box;
                border: 8px #0000 solid;
                border-bottom-color: ${isLight? '#fff' : palette.bgMain};
            `} />
            {/* キャラクターのセリフ。 */}
            <div css={css`
                font-size: 1.2rem;
                padding: 8px 16px;
                border-radius: 12px;
                // border: 1px ${palette.bgBack} solid;
                background: ${isLight? '#fff' : palette.bgMain};
            `}>{characterLine}</div>
        </div>

        <div>　{narratorLine}　</div>

    </Stack>)



    // 問題クイズのjsx。
    const questionJsx = (<>
        <WebSpeachApiVoices voices={voices} setVoices={setVoices} />

        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            css={css`
                padding-top: 16px;
                background: ${isLight? palette.bgMain : '#0000'};
                padding-bottom: 16px;
            `}
        >

            {/* 「メインページへ戻る」ボタン */}
            <Button
                onClick={topLinkClick}
                css={css`
                    box-shadow: 0 0 13px 0 ${palette.primary.main} inset;
                `}
            >メインページへ戻る</Button>

            {LifeGaugeJsx}

            <div css={css`font-size: 1.3rem;`}>- {pageTitle} -</div>

            {/* 再生ボタン・問題英文、入力欄 */}
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
                css={css`
                    margin: 0 auto;
                    max-width: 700px;
                    width: 100%;
                    padding: 8px;
                `}
            >
                {/* 再生アイコンと問題英文 */}
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    css={css`
                        padding: 8px;
                        background: ${isLight? '#fff' : palette.bgBack};
                        border-radius: 4px;
                        border: 1px ${palette.bgSub} solid;

                    `}
                >
                    {children}

                </Stack>

                <form onSubmit={answerButtonClick}>
                    <TextField
                        ref={textFieldDomRef}
                        multiline
                        placeholder={pagePlaceholder}
                        name="answer_field"
                        value={inputValue}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={ changeTextField }
                        css={textFieldCss}
                    />
                </form>
            </Stack>
        </Stack>
    </>)





    // 最初の順番選択の画面のJSX。
    const selectSortJsx = (<>
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        css={css`
            height: 100vh;
        `}
    >
        <div css={css`
            font-size: 1.2rem;
            font-weight: bold;
        `}>問題の順番を選んでください。</div>
        <div>
            <Button variant="contained"
                onClick={ e => { selectSortButtonClick('sort_order') } }
            >順番通り</Button>
            <Button variant="contained"
                color="info"
                css={css`margin-left: 32px;`}
                onClick={ e => { selectSortButtonClick('sort_random') } }
            >ランダム順</Button>
        </div>
    </Stack>
    </>)






    return (<DefaultThemeProvider>
    <ModalLoading isShow={isModalShow} text="...考え中" />
    <UpBalloon2
        upBalloonProps={upBalloonProps}
        setUpBalloonProps={setUpBalloonProps}
    />
    <div
        ref={currentDomRef}
        css={css`
            display: flex;
            flex-direction: column;
            align-items: stretch;
            height: 100vh;
        `}
    >
        {/* 「順番選択画面」では表示する。 */}
        <div css={css`
            ${ (status === 'selectSort')?  '' : 'display: none;' }
        `}>{selectSortJsx}</div>

        {/* 「順番選択画面」では表示しない。 */}
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={0}
            css={css`
                flex:1;
                ${ (status === 'selectSort')? 'display: none;' : '' }
            `}
        >
            { (status === 'finished')? finishedJsx : questionJsx }

            {/* フッター */}
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                css={css`
                    flex: 1;
                    width: 100%;
                    padding: 8px 4px;
                    box-shadow: 0px -1px 3px 0px ${boxShadowColor};
                    background: ${footerBgColor};
                `}
            >
                {/* 「送信する」か「次へ」ボタン。 */}
                <Button
                    ref={answerButtonDomRef}
                    variant="outlined" color={buttonColorName}
                    onClick={answerButtonClick}
                    css={css`
                        border-color: ${buttonColor};
                        color: ${buttonColor};
                        font-weight: bold;
                    `}
                >{buttonLabel}</Button>

                {/* 「○正解」か「×残念」 */}
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    css={css`
                        margin: 0 auto;
                        max-width: 700px;
                        width: 100%;
                        color: ${buttonColor};
                        font-weight: bold;
                        font-size: 1rem;
                    `}>
                        {/* ○か×のアイコン */}
                        <div css={css`
                            diplay: inline-block;
                            opacity: ${(status === 'normal' || status === 'finished')
                                ? 0
                                : 1
                            };
                        `}>
                            <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            css={css`
                                background: ${(!isLight)? '#000a' : '#00000018'};
                                border-radius: 50%;
                                width: 35px;
                                height: 35px;
                                transform: scale(1.3, 1.3);
                            `}>{messageIcon}</Stack>
                        </div>
                        <div>
                            {/* 正解例 */}
                            <div>
                                <span css={css`font-size:1.2rem;`}>{exampleAnswerLabel}</span>
                                {exampleAnswer}
                            </div>
                            {/* 正解例 */}
                            <div>
                                <span css={css`font-size:1.2rem;`}>{(answerInJapanese === '')
                                    ? ''
                                    :  '日本語訳：'
                                }</span>
                                {answerInJapanese}
                            </div>
                            {/* 正解時か不正解時のメッセージ */}
                            <div>{answerdMessage}</div>
                        </div>
                </Stack>

            </Stack>
        </Stack>

    </div>
    </DefaultThemeProvider>)
}
