<template>
    <div class="row panel top-panel">
        <div class="decoration"></div>
            <div class="image-container">
                <span class="pokeball"></span>
                <img src="../../../assets/images/nationalpokedex.png">
                <span class="pokeball hang-right"></span>
            </div>
    </div>
</template>

<script type="text/babel">
    export default {
        created(){
            this.transitionEndListener = function(e){
                Pokedex.EventBus.$emit('panelsClosed');
            };
            Pokedex.EventBus.$on('closeTopPanels', () =>{
                this.$el.addEventListener(this.transEndEvt, this.transitionEndListener);
                this.$el.classList.add('closed');
            });
            Pokedex.EventBus.$on('openTopPanels', () => {
                this.$el.removeEventListener(this.transEndEvt, this.transitionEndListener);
                this.$el.classList.remove('closed');

            });
        }
    }
</script>

<style lang="scss">
    @import "./../../../assets/styles/modules/topscreen-top-panel.scss";
</style>