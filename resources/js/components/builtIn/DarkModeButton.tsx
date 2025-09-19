import { useEffect, useState } from 'react';
interface Props {
    className?: string;
}
const DarkModeButton = ({ className = '' }: Props) => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // document.body.classList.toggle('dark');
    };
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);
    return (
        <>
            <div className={'rounded-md bg-[#1c3d3d] text-lime-300/40 transition-all' + className}>
                <button className="w-full rounded-md px-3 py-2 dark:bg-lime-400 dark:text-[#1c3d3d]" onClick={toggleDarkMode}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </>
    );
};

export default DarkModeButton;
