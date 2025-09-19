import { Card } from '../ui/card';

const PopularProducts = () => {
    return (
        <section className="py-8">
            <h1 className="pb-20 text-center text-lg font-bold text-gray-800 md:text-3xl">Popular Products</h1>
            <div className="grid-1 grid gap-4 text-center sm:grid-cols-2 md:grid-cols-3">
                <div>
                    <Card className={``}>
                        <h2>Product 1</h2>
                    </Card>
                </div>
                <div>
                    <Card>
                        <h2>Product 2</h2>
                    </Card>
                </div>
                <div>
                    <Card>
                        <h2>Product 3</h2>
                    </Card>
                </div>
                <div>
                    <Card>
                        <h2>Product 4</h2>
                    </Card>
                </div>
                <div>
                    <Card>
                        <h2>Product 5</h2>
                    </Card>
                </div>
                <div>
                    <Card>
                        <h2>Product 6</h2>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default PopularProducts;
