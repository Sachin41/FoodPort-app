import { useSelector } from 'react-redux';
import AddressList from './AddressList';

function User() {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className='w-[80%]'>
            <h2 className='!text-xl font-bold'>{user?.userName}</h2>
            <h3 className='!text-xl font-bold'>{user?.email}</h3>
            <AddressList />
        </div>

    )
}

export default User
