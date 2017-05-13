<template>
    <div class="col-8">
        <ul class="select" data-size="7">
            <li v-for="(pokemon, idx) in collection" :class=" { 'selected' : idx === 0 } ">
                <span class="pokeball"></span>
                <p class="pokedex-pokemon-number"> {{ self.pad( idx+1 ) }}</p>
                <p class="pokedex-pokemon-name"> {{ pokemon.name }} </p>
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
                current: 0,
                url: '',
                collection: [
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/1/",
                        "name": "bulbasaur"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/2/",
                        "name": "ivysaur"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/3/",
                        "name": "venusaur"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/4/",
                        "name": "charmander"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/5/",
                        "name": "charmeleon"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/6/",
                        "name": "charizard"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/7/",
                        "name": "squirtle"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/8/",
                        "name": "wartortle"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/9/",
                        "name": "blastoise"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/10/",
                        "name": "caterpie"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/11/",
                        "name": "metapod"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/12/",
                        "name": "butterfree"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/13/",
                        "name": "weedle"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/14/",
                        "name": "kakuna"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/15/",
                        "name": "beedrill"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/16/",
                        "name": "pidgey"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/17/",
                        "name": "pidgeotto"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/18/",
                        "name": "pidgeot"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/19/",
                        "name": "rattata"
                    },
                    {
                        "url": "http://pokeapi.co/api/v2/pokemon/20/",
                        "name": "raticate"
                    }
                ]
            }
        },
        computed:{
            pokeIndex: function(){
                return current+1;
            }
        },
        methods:{

        },
        created(){
            /*
            axios.get('http://pokeapi.co/api/v2/pokemon/').then(pokemans => {
                this.collection = pokemans.data.results;
            });
            */

        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/modules/poke-list.scss";
</style>