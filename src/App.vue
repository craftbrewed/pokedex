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
                haltState: false
            }
        },
        methods:{

        },
        computed:{

        },
        created(){
            //The Pokedex and subsequent pokemon are vital to the app,
            //  and we may be fetching this via AJAX, so we'll need to tell components that rely on this data
            //  that it's ready.
            this.$store.dispatch('initializePokedex').then(() => {
                Pokedex.dispatch.$emit('appStart');
            });
            Pokedex.dispatch.$on('setHaltState', state =>{
                Pokedex.haltState = state;
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
