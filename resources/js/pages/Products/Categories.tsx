import PageTitle from '@/components/builtIn/PageTitle';
import CategoryCard from '@/components/products/CircleCard';
import Section from '@/components/Section';
import { Category } from '@/types';

interface Props {
    categories: Category[];
}
const Categories = ({ categories }: Props) => {
    return (
        <Section className="">
            <PageTitle title="Categories" />
            <p className="p-5 text-center">Here you can find all the categories of our Servcies!</p>
            <div className="grid grid-cols-3 gap-x-4 gap-y-12 px-4 py-8">
                {/* Map through categories and render CategoryCard for each */}
                {categories.map((category, index) => (
                    <CategoryCard category={category} key={index} />
                ))}
            </div>
        </Section>
    );
};

export default Categories;
