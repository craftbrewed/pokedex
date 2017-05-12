<template>
    <ul class="select" data-size="7">
        <li v-for="(pokemon, idx) in collection">
            <span class="pokeball"></span>
            <p class="pokedex-pokemon-number"> {{ self.pad( idx+1 ) }}</p>
            <p class="pokedex-pokemon-name"> {{ pokemon.name }} </p>
        </li>
    </ul>
</template>

<script type="text/babel">
    import  axios from 'axios';

    export default {
        data(){
            return{
                self : this,
                current: 0,
                url: '',
                collection: []
            }
        },
        computed:{
            pokeIndex: function(){
                return current+1;
            }
        },
        created(){
            axios.get('http://pokeapi.co/api/v2/pokemon/').then(pokemans => {
                this.collection = pokemans.data.results;
            });
        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/modules/poke-list.scss";
</style>