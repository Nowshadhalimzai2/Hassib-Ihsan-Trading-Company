import { Category } from '@/types';

const CircleCard = ({ category }: { category: Category }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-2 p-0">
            <a href={`/products/categories/${category.id}`} className="group space-y-2 text-center">
                {category.images[0] && (
                    <img
                        src={category.images[0].image_path}
                        alt="Category 1"
                        className="h-32 w-32 rounded-full border-3 border-white/10 bg-white/40 object-cover shadow-xl transition-colors group-hover:border-lime-400 md:h-68 md:w-68 dark:bg-white/5"
                    />
                )}
                <span className="text-lg font-semibold text-gray-600 transition-colors group-hover:text-lime-400 dark:text-gray-200 dark:group-hover:text-lime-400">
                    {category.name}
                </span>
            </a>
        </div>
    );
};

export default CircleCard;
