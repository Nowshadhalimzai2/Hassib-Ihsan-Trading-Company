import PageTitle from '@/components/builtIn/PageTitle';
import Section from '@/components/Section';
import { Category as Cate } from '@/types';
import WideCard from './WideCard';

interface ProductListProps {
    category: Cate;
}

const Category = ({ category }: ProductListProps) => {
    return (
        <Section className="">
            <PageTitle title={category.name} />
            <div className="">
                <p className="border-b-2 px-3 py-3 text-center text-gray-600 shadow">{category.description}</p>
                {category.products.map((product) => (
                    <WideCard key={product.id} product={product}></WideCard>
                ))}
            </div>
        </Section>
    );
};

export default Category;
