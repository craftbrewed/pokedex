<template>
    <div class="screen top-info">
        <div v-show="pokemonChange" class="pokemonLoad"></div>

            <div class="container info--container">
                <div class="row flex">
                    <div class="col-4">
                        <poke-sprite></poke-sprite>
                    </div>
                    <div class="col-8 full-height">
                        <div class="row flex name--row">
                            <poke-name-container></poke-name-container>
                        </div>
                        <div class="row flex info--row">
                            <div class="col-3">
                                <poke-print></poke-print>
                            </div>
                            <div class="col-9 space-left">
                                <div class="row">
                                    <div class="col-12">
                                        <poke-type></poke-type>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <poke-height-weight></poke-height-weight>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <poke-description></poke-description>
        </div>

    </div>

</template>

<script type="text/babel">
    import infoBar from '../../modules/infoBar.vue';
    import pokeSprite from '../../modules/pokeSprite.vue';
    import pokeNameContainer from '../../modules/pokeNameContainer.vue';
    import pokeType from '../../modules/pokeType.vue';
    import pokeHeightWeight from '../../modules/pokeHeightWeight.vue';
    import pokePrint from '../../modules/pokePrint.vue';
    import pokeDescription from '../../modules/pokeDescription.vue';

    export default {
        data(){
            return{
                pokemon : {},
                pokemonChange: false
            }
        },

        methods:{
            normalizeLoadTransition(ms){
                return new Promise((resolve, reject) =>{
                    setTimeout(resolve, ms);
                })
            }
        },
        components: {
             pokeSprite, pokeNameContainer, pokeType, pokeHeightWeight, pokePrint, pokeDescription
        },
        created(){
            if(!this.$store.getters.currentLoaded){
                this.pokemonChange = true
            }
            Pokedex.EventBus.$on('appStart', (data) => {
                this.pokemon = data;
                this.pokemonChange = false;
            });
            Pokedex.EventBus.$on('listItemChange', ()=>{
                this.pokemonChange = true;
                this.wait = this.normalizeLoadTransition(500);
            });
            Pokedex.EventBus.$on('listItemLoad', ()=>{
                if(this.wait){
                    this.wait.then(() => {
                        this.pokemonChange = false;
                    });
                }else{
                    this.pokemonChange = false;
                }

            });
        }
    }
</script>

<style lang="scss">
    .top-screen-main-panel{
        height: 100%;
    }
    .name--row{
        height:40%;
    }
    .info--row{
        height: 60%;
        margin-top: 5px;
    }
    .info--container{
        height:50% !important;
        margin-top:6%;
        padding-top:4%;
        flex-direction: row!important;
    }
    .full-height{
        height:100%;
    }
    .space-left{
        padding-left: 9px;
    }
    .pokemonLoad{
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color: #000;
    }
</style>