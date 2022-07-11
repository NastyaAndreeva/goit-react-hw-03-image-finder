import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageGalleryList } from './ImageGalleryList';

export const ImageGallery = ({ items }) => (
  <ImageGalleryList>
    {items.map(item => (
      <ImageGalleryItem item={item} key={item.id} />
    ))}
  </ImageGalleryList>
);
