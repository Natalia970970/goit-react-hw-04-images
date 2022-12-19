import {useState, useEffect} from 'react'
import {Searchbar} from './Searchbar/Searchbar'
import {ImageGallery} from './ImageGallery/ImageGallery'
import { Button } from './Button/Button'
import { Loader } from './Loader/Loader'
import {ModalWindow} from './Modal/Modal'
import { response } from 'API'


export const App = () => {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImage, setLsargeImage] = useState(null);

  const perPage = 12;

useEffect(() => {
  if (request) {

  async function getData() {
    try {
      setIsLoading(true);
      const { hits } = await response(request, page, perPage);
      setImages(prevState => [...prevState, ...hits]);
    } catch (error) {
      console.log(error);
      return alert(`Ops, please try again`);
    } finally {
      setIsLoading(false);
    }
  }

  getData();
}
}, [request, page, perPage]);

  const onRequest = e => {
    e.preventDefault();
    const input = e.target.elements[1].value;
    e.target.reset();

    setRequest(input);
    setImages([]);
    setPage(1);
  }

  const onLoadMore = () => {
    setPage(prevState => (prevState + 1));
  }

  const onImageClick = (url, tags) => {
    setLsargeImage({ url, tags });
  };

  const onHandleClose = () => {
    setLsargeImage(null);
  };


    return (
        <div>
            <Searchbar onSubmit={onRequest} />
            <ImageGallery
                images={images}
                onImageClick={onImageClick}
            />
            {isLoading && <Loader/>}
            {images.length === page*perPage && (
              <Button onLoadMore={onLoadMore} />
            )}
            {largeImage && (
              <ModalWindow
                onHandleClose={onHandleClose}
                url={largeImage.url}
                tags={largeImage.tags}
              />
        )}
        </div>
  )
};
