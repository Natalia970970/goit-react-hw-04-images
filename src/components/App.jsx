import {Component} from 'react'
import {Searchbar} from './Searchbar/Searchbar'
import {ImageGallery} from './ImageGallery/ImageGallery'
import { Button } from './Button/Button'
import { Loader } from './Loader/Loader'
import {ModalWindow} from './Modal/Modal'


export class App extends Component {
state = {
  request: '',
  images: [],
  isLoading: false,
  page: 1,
  largeImage: null,
}

perPage = 12;

async componentDidUpdate(_, prevState) {
  if (prevState.request !== this.state.request || prevState.page !== this.state.page) {
    try {
      this.setState({ isLoading: true });
      const { hits } = await fetch(
        `https://pixabay.com/api/?q=${this.state.request}&page=${this.state.page}&key=30777543-e493bf0203eb427eb0034605d&image_type=photo&orientation=horizontal&per_page=${this.perPage}`)
        .then(response => response.json());
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
    return;
  }
}

onRequest = e => {
  e.preventDefault();
  const input = e.target.elements[1].value;
  e.target.reset();

  this.setState({ request: input, images: [], page: 1,});
}

onLoadMore = () => {
  this.setState(prevState => ({ page: prevState.page + 1 }));
}

onImageClick = (url, tags) => {
  this.setState({ largeImage: { url, tags } });
};

onHandleClose = () => {
  this.setState({ largeImage: null});
};

render () {
    return (
        <div>
            <Searchbar onSubmit={this.onRequest} />
            <ImageGallery
                images={this.state.images}
                onImageClick={this.onImageClick}
            />
            {this.state.isLoading && <Loader/>}
            {this.state.images.length === (this.state.page)*this.perPage && (
              <Button onLoadMore={this.onLoadMore} />
            )}
            {this.state.largeImage && (
              <ModalWindow
                onHandleClose={this.onHandleClose}
                url={this.state.largeImage.url}
                tags={this.state.largeImage.tags}
              />
        )}
        </div>
    )
}
};
