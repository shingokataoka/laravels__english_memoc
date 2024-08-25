import {useRef, createContext} from 'react'
import {usePage} from '@inertiajs/react'

// jsonファイルの辞書データ。
import enTranslations from '@/../../public/dictionaries/enTranslations.json'




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

    // DBからの辞書データ。
    const dbEnTranslations = usePage().props.enTranslations



    // --- 変数 ---

    // 上記を変数として保存するuseRef。
    const valsRef = useRef({
        enTranslations: {...enTranslations, ...dbEnTranslations},
    })
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
    const commonValues = {vals, SHOW_STATUS, }

    return (<CommonContext.Provider value={commonValues}>
        {children}
    </CommonContext.Provider>)

}
