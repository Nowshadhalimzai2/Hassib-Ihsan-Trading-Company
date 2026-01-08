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
            className={`border-sidebar-border/70 dark:border-sidebar-border items-centerduration-300 relative flex aspect-video flex-col justify-center overflow-hidden rounded-xl border bg-blue-50 hover:scale-103 hover:bg-blue-100 hover:shadow-lg dark:bg-transparent dark:hover:bg-white/5`}
        >
            <h2 className="my-2 text-center text-lg font-semibold md:text-xl">{currency}</h2>
            <p className="text-center text-xl font-semibold lg:text-2xl">{currencyMap[currency] ? currencyMap[currency] : 0}</p>
        </div>
    );
};

export default BalanceCard;
