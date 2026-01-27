import { Delete } from 'lucide-react';
interface Props {
    item: string;
    DeletableId: number;
}
const DeleteButton = ({ item, DeletableId }: Props) => {
    return (
        <>
            <form
                method="POST"
                action={route(item + 's.destroy', DeletableId)}
                onSubmit={(e) => {
                    if (!confirm(`Are you sure you want to delete the ${item}`)) {
                        e.preventDefault();
                    }
                }}
            >
                <input type="hidden" name="_method" value="DELETE" />
                <button type="submit" className="mt-4 inline-block rounded-md border-2 border-white px-4 py-1 text-white hover:border-red-500">
                    <Delete className="mr-2 inline-block" />
                </button>
            </form>
        </>
    );
};

export default DeleteButton;
