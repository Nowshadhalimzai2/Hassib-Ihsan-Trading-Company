import { Mail, PhoneCall } from 'lucide-react';

interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
}

const TeamMember = ({ name, role, image }: TeamMemberProps) => {
    return (
        <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white py-6 shadow-lg dark:bg-gray-800">
            <div className="mb-4">
                <img src={image} alt={name} className="h-36 w-36 rounded-full" />
            </div>
            <div className="text-center">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{role}</p>
            </div>
            <div className="contact mt-4 w-full space-x-4 divide-y divide-gray-300 rounded-md px-6">
                <p className="mt-2 flex w-full rounded-md bg-sky-400/70 px-2 py-1 text-gray-600 dark:bg-sky-800 dark:text-gray-400">
                    <span className="mr-2 flex items-center">
                        <Mail />
                    </span>
                    <span className="mr-2 flex items-center text-gray-700">{name.toLowerCase().replace(' ', '')}@example.com</span>
                </p>
                <p className="mt-2 flex w-full rounded-md bg-lime-400/70 px-2 py-1 text-gray-600 dark:bg-lime-800 dark:text-gray-400">
                    <span className="mr-2 flex items-center">
                        <PhoneCall />
                    </span>
                    <span className="mr-2 flex items-center text-gray-700">+123 456 7890</span>
                </p>
            </div>
        </div>
    );
};

export default TeamMember;
