import LoginForm from '../../components/LoginForm/LoginForm';
import Loader from '../../components/Loader/Loader' ;
import { useSelector } from 'react-redux';


const RegisterPage = () => {
    const { loading } = useSelector(state => state.user);

    return loading
    ? (
        <Loader />
    ) : (
        <LoginForm />
    );
};

export default RegisterPage;
