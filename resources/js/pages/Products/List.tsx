import PageTitle from '@/components/builtIn/PageTitle';
import SearchField from '@/components/builtIn/SearchField';
import { Product } from '@/types';
import { useState } from 'react';
import WideCard from './WideCard';

interface ProductListProps {
    products: Product[];
}

const List = ({ products }: ProductListProps) => {
    const [allProducts, setAllProduts] = useState<Product[]>(products);

    return (
        <div className="min-h-screen bg-[#f0f4ff] p-0 md:p-4 dark:bg-gray-800">
            <PageTitle title="Product List">
                <SearchField products={products} setProducts={setAllProduts} />
            </PageTitle>

            {allProducts.map((product, index) => (
                <WideCard product={product} key={index} />
            ))}
        </div>
    );
};

export default List;
