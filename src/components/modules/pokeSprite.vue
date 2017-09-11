<template>
        <div class="sprite" :class="[{'no-back-drop' : overrideBackdrop}, overrideBackdrop]">
            <img id="image" v-bind:src="currentPokemonSprite">
        </div>
</template>

<script type="text/babel">
    export default {
        data(){
            return{
                emptySprite: './pokesprites/empty.png'
            }
        },
        props: ['overrideBackdrop'],
        methods: {
            ajaxSprite(){
                var src = this.currentPokemonSprite;
                this.axios.get(src).catch(err => {
                    this.$el.querySelector('#image').src = this.emptySprite;
                    this.errorHandle.exception('unhandled', err, null);
                });
            }
        },
        computed:{
            currentPokemonSprite(){
                var id = this.$store.getters.currentId,
                    image = this.emptySprite;

                if(id){
                    image =  './pokesprites/'+id+'/front_default/'+id+'.png';
                }

                return image;
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

                this.ajaxSprite(imgSrc);
            });
        }
    }
</script>

<style lang="scss">
    @import "../../assets/styles/modules/pokeSprite.scss";
</style>