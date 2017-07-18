<template>
    <div class="top-screen-home">

            <top-screen-top-panel></top-screen-top-panel>
            <div class="row top-screen-borders top-screen-main-panel container direction-row">
                <poke-sprite></poke-sprite>
                <poke-list></poke-list>
            </div>
            <seen-obtained-panel></seen-obtained-panel>
    </div>
</template>

<script type="text/babel">
    import topScreenTopPanel from './topScreenTopPanel.vue';
    import pokeSprite from './pokeSprite.vue';
    import pokeList from './pokeList.vue';
    import seenObtainedPanel from './seenObtainedPanel.vue'
    export default {
        components: {
            topScreenTopPanel, pokeSprite, pokeList, seenObtainedPanel
        },
        created(){
            Pokedex.dispatch.$on('topScreenCloseOpen', (callback) => {
                Pokedex.dispatch.$emit('closeTopPanels');
                Pokedex.dispatch.$once('panelsClosed', () => {
                    callback();
                    setTimeout(()=>{
                        Pokedex.dispatch.$emit('openTopPanels');
                    },150)

                });
            });
        }
    }
</script>

<style lang="scss">
    .top-screen-home{
        height: 100%;
    }
</style>
