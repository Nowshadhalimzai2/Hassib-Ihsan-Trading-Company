const LanguageList = () => {
    return (
        <ul className="flex cursor-pointer flex-col text-sm text-gray-400">
            <a href={route('lang', 'en')} className="hover:underline">
                English
            </a>
            <a href={route('lang', 'ps')} className="hover:underline">
                Pashto
            </a>
            <a href={route('lang', 'dr')} className="hover:underline">
                Dari
            </a>
        </ul>
    );
};

export default LanguageList;
