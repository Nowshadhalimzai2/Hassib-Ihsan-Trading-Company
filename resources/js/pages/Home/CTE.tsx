import CTEButtons from '@/components/Home/CTEButtons';
import CTEImage from '@/components/Home/CTEImage';

import CTETags from '@/components/Home/CTETags';
import Subscription from '@/components/Home/Subscription';
import { HomeTranslation } from '@/types/trans_types';

import { useState } from 'react';

const CTE = ({ translation }: { translation: HomeTranslation }) => {
    const [showSubscription, setShowSubscription] = useState<boolean>(false);

    return (
        <>
            <section className="min-h-screen w-full bg-slate-900">
                <div className="flex flex-col justify-center lg:flex-row">
                    <div className="LeftSide w-full px-3 md:px-5 lg:max-w-[45%]">
                        <div className="mt-12 flex w-full flex-col items-start justify-center px-4 md:px-0 md:pl-8">
                            <h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">{translation.home.cte_title}</h1>
                            <p className="mb-6 text-sm text-gray-300 sm:text-[16] md:mt-8 md:text-xl">{translation.home.cte_paragraph} </p>
                        </div>
                        {/* Buttons  */}
                        <CTEButtons translation={translation} showSubscription={showSubscription} setSubscription={setShowSubscription} />

                        {showSubscription && <Subscription title={translation.home.subscribe_now} />}

                        <CTETags translation={translation} />
                    </div>

                    <div className="RightSide w-full lg:max-w-[50%]">
                        <CTEImage />
                    </div>
                </div>
            </section>
        </>
    );
};

export default CTE;
