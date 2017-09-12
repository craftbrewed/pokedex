<template>
    <div class="area-map img-container">

        <img src="../../assets/images/map.png">
        <template v-for="mapPiece in highlightRegions">
            <img :src="mapPieces[mapPiece.name]" class="highlight" v-show="isVisible(mapPiece.condition)">

        </template>
        <div class="map-notification" v-show="locations.length === 0 && !isLoading">
            Area Unknown
        </div>
        <div class="map-notification" v-show="isLoading">
            Loading Area Info<span class="dots">{{dots}}</span>
        </div>

    </div>
</template>

<script type="text/babel">
    export default {
        data(){
            return{
                locations: [],
                mapPieces: {},
                isLoading: true,
                dots: ".",
                interval: null
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
                this.isLoading = true;
                this.$store.dispatch('getEncounter').then((encounterList) =>{
                    this.isLoading = false;
                    this.locations = encounterList.map((location) =>{
                        let name =  location.name.replace(/-area|sinnoh-|sea-/g, "");
                        if(name.match(/(route-\d\d\d)/g)){
                            name = name.replace(/(route-\d\d\d)|[^]/g, '$1');
                        }
                        return {
                            name : name,
                            condition: location.conditions
                        }
                    });
                });
            },
            isVisible(conditions){
                if(conditions.includes('universal') || conditions.includes('radar-off')){
                    return true;
                }else{
                    return conditions.filter(condition => {return condition.indexOf(this.timeOfDay.toLowerCase()) > -1}).length;
                }
            },
           dotInterval(){
               if(this.dots.length === 3){
                   this.dots = ".";
               }else{
                   this.dots += ".";
               }
           }
        },
        destroyed(){
            clearInterval(this.interval);
            Pokedex.dispatch.$off('listItemLoad', this.loadEncounters);
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
            Pokedex.dispatch.$on('listItemChange', ()=>{
               this.isLoading = true;
            });
            Pokedex.dispatch.$on('listItemLoad', this.loadEncounters);

            clearInterval(this.interval);
            this.interval = setInterval(this.dotInterval, 1000);
        }
    }
</script>

<style lang="scss">
    @import '../../assets/styles/modules/area-map.scss';

</style>