import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type subscribe = {
    name: string;
    email: string;
};
const Subscription = ({ title }: { title: string }) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<subscribe>>({
        name: '',
        email: '',
    });
    function subscribeNow(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('subscribe'), {
            onFinish: () => reset('name', 'email'),
        });
    }
    return (
        <>
            <div>
                <form onSubmit={(e) => subscribeNow(e)}>
                    <div className="mt-3 flex flex-col items-center justify-center space-y-2 p-3">
                        <div className="w-2/3 rounded-md border border-gray-200 text-white">
                            <input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                type="text"
                                name="name"
                                className="w-full p-2"
                                placeholder="Full Name"
                                required
                            />
                            <p className="text-sm text-red-500">{errors.name}</p>
                        </div>
                        <div className="w-2/3 rounded-md border border-gray-200 text-white">
                            <input
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                type="email"
                                name="email"
                                className="w-full p-2"
                                placeholder="Email"
                                required
                            />
                            <p className="text-sm text-red-500">{errors.email}</p>
                        </div>

                        <input
                            disabled={processing}
                            type="submit"
                            value={title}
                            className="w-2/3 rounded-md border bg-white p-2 transition-colors duration-300 hover:bg-gray-900 hover:text-white"
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Subscription;
