import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

import {css} from '@emotion/react'
import { defaultTheme } from '@/Components/DefaultThemeProvider'

import { LoadingButton } from '@mui/lab';




/** @jsxImportSource @emotion/react  */
export default function VerifyEmail({ status }) {
    const palette = defaultTheme().palette

    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="メール認証" />

            <div className="mb-4 text-sm text-gray-600">
                登録ありがとうございます！<br />
                先ほど確認のメールを送信しました。<br />
                このメールの「メールアドレスの確認」リンクを押してください。<br />
                するとメールアドレスが正しい事が送信されて、ご利用できるようになります。<br /><br />

                メールが届かない場合は、下記「確認メールを再送信」を押してください。再度メールをお送りいたします。
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm"
                    css={css` color:${palette.success.light}; `}
                >
                    新しい確認リンクが、登録時に指定した電子メール アドレスに送信されました。
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <LoadingButton variant="contained" color="secondary"
                        loading={processing}
                        type="submit"
                    >確認メールを再送信</LoadingButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        ログアウト
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
