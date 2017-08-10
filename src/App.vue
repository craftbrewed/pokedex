<template>
    <div id="pokedex">
            <top-screen :pokeData="pokeData" :currentId="currentId" :currentIdx="currentIdx"></top-screen>
            <bottom-screen></bottom-screen>
            <error-modal></error-modal>
    </div>
</template>

<script type="text/babel">
    import topScreen from './components/topScreen.vue';
    import bottomScreen from './components/bottomScreen.vue';
    import errorModal from './components/errorDialog/errorModal.vue';

    export default {
        name: 'pokedex',
        components: {topScreen, bottomScreen, errorModal},
        data () {
            return {
                pokeData: {},
                currentPokemon: {},
                currentId: null,
                currentIdx: null,
                speciesUrl: null,
                haltState: false
            }
        },
        methods:{
            updateSprite(){
                if(this.currentId){
                    var idx = this.currentId,
                            imagePath = './pokesprites/'+idx+'/front_default/'+idx+'.png';

                    Pokedex.dispatch.$emit('pokemonSpriteUpdate', imagePath);
                }
            },
            fetchPokemonData() {
                var idx = this.currentId,
                    url = Pokedex.apiUrls.pokemon+idx;

                return this.axios.get(url).then(mon => {
                            this.pokeData[idx] = this.pokeData[idx] || {};
                            var pokemon = this.pokeData[idx];
                            mon = mon.data;
                            pokemon.name = mon.name;
                            pokemon.weight = mon.weight;
                            pokemon.height = mon.height;

                            this.pokeData[idx] = pokemon;
                        })
                        .catch( error => {
                            this.errorHandle.exception('pokeApiError', error, this.fetchPokemonData)
                        } );
            },
            fetchSpeciesData(){
                var idx = this.currentId,
                    url = this.speciesUrl;

                return this.axios.get(url).then(species => {
                    this.pokeData[idx] = this.pokeData[idx] || {};
                    console.log(species.data);
                    this.pokeData[idx].description = species.data.flavor_text_entries.filter(obj => {
                        return obj.version.name === "pearl";
                    })[0].flavor_text;
                    this.pokeData[idx].genera = species.data.genera.filter(obj => {
                       return obj.language.name === 'en';
                    })[0].genus;
                }).catch( error => {
                    this.errorHandle.exception('pokeApiError', error, this.fetchPokemonData)
                } );
            },

            loadPokeData(){
                var pokemonData = this.fetchPokemonData(),
                    speciesData = this.fetchSpeciesData();

                //cache pokemon
                Promise.all([pokemonData, speciesData]).then((data) => {
                    localStorage.setItem('pokeCache', JSON.stringify(this.pokeData));
                    this.currentPokemon = this.pokeData[this.currentId];
                });
            },
            pokemonLookup(){
                this.updateSprite();
                if(!this.pokeData[this.currentId]){
                    this.loadPokeData();
                }else{
                    this.currentPokemon = this.pokeData[this.currentId];
                }
            }
        },
        created(){
            this.pokeData = JSON.parse(localStorage.getItem('pokeCache'));
            if(!this.pokeData){
                this.pokeData = {};
            }

            Pokedex.dispatch.$on('listChange', data => {
                this.currentId = data.id;
                this.currentIdx = data.entryNumber;
                this.speciesUrl = data.speciesUrl;
                this.pokemonLookup();
            });
            Pokedex.dispatch.$on('setHaltState', state =>{
                Pokedex.haltState = state;
            });
            Pokedex.dispatch.$on('checkPokeIndex', () =>{
                Pokedex.dispatch.$emit('pokedexIndexResponse', this.currentIdx);
            });
            Pokedex.dispatch.$on('pokeSpriteCreate', ()=>{
                this.updateSprite();
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
        /* The Gameboy aspect ratio */
        position: relative;
        max-width: (2*100vh) / 3;
        width: 100%;
        margin: 0 auto;
    }
    a{
        text-decoration: none;
    }
</style>
