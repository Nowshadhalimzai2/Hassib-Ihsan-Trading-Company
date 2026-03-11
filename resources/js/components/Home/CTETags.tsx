import { useEffect, useState } from 'react';
import OnLoadTransimition from '../builtIn/OnLoadTransmition';
import CTETag from './CTETag';

const CTETags = ({ translation }: { translation: { home: { sold_products: string; happy_customers: string; awards: string } } }) => {
    const [transimited, setTransimited] = useState(false);

    useEffect(() => {
        OnLoadTransimition(setTransimited, 700);
    }, []);

    return (
        <>
            <div className="mt-8 w-full sm:mt-12 md:mt-15 lg:mt-18">
                <div className="CTETags flex w-full justify-center space-x-4 pb-2 md:pb-6 lg:pb-8">
                    <CTETag transimited={transimited} title="5K" discription={translation.home.sold_products} />
                    <CTETag transimited={transimited} title="8K" discription={translation.home.happy_customers} />
                    <CTETag transimited={transimited} title="20" discription={translation.home.awards} />
                </div>
            </div>
        </>
    );
};

export default CTETags;
