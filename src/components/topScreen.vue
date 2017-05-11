<template>
    <div class="top-screen">
        <top-screen-top-panel></top-screen-top-panel>
        <div class="row top-screen-borders">
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
        }

    }
</script>

<style lang="scss">
    @import "./../assets/styles/vars/pallette.scss";
    @import "./../assets/styles/vars/backgrounds.scss";
    @import "./../assets/styles/modules/panel.scss";
    @import "./../assets/styles/modules/pokeball.scss";

    .top-screen{
        background: $sprite--topscreen-bg;
        background-size: cover;
        overflow: hidden;
        position: relative;
        height: calc(50vh);
    }

    .top-screen-borders{
        border-top: solid 4px lighten(black, 28%);
        border-bottom: solid 4px lighten(black, 28%);
    }

</style>