import { useSelector } from 'react-redux';
import AccountLayout from './AccountLayout';

function User() {
    const { user } = useSelector((state) => state.auth);
    return (
        <>
            <AccountLayout user= {user} />
        </>

    )
}

export default User
