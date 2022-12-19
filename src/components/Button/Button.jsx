import {LoadMoreBtn, LoadMoreBtnWrap} from './Button.styled'
import PropTypes from 'prop-types';


export const Button = ({ onLoadMore }) => {
    return (
        <LoadMoreBtnWrap>
            <LoadMoreBtn type="button" onClick={onLoadMore}>
                Load more
            </LoadMoreBtn>
        </LoadMoreBtnWrap>
    );
};

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
};