import {useCallback, useEffect } from 'react'
import { router } from '@inertiajs/react'



export default function AllPageComponent(){

// ブラウザバック用の関数を作成。
const blockBrowserBack = useCallback(() => {
    // SPAでのページリロードを実行（Inertiaのrouterの機能）。
    // オプション「preserveScroll: true」でスクロール位置を保持に設定。
    // router.reload({ preserveScroll: true });
    router.visit(window.location.href, {
        method: 'get',
        replace: true,  // 履歴を上
        preserveScroll: (page) => Object.keys(page.props.errors).length,
    })
}, [])


useEffect(() => {
    // イベントリスナー'popstate'でブラウザバックや「進む」時に、上記の関数をセット。
    window.addEventListener('popstate', blockBrowserBack)
    // クリーンアップは忘れない
    return () => {
        window.removeEventListener('popstate', blockBrowserBack)
    }
}, [blockBrowserBack])



    return (<></>)
}
