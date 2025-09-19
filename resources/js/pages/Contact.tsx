import PageTitle from '@/components/builtIn/PageTitle';
import Form from '@/components/Contact/Form';
import OfficeOnMap from '@/components/Contact/OfficeOnMap';
import Section from '@/components/Section';
import MYLayout from '@/layouts/MYLayout';
import { MapPin, Pin } from 'lucide-react';
const Contact = () => {
    return (
        <>
            <MYLayout>
                <Section className="bg-lime-50">
                    <PageTitle title="Contact Us" />
                    <div className="container mx-auto max-w-2xl px-4 py-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white/90">Our Physical Address </h2>
                    </div>
                    <div className="mx-auto max-w-3xl text-[14px]">
                        <h2 className="text-center font-serif text-4xl font-bold text-slate-900 dark:text-white/90">
                            <MapPin className="inline h-8 w-8 text-lime-400" /> Dand Ghara, Ghwaro Kusa, Farid Najib Market
                        </h2>
                        <div className="mt-6 flex space-x-2 py-6 text-center">
                            <p className="mt-2 flex text-gray-600 dark:text-gray-400">
                                <Pin className="text-lime-400" />
                                Feel free to visit us or reach out for any inquiries.
                            </p>
                            <p className="mt-2 flex text-gray-600 dark:text-gray-400">
                                <Pin className="text-lime-400" />
                                You can also contact us via email or phone for further assistance.
                            </p>
                            <p className="mt-2 flex text-gray-600 dark:text-gray-400">
                                <Pin className="text-lime-400" />
                                Our team is always ready to assist you!
                            </p>
                        </div>
                    </div>
                </Section>

                <Section className="bg-accent dark:bg-white/5">
                    <div className="w-full">
                        <div className="container mx-auto max-w-2xl px-4 py-6">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white/90">
                                Fill the form and send us. we will respond to you as soon as possible
                            </h2>
                        </div>
                        <Form />
                    </div>
                </Section>
                <Section className="bg-[#f0f4ff]">
                    <div className="container mx-auto max-w-3xl px-4">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white/90">Our Main Office is located at:</h2>
                    </div>
                    {/* Main Office on Map */}
                    <div className="map-container container mx-auto max-w-3xl px-4 py-6">
                        {/* Embed map here */}
                        <OfficeOnMap />
                    </div>
                </Section>
            </MYLayout>
        </>
    );
};

export default Contact;
