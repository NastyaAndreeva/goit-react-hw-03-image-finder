import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from 'components/ImageGallery';
import { Searchbar } from 'components/Searchbar';
import { AppContainer } from 'components/AppContainer';
import { getImages } from 'services/api';
import { params } from 'constants';
import { Modal } from 'components/ui/Modal';
import { IconContainer } from 'components/IconContainer';
import { theme } from 'stylesConfig/theme';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    items: [],
    status: 'idle',
    showModal: false,
    activeIndex: null,
  };

  componentDidMount() {
    this.setState({ items: [] });
  }

  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;

    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.setState({ status: 'pending' });
      if (page === 1) {
        this.setState({ items: [] });
      }

      this.fetchGalleryItems();
    }
  }

  fetchGalleryItems = () => {
    const { searchQuery, page } = this.state;

    getImages({ ...params, page, q: searchQuery })
      .then(res => {
        this.setState(prevState => ({
          items: [...prevState.items, ...res],
          status: 'rejected',
        }));
        if (res.length === 0) {
          return toast.error(
            'Oh, the search results were not successful :( Try again.'
          );
        }
      })
      .catch(error => {
        this.setState({
          status: 'rejected',
        });
      });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setActiveIndex = index => {
    this.setState({ activeIndex: index });
  };

  handleSubmit = ({ searchQuery }) => {
    if (searchQuery.trim() !== '') {
      return this.setState({ searchQuery, page: 1 });
    }
    this.setState({ status: 'rejected', items: [] });
  };

  loadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    const { showModal, items, activeIndex, status } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} loadMore={this.loadMore} />

        <ToastContainer autoClose={3000} />
        {status === 'pending' && (
          <IconContainer>
            <ThreeDots color={theme.colors.searchBarBgc} />
          </IconContainer>
        )}

        {items.length !== 0 && (
          <ImageGallery
            items={items}
            toggleModal={this.toggleModal}
            setActiveIndex={this.setActiveIndex}
            loadMore={this.loadMore}
          />
        )}
        {showModal && (
          <Modal item={items[activeIndex]} onClose={this.toggleModal} />
        )}
      </AppContainer>
    );
  }
}
