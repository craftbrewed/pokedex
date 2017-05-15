<template>
    <div class="col-8">
        <ul class="select" data-size="7">
            <li v-for="(pokemon, idx) in collection" :class=" { 'selected first-visible' : idx === 0 } " :data-url="lookupUrl+pokemon.entry_number" :data-entry="pokemon.entry_number">
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
                ul : null,
                firstLi: null,
                ulRect: null,
                ulMidpoint: null,
                url: '',
                collection: []
            }
        },
        methods:{
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

            broadcastChange(){
                console.log("debounce");
                Pokedex.dispatch.$emit('listChange', {
                    url: this.current.dataset.url,
                    entry_number: this.current.dataset.entry
                });
            },
            changeItem(action)
            {
                switch(action){
                    case 'next':
                        this.next();
                        break;
                    case 'prev':
                        this.prev();
                        break;
                }

            }
        },
        mounted(){
            this.current = this.$el.querySelector('.selected');
            this.ul = this.$el.querySelector('.select');
            this.firstLi = this.ul.firstElementChild;
            this.ulRect = this.ul.getBoundingClientRect();
            this.ulMidpoint = this.ulRect.height/2;
        },
        created(){
            //load a pokedex
            this.collection = JSON.parse(localStorage.getItem('pokedex'));
            if(!this.collection){
                this.axios.get('http://pokeapi.co/api/v2/pokedex/1/').then(pokedex => {
                    console.log(pokedex);
                    this.collection = pokedex.data.pokemon_entries;
                    localStorage.setItem('pokedex', JSON.stringify(this.collection));
                });
            }
            var debounceWrapper = this.$lodash.debounce(() => {
                this.broadcastChange();
            }, 150);
            //for now, TODO: DELETE THIS NOT FOR PRODUCTION DAMNIT
            window.addEventListener('keydown', e => {
                switch(e.which){
                    case 38:
                        this.changeItem('prev');
                        break;
                    case 40:
                        this.changeItem('next');
                        break;
                }
                debounceWrapper();
            });
        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/modules/poke-list.scss";
</style>