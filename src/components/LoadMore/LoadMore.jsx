import { Button } from './Button';

export const LoadMore = ({ loadMore }) => {
  return (
    <Button type="button" onClick={loadMore}>
      Load More
    </Button>
  );
};
