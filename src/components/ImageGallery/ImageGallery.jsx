import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGallery/ImageGalleryItem';
import { Button } from 'components/ui/Button';

export const ImageGallery = ({
  items,
  toggleModal,
  setActiveImageURL,
  loadMore,
}) => {
  return (
    <>
      <ImageGalleryList>
        {items.map(item => {
          return (
            <ImageGalleryItem
              item={item}
              key={item.id}
              onClick={() => {
                toggleModal();
                setActiveImageURL(item.largeImageURL);
              }}
            />
          );
        })}
      </ImageGalleryList>
      <Button onClick={loadMore}>Load More</Button>
    </>
  );
};
