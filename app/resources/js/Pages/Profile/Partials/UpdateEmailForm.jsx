import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';


import {css} from '@emotion/react'
import { defaultTheme } from '@/Components/DefaultThemeProvider';

import { useEffect, useState } from 'react';


/** @jsxImportSource @emotion/react  */
export default function UpdateEmailForm({ mustVerifyEmail, status, className = '' }) {

    const palette = defaultTheme().palette

    const user = usePage().props.auth.user;
    const session = usePage().props.session;

    const flashMessage = session.email_update_message
    const flashStatus = session.email_update_status
    const [isFlashShow, setIsFlashShow] = useState( val => { flashMessage? true : false } )

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        email: user.email,
    });

    const [isOldEmail, setIsOldEmail] = useState(false)


    const submit = (e) => {
        e.preventDefault();

        // 元のメールアドレスのままなら送信しない。
        if (user.email === data.email) {
            setIsOldEmail(true)
            return;
        }

        // 送信開始時に、フラッシュメッセージを消す。
        setIsFlashShow(false)

        patch( route('email.update'), {
            preserveScroll: true,
            onFinish: () => { setIsFlashShow(true) },
        });
    };


    useEffect( () => {
        let timeoutObj = null
        if (isOldEmail) timeoutObj = setTimeout(function(){
            setIsOldEmail(false)
        }, [3000] )
        return () => {
            clearTimeout(timeoutObj)
        }
    }, [isOldEmail])


    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium "
                    css={css` font-color: ${palette.text.primary}; `}
                >
                    Update Email Address<br />
                    メールアドレスを更新する
                </h2>

                <p className="mt-1 text-sm"
                    css={css` font-color:${palette.text.secondary}; `}
                >
                    Update your account's email address.<br />
                    アカウントのEメール アドレスを更新します。
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="メールアドレス Email address"
                        css={css` color:${palette.text.primary}; `}
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        css={css` background:${palette.bgSub};  `}
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                { (!isFlashShow)? '' : <div css={css`
                    color: ${
                        (flashStatus === 'success')? palette.success.light : ''
                         + (flashStatus === 'error')? palette.error.light : ''
                    } ;
                    font-weight: bold;
                    font-size: 0.87rem;
                `}>
                    { flashMessage }
                </div> }


                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Update<br />更新</PrimaryButton>

                <div css={css`
                    font-size: 0.87rem;
                    transition: opacity 0.25s;
                    opacity: ${ isOldEmail? 1 : 0 }
                `}>元のメールアドレスのままです。</div>

                    {/* <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm"
                            css={css` color:${palette.text.secondary}; `}
                        >Saved.</p>
                    </Transition> */}
                </div>
            </form>
        </section>
    );
}
