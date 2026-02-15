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
                    className={`w-full rounded-sm px-3 py-1 text-left ${className} ${isActive ? 'bg-[#1c3d3d] text-white dark:bg-lime-400/50' : 'text-white'}`}
                >
                    <span className="">{text}</span>
                </a>
            ) : (
                <li className={`text-white ${isActive ? 'active' : 'hover:text-lime-600'}`}>
                    <a href={href} className={``}>
                        <span className="">{text}</span>
                    </a>
                </li>
            )}
        </>
    );
};

export default NavLink;
