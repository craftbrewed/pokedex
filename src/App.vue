<template>
    <div id="pokedex" >
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
                haltState: false,
                fullScreenAnswer: null
            }
        },
        methods:{
            shift(delta){
                let currentIdx =       this.$store.state.pokedex.idx,
                    collectionLength = this.$store.state.pokedex.collection.length-1,
                    nextIdx = currentIdx + delta;
                if(nextIdx > collectionLength){
                    nextIdx = collectionLength;
                }else if(nextIdx < 0){
                    nextIdx = 0;
                }
                return nextIdx;

            },
            requestFullScreen(){
                let element = this.$el;
                if (element.requestFullscreen) { // W3C API
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) { // Mozilla current API
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullScreen) { // Webkit current API
                    element.webkitRequestFullScreen();
                }
            }
        },
        computed:{

        },
        watch:{
            '$route'(to, from){
                Pokedex.dispatch.$emit('cancelSpin');
            }
        },
        mounted(){
            Pokedex.dispatch.$emit('modalOpen', {
                'title' : "Requesting Fullscreen",
                'body'  : "This app works reall well fullscreen... give it a try?",
                'confirm' : true,
                'canClose': true,
                'onConfirm': this.requestFullScreen
            })
        },
        created(){
            //The Pokedex and subsequent pokemon are vital to the app,
            //  and we may be fetching this via AJAX, so we'll need to tell components that rely on this data
            //  that it's ready.
            this.$store.dispatch('initializePokedex').then(() => {
                Pokedex.dispatch.$emit('appStart');

            });
            this.debouncedListItem = this.$lodash.debounce(()=>{
                Pokedex.dispatch.$emit('listItemLoad');
            }, 350);
            Pokedex.dispatch.$on('setHaltState', state =>{
                Pokedex.haltState = state;
            });
            Pokedex.dispatch.$on('listItemChange', (delta) =>{
                let nextIdx = this.shift(delta);
                this.$store.commit('update', {});
                this.$store.dispatch('updateIndex', nextIdx)
                        .then(() =>{
                           this.debouncedListItem();
                        })
                        .catch((error) => {})
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
