import { router } from '@inertiajs/react';
import { useEffect } from 'react';
interface Props {
    id: number;
    productImage: string;
    itemName?: string;
    itemDescription?: string;
}
const GrayCard = ({ productImage, itemName, itemDescription, id }: Props) => {
    const navigateToDetails = () => {
        // Implement navigation logic here, e.g., using React Router or any other navigation library
        router.get(`/products/${id}`);
    };
    // display the feildset block whenever the user hovers over the card
    function handleMouseEnter(id: number) {
        const fieldset: HTMLElement | null = document.querySelector('#fieldset' + id);
        if (fieldset) {
            fieldset.classList.remove('hidden');
        }
    }

    function handleMouseLeave(id: number) {
        const fieldset = document.querySelector('#fieldset' + id);
        if (fieldset) {
            fieldset.classList.add('hidden');
        }
    }
    useEffect(() => {
        if (window.innerWidth < 768) {
            const fieldset = document.querySelector('#fieldset' + id);
            if (fieldset) {
                fieldset.classList.remove('hidden');
            }
        }
    }, [id]);
    return (
        <>
            {/* Card */}
            <div
                title="For Details click the button"
                className="flex w-full flex-col items-center justify-center rounded-md px-3 py-2 transition-all duration-300 duration-1000 ease-out hover:scale-110 hover:bg-slate-300"
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={() => handleMouseLeave(id)}
            >
                <div className="ProductImage size-72">
                    <img src={productImage} className="h-full w-full object-cover" alt="sliding images" />
                </div>
                <fieldset id={`fieldset${id}`} className="mt-4 hidden transition-all duration-500 ease-in-out">
                    <div className="Details px-2 pb-4">
                        <h2 className="text-center text-xl font-bold text-lime-400">{itemName}</h2>
                        <p className="description py-1 text-sm text-slate-800">{itemDescription}</p>
                    </div>
                    <button
                        onClick={() => navigateToDetails()}
                        className="w-full rounded-sm bg-[#ffffff] px-3 py-2 text-sm font-semibold text-[#1c3d3d] transition-all hover:bg-lime-400"
                    >
                        Details
                    </button>
                </fieldset>
            </div>
        </>
    );
};

export default GrayCard;
