<template>
    <div class="bottom-screen">
        <div class="container">
            <insets></insets>
            <div class="row full-height">
                <div class="col-5">
                    <square-button id="search-pokemon">
                        <span class="button-text">SEARCH POKéMON</span>
                        <span slot="glyph" class="button-glyph search" ></span>
                    </square-button>
                    <square-button id="check-pokedex">
                        <span class="button-text">CHECK  POKéDEX</span>
                        <span slot="glyph" class="button-glyph book" ></span>
                    </square-button>
                </div>
                <div class="col-2">
                    <div class="center-btn-container">
                        <circle-button id="navigation-up" @click="navUp">
                            <span class="button-glyph arrow-default arrow-default-up"></span>
                        </circle-button>
                        <circle-button  id="navigation-down" @click="navDown">
                            <span class="button-glyph arrow-default arrow-default-down"></span>
                        </circle-button>
                    </div>

                </div>
                <div class="col-5">
                    <big-pokeball></big-pokeball>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">

    import insets from  './routes/home/insets.vue';
    import squareButton from './buttons/squareButton.vue';
    import circleButton from './buttons/circleButton.vue';
    import bigPokeball from './routes/home/bigPokeball.vue';

    export default{
        components: {
            insets, squareButton, circleButton, bigPokeball
        },
        methods:{
            navUp(){
                Pokedex.dispatch.$emit('topScreenCloseOpen', function(){
                    Pokedex.dispatch.$emit('listItemChange', -999, true);
                });
            },
            navDown(){
                Pokedex.dispatch.$emit('topScreenCloseOpen', function(){
                    Pokedex.dispatch.$emit('listItemChange', 999, true);
                });
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/modules/insets.scss";
    @import "../assets/styles/vars/pallette.scss";
    .bottom-screen{
        background-color: $light-yellow--background;
        overflow: hidden;
        position: relative;
        height: calc(49vh);
        padding: 5px 0 5px 10px;
    }
</style>