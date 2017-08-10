<template>
    <div class="top-screen">
        <div class="container">
            <router-view name="topScreen"></router-view>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
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
    @import "./../assets/styles/vars/pallette.scss";
    @import "./../assets/styles/vars/backgrounds.scss";
    @import "./../assets/styles/modules/panel.scss";
    @import "./../assets/styles/modules/pokeball.scss";

    .top-screen{
        overflow: hidden;
        position: relative;
        height: calc(49vh);
        background-size: contain !important;
        overflow-y: hidden;
    }

    .top-screen-borders{
        border-top: solid 4px lighten(black, 28%);
        border-bottom: solid 4px lighten(black, 28%);
    }

    .top-screen-main-panel{

    }

</style>