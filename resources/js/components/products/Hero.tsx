import { useEffect, useRef, useState } from 'react';
import b3 from '../../../../public/images/img2.jpg';
import setupObserver from '../builtIn/transition';

const Hero = () => {
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setupObserver(setIsVisible, observerRef, 1);
    }, []);

    return (
        <>
            <section className="relative">
                <div className="h-[60vh]">
                    <img src={b3} alt="Sticky Image" className="h-full w-full object-cover object-top" />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                {/* ------------------- Welcome to our Products ----------------------- */}
                <div className="absolute inset-0 flex items-center justify-center" ref={observerRef}>
                    <h1
                        className={`text-3xl font-bold text-white md:text-5xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-30 opacity-0'} duration-1000 ease-in-out`}
                    >
                        Welcome &nbsp;
                    </h1>
                    <h1
                        className={`text-3xl font-bold text-white md:text-5xl ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-30 opacity-0'} duration-1000 ease-in-out`}
                    >
                        to &nbsp;
                    </h1>
                    <h1
                        className={`text-3xl font-bold text-white md:text-5xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-30 opacity-0'} duration-1000 ease-in-out`}
                    >
                        our &nbsp;
                    </h1>
                    <h1
                        className={`text-3xl font-bold text-white md:text-5xl ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-30 opacity-0'} duration-1000 ease-in-out`}
                    >
                        Store
                    </h1>
                </div>
            </section>
        </>
    );
};

export default Hero;
