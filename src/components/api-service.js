import {renderPictures} from '../index.js'
export default class PictureApiService {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }
  
    fetchPictures() {
console.log(this);
        const URl = "https://pixabay.com/api/";
        const KEY = "34967949-bc4aa4b6b9ade32e48c05a514";
        
        fetch(`${URl}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=5`)
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                this.page += 1;
                
                renderPictures(data.hits)
            }
        )
        .catch(err => console.log(err))
    }

    get query() {
        return this.searchQuery
    };

    set query (newSearch) {
        this.searchQuery = newSearch;
        
    }
}