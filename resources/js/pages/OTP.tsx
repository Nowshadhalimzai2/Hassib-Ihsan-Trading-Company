import InputError from '@/components/input-error';
import { Button, Input } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const OTP = ({ email }: { email: string }) => {
    console.log('emaaa', email);

    const { data, setData, post, reset, errors, processing } = useForm({
        email: email,
        otp: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('otp.post'), {
            onFinish: () => reset('email', 'otp'),
        });
    };
    return (
        <div className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-center border-2 bg-white px-8 py-5">
            <div>OTP</div>
            <div className="p-3">We sent OTP code to {email && email.slice(0, 2)}******@gmail.com</div>
            <section className="Form w-full lg:w-1/2">
                <form className="flex flex-col gap-6 rounded-lg border-2 p-6 dark:bg-white/15" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Input
                                id="opt"
                                type="text"
                                required
                                tabIndex={2}
                                value={data.otp}
                                onChange={(e) => setData('otp', e.target.value)}
                                placeholder="Enter OTP in order to log you in"
                                className={'mx-auto w-full border p-2'}
                            />
                            <InputError message={errors.otp} />
                        </div>
                        <input type="email" defaultValue={email} hidden className="text-black" name="email" />
                        <Button
                            type="submit"
                            className="mx-auto w-full border bg-white p-2 font-bold hover:bg-[#d3f3f3]"
                            tabIndex={4}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default OTP;
