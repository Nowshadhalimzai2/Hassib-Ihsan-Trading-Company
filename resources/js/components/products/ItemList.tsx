import { OrderItem } from '@/types';
import { router } from '@inertiajs/react';
import { memo } from 'react';

const ItemList = ({ items }: { items: OrderItem[] }) => {
    function DeleteItem(item:OrderItem){
        if(confirm("Do you want to delete the "+item.product.name+" Item"))
            router.delete(route('items.destory',item.id));
    }
    return (
        <div>
            <h2 className="mx-auto my-3 max-w-7xl rounded-lg bg-gray-400 py-4 text-center text-2xl font-bold">Items</h2>
            <div className="flex flex-col md:px-5">
                <table className="w-full space-y-2 overflow-hidden rounded-xl bg-gray-200 py-2">
                    <thead className=" rounded-t-xl bg-gray-300 ">
                        <tr className="gap-3 text-center">
                            <th className='py-4'>Remove</th>
                            <th className="py-4">Item ID</th>
                            <th className="py-4">Image</th>
                            <th className="py-4">Product Name</th>
                            <th className="py-4">Quantity</th>
                            <th className="py-4">Unit Price</th>
                            <th className="py-4">Subtotal</th>
                            <th className="py-4">Stock</th>
                                                        
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {items.map((item, ind) => (
                            <tr
                                key={ind}
                                className="text-center border-b border-white last:border-0 "
                            >
                                <td className="py-2">
                                    <button onClick={()=>DeleteItem(item)} className='text-red-500 font-bold py-1 px-3 hover:text-white hover:bg-red-500 transition-colors duration-150 border border-red-500 rounded-full'>X</button>
                                </td>
                                <td className="py-2">{ind + 1}</td>
                                <td className="py-2 flex justify-center">
                                    {
                                        <img
                                            className="size-14 rounded-lg"
                                            src={item.product.images.filter((img) => img.is_primary && img.image_path)[0]?.image_path}
                                        />
                                    }
                                </td>
                                <td className="py-2">{item.product.name}</td>
                                <td className="py-2">{item.quantity}</td>
                                <td className="py-2">{item.unit_price}</td>
                                <td className="py-2">{item.subtotal}</td>
                                <td className={`py-2 ${item.quantity>item.product.quantity_in_stock?'text-red-500':'text-green-500'} font-bold rounded-sm`}>{item.product.quantity_in_stock}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default memo(ItemList);
