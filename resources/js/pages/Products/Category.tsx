import PageTitle from '@/components/builtIn/PageTitle';
import Section from '@/components/Section';
import WideCard from './WideCard';
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface ProductListProps {
    products: Product[];
}

const Category = ({ products }: ProductListProps) => {
    return (
        <Section className="">
            <PageTitle title="Category Name" />
            <div className="">
                <p className="text-center text-gray-600">Description of the category.</p>
                {products.map((product) => (
                    <WideCard key={product.id} product={product}></WideCard>
                ))}
            </div>
        </Section>
    );
};

export default Category;
