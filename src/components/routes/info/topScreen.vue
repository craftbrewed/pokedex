<template>
    <div class="top-screen-info">
        <info-bar></info-bar>
        <div class="row top-screen-main-panel container direction-row info--row">
            <poke-sprite></poke-sprite>
            <poke-name-container></poke-name-container>
            <poke-type></poke-type>
            <poke-height-weight></poke-height-weight>
            <poke-print></poke-print>
        </div>
        <poke-description></poke-description>
    </div>

</template>

<script type="text/babel">
    import infoBar from '../../modules/infoBar.vue';
    import pokeSprite from '../../modules/pokeSprite.vue';
    import pokeNameContainer from '../../modules/pokeNameContainer.vue';
    import pokeType from '../../modules/pokeType.vue';
    import pokeHeightWeight from '../../modules/pokeHeightWeight.vue';
    import pokePrint from '../../modules/pokePrint.vue';
    import pokeDescription from '../../modules/pokeDescription.vue';

    export default {
        data(){
            return{
                pokemon : {}
            }
        },
        components: {
            infoBar, pokeSprite, pokeNameContainer, pokeType, pokeHeightWeight, pokePrint, pokeDescription
        },
        created(){
            Pokedex.dispatch.$on('pokeapi-load', (data) => {
                this.pokemon = data;
            });
        }
    }
</script>

<style lang="scss">
    .info--row{
        height:50% !important;
        margin-top:10%;
        align-items: flex-start!important;
    }
</style>