import { ThreeDots } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Component } from 'react';
import styled from 'styled-components';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageGalleryList } from './ImageGalleryList';
import { getImages } from 'services/api';
import { params } from 'constants/constants';
import { Modal } from 'components/ui/Modal';
import { theme } from 'stylesConfig/theme';

const IconContainer = styled.div`
  width: 50px;
  display: block;
  margin: 0 auto;
`;

export class ImageGallery extends Component {
  state = {
    items: [],
    status: 'idle',
    showModal: false,
    activeIndex: null,
  };

  componentDidMount() {
    this.setState({ items: [] });
  }

  async componentDidUpdate(prevProps) {
    const { searchQuery, page } = this.props;

    if (prevProps.page !== page || prevProps.searchQuery !== searchQuery) {
      this.setState({ status: 'pending' });
      if (page === 1) {
        this.setState({ items: [] });
      }

      getImages({ ...params, page, q: searchQuery })
        .then(res => {
          setTimeout(() => {
            this.setState(state => ({
              items: [...state.items, ...res],
              status: 'resolved',
            }));
          }, 2000);
        })
        .catch(error => {
          console.log(error);
          this.setState({ status: 'rejected' });
        });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal, items, activeIndex, status } = this.state;
    return (
      <>
        {status === 'pending' && (
          <IconContainer>
            <ThreeDots color={theme.colors.searchBarBgc} />
          </IconContainer>
        )}

        {status === 'resolved' && (
          <ImageGalleryList>
            {items.map((item, index) => {
              return (
                <ImageGalleryItem
                  item={item}
                  key={item.id}
                  onClick={() => {
                    this.toggleModal();
                    this.setState({ activeIndex: index });
                  }}
                />
              );
            })}
          </ImageGalleryList>
        )}
        {showModal && (
          <Modal item={items[activeIndex]} onClose={this.toggleModal} />
        )}
        {status === 'rejected' && <p>Error</p>}
      </>
    );
  }
}
