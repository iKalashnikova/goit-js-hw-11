export default class PictureApiService {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }
  
    fetchPictures() {
console.log(this);
        const URl = "https://pixabay.com/api/";
        const KEY = "34967949-bc4aa4b6b9ade32e48c05a514";
        
        return fetch(`${URl}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=5`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.status)
                } else if(res)
                    res.json()
            })
            .then(({ hits }) => {
                console.log({hits});
                this.page += 1;
                
               return hits
            }
        )
        .catch(err => console.log(err))
    };

    resetPage() {

        this.page = 1;
    }

    get query() {
        return this.searchQuery
    };

    set query (newSearch) {
        this.searchQuery = newSearch;
        
    }
}