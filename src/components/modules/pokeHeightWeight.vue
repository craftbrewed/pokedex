<template>
    <div class="pokeHeightWeight">
        <div class="row">
            <div class="col-4"><p>HT</p></div>
            <div class="col-6"><p>{{height}}</p></div>
        </div>
        <div class="row">
            <div class="col-4"><p>WT</p></div>
            <div class="col-6"><p>{{weight}}</p></div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        computed:{
            height(){
                var h = (this.$store.getters.current.height / 10) * 3.28084,
                    feet = Math.floor(h),
                    inches = Math.round((h-feet)*12);

                return feet+"'" + this.pad(inches,2)+"\"";
            },
            weight(){
                return  ((this.$store.getters.current.weight/10) * 2.20462).toFixed(1);
            }
        }
    }
</script>

<style lang="scss">
    .pokeHeightWeight p{
        font-size: 30px;
        margin: 0 0 0 5px;
        line-height: 1.3;;
    }
    @media (max-width: 700px){
        .pokeHeightWeight p{
            font-size: 25px;
        }
    }
</style>