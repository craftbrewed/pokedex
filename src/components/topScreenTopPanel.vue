<template>
    <div class="row panel top-panel">
        <div class="decoration"></div>
        <div class="col-12">
            <div class="image-container">
                <span class="pokeball"></span>
                <img src="../assets/images/nationalpokedex.png">
                <span class="pokeball hang-right"></span>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        created(){
            Pokedex.dispatch.$on('closeTopPanels', () =>{
                this.$el.classList.add('closed');
            });
            Pokedex.dispatch.$on('openTopPanels', () => {
                this.$el.classList.remove('closed');
            });
        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/modules/topscreen-top-panel.scss";
</style>