import React from 'react';
interface Props {
    status: 'pending' | 'completed' | 'confirmed' | 'cancelled';
    setStatus: React.Dispatch<React.SetStateAction<'pending' | 'completed' | 'confirmed' | 'cancelled'>>;
    deliveryTime: string | null;
}
const Status = ({ status, setStatus, deliveryTime }: Props) => {
    return (
        <div>
            <span className="text-gray-600">Status :</span>
            <div>
                <select
                    onChange={(e) => setStatus(e.target.value as 'pending' | 'completed' | 'confirmed' | 'cancelled')}
                    className={`${status === 'pending' ? 'bg-amber-300' : status === 'confirmed' ? 'bg-blue-300' : status === 'cancelled' ? 'bg-red-300' : 'bg-green-300'} rounded-sm px-3 py-1.5 text-white`}
                >
                    <option disabled value="pending" className="bg-white text-black" selected={status === 'pending'}>
                        Pending
                    </option>
                    <option disabled={status === 'completed'} value="confirmed" className="bg-white text-black" selected={status === 'confirmed'}>
                        Confirmed
                    </option>
                    <option
                        disabled={status !== 'confirmed' || deliveryTime === null}
                        value="completed"
                        className="bg-white text-black"
                        selected={status === 'completed'}
                    >
                        Completed
                    </option>
                    <option value="cancelled" className="bg-white text-black" selected={status === 'cancelled'}>
                        Cancelled
                    </option>
                </select>
            </div>
        </div>
    );
};

export default Status;
