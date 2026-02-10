import DeleteButton from '@/components/DeleteButton';
import EditButton from '@/components/EditButton';
import SectionTitle from '@/components/SectionTitle';
import { Transaction } from '@/types';
import { PlaneLanding, PlaneTakeoff } from 'lucide-react';

const Show = ({ transaction }: { transaction: Transaction }) => {
    return (
        <>
            <SectionTitle title="Transaction Details" />
            <div className="flex h-screen w-full items-center justify-center p-0 md:p-4 dark:bg-gray-800">
                <div className="bg-chart-3 mx-auto max-w-7xl rounded-md border border-gray-200 px-6 py-6 shadow-lg shadow-white md:px-12 dark:bg-gray-900">
                    <div className="">
                        {' '}
                        <h2 className="mb-12 text-center text-2xl font-bold">Transaction Details</h2>
                        <div className="space-x-12 py-4">
                            <span className="space-x-3">
                                <PlaneTakeoff className="inline text-green-500" />
                                <span className="font-semibold italic">
                                    {transaction.source?.name ? transaction.source.name : ' Business Account'}
                                </span>
                            </span>
                            <span className="space-x-3">
                                <PlaneLanding className="inline text-red-500" />

                                <span className="font-semibold italic">
                                    {transaction.destination ? transaction.destination.name : ' Business Account'}
                                </span>
                            </span>
                        </div>
                        <div className="flex justify-evenly">
                            <div>
                                <span className="mr-2">Amount: {transaction.amount}</span>
                                <span>{transaction.currency_id == 1 ? 'Afg' : transaction.currency_id == 2 ? 'Pak' : 'USD'}</span>
                            </div>
                            <p>Date: {new Date(transaction.created_at).toLocaleDateString()}</p>
                        </div>
                        <p className="mt-2 flex justify-end rounded-md border border-white bg-white p-4 dark:border-green-300 dark:bg-green-400/10 dark:text-green-300">
                            {transaction?.notes}
                        </p>
                        {/*---------------------- Delete and Edit actions ----------------------- */}
                        <section className="DeleteUpdateSection flex justify-end">
                            <EditButton item="transaction" EditableId={transaction.id} />
                            <DeleteButton item="transaction" DeletableId={transaction.id} />
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
