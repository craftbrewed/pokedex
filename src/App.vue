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
            pokemonLookup(idx, url){
                Pokedex.dispatch.$emit('pokemonSpriteUpdate', "./pokesprites/"+idx+"/front_default/"+idx+".png");
                if(!this.pokeData[idx]){
                    var pokeData = this.axios.get(this.apiUrls.pokemon+idx).then(poke =>{
                            this.pokeData[idx] = this.pokeData[idx] || {};
                            var thisPokemon = this.pokeData[idx];
                            poke = poke.data;

                            thisPokemon.name = poke.name;
                            thisPokemon.weight = poke.weight;
                            thisPokemon.height = poke.height;
                    }).then((data) => {
                                this.currentPokemon = this.pokeData[idx];
                    }),
                        speciesData = this.axios.get(url).then(species =>{
                            this.pokeData[idx] = this.pokeData[idx] || {};
                            var thisPokemon = this.pokeData[idx];

                            thisPokemon.description = species.data.flavor_text_entries.filter(obj => {
                               return obj.version.name === "pearl";
                            });
                        });
                    Promise.all([pokeData, speciesData]).then((data) => {
                            localStorage.setItem('pokeCache', JSON.stringify(this.pokeData));
                            this.currentPokemon = this.pokeData[idx];
                            //Pokedex.dispatch.$emit('pokemonUpdated', this.currentPokemon);
                    });
                }else{
                    this.currentPokemon = this.pokeData[idx];
                    //Pokedex.dispatch.$emit('pokemonUpdated', this.currentPokemon);
                }

            }
        },
        created(){
            this.pokeData = JSON.parse(localStorage.getItem('pokeCache'));
            if(!this.pokeData){
                this.pokeData = {};
            }

            Pokedex.dispatch.$on('listChange', data => {
                this.pokemonLookup(data.entry_number, data.url);
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
