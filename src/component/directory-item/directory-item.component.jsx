// react library
import { useNavigate } from 'react-router-dom';
// style
import { DirectoryItemContainre, BackgroundImage, Body } from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate()

  const onNavigateHandler = () => navigate(route)

  return (
    <DirectoryItemContainre onClick={onNavigateHandler}>
      <BackgroundImage src={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainre>
  );
};

export default DirectoryItem;
