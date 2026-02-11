import CardSection from '@/components/products/CardSection';
import OurProducts from '@/components/products/OurProducts';
import MYLayout from '@/layouts/MYLayout';
import liquid_chocolate from '../../../../public/videos/liquid_choculate_vid.mp4';

import Testimonial from '@/components/builtIn/Testimonial';
import { usePage } from '@inertiajs/react';
import CTE from './CTE';

const Home = () => {
    // Observer for image visibility
    const message = usePage().props.flash;
    console.log('flash message', message);
    return (
        <MYLayout>
            <CTE />

            {/* BEAUTIFUL SCENES */}
            <div className="bg-beautiful-scenery overflow-hidden">
                <div>
                    <h1 className="mb-4 py-8 text-center text-3xl font-bold text-slate-800">Beautiful Scenery</h1>
                    <video src={liquid_chocolate} autoPlay loop muted className="mx-auto w-full px-4" />
                </div>
            </div>

            {/* TOP TRENDINGS Cards Section */}
            <CardSection />

            {/* POPULAR Products Section */}
            {/* <PopularProducts /> */}

            {/* Discover our Products */}
            <OurProducts />
            {/* End of Discover our Products */}

            {/* Testimonials */}
            <Testimonial />
            {/* End of Testimonials */}
        </MYLayout>
    );
};

export default Home;
