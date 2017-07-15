<template>
    <div class="col-4">
        <div class="sprite">
            <img id="image" v-bind:src="currentPokemonSprite">
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
            updateSprite(sprite){
                this.currentPokemonSprite = sprite;
            },
            ajaxSprite(){
                var src = this.currentPokemonSprite;
                this.axios.get(src)
                        .then( img => {
                            this.updateSprite(img);
                        })
                        .catch(err => {
                            this.errorHandle.pokeApiError("GET", src, err, this.ajaxSprite);
                        });
            }
        },
        mounted(){
            this.image = this.$el.querySelector("#image");
            /*
            Explanation for this insanity:
                In the quest for handling errors evenly, if changing the source of an image trows a 404,
                 we make a ajax request to get more info about it.
                If the ajax request can load the image, then it's taken care of, if it doesn't we pass
                 a proper error object to the errorHandle module
             */
            this.image.addEventListener('error', (err) => {
                var imgSrc = err.srcElement.src;
                console.log(imgSrc);
                this.ajaxSprite(imgSrc);
            });
        },
        created(){
            Pokedex.dispatch.$on('pokemonSpriteUpdate', sprite => {
                this.updateSprite(sprite);
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