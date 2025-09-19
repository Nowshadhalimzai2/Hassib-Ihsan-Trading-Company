import React from 'react';

interface PageTitleProps {
    title: string;
    children?: React.ReactNode;
    position?: 'left' | 'center' | 'right';
}

const PageTitle = ({ title, children, position = 'center' }: PageTitleProps) => {
    return (
        <div
            className={`${children && 'flex flex-col items-center justify-between md:flex-row md:space-y-0'} space-y-2 rounded-none bg-lime-400 px-3 py-4 shadow-lg md:rounded-lg md:px-8`}
        >
            <h1
                className={`${
                    position === 'left' ? 'text-left' : position === 'right' ? 'text-right' : 'text-center'
                } text-2xl font-bold text-gray-900 md:text-3xl dark:text-white/90`}
            >
                {title}
            </h1>
            {children}
        </div>
    );
};

export default PageTitle;
