import Footer from '@/components/builtIn/Footer';
import NavBar from '@/components/builtIn/NavBar';
import { Head, usePage } from '@inertiajs/react';
import { ReactNode, useEffect } from 'react';
interface Props {
    children: ReactNode;
}
const MYLayout = ({ children }: Props) => {
    const { locale } = usePage().props;
    useEffect(() => {
        document.documentElement.dir = locale === 'ps' ? 'rtl' : 'ltr';
        document.documentElement.classList = 'font-serif';
    }, [locale]);

    return (
        <>
            <div className="bg-white dark:bg-slate-900">
                <Head title="Home" />
                <header className="z-50 w-full">
                    <NavBar />
                </header>
                <main className="justify-center dark:text-white">{children}</main>
                <footer className="">
                    <Footer />
                </footer>
            </div>
        </>
    );
};

export default MYLayout;
