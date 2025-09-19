import PageTitle from '@/components/builtIn/PageTitle';
import MYLayout from '@/layouts/MYLayout';
import MM from '../../../public/images/MM.webp';
import ceo from '../../../public/images/ceo.webp';
import founder from '../../../public/images/founder.webp';
import team from '../../../public/images/team.webp';

import TeamMember from './TeamMember';

const About = () => {
    return (
        <>
            <MYLayout>
                {/* Add content here */}
                <div>
                    <PageTitle title="About Us" />
                    {/* subtitle */}
                    <div className="container mx-auto max-w-6xl p-4">
                        {/* Add additional content here */}
                        <div className="Header flex flex-col-reverse items-center justify-center space-x-4 rounded-lg bg-gray-100 p-4 shadow-lg md:flex-row dark:bg-gray-800">
                            <div className="content flex-1">
                                <h2 className="mt-4 text-xl font-bold md:text-2xl">Who We Are</h2>
                                <p className="mt-4 text-gray-700 dark:text-gray-300">
                                    We are a passionate team dedicated to delivering exceptional products and services to our valued customers. With
                                    years of experience and a commitment to excellence, we strive to exceed expectations and build lasting
                                    relationships within our community.
                                </p>
                                <p className="mt-4 text-gray-700 dark:text-gray-300">
                                    Our team is made up of skilled professionals who share a common goal: to create high-quality cakes, biscuits, and
                                    matches that bring joy to every occasion. We believe in the power of teamwork and collaboration, and we are proud
                                    to work together to achieve our mission.
                                </p>

                                <p className="mt-4 text-gray-700 dark:text-gray-300">
                                    We are the only company in the east zone of Afghanistan that produces cakes, biscuits, and matches. Our products
                                    are made with the finest ingredients and crafted with care to ensure the highest quality and taste.
                                </p>
                            </div>
                            <div className="flex-1 overflow-hidden rounded-lg shadow-lg">
                                <img src={team} alt="About Us" className="h-full w-full object-cover" />
                            </div>
                        </div>

                        <div className="OurTeam">
                            <h2 className="mt-4 text-2xl font-bold">Our Team</h2>
                            <p className="mt-4 text-gray-700 dark:text-gray-300">
                                Our team is composed of dedicated professionals who are passionate about their work. We believe in fostering a
                                collaborative environment where everyone's ideas are valued.
                            </p>
                            <div className="TeamMembers flex justify-between space-x-4 overflow-x-auto py-4">
                                <TeamMember name="John Doe" role="CEO" image={ceo} />
                                <TeamMember name="Jane Smith" role="CTO" image={MM} />
                                <TeamMember name="Alice Johnson" role="CFO" image={founder} />
                            </div>
                        </div>
                        <h2 className="mt-4 text-2xl font-bold">Our Mission</h2>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                            Our mission is to bring joy and delight to every home with our delicious cakes, biscuits, and quality matches. We are
                            committed to using the finest ingredients and traditional recipes to craft treats that create memorable moments for
                            families and friends. Through continuous innovation and a passion for excellence, we strive to set the standard in taste,
                            safety, and customer satisfaction, ensuring that every product we offer is a symbol of trust and happiness.
                        </p>
                        <h2 className="mt-4 text-2xl font-bold">Get In Touch</h2>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                            If you have any questions or feedback, feel free to reach out to us through our contact page. We value your input and are
                            here to help!
                        </p>
                    </div>
                </div>
            </MYLayout>
        </>
    );
};

export default About;
