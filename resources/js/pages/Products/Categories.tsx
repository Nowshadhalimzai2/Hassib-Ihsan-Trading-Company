import PageTitle from '@/components/builtIn/PageTitle';
import CategoryCard from '@/components/products/CircleCard';
import Section from '@/components/Section';

const Categories = () => {
    return (
        <Section className="">
            <PageTitle title="Categories" />
            <p className="text-center text-gray-600">Description of the category.</p>
            <div className="grid grid-cols-3 gap-x-4 gap-y-12 px-4 py-8">
                {/* Map through categories and render CategoryCard for each */}
                {Array.from({ length: 12 }).map((_, index) => (
                    <CategoryCard key={index} />
                ))}
            </div>
        </Section>
    );
};

export default Categories;
