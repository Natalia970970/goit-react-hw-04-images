export const response = (request, page, perPage) => {
    return fetch(
        `https://pixabay.com/api/?q=${request}&page=${page}&key=30777543-e493bf0203eb427eb0034605d&image_type=photo&orientation=horizontal&per_page=${perPage}`)
        .then(response => response.json());
};