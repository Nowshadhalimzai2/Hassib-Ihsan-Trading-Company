import React from 'react';
interface Props {
    title?: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}
const Section = ({ children, className }: Props) => {
    return (
        <section className={`section bg-[#f0f4ff] p-0 md:p-4 dark:bg-slate-900 ${className}`}>
            <div className="section-content">{children}</div>
        </section>
    );
};

export default Section;
