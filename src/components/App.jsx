import { Component } from 'react';
import { getImages } from 'service/imageApi';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';

export default class App extends Component {
  state = {
    page: 1,
    query: '',
    totalPages: 1,
    images: [],
    isModalOpen: false,
    largeImageUrl: '',
    showBtn: false,
  };

  async componentDidMount() {
    const { page, query } = this.state;
    await this.fetchImages(page, query);
  }

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      await this.fetchImages(page, query);
    }
  }

  fetchImages = async (page, query) => {
    await getImages(query, page).then(({ hits, totalHits }) => {
      console.log(hits);
      this.setState(prevState => ({ images: [...prevState.images, ...hits] }));
      this.setState({ showBtn: page < Math.ceil(totalHits / 12) });
    });
  };

  handleSubmit = query => {
    this.setState({
      page: 1,
      query: query,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  handleImageClick = largeImageUrl => {
    this.setState({
      largeImageUrl,
      isModalOpen: true,
    });
  };

  handleModalClickClose = e => {
    if (e.target.id === 'modal' && this.state.isModalOpen) {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  fetchMoreImages = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { images } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}

        {this.state.isModalOpen && (
          <Modal
            largeImageUrl={this.state.largeImageUrl}
            onClose={this.handleModalClose}
            onClickClose={this.handleModalClickClose}
          />
        )}
        {this.state.showBtn && <Button handleLoadMore={this.handleLoadMore} />}
      </div>
    );
  }
}
