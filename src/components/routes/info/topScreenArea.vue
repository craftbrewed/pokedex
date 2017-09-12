<template>
    <div class="screen top-area">
        <div class="container">
            <insets></insets>
            <div class="row flex-center ">
                <div class="col-4">
                    <h1 class="time-of-day-label">{{timeOfDay}}</h1>
                    <poke-sprite overrideBackdrop="pokeball-area"></poke-sprite>
                </div>
                <div class="col-8">
                    <area-map></area-map>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import areaMap from "../../modules/areaMap.vue";
    import pokeSprite from "../../modules/pokeSprite.vue";
    import insets from '../home/insets.vue';
    export default {
        data(){
            return{
                locations: []
            }
        },
        components: {
            areaMap,pokeSprite, insets
        },
        computed:{
            timeOfDay(){
                return this.$store.getters.getTimeOfDay;
            }
        },
        methods:{
            loadEncounters(){
                console.log('requesting encounter list');
                this.$store.dispatch('getEncounter').then((encounterList) =>{
                    console.log('enounter list loaded', encounterList);
                    this.locations = encounterList;
                });
            }
        },
        created(){

            Pokedex.dispatch.$on('appStart', () =>{
               this.loadEncounters();
            });
            Pokedex.dispatch.$on('listItemLoad', ()=>{
               this.loadEncounters();
            })
        }
    }
</script>

<style lang="scss">
@import "../../../assets/styles/modules/top-screen-area.scss";
</style>