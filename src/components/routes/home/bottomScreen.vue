<template>
    <div class="bottom-screen-home">
        <insets></insets>

        <div class="row full-height">
                <div class="col-5">
                    <router-link to="/search">
                        <square-button id="search-pokemon">
                            <span class="button-text">SEARCH POKéMON</span>
                            <span slot="glyph" class="button-glyph search" ></span>
                        </square-button>
                    </router-link>
                    <router-link to="/info">
                        <square-button id="check-pokedex">
                            <span class="button-text">CHECK  POKéDEX</span>
                            <span slot="glyph" class="button-glyph book" ></span>
                        </square-button>
                    </router-link>

                </div>
                <div class="col-2">
                    <div class="center-btn-container">
                        <circle-button id="navigation-up"  type="navUp">
                            <span class="button-glyph arrow-default arrow-default-up"></span>
                        </circle-button>
                        <circle-button  id="navigation-down" type="navDown">
                            <span class="button-glyph arrow-default arrow-default-down"></span>
                        </circle-button>
                    </div>

                </div>
                <div class="col-5">
                    <big-pokeball></big-pokeball>
                </div>
            </div>
    </div>
</template>

<script type="text/babel">

    import squareButton from './../../buttons/squareButton.vue';
    import circleButton from './../../buttons/circleButton.vue';
    import bigPokeball from './bigPokeball.vue';
    import insets from './insets.vue';


    export default{
        components: {
            squareButton, circleButton, bigPokeball, insets
        },
        methods:{
            navUp(){
                Pokedex.EventBus.$emit('topScreenCloseOpen', function(){
                    Pokedex.EventBus.$emit('listItemChange', -999, true);
                });
            },
            navDown(){
                Pokedex.EventBus.$emit('topScreenCloseOpen', function(){
                    Pokedex.EventBus.$emit('listItemChange', 999, true);
                });
            },
            circleButtonHandler(type){
                this[type]();
            }
        },
        destroyed(){
            Pokedex.EventBus.$off('buttonClick', this.circleButtonHandler);
        },
        created(){
            Pokedex.EventBus.$on('buttonClick', this.circleButtonHandler);
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/modules/insets.scss";

    .bottom-screen-home{
        height: 98%;
        padding: 5px 0 5px 10px;
    }
</style>