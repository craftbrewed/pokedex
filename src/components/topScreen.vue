<template>
    <div class="top-screen">
        <div class="container">
            <top-screen-top-panel></top-screen-top-panel>
            <div class="row top-screen-borders top-screen-main-panel container direction-row">
                <poke-sprite></poke-sprite>
                <poke-list></poke-list>
            </div>
            <seen-obtained-panel></seen-obtained-panel>
        </div>
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
    }

    .top-screen-borders{
        border-top: solid 4px lighten(black, 28%);
        border-bottom: solid 4px lighten(black, 28%);
    }

    .top-screen-main-panel{
        background: $sprite--topscreen-bg;
        background-size: contain;
        overflow-y: hidden;
    }

</style>