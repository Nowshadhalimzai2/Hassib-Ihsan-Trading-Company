interface Props {
    text: string;
    isActive?: boolean;
    href: string;
    ismobile?: boolean;
    className?: string;
}
const NavLink = ({ text, isActive = false, href, ismobile = false, className = '' }: Props) => {
    return (
        <>
            {ismobile ? (
                <a
                    href={href}
                    className={`w-full rounded-sm px-3 py-1 text-left ${className} ${isActive ? 'bg-[#1c3d3d] text-white dark:bg-lime-400/50' : 'hover:bg-lime-400 hover:text-[#1c3d3d] dark:hover:bg-lime-400 dark:hover:text-[#1c3d3d]'}`}
                >
                    <span className="">{text}</span>
                </a>
            ) : (
                <li className={`${isActive ? 'active' : 'text-white hover:text-lime-600'}`}>
                    <a href={href} className={``}>
                        <span className="">{text}</span>
                    </a>
                </li>
            )}
        </>
    );
};

export default NavLink;
