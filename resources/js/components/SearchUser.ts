import React from "react"

interface UserProps{
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    salary?:number;
    profit_percentage?: number;
}

interface Props{
    users:UserProps[];
    setUsers:React.Dispatch<React.SetStateAction<UserProps[]>>;
    searchTerm:string;
}

const Search=({users,setUsers,searchTerm}:Props)=>{
    
   React.useEffect(() => {
           if (searchTerm === '') {
               setUsers(users);
           } else {
               const filtereduserss = users.filter(
                   (users) =>
                       users.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       users.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       users.email.toLowerCase().includes(searchTerm.toLowerCase()),
               );
               setUsers(filtereduserss);
           }
           // eslint-disable-next-line react-hooks/exhaustive-deps
       }, [searchTerm]);
}
export default Search;