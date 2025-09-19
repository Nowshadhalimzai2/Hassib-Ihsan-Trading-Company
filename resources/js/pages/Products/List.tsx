import PageTitle from '@/components/builtIn/PageTitle';
import SearchField from '@/components/builtIn/SearchField';
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

const List = ({ products }: ProductListProps) => {
    console.log(products);

    return (
        <div className="min-h-screen bg-[#f0f4ff] p-0 md:p-4 dark:bg-gray-800">
            <PageTitle title="Product List">
                <SearchField />
            </PageTitle>

            {products.map((product) => (
                <WideCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default List;
