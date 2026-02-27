import me from '../../../../public/images/me.jpg';
import testimonial from '../../../../public/videos/testimonial.mp4';
const Testimonial = () => {
    return (
        <>
            <section className="container mx-auto w-full rounded-lg px-3 pt-8 pb-12 lg:px-0 dark:bg-slate-900">
                <div className="flex h-full w-full flex-col rounded-lg lg:flex-row">
                    <div className="Video-Picture rounded-lg object-cover">
                        <video muted controls className="p-1" src={testimonial}></video>
                    </div>
                    <div className="Testimonials flex flex-col">
                        <div className="Overview grow">
                            <h3 className="py-4 text-center text-xl font-bold text-[#1c3d3d] md:text-3xl dark:text-white">Testimonial</h3>
                            <p className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat optio inventore saepe qui accusantium, vitae sequi
                                porro amet. Dolorem voluptates, doloribus nihil nostrum quos hic sapiente ea dicta vitae alias?
                            </p>
                        </div>
                        <div className="Profile mb-4 flex flex-col items-center justify-center px-5 lg:pb-0">
                            <img src={me} alt="" className="mx-auto h-16 w-16 rounded-full border-2 border-lime-600" />
                            <h5 className="text-sm text-lime-400">Nowshad Halimzai</h5>
                            <p className="text-sm text-gray-300">Jalalabad,Afghanistan</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonial;
