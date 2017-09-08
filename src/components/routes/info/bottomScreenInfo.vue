<template>
    <div class="screen bottom-info">
        <div class="inset square info left top"></div>
        <div class="inset square info left bottom"></div>
        <div class="inset square info right top"></div>
        <div class="inset square info right bottom"></div>
        <div class="button-container">
            <square-button>
                <span class="button-text"><span class="arrow up">&#10145;</span>BACK</span>
            </square-button>

            <square-button @click="cycleDown">
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
                console.log("up");
            },
            cycleDown(){
                console.log("down");
            }
        }
    }
</script>

<style lang="scss">
</style>