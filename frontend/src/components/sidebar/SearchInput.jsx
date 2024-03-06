import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../store/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState('');
	const {setSelectedConversation} = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(!search) return;
		if(search.length < 3) {
			return toast.error("Searh term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if(conversation) {
			setSelectedConversation(conversation);
		} else {
			toast.error(`No such user found!`);
		}

	}
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' 
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white border-2 border-sky-800'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;