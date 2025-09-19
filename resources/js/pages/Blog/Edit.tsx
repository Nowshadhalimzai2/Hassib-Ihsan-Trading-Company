import { router, useForm } from '@inertiajs/react';
import { Image, LoaderCircle, LucideDelete, SendHorizonal } from 'lucide-react';
import React from 'react';
interface PostProps {
    pre_post: {
        id: number;
        content: string;
        file_path: string;
    };
}
const Edit = ({ pre_post }: PostProps) => {
    console.log(pre_post);

    type NewPostForm = {
        file: File | string;
        content: string;
    };

    const { data, setData, errors, processing, put, reset } = useForm<NewPostForm>({
        file: '',
        content: pre_post.content,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // If a file is selected, use FormData for the request
        if (data.file && typeof data.file !== 'string') {
            const formData = new FormData();
            formData.append('content', data.content);
            formData.append('file', data.file);
            router.put(route('blog.update', pre_post.id), formData, {
                forceFormData: true,
                onFinish: () => reset(),
            });
        } else {
            put(route('blog.update', pre_post.id), {
                onFinish: () => reset(),
            });
        }
    };
    const deletePost = () => {
        router.delete(route('blog.delete', pre_post.id));
    };
    return (
        <div className="mx-auto flex h-screen max-w-3xl flex-col items-center justify-center">
            <div className="NewPost w-full rounded-sm bg-lime-400 p-4">
                <h3 className="py-2 text-center text-xl font-semibold">Update Post</h3>
                <div className="mx-auto max-w-xl">
                    <form onSubmit={submit} id="updateForm">
                        <fieldset className="">
                            <div className="flex items-center rounded-md bg-white/40">
                                <div>
                                    <label
                                        htmlFor="file"
                                        className="inline-flex cursor-pointer items-center rounded p-2 transition hover:bg-lime-300"
                                    >
                                        <input
                                            onChange={(e) => setData('file', e.target.files?.[0] || '')}
                                            type="file"
                                            className="sr-only focus:outline-0"
                                            name="file"
                                            id="file"
                                        />
                                        <Image className="size-8 fill-lime-400 text-black hover:text-gray-900" />
                                    </label>
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
                                </div>
                            </div>
                            <div className="mb-1">
                                {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}
                                {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                            </div>
                        </fieldset>
                    </form>
                    <div className="EditButtons flex items-center justify-center space-x-1">
                        <button
                            form="updateForm"
                            type="submit"
                            className="mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-white/40 p-2 hover:bg-white/60"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-6 w-6 animate-spin px-1" />}
                            <span>Update Now</span>
                            <SendHorizonal />
                        </button>
                        <button
                            className="mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-red-500 p-2 hover:bg-red-500/60"
                            disabled={processing}
                            onClick={deletePost}
                        >
                            {processing && <LoaderCircle className="h-6 w-6 animate-spin px-1" />}
                            <LucideDelete />
                            <span>Delete Post</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
