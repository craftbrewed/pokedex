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
                ul : null,
                localIdx: 0,
                previousList: []
            }
        },
        methods:{
            init(){
                this.$nextTick(function () {
                    this.localIdx = this.ulIdx;
                    this.ul = this.$el.querySelector('.select');
                    this.ulRect = this.ul.getBoundingClientRect();
                    this.ulMidpoint = this.ulRect.height/2;
                    this.ulArray = Array.prototype.slice.call(this.ul.childNodes, 0);
                    this.current = this.ulArray[this.ulIdx];
                    this.current.classList.add('selected');

                    this.updateList(this.localIdx);
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

                this.localIdx = idx;
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
                var nextIdx = this.localIdx + delta;
                
                if(nextIdx > this.collection.length-1){
                    nextIdx = this.collection.length-1;
                }else if(nextIdx < 0){
                    nextIdx = 0;
                }

                this.updateList(nextIdx);
            }
        },
        computed: {
            collection(){
                return this.$store.state.pokedex.collection;
            },
            pokemon_index_number: function(){
                return this.current.dataset.url.split('/').filter(el => {return el !== "";}).pop();
            },
            currentPokedex: function(){
                return Pokedex.config.currentPokedex
            },
            ulIdx(){
                return this.$store.state.pokedex.idx;
            }
        },
        mounted(){

        },
        created(){
            if(this.collection){
                this.init();
            }
            Pokedex.dispatch.$on('pokedexLoaded', () => this.init());

            //catch events that alter the list
            Pokedex.dispatch.$on('listItemChange', (e) => {
                try{
                    this.shift(e);
                }catch (e){
                    console.error(e, "!");
                }
            });

            this.broadcastChange = this.$lodash.debounce(() => {
                Pokedex.dispatch.$emit('listChange', {
                    speciesUrl: this.current.dataset.url,
                    entryNumber: this.current.dataset.entry,
                    id: this.pokemon_index_number
                });
                this.$store.dispatch('updateIndex', this.localIdx);
            }, 150);
        }
    }
</script>

<style lang="scss">
    @import "../../assets/styles/modules/poke-list.scss";
</style>