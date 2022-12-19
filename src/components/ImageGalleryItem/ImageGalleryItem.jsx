import {GalleryItem, GalleryItemImage} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';


export const ImageGalleryItem =({ webformatURL, tags, onImageClick}) => {
    return (
        <GalleryItem className="gallery-item">
            <GalleryItemImage src={webformatURL} alt={tags} onClick = {onImageClick}/>
        </GalleryItem>
    )
}

ImageGalleryItem.propTypes = {
    onImageClick: PropTypes.func.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};