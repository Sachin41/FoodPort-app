import { useAuth } from '../utils/AuthContext';

function User() {
    const {user} = useAuth();
    return (
        <div>
            <h2 className='!text-xl font-bold'>{user?.userName}</h2>
            <h3 className='!text-xl font-bold'>{user?.email}</h3>
        </div>
    )
}

export default User