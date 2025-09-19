import { useForm } from '@inertiajs/react';
import { Image, LoaderCircle, SendHorizonal } from 'lucide-react';

const NewPost = () => {
    type NewPostForm = {
        file: File | string;
        content: string;
    };

    const { data, setData, errors, processing, post, reset } = useForm<NewPostForm>({
        file: '',
        content: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('blog.store', data), {
            onFinish: () => reset(),
        });
    };
    return (
        <>
            <div className="NewPost w-full rounded-sm bg-lime-400 p-4">
                <h3 className="py-2 text-center text-xl font-semibold">Create Post</h3>
                <div className="mx-auto max-w-xl">
                    <form onSubmit={submit} className="">
                        <fieldset className="flex items-center rounded-md bg-white/40">
                            <div>
                                <label htmlFor="file" className="inline-flex cursor-pointer items-center rounded p-2 transition hover:bg-lime-300">
                                    <input
                                        onChange={(e) => setData('file', e.target.files?.[0] || '')}
                                        type="file"
                                        className="sr-only focus:outline-0"
                                        name="file"
                                        id="file"
                                    />
                                    <Image className="h-6 w-6 text-gray-700 hover:text-gray-900" />
                                </label>
                                {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}
                            </div>
                            <div className="w-full">
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    required
                                    maxLength={200}
                                    className="w-full rounded-md p-2"
                                    placeholder="write something..."
                                />
                                {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                            </div>
                        </fieldset>
                        <button
                            type="submit"
                            className="mt-2 flex w-full items-center justify-center rounded-md bg-white/40 p-2 hover:bg-white/60"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin px-1" />}
                            <span>Post Now</span>
                            <SendHorizonal />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewPost;
