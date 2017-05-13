<template>
    <div class="col-8">
        <ul class="select" data-size="7">
            <li v-for="(pokemon, idx) in collection" :class=" { 'selected first-visible' : idx === 0 } " :data-url="pokemon.url">
                <span class="pokeball"></span>
                <div>
                    <p class="pokedex-pokemon-number"> {{ self.pad( idx+1 ) }}</p>
                    <p class="pokedex-pokemon-name"> {{ pokemon.name }} </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/babel">
    import  axios from 'axios';

    export default {
        data(){
            return{
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
                console.log(n);
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
            /*
            axios.get('http://pokeapi.co/api/v2/pokemon/').then(pokemans => {
                this.collection = pokemans.data.results;
            });
            */

            //load a pokedex

        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/modules/poke-list.scss";
</style>