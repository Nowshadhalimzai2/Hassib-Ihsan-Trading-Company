interface Props {
    image: string;
}
const TopRankCard = ({ image }: Props) => {
    return (
        <>
            <h4 className="text-xl font-bold text-white">Most Popular</h4>
            <h5 className="mb-3 text-lime-600">Biscuits</h5>
            <img src={image} alt="" className="rounded-lg object-cover" />
            <div className="subImages mx-auto mt-2 grid grid-cols-3 gap-2 py-6">
                <img src={image} alt="" className="h-21 w-21 rounded-lg object-cover" />
                <img src={image} alt="" className="h-21 w-21 rounded-lg object-cover" />
                <img src={image} alt="" className="h-21 w-21 rounded-lg object-cover" />
            </div>
        </>
    );
};

export default TopRankCard;
