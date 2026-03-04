import { useEffect, useRef, useState } from 'react';
import { default as bgimg } from '../../../../public/images/cake1.png';
import setupObserver from '../builtIn/transition';
const CTEImage = () => {
    const [transimited, setTransimited] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setupObserver(setTransimited, divRef, 0.1);
    }, []);

    return (
        <div ref={divRef} className="mt-20 md:mt-0">
            <img
                src={bgimg}
                className={`h-[80%] w-[80%] rotate-190 rounded-tl-[50%] rounded-tr-[50%] rounded-br-[50%] border-2 border-white/20 object-fill transition-all duration-700 ease-in-out hover:rotate-[550deg] ${transimited ? 'translate-y-0 opacity-100' : 'translate-y-80 opacity-0'} md:w-[90%]`}
                alt=""
            />
        </div>
    );
};

export default CTEImage;
