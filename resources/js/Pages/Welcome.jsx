import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth = {},
    laravelVersion,
    phpVersion,
}) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');

        document.getElementById('docs-card')?.classList.add('!row-span-1');

        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');

        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />

            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />

                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">

                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">

                            <div className="flex lg:col-start-2 lg:justify-center">
                                <h1 className="text-3xl font-bold text-black dark:text-white">
                                    Laravel 🔥
                                </h1>
                            </div>

                            <nav className="-mx-3 flex flex-1 justify-end">

                                {auth?.user ? (

                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 dark:text-white"
                                    >
                                        Dashboard
                                    </Link>

                                ) : (

                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 dark:text-white"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 dark:text-white"
                                        >
                                            Register
                                        </Link>
                                    </>

                                )}

                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">

                                <a
                                    href="https://laravel.com/docs"
                                    id="docs-card"
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow"
                                >

                                    <div
                                        id="screenshot-container"
                                        className="relative flex w-full flex-1 items-stretch"
                                    >

                                        <img
                                            src="https://laravel.com/assets/img/welcome/docs-light.svg"
                                            alt="Laravel documentation screenshot"
                                            className="aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top"
                                            onError={handleImageError}
                                        />

                                    </div>

                                    <div className="relative flex items-center gap-6 lg:items-end">

                                        <div
                                            id="docs-card-content"
                                            className="flex items-start gap-6 lg:flex-col"
                                        >

                                            <div className="pt-3 sm:pt-5 lg:pt-0">

                                                <h2 className="text-xl font-semibold text-black dark:text-white">
                                                    Documentation
                                                </h2>

                                                <p className="mt-4 text-sm/relaxed">
                                                    Laravel documentation covering every
                                                    aspect of the framework.
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>

                    </div>
                </div>
            </div>
        </>
    );
}