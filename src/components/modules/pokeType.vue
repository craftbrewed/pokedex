<template>
    <div class="pokeType">
        <div class="row">
            <div class="col-5"><span class="type" v-bind:class="slotOne"></span> </div>
            <div class="col-5"><span v-if="slotTwo" class="type" v-bind:class="slotTwo"></span></div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        computed:{
            typeArray(){
                return this.$store.getters.current.types;
            },
            slotOne(){
                return 'type-'+this.typeArray[0].type.name;
            },
            slotTwo(){
                return (this.typeArray[1]) ? 'type-'+this.typeArray[1].type.name : null;
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/styles/modules/types.scss';
</style>