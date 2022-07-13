import { ImageGalleryList } from './ImageGalleryList';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { LoadMore } from 'components/LoadMore';

export const ImageGallery = ({
  items,
  toggleModal,
  setActiveIndex,
  loadMore,
}) => {
  return (
    <>
      <ImageGalleryList>
        {items.map((item, index) => {
          return (
            <ImageGalleryItem
              item={item}
              key={item.id}
              onClick={() => {
                toggleModal();
                setActiveIndex(index);
              }}
            />
          );
        })}
      </ImageGalleryList>
      <LoadMore loadMore={loadMore} />
    </>
  );
};
