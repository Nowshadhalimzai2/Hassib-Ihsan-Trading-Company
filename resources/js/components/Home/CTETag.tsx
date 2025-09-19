interface CTETagProps {
    transimited: boolean;
    title: string;
    discription: string;
}
const CTETag = ({ transimited, title, discription }: CTETagProps) => {
    return (
        <>
            <div className={`${transimited ? 'scale-100 opacity-100' : 'scale-40 opacity-0'} transition-transform duration-500`}>
                <h2 className="text-center text-2xl font-bold text-lime-400">{title}</h2>
                <p className="text-center text-sm text-gray-300">{discription}</p>
            </div>
        </>
    );
};

export default CTETag;
