import { Product } from '@/types';

interface Props {
    product: Product;
}
const Edit = ({ product }: Props) => {
    console.log(product);

    return <div>{product.name}</div>;
};

export default Edit;
