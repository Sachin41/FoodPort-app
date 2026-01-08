import { useSelector } from 'react-redux';

function User() {
        const { user } = useSelector((state) => state.auth);
    return (
        <div>
            <h2 className='!text-xl font-bold'>{user?.userName}</h2>
            <h3 className='!text-xl font-bold'>{user?.email}</h3>
        </div>
    )
}

export default User