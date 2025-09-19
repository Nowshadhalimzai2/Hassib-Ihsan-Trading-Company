import Footer from '@/components/builtIn/Footer';
import NavBar from '@/components/builtIn/NavBar';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
interface Props {
    children: ReactNode;
}
const MYLayout = ({ children }: Props) => {
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
