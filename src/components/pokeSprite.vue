<template>
    <div class="col-4">
        <div class="sprite">
            <img v-bind:src="currentPokemonSprite">
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        data(){
            return{
                currentPokemonSprite: ''
            }
        },
        methods: {
            updateSprite(){
                console.log("Sprite detects list change");
            }
        },
        created(){
            Pokedex.dispatch.$on('pokemonUpdated', obj => {
                this.currentPokemonSprite = obj.sprite;
            });
        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/vars/pallette.scss";
    @import "../assets/styles/vars/backgrounds.scss";

    .sprite{
        position: relative;
        border: solid 4px $selector--yellow;
        width: 80%;
        margin:0 auto;
        max-width: 170px;
        border-radius: 10px;
        box-shadow: 0 0 10px 2px $selector--shadow;
        background: $sprite--image-bg;
    }
    .sprite:before{
        content: "";
        display: block;
        padding-top: 100%; 	/* initial ratio of 1:1*/
    }
    .sprite:after{
        content: " ";
        position: absolute;
        top:0;left:0;right:0;bottom:0;
        border: 5px solid $selector--blue;
        border-radius: 10px;
    }
    .sprite img{
        position: absolute;
        top:0;bottom:0;right:0;left:0;
        margin:auto;
        width:95%;
    }
</style>