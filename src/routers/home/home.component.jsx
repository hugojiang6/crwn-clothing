import Directory from '../../component/directory/directory.component';
import CATEGORY from '../../categories-data.json';

const Home = () => {
  return <Directory categories={CATEGORY} />;
};

export default Home;
