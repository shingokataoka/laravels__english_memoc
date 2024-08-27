import {useState, useEffect, useRef, createContext} from 'react'
import {usePage} from '@inertiajs/react'
import {css} from '@emotion/react'
// jsonファイルの辞書データ。
// import enTranslations from '@/../../public/dictionaries/enTranslations.json'



/** @jsxImportSource @emotion/react */
export const CommonContext = createContext()



// 全体で共通の変数やオブジェクトなどを定義するコンポーネント。
// useContextでどこからでも呼び出せるようにする。
// 一番上の親のコンポーネントをこのCommonProviderタグで囲む。

// 使う時は子コンポーネントで
// const {変数その１, 変数その２,} = useContext(CommonContext)
// と書く。
export default function CommonProvider({
    children,
}) {

    const [isFirstRender, setIsFirstRender] = useState(true)

    // 辞書の読み込みが完了したか。
    const [loadedEnTranslations, setLoadedEnTranslations] = useState(false)

    // 上記を変数として保存するuseRef。
    const valsRef = useRef({
        enTranslations: {},
    })

    // DBからの辞書データ。
    const dbEnTranslations = usePage().props.enTranslations


    // 辞書jsonデータを入れておく変数。
    const jsonEnTranslations = useRef(null)



    // 辞書のjsonファイルを動的にインポート。
    // npmrun build時に500MB超える防止と、パフォーマンス低下を防ぐため。
    useEffect( () => {
        // 初回レンダリング時以外なら処理しない。
        if (isFirstRender === false) return

        // 辞書のjsonファイルを動的にインポート。
        import('@/../../public/dictionaries/enTranslations.json')
        .then(jsonData => {
            // jsonファイルの辞書データを取得。
            jsonEnTranslations.current = jsonData
            // 変数にjsonのとDBの辞書を入れる。
            vals.enTranslations = {
                ...jsonEnTranslations.current,
                ...dbEnTranslations
            }

            // 辞書読み込み済にする。
            setLoadedEnTranslations(true)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [isFirstRender])






    // --- 変数 ---

    // 上記useRefのエイリアス。
    const vals = valsRef.current




    // --- 定数 ---


    // 表示状態の管理の定数 一覧。
    const SHOW_STATUS = {
        // TranslationsButtonsArea.jsxの「...辞書にない英単語を確認中」の表示管理に使う定数。
        TRANSLATIONS_LOADING: {
            FADE_IN: 1,
            BISIBLE: 2,
            FADE_OUT:3 ,
            HIDDEN: 4,
        },

    }



    // 共有化で渡す値 一覧。
    const commonValues = {loadedEnTranslations, vals, SHOW_STATUS, }



    // 初回レンダリング済みにする。
    useEffect( () => {
        // 初回レンダリングなら初回レンダリング以外にする。
        if (isFirstRender === true) setIsFirstRender(false)
    }, [isFirstRender])




    // 辞書読み込みが終わっていないなら、レンダリングしない。
    // if ( Object(vals.enTranslations).length < 30000 ) return




    return (<CommonContext.Provider value={commonValues}>
        <div css={css`
            ${(loadedEnTranslations === false)? 'opacity: 0;' : ''}
        `}>
            {children}
        </div>
    </CommonContext.Provider>)

}
