import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from 'components/ImageGallery';
import { Searchbar } from 'components/Searchbar';
import { AppContainer } from 'components/AppContainer/AppContainer';
import { LoadMore } from 'components/LoadMore';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleSubmit = ({ searchQuery }) => {
    this.setState({ searchQuery, page: 1 });
  };
  loadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    const { searchQuery, page } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} loadMore={this.loadMore} />
        <ImageGallery searchQuery={searchQuery} page={page} />
        {searchQuery !== '' && <LoadMore loadMore={this.loadMore} />}
        <ToastContainer />
      </AppContainer>
    );
  }
}
