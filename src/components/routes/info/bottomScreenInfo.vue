<template>
    <div class="screen bottom-info">
        <div class="inset square info left top"></div>
        <div class="inset square info left bottom"></div>
        <div class="inset square info right top"></div>
        <div class="inset square info right bottom"></div>
        <div class="button-container">
            <square-button clickEvent="cycleUp">
                <span class="button-text"><span class="arrow up">&#10145;</span>BACK</span>
            </square-button>

            <square-button clickEvent="cycleDown">
                <span class="button-text">NEXT<span class="arrow down">&#10145;</span></span>
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
                Pokedex.dispatch.$emit('listItemChange', -1);
            },
            cycleDown(){
                Pokedex.dispatch.$emit('listItemChange', 1);
            }
        },
        destroyed(){
            Pokedex.dispatch.$off('buttonClick');
        },
        created(){
            Pokedex.dispatch.$on('buttonClick', (evt) =>{
                this[evt]();
            })
        }
    }
</script>

<style lang="scss">
</style>