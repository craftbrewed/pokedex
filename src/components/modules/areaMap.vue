<template>
    <div class="area-map img-container">

        <img src="../../assets/images/map.png">
        <template v-for="mapPiece in highlightRegions">
            <img :src="mapPieces[mapPiece.name]" class="highlight" v-show="isVisible(mapPiece.condition)">
        </template>

    </div>
</template>

<script type="text/babel">
    export default {
        data(){
            return{
                locations: [],
                mapPieces: {}
            }
        },
        computed:{
            highlightRegions(){
                //filter
                return this.locations.filter(location =>{
                    return Object.keys(this.mapPieces).filter((key) =>{
                        return location.name.indexOf(key) > -1;
                    }).length;
                });
            },
            timeOfDay(){
                return this.$store.getters.getTimeOfDay;
            }
        },
        methods:{
            loadEncounters(){
                this.$store.dispatch('getEncounter').then((encounterList) =>{
                    this.locations = encounterList.map((location) =>{
                        return {
                            name : location.name.replace(/-area|sinnoh-/g, ""),
                            condition: location.conditions
                        }
                    });
                });
            },
            isVisible(conditions){
                if(conditions.includes('universal')){
                    return true;
                }else{
                    return conditions.filter(condition => {return condition.indexOf(this.timeOfDay.toLowerCase()) > -1}).length;
                }
            }
        },
        created(){
            let _import = require.context('../../assets/images/map_places', false, /\.png$/);
            _import.keys().forEach((key) => {
                let keyname = key.split('/')[1].replace(/\.png$/, '');

                this.mapPieces[keyname] = _import(key);
            });
            if(!this.$lodash.isEmpty(this.$store.getters.current)){
                this.loadEncounters();
            }
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

    .area-map.img-container{
        height: 35vh;
        width: 100%;
        box-sizing: border-box;

    }
    .area-map.img-container img{
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        padding: 15px;
        z-index: 9998;
    }
    .area-map.img-container img:not(.highlight){
        //display: none;
    }
    .area-map.img-container .highlight{
        z-index: 9999;
        filter: hue-rotate(180deg) brightness(2);
        animation: pulse 2s linear infinite;
    }

    @keyframes pulse {
        0%{
            transform: scale(1);
            opacity: 1;
        }
        45%{
            transform: scale(1.01);
            opacity: 0;
        }
    }
</style>