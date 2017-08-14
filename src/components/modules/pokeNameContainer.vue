<template>
    <div class="col-12 name-container">
        <div class="pokeball-container">
            <div class="pokeball"></div>
        </div>
        <div class="row" v-if="pokeLoad">
            <p class="">
                {{self.pad(this.pokemon.currentIdx)}} {{(this.pokemon.name) ? this.pokemon.name.toUpperCase() : ''}}
            </p>
            <p>
                {{this.pokemon.genera.filter(gen => gen.language.name == 'en')[0].genus}} Pokémon
            </p>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        data(){
            return{
                self: this
            }
        },
        computed: {
            pokemon(){
                return this.$store.state.pokemon.pokemon;
            },
            pokeLoad(){
                return !this.$lodash.isEmpty(this.pokemon);
            }
        },
        mounted(){

        },
        created(){

        }
    }
</script>

<style lang="scss">
    @import "../../assets/styles/modules/name-container.scss";
</style>