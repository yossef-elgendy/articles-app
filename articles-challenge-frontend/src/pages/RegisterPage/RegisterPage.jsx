import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import Loader from '../../components/Loader/Loader' ;
import { useSelector } from 'react-redux';

const RegisterPage = () => {
    const { loading } = useSelector(state => state.user);

    return loading
    ? (
        <Loader />
    ) : (
        <RegistrationForm />
    );
};

export default RegisterPage;
