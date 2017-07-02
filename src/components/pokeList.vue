<template>
    <div class="col-8">
        <ul class="select" data-size="7">
            <li v-for="(pokemon, idx) in collection" :class=" { 'first-visible' : idx === 0 } " :data-url="pokemon.pokemon_species.url" :data-entry="pokemon.entry_number">
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
                lookupUrl : "http://pokeapi.co/api/v2/pokemon/",
                self : this,
                current: null,
                currentPokedex: 5,
                ul : null,
                ulArray: [],
                ulIdx: 0,
                firstLi: null,
                ulRect: null,
                ulMidpoint: null,
                url: '',
                collection: [],
                previousList: []
            }
        },
        methods:{
            loadPokedex(){
                //load a pokedex
                this.completeCollection = JSON.parse(localStorage.getItem('pokedex')) || {};
                this.collection = this.collection[ this.currentPokedex ];
                new Promise((res) => {
                    if( !this.collection ){
                        var url = Pokedex.apiUrls.pokedex+this.currentPokedex+'/';
                        this.axios.get(url).then(pokedex => {
                            var bigCollection = this.completeCollection;

                            this.collection = pokedex.data.pokemon_entries;

                            bigCollection[this.currentPokedex] = this.collection;
                            localStorage.setItem('pokedex', JSON.stringify( this.completeCollection ));

                            res();
                        });
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
            //we set the next 3 siblings via css, but we have to assign values to the previous siblings
            setPrevious(){
                var previous = this.current.previousElementSibling,
                    n = 0;

                this.previousList.forEach(item => {
                   item.classList.remove('n1', 'n2', 'n3');
                });
                this.previousList = [];

                while(previous && n++ < 3){
                    previous.classList.add("n"+n);
                    this.previousList.push(previous);
                    previous = previous.previousElementSibling;
                }
            },
            setCurrent(idx){
                
                this.ulIdx = idx;
                this.current.classList.remove('selected');
                this.current = this.ulArray[ idx ];
                this.current.classList.add('selected');
                this.setPrevious();
                this.centerListItem();
            },
            changeItem(delta){
                var nextIdx = this.ulIdx + delta;
                
                if(nextIdx > this.collection.length-1){
                    nextIdx = this.collection.length-1;
                }
                if(nextIdx < 0){
                    nextIdx = 0;
                }

                if(nextIdx === this.ulIdx){
                    return;
                }

                this.setCurrent(nextIdx);
                this.broadcastChange();
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

        },
        created(){
            this.loadPokedex();
            this.broadcastChange = this.$lodash.debounce(() => {
                Pokedex.dispatch.$emit('listChange', {
                    speciesUrl: this.current.dataset.url,
                    entryNumber: this.pokemon_index_number
                });
            }, 150);

            //catch events that alter the list
            Pokedex.dispatch.$on('listItemChange', (e) => {
                try{
                    this.changeItem(e);
                }catch (e){
                    console.error('Critical Error Shutting Down Core Reactor');
                }
            });
        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/modules/poke-list.scss";
</style>