const LanguageList = () => {
    return (
        <ul className="flex cursor-pointer flex-col text-sm text-gray-400">
            <a href={route('lang', 'en')} className="hover:underline">
                English
            </a>
            <a href={route('lang', 'ps')} className="hover:underline">
                پښتو
            </a>
            <a href={route('lang', 'dr')} className="hover:underline">
                دری
            </a>
        </ul>
    );
};

export default LanguageList;
