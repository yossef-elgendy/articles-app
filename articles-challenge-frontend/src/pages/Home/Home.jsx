import Cta from '../../components/CTA/CTA';
import Features from '../../components/Features/Features';
import HeroSection from '../../components/HeroSection/HeroSection';
import Loader from '../../components/Loader/Loader' ;
import { useSelector } from 'react-redux';

const Home = () => {
  const { loading } = useSelector (state => state.user);

  return loading ?
  (
    <Loader />
  ) : (
    <>
      <HeroSection />
      <Features />
      <Cta />
    </>
  );
};

export default Home;
