import { Component } from 'react';
import { getImages } from './services/api';
import { ImageGallery } from 'components/ImageGallery';
import { Searchbar } from 'components/Searchbar';
import { params } from 'constants/constants';
import { LoadMore } from 'components/LoadMore';
import { AppContainer } from 'components/AppContainer/AppContainer';

export class App extends Component {
  state = {
    q: '',
    page: 1,
    items: [],
  };

  async componentDidUpdate(_, prevState) {
    const { page, q } = this.state;
    if (prevState.page !== page || prevState.q !== q) {
      const result = await getImages({ ...params, page, q });
      this.setState({ items: result });
    }
  }

  handleSubmit = ({ searchQuery }) => {
    this.setState({ q: searchQuery });
  };

  loadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    const { items } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} loadMore={this.loadMore} />
        <ImageGallery items={items} />
        {items.length > 0 && <LoadMore loadMore={this.loadMore} />}
      </AppContainer>
    );
  }
}
