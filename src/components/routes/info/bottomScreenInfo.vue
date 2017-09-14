<template>
    <div class="screen bottom-info">
        <div class="inset square info left top"></div>
        <div class="inset square info left bottom"></div>
        <div class="inset square info right top"></div>
        <div class="inset square info right bottom"></div>
        <div class="button-container">
            <square-button clickEvent="cycleUp">
                <span class="button-text"> <i class="fa fa-arrow-up" aria-hidden="true"></i> BACK</span>
            </square-button>

            <square-button clickEvent="cycleDown">
                <span class="button-text">NEXT<i class="fa fa-arrow-down" aria-hidden="true"></i></span>
            </square-button>
        </div>

    </div>
</template>

<script type="text/babel">
    import squareButton from "../../buttons/squareButton.vue";
    export default {
        components: {
            squareButton
        },
        methods:{
            cycleUp(){
                Pokedex.EventBus.$emit('listItemChange', -1);
            },
            cycleDown(){
                Pokedex.EventBus.$emit('listItemChange', 1);
            },
            buttonClick(evt){
                this[evt]();
            }
        },
        destroyed(){
            Pokedex.EventBus.$off('buttonClick', this.buttonClick);
        },
        created(){
            Pokedex.EventBus.$on('buttonClick', this.buttonClick)
        }
    }
</script>

<style lang="scss">
</style>