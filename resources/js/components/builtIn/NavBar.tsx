import NavLink from '@/components/builtIn/NavLink';
import Ul from '@/components/builtIn/Ul';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import logo from '../../../../public/images/nobgLogo.png';
import DarkModeButton from './DarkModeButton';

const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    // set Menu status to false while the screen size is more than Medium size
    useEffect(() => {
        const handleResize = () => {
            const mediumWindowsSize = 768;
            if (window.innerWidth >= mediumWindowsSize) {
                setShowMenu(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Call it initially in case the window is already large
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const page = usePage();
    const links = [
        {
            title: 'Home',
            url: '/',
        },
        {
            title: 'Product',
            url: '/products',
        },
        {
            title: 'Blog',
            url: '/blog',
        },
        {
            title: 'About',
            url: '/about',
        },
        {
            title: 'Contact',
            url: '/contact',
        },
        {
            title: 'Account',
            url: '/admin/dashboard',
        },
    ];
    return (
        <>
            <div className="relative border-b border-slate-700 bg-slate-900">
                <div className="flex items-center justify-between px-3 text-2xl lg:px-6">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-18 w-18" />
                        <h3 className="active border-0 text-xl md:text-2xl">Basit Ishaq Ltd</h3>
                    </div>
                    {/* LLLLLLLLLLLLLLLLLL   LARGE SCREEN MENU  LLLLLLLLLLLLLLLLL */}
                    <div className="hidden grow md:block">
                        <div className="flex justify-between">
                            <Ul>
                                {links.map((link) => (
                                    <NavLink key={link.title} text={link.title} isActive={link.url == page.url} href={link.url} />
                                ))}
                            </Ul>

                            <div className="flex items-center text-sm">
                                <span className="">
                                    <a
                                        href="/login"
                                        className="rounded-md bg-[#1c3d3d] px-3 py-2 text-lime-400 transition-all duration-300 ease-out hover:text-white dark:bg-lime-400 dark:text-[#1c3d3d] dark:hover:bg-[#1c3d3d] dark:hover:text-white"
                                    >
                                        Log in
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* LLLLLLLLLLLLLLLLLL  end Large screen menu LLLLLLLLLLLLLLLLL */}

                    {/* SSSSSSSSSSSSSSSSSS SMALL SCREEN MENU sssssssssssssssss*/}
                    <div className="block md:hidden">
                        <div>
                            {/* THE MENU ICON represents as three lines */}
                            {showMenu ? (
                                <CloseButton setShowMenu={setShowMenu} isShowMenu={showMenu} />
                            ) : (
                                <MenuButton setShowMenu={setShowMenu} isShowMenu={showMenu} />
                            )}
                            {/* end of menu icon */}
                        </div>
                    </div>

                    {/* ssssssssssssssssss small screen menu sssssssssssssssss */}
                </div>
                {showMenu && (
                    <>
                        <ul className="flex flex-col items-center text-lg">
                            {links.map((link) => (
                                <NavLink text={link.title} ismobile={true} isActive={link.url == page.url} href={link.url} />
                            ))}
                        </ul>
                        <DarkModeButton className="w-full" />
                    </>
                )}
            </div>
        </>
    );
};
interface ButtonProps {
    setShowMenu: (prev: boolean) => void;
    isShowMenu: boolean;
}
const CloseButton = ({ setShowMenu, isShowMenu }: ButtonProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setShowMenu(!isShowMenu)}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-10 transition-all duration-300 ease-in-out hover:text-lime-400"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </>
    );
};

const MenuButton = ({ setShowMenu, isShowMenu }: ButtonProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-10 transition-all duration-300 ease-in-out hover:text-lime-400"
                onClick={() => setShowMenu(!isShowMenu)}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </>
    );
};
export default NavBar;
