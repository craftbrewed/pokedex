<template>
    <div id="pokedex">
        <top-screen></top-screen>
        <bottom-screen></bottom-screen>
    </div>
</template>

<script>
    import topScreen from './components/topScreen.vue';
    import bottomScreen from './components/bottomScreen.vue';
    export default {
        name: 'pokedex',
        components: {topScreen, bottomScreen},
        data () {
            return {

            }
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
