import InputError from './input-error';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Props {
    value: string;
    processing: boolean;
    error: any;
    setData: any;
}

const FormField = ({ value, processing, error, setData }: Props) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
                id="name"
                type="text"
                required
                tabIndex={1}
                autoComplete="name"
                value={value}
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
                placeholder="دلپذیر کیک"
            />
            <InputError message={error} />
        </div>
    );
};

export default FormField;
