<template>
    <div class="col-8 name-container">
        <div class="pokeball-container">
            <div class="pokeball"></div>
        </div>
        <div class="row" v-if="pokeLoad">
            <p class="">
                {{self.pad(this.pokemon.currentIdx)}} {{(this.pokemon.name) ? this.pokemon.name.toUpperCase() : ''}}
            </p>
            <p>
                {{this.pokemon.genera}} Pokémon
            </p>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        data(){
            return{
                self: this,
                pokemon: {}
            }
        },
        computed: {
            pokeLoad : function(){
                return !this.$lodash.isEmpty(this.pokemon);
            }
        },
        mounted(){

        },
        created(){
            Pokedex.dispatch.$on('pokeapi-load', data => {
                this.pokemon = data;
            });
        }
    }
</script>

<style lang="scss">
    @import "../../assets/styles/modules/name-container.scss";
</style>