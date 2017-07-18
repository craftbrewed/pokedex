<template>
    <div class="row bottom-panel panel">
        <div class="decoration"></div>
        <div class="col-3">
            <h2>SEEN</h2>
            <h2 class="text-right">{{ this.pad( seen ) }}</h2>
        </div>
        <div class="col-3"></div>
        <div class="col-3">
            <h2>OBTAINED</h2>
            <h2 class="text-right">{{ this.pad( obtained ) }}</h2>
        </div>
        <div class="col-3"></div>
    </div>
</template>

<script type="text/babel">
    export default {
        data(){
            return{
                seen: 0,
                obtained: 0
            }
        },
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
    @import "./../../../assets/styles/vars/pallette.scss";
    @import "./../../../assets/styles/vars/backgrounds.scss";

    .bottom-panel{
        border-top: solid 2px $panel--border;
        position: absolute !important;
        bottom:0;
        left: 0;
        z-index: 99999;
        transition: all 250ms ease-out;
        height:23%
    }
    .bottom-panel.closed{
        height: 40%;
    }
    .bottom-panel .decoration{
        position: absolute;
        width: 100%;
        height: 25px;
        top:0;
        left:0;
    }
    .bottom-panel .decoration::before{
        position: absolute;
        content: ' ';
        width: 10px;
        height:10px;
        background-color: $panel--dark;
        left: 5px;
        bottom:7px;
    }
    .bottom-panel .decoration::after{
        position: absolute;
        content: ' ';
        width: 10px;
        height:10px;
        background-color: $panel--dark;
        right: 10px;
        bottom:7px;
    }
    .bottom-panel{
        padding: 0 25px;
        color: $pokeball-white;
        font-weight: normal;
        text-shadow: 1px 1px 2px black;
        font-size: 20px;
        letter-spacing: 1px;
    }
    .bottom-panel h2{
        margin: 10px 0;
    }
</style>