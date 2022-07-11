import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageGalleryList } from './ImageGalleryList';

export const ImageGallery = ({ items }) => {
  return (
    <ImageGalleryList>
      {items.map(item => {
        return <ImageGalleryItem item={item} key={item.id} />;
      })}
    </ImageGalleryList>
  );
};
