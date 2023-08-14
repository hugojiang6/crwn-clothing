import Directory from '../../component/directory/directory.component';

const Home = () => {
  const categories = [
    {
      id: 1,
      title: '帽子',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    },
    {
      id: 2,
      title: '夾克',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    },
    {
      id: 3,
      title: '運動鞋',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    },
    {
      id: 4,
      title: '女性',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    },
    {
      id: 5,
      title: '男性',
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    },
  ];

  return <Directory categories={categories} />;
};

export default Home;
