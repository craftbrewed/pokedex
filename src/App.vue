<template>
    <div id="pokedex">
            <top-screen></top-screen>
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

            pokemonLookup(){
                this.updateSprite();
            }
        },
        computed:{
            pokeData(){
                return this.$store.state.pokemon.pokeCache;
            },
            currentPokemon(){
                return this.$store.getters.current;
            }

        },
        created(){
            this.$store.dispatch('initializePokedex').then(() => {
                Pokedex.dispatch.$emit('pokedexLoaded');
            });

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
            Pokedex.dispatch.$on('requestPokeData', ()=> {
                if(this.$lodash.isEmpty(this.currentPokemon)){
                    //this.pokeApi.loadPokedex(Pokedex.config.currentPokedex).then((data)=>{

                    //});
                }

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
