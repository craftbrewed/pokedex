<template>
    <div class="col-8">
        <ul class="select" data-size="7">
            <li v-for="(pokemon, idx) in collection" :class=" { 'first-visible' : idx === 0 } " :data-url="pokemon.pokemon_species.url" :data-entry="pokemon.entry_number" :data-pokeId="pokemon.id">
                <span class="pokeball"></span>
                <div>
                    <p class="pokedex-pokemon-number"> {{ self.pad( pokemon.entry_number ) }}</p>
                    <p class="pokedex-pokemon-name"> {{ pokemon.pokemon_species.name }} </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/babel">
    export default {
        data(){
            return{
                self : this,
                current: null,
                currentPokedex: 6,
                ulIdx: 0,
                collection: [],
                previousList: []
            }
        },
        methods:{
            getCollections(){
                //the complete collection is an array of collections, i.e. different pokedexes
                //  the collection is the current pokedex
                this.completeCollection = JSON.parse(localStorage.getItem('pokedex')) || {};
                this.collection = this.completeCollection[ this.currentPokedex ];
            },
            loadPokedex(){
                this.getCollections();
                //load a pokedex
                return new Promise((res, reject) => {
                    if( !this.collection ){
                        var url = Pokedex.apiUrls.pokedex+this.currentPokedex+'/';
                        this.axios.get(url).then(pokedex => {
                            this.collection = pokedex.data.pokemon_entries;
                            this.completeCollection[this.currentPokedex] = this.collection;
                            localStorage.setItem('pokedex', JSON.stringify( this.completeCollection ));
                            res();
                        })
                        .catch( e => {
                            this.errorHandle.exception('pokeApiError', e, this.loadPokedex);
                            reject();
                        } );
                    }else{
                        res();
                    }
                }).then(() =>{
                    this.ulArray = Array.prototype.slice.call(this.ul.childNodes, 0);
                    this.current = this.ulArray[this.ulIdx];
                    this.current.classList.add('selected');
                    this.broadcastChange();
                });
            },
            centerListItem(){
                var selectRect =this.current.getBoundingClientRect(),
                    offset = (( selectRect.top + selectRect.height/2 ) - this.ulRect.top) + this.ul.scrollTop,
                    scrollPoint = offset-this.ulMidpoint;

                this.ul.scrollTop = scrollPoint;
            },
            //wrapper function for the previousList, clear the array, remove the active classes
            clearPrevious(){

                this.previousList.forEach(item => {
                    item.classList.remove('n1', 'n2', 'n3');
                });
                this.previousList = [];

            },
            //we set the next 3 siblings via css, but we have to assign values to the previous siblings
            setPrevious(){

                this.clearPrevious();
                var previous = this.current.previousElementSibling,
                    n = 0;

                while(previous && n++ < 3){
                    previous.classList.add("n"+n);
                    this.previousList.push(previous);
                    previous = previous.previousElementSibling;
                }

            },
            setCurrent(idx){

                this.ulIdx = idx;
                if(this.current){
                    this.current.classList.remove('selected');
                }
                this.current = this.ulArray[ idx ];
                this.current.classList.add('selected');

            },
            updateList(idx){

                this.setCurrent(idx);
                this.setPrevious();
                this.centerListItem();
                this.broadcastChange();

            },
            shift(delta){
                var nextIdx = this.ulIdx + delta;
                
                if(nextIdx > this.collection.length-1){
                    nextIdx = this.collection.length-1;
                }else if(nextIdx < 0){
                    nextIdx = 0;
                }

                this.updateList(nextIdx);
            }
        },
        computed: {
            pokemon_index_number: function(){
                return this.current.dataset.url.split('/').filter(el => {return el !== "";}).pop();
            }
        },
        mounted(){

            this.ul = this.$el.querySelector('.select');
            this.ulRect = this.ul.getBoundingClientRect();
            this.ulMidpoint = this.ulRect.height/2;
            this.ulArray = Array.prototype.slice.call(this.ul.childNodes, 0);

        },
        created(){
            this.dexPromise = this.loadPokedex();

            //catch events that alter the list
            Pokedex.dispatch.$on('listItemChange', (e) => {
                try{
                    this.shift(e);
                }catch (e){
                    console.error('Critical Error Shutting Down Core Reactor');
                }
            });

            //call/response from parent. after load, if there's a stored state, resume that state
            Pokedex.dispatch.$once('pokedexIndexResponse', (idx) => {
                this.dexPromise.then(()=>{
                    if(idx !== null){
                        this.updateList(idx-1);
                    }
                });
            });
            Pokedex.dispatch.$emit('checkPokeIndex');

            this.broadcastChange = this.$lodash.debounce(() => {
                Pokedex.dispatch.$emit('listChange', {
                    speciesUrl: this.current.dataset.url,
                    entryNumber: this.current.dataset.entry,
                    id: this.pokemon_index_number
                });
            }, 150);
        }
    }
</script>

<style lang="scss">
    @import "../../assets/styles/modules/poke-list.scss";
</style>