import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

import InputError from '@/components/input-error';

const Form = () => {
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('contact.store'), {
            onFinish: () => reset(),
        });
    };
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        message: '',
    });
    return (
        <>
            <div className="container mx-auto mb-10 max-w-3xl py-6 md:p-6">
                <form className="flex flex-col gap-6 rounded-lg p-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                className="bg-white/15"
                                type="text"
                                required
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Full name"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone No</Label>
                            <Input
                                id="phone"
                                type="text"
                                required
                                tabIndex={2}
                                className="bg-white/15"
                                autoComplete="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={processing}
                                placeholder="07X1234567"
                                maxLength={10}
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="message">Message</Label>
                            <textarea
                                className="h-32 rounded-md border border-gray-300 bg-white/15 p-2 focus:border-blue-500 focus:ring-blue-500"
                                id="message"
                                required
                                tabIndex={3}
                                autoComplete="message"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                disabled={processing}
                                placeholder="Message here..."
                            />
                            <InputError message={errors.message} />
                        </div>

                        <Button
                            type="submit"
                            className="mt-2 w-full transition-colors duration-300 dark:hover:text-white"
                            tabIndex={5}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Send Now
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Form;
