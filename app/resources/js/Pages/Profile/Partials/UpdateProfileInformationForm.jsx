import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';


import {css} from '@emotion/react'
import { defaultTheme } from '@/Components/DefaultThemeProvider';




/** @jsxImportSource @emotion/react  */
export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {

    const palette = defaultTheme().palette

    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium "
                    css={css` font-color: ${palette.text.primary}; `}
                >
                    Profile Information<br />
                    プロフィール情報
                </h2>

                <p className="mt-1 text-sm"
                    css={css` font-color:${palette.text.secondary}; `}
                >
                    Update your account's profile information and email address.<br />
                    アカウントのプロフィール情報とEメール アドレスを更新します。
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name 名前"
                        css={css` color:${palette.text.primary}; `}
                    />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                        css={css` background:${palette.bgSub}; `}
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

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

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2"
                        css={css` font-color: ${palette.text.primary};`}
                        >
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                css={css`
                                    opacity: 0.6;
                                    &:hover { opacity: 0.8; }
                                `}
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm"
                                css={css` color:${palette.success.light}; `}
                            >
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save<br />保存</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm"
                            css={css` color:${palette.text.secondary}; `}
                        >Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
