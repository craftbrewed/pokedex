<template>
    <div class="screen bottom-cry">
        <div class="container">
            <div class="row">
                <div class="col-4"></div>
                <div class="col-8 ">
                    <div class="flex">
                        <div class="big-pokeball">
                            <div class="red-half"></div>
                            <div class="pokeball-inner"></div>
                            <circle-button><div class="html-glyph">&#9654;</div></circle-button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <audio id="cryElement" :src="pokeCry" v-show="false"></audio>
    </div>
</template>

<script type="text/babel">
    import circleButton from "../../buttons/circleButton.vue";
    export default {
        components: { circleButton },
        data(){
            return{
                audioElement: null
            }
        },
        computed:{
            pokeCry(){
                let id = this.$store.getters.currentId,
                    name = this.$store.getters.current.name,
                    sound = '';

                if(id){
                    sound =  './pokesprites/'+id+'/cries/'+name+'.wav';
                }

                return sound;
            }
        },
        methods:{
            playSound(){
               // this.audioElement.play();
            }
        },
        destroyed(){
            console.log("destroyed");
            Pokedex.EventBus.$off('buttonClick', this.playSound);
        },
        mounted(){
            this.audioElement = this.$el.querySelector("#cryElement");

        },
        created(){
            console.log("created");
            Pokedex.EventBus.$on('buttonClick', this.playSound);
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/modules/big-pokeball.scss";
    @import "../../../assets/styles/modules/bottom-screen-cry.scss";

</style>