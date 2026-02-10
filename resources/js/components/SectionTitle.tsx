interface Props {
    title: string;
}
const SectionTitle = ({ title }: Props) => {
    return <h2 className="py-6 text-center text-2xl font-bold shadow md:text-3xl dark:bg-slate-900">{title}</h2>;
};

export default SectionTitle;
