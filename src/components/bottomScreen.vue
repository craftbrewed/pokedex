<template>
    <div class="bottom-screen">
        <div class="container">
            <insets></insets>
            <div class="row full-height">
                <div class="col-4">
                    <square-button id="search-pokemon"></square-button>
                    <square-button id="check-pokedex"></square-button>
                </div>
                <div class="col-2">
                    <circle-button id="navigation-up"></circle-button>
                    <circle-button id="navigation-down"></circle-button>
                </div>
                <div class="col-6">
                    <big-pokeball></big-pokeball>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">

    import insets from  './insets.vue';
    import squareButton from './squareButton.vue';
    import circleButton from './circleButton.vue';
    import bigPokeball from './bigPokeball.vue';

    export default{
        components: {
            insets, squareButton, circleButton, bigPokeball
        }
    }
</script>

<style>
    .bottom-screen{
        overflow: hidden;
        position: relative;
        height: calc(50vh);
    }
</style>