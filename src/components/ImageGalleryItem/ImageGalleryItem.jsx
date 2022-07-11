import {
  ImageGalleryListItem,
  ImageGalleryListItemImage,
} from './ImageGalleryListItem';

export const ImageGalleryItem = ({ item }) => (
  <ImageGalleryListItem>
    <ImageGalleryListItemImage src={item.previewURL} alt={item.tags} />
  </ImageGalleryListItem>
);
