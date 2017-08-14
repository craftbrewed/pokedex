<template>
    <div class="pokePrintCircleOuter flex-center">
        <div class="pokePrintCircleInner flex-center">
            <img class="pokePrint" v-bind:src="pokePrint">
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        data(){
            return{
                emptySprite: './pokesprites/empty.png'
            }
        },
        computed:{
            pokePrint(){
                var id = this.$store.getters.currentId,
                    image = this.emptySprite;
                if(id){
                    image = './pokesprites/'+id+'/footprint/'+id+'.png';
                }
                return image;
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/styles/vars/pallette.scss';
    $square: 70%;
    $inner-square: $square + 13%;
    .flex-center{
        align-items: center;
        justify-content: center;
        display: flex;
    }
    .pokePrintCircleOuter{
        width: 80px;
        height:80px;
        border: solid 3px $panel--pink-dark;
        border-radius: $square;
        background: $panel--pink;

    }
    .pokePrintCircleInner{
        width: $inner-square;
        height: $inner-square;
        background: $pokefont--white;
        border-radius: $inner-square;
        border: solid 3px $panel--pink-dark;
    }
    .pokePrint{
        width: 36px;
        height:auto;
    }

    @media (max-width: 700px) {
        .pokePrintCircleOuter {
            width: 55px;
            height: 55px;
        }
    }
</style>