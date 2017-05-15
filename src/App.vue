<template>
    <div id="pokedex">
            <top-screen></top-screen>
            <bottom-screen></bottom-screen>
    </div>
</template>

<script type="text/babel">
    import topScreen from './components/topScreen.vue';
    import bottomScreen from './components/bottomScreen.vue';



    export default {
        name: 'pokedex',
        components: {topScreen, bottomScreen},
        data () {
            return {
                apiUrls : {
                    description: 'http://pokeapi.co/api/v1/description/',
                    pokemon: 'http://pokeapi.co/api/v2/pokemon/'
                },
                pokeData: {},
                currentPokemon: {}
            }
        },
        methods:{
            pokemonLookup(idx){
                if(!this.pokeData[idx]){
                    Promise.all(
                        [
                            this.axios.get(this.apiUrls.pokemon+idx),
                            this.axios.get(this.apiUrls.description+(idx+1))
                        ]).then((data) => {
                            var poke = data[0].data,
                                mon = data[1].data;


                            this.pokeData[idx] = {
                                name : poke.name,
                                weight: poke.weight,
                                height: poke.height,
                                sprite: poke.sprites.front_default,
                                description: mon.description
                            };

                            localStorage.setItem('pokeCache', JSON.stringify(this.pokeData));
                            this.currentPokemon = this.pokeData[idx];

                            Pokedex.dispatch.$emit('pokemonUpdated', this.currentPokemon);

                    });
                }else{
                    this.currentPokemon = this.pokeData[idx];
                    Pokedex.dispatch.$emit('pokemonUpdated', this.currentPokemon);
                }

            }
        },
        created(){
            this.pokeData = JSON.parse(localStorage.getItem('pokeCache'));
            if(!this.pokeData){
                this.pokeData = {};
            }

            Pokedex.dispatch.$on('listChange', data => {
                this.pokemonLookup(data.entry_number);
            });
        }
    }
</script>

<style lang="scss">
    body{
        font-family: 'pokemon_dpptregular';
        padding: 0;
        margin: 0;
        overflow-y: hidden;
    }
    #pokedex{
        max-width: 550px;
        margin: 0 auto;
    }
</style>
