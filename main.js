Vue.component('searchbar', {
    data () {
        return {
            criteria: null,
            apiKey: 'PPXOMLUPnCm8gbJewKXimgf59v1Cbonn',
            limit: 5,
            selectedGif: '',
            gifs: [],
            dropdownOpen: false

        }
    },
    template: `
        <div class="search-bar">
        <h2 style="color:blue;" class="text-left">Search For Gifs</h2>
            <div class="search">
                 <form v-on:submit.prevent="getGifs">
                    <input type="text"
                    class="text-center"
                    v-on:keyup.enter="getGifs"
                    v-model="criteria"
                    placeholder="Search GIFs" style="color:blue;"/>
                    <button class="btn btn-primary" v-on:click="getGifs">Search</button>
                </form>
            </div>
            <div class="dropdown">
                <div class="dropdown-menu" :class="{ 'show' : dropdownOpen }">
                    <a href="#" class="dropdown-item"
                        v-on:click="selectGif(gif.images)"
                        v-for="gif in gifs">
                        <img :src="gif.images.fixed_width.url" />
                    </a>
                </div>
            </div>
            <div v-show="selectedGif" class="card selectedGifPreview">
                <div class="card-body">
                    <img :src="selectedGif" />
                    <br />
                     <a href="#" class="btn btn-danger" v-on:click="selectedGif=''">X</a>
                </div>
            </div>
        </div>
    `,
    methods: {
        getGifs() {

            if(!this.criteria){
                return false;
            }
            console.log(this.critera);

            this.gifs = [],
            this.dropdownOpen = false;
            axios.get('https://api.giphy.com/v1/gifs/search?q=' + this.criteria + '&api_key=' + this.apiKey + '&limit=' + this.limit)
                 .then((response) => {this.loadGifs(response.data.data)
                    console.log(response);
            });
        },

        loadGifs(data) {
            this.gifs = data;
            this.dropdownOpen = true;
        },

        selectGif(gif) {
            console.log(gif);
            this.selectedGif = gif.fixed_height.url;
            this.dropdownOpen = false;
        },

        doFocus() {
            if(this.criteria) this.dropdownOpen = true;
        }
    }
})

var vue = new Vue ({
    el: '#app'
})
