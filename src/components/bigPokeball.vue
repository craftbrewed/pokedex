<template>
    <div class="big-pokeball">
        <div class="red-half"></div>
        <div class="pokeball-inner"></div>
    </div>
</template>

<script type="text/babel">
    export default {}
</script>

<style lang="scss">
    @import "../assets/styles/vars/pallette.scss";
    $poke-height: calc( 100% - 26px);
    $border-width: 10px;
    $border-half: $border-width / 2;

    .big-pokeball {
        height: 50vh;
        width: 50vh;
        border-radius: 50%;
        border: solid $border-width #907850;
        position: absolute;
        top: -1vh;
        overflow: hidden;
        background-color: $pokeball-white;
        z-index: 9999;
        animation: testRotate .5s linear infinite;
    }
    @keyframes testRotate{
        0%{
            transform: rotate(0deg)
        }
        100%{
            transform: rotate(360deg)
        }
    }
    .big-pokeball:before{
        position: absolute;
        content: '';
        height:calc(50% - #{$border-width});
        width:100%;
        //background-color: $pokeball--red;
        border-bottom: solid $border-width  #907850;
        top:10px
    }
    .big-pokeball .red-half{
        position: absolute;
        background-color: $pokeball--red;
        height:calc(50% + #{$border-half} );
        width: calc(100% + #{$border-half} );
        left: -3px;
        border-radius: calc(100%) calc(100%) 0 0;
        z-index: -1;
    }
    .big-pokeball .pokeball-inner{
        background-color: $pokeball-white;
        height: calc( 25% );
        width: floor( 25% );
        border-radius: 50%;
        position:absolute;
        top:0;right:0;left:0;bottom: 0;
        margin: auto;
        border: solid $border-width  #907850;
    }
    .pokeball-inner:after{
        content: '';
        position: absolute;
        top:0;right:0;left:0;bottom: 0;
        width: 50%;
        height:50%;
        margin: auto;
        border-radius: 50%;
        background-color: $pokeball--border;
    }

</style>