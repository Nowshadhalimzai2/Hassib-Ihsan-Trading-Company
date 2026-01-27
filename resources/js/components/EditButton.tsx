import { Edit } from 'lucide-react';
interface Props {
    EditableId: number;
    item: string;
}
const EditButton = ({ EditableId, item }: Props) => {
    return (
        <div className="">
            <a
                href={route(item + 's.edit', EditableId)}
                className="mt-4 mr-4 inline-block rounded-md border-2 border-white px-4 py-1 hover:border-blue-500"
            >
                <Edit className="mr-2 inline-block" />
            </a>
        </div>
    );
};

export default EditButton;
