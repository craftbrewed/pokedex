<template>
    <div class="col-8">
        <ul class="select" data-size="7">
            <li v-for="(pokemon, idx) in collection" :class=" { 'selected first-visible' : idx === 0 } " :data-url="pokemon.pokemon_species.url" :data-entry="pokemon.entry_number">
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
                firstLi: null,
                ulRect: null,
                ulMidpoint: null,
                url: '',
                collection: []
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
                    this.current = this.$el.querySelector('.selected');
                    this.broadcastChange();
                });
            },
            centerListItem(){
                var selectRect =this.current.getBoundingClientRect(),
                    offset = (( selectRect.top + selectRect.height/2 ) - this.ulRect.top) + this.ul.scrollTop,
                    scrollPoint = offset-this.ulMidpoint;

                this.ul.scrollTop = scrollPoint;
            },
            setPrevious(){
                var previous = this.current.previousElementSibling,
                    n = 0;

                while(previous && n++ < 3){
                    previous.classList.remove("n1","n2", "n3");
                    previous.classList.add("n"+n);
                    previous = previous.previousElementSibling;
                }
                if(previous && n === 4){
                    previous.classList.remove("n1", "n2", "n3");
                }
            },
            next() {
                if(!this.current.nextElementSibling){
                    return
                }
                var next = this.current.nextElementSibling;
                next.classList.add('selected');
                this.current.classList.remove('selected');
                this.current = next;
                this.setPrevious();
                this.centerListItem();
            },
            prev(){
                if(!this.current.previousElementSibling){
                    return;
                }
                var prev = this.current.previousElementSibling;
                prev.classList.remove("n1");
                prev.classList.add('selected');
                this.current.classList.remove('selected');
                this.current = prev;
                this.setPrevious();
                this.centerListItem();
            },
            changeItem(delta){

                var exFunc = (delta >= 0) ?  this['next'] : this['prev'];
                for(var i = 0; i < Math.abs(delta); i+=1){
                    exFunc();
                }

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