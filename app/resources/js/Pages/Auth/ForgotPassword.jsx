import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

import { css } from '@emotion/react';
import { defaultTheme, isDark } from '@/Components/DefaultThemeProvider';




/** @jsxImportSource @emotion/react  */
export default function ForgotPassword({ status }) {
    const palette = defaultTheme().palette

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                パスワードをお忘れですか？<br />問題ありません。あなたのメールアドレスをお知らせいただければ、新しいパスワードを選択できるようにパスワードリセットリンクをメールでお送りします。
            </div>

            {status && <div className="mb-4 font-medium text-sm"
                css={css`
                    color:${palette.success.light};
                    font-weight: bold;
                `}
            >{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4 submit_button" disabled={processing}>
                        メールパスワードリセットリンク
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
