import NewPost from '@/components/Blog/NewPost';
import Post from '@/components/Blog/Post';
import { Post as PP } from '@/components/Blog/postProps';
import PageTitle from '@/components/builtIn/PageTitle';
import MYLayout from '@/layouts/MYLayout';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
interface PostProps {
    posts: PP;
    link: {
        url: string;
        label: string;
        active?: boolean;
    };
}
interface Flash {
    message: string;
    success: string;
    fail: string;
}
interface PaginatedPosts {
    data: PostProps['posts'][];
    links: PostProps['link'][];
}

const Index = () => {
    const posts = usePage().props.posts as PaginatedPosts;
    // console.log(posts[1].post_media_id.img_path);

    const { flash } = usePage().props as { flash?: Flash };
    const { auth } = usePage().props as { auth?: { user: { id: number } } };
    const flashRef = useRef<HTMLDivElement>(null);
    // if user is not logged in, auth will be undefined
    const auth_id = auth?.user ? auth?.user.id : undefined;

    useEffect(() => {
        if (flash?.message && flashRef.current) {
            flashRef.current.style.display = 'block';
            const timer = setTimeout(() => {
                if (flashRef.current) {
                    flashRef.current.style.display = 'none';
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash?.message]);

    return (
        <MYLayout>
            <PageTitle title="Blog Posts" />

            <div className="mx-auto mt-1 max-w-4xl px-0 sm:px-4">
                {flash?.message && (
                    <div className="rounded-md bg-green-500 p-2 font-semibold" id="flash-message" ref={flashRef}>
                        <span>{flash.message}</span>
                    </div>
                )}
                {/* Create new Post */}
                <NewPost />

                {/* all post */}

                <div className="z-10 space-y-3 bg-white py-4 dark:bg-slate-900">
                    {posts.data.map((post: PP) => (
                        <Post key={post.id} {...post} auth_id={auth_id} />
                    ))}
                </div>
                <div className="mx-auto my-4 flex max-w-2xl flex-wrap space-x-1 text-center">
                    {posts.links.map((link: PostProps['link'], index: number) =>
                        link.url ? (
                            <Link
                                aria-current={link.active ? 'page' : undefined}
                                key={index}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`rounded border px-3 py-1 ${
                                    link.active
                                        ? 'bg-blue-100 text-slate-800'
                                        : 'bg-lime-400 text-slate-800 hover:bg-lime-200 dark:hover:bg-slate-700'
                                }`}
                            />
                        ) : (
                            <span key={index} className="rounded border px-3 py-1 text-gray-400" dangerouslySetInnerHTML={{ __html: link.label }} />
                        ),
                    )}
                </div>
            </div>
        </MYLayout>
    );
};

export default Index;
