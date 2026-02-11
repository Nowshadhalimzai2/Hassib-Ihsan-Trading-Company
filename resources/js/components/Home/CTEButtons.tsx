import { useEffect, useState } from 'react';
import OnLoadTransimition from '../builtIn/OnLoadTransmition';

const CTEButtons = ({ setSubscription }: { setSubscription: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [transimited, setTransimited] = useState(false);

    useEffect(() => {
        OnLoadTransimition(setTransimited, 500);
    }, []);

    return (
        <>
            <div className="Buttons mt-8 flex justify-center space-x-12">
                <button
                    className={`border bg-lime-400 px-4 py-2 text-sm text-slate-900 transition duration-300 hover:border-white hover:bg-slate-900 hover:text-white md:text-[16px] lg:px-6 ${transimited ? 'translate-x-0 opacity-100' : '-translate-x-50 opacity-0'}`}
                >
                    Shop Now
                </button>
                <button
                    className={`border border-white px-4 py-2 text-sm text-white transition duration-300 hover:border-lime-400 hover:text-lime-400 md:text-[16px] lg:px-6 ${transimited ? 'translate-x-0 opacity-100' : 'translate-x-50 opacity-0'}`}
                    onClick={() => setSubscription((pre) => !pre)}
                >
                    Subscribe!
                </button>
            </div>
        </>
    );
};

export default CTEButtons;
