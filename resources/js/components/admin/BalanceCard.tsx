interface BalanceCardProps {
    curs: { Afg?: number; Pak?: number; USD?: number };
    currency: string;
}

const BalanceCard = ({ curs, currency }: BalanceCardProps) => {
    const currencyMap: { [key: string]: number | undefined } = {
        AFG: curs.Afg,
        PKR: curs.Pak,
        USD: curs.USD,
    };
    return (
        <div
            title="Balance Card"
            className={`relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-blue-300 bg-blue-500/10 text-blue-400 duration-300 hover:scale-103 hover:bg-blue-500/20 hover:shadow-lg dark:text-blue-300`}
        >
            <h2 className="my-2 text-center text-lg font-semibold text-blue-300 md:text-xl dark:text-blue-400">{currency}</h2>
            <p className="text-center text-xl font-semibold lg:text-2xl">{currencyMap[currency] ? currencyMap[currency] : 0}</p>
        </div>
    );
};

export default BalanceCard;
