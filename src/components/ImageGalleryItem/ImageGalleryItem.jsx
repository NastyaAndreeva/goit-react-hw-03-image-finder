import {
  ImageGalleryListItem,
  ImageGalleryListItemImage,
} from './ImageGalleryListItem';

export const ImageGalleryItem = ({ item }) => {
  return (
    <ImageGalleryListItem>
      <ImageGalleryListItemImage src={item.previewURL} alt={item.tags} />
    </ImageGalleryListItem>
  );
};
