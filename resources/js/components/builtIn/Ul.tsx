import { ReactNode } from 'react';
interface Props {
    children: ReactNode;
}
const Ul = ({ children }: Props) => {
    return <ul className="homelinks flex grow items-end justify-center space-x-3 lg:space-x-7">{children}</ul>;
};

export default Ul;
