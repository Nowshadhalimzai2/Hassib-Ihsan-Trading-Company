import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-lime-200 p-6 md:p-10 dark:bg-slate-900">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex h-16 w-16 items-center justify-center rounded-md md:h-20 md:w-20">
                                <AppLogoIcon className="size-16 fill-current text-[var(--foreground)] md:size-20 dark:text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-sky-700 via-pink-600 to-yellow-500 bg-clip-text text-xl text-transparent md:text-2xl">
                                {title}
                            </span>
                        </Link>

                        <div className="space-y-2 text-center">
                            {/* <h1 className="text-xl font-medium">{title}</h1> */}
                            <p className="text-muted-foreground text-center text-sm">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
