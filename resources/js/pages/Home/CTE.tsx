import CTEButtons from '@/components/Home/CTEButtons';

import CTEImage from '@/components/Home/CTEImage';
import CTETags from '@/components/Home/CTETags';
import Subscription from '@/components/Home/Subscription';
import { useState } from 'react';

const CTE = () => {
    const [showSubscription, setShowSubscription] = useState<boolean>(false);

    return (
        <>
            <section className="min-h-screen w-full bg-slate-900 px-4 md:px-0 md:pl-8">
                <div className="flex flex-col lg:flex-row">
                    <div className="LeftSide w-full px-3 md:px-5 lg:max-w-[45%]">
                        <div className="mt-12 flex w-full flex-col items-start justify-center">
                            <h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                                We make more than just products.
                            </h1>
                            <p className="mb-6 text-sm text-gray-300 sm:text-[16] md:mt-8 md:text-xl">
                                Discover the best products just for you. Our commitment to quality ensures that you receive only the finest.
                            </p>
                        </div>
                        {/* Buttons  */}
                        <CTEButtons setSubscription={setShowSubscription} />

                        {/* ----------- SUBSCRIPTION FIELD -------------*/}
                        {showSubscription && <Subscription />}

                        <CTETags />
                    </div>

                    <div className="RightSide w-full justify-center lg:max-w-[50%]">
                        <CTEImage />
                    </div>
                </div>
            </section>
        </>
    );
};

export default CTE;
