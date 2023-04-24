import { useContext } from 'react';
import { Info, Repos, User, Search, Navbar } from '@/components';
import { GithubContext } from '../context/context';

const Dashboard = () => {
  const { isLoading } = useContext(GithubContext);
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src='./preloader.gif' className='loading-img' alt='spinner' />
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
