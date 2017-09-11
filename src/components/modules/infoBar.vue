<template>
    <div class="info-bar panel color--blue">
        <h1>{{currentPanel}}</h1>
    </div>
</template>

<script type="text/babel">
    export default {
        computed:{
            currentPanel(){
                let paths = this.$route.path.split("/");
                return paths[paths.length-1].toUpperCase();
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/styles/vars/pallette.scss";
    @import "../../assets/styles/mixin/stroke.scss";
    .info-bar{
        width: 100%;
        height: 10%;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        z-index: 999;
    }
    .info-bar h1{
        position:relative;
        color: $pokeball-white;
        font-weight: bold;
        text-shadow: -2px -2px 0 $pokefont--white-textshadow;
        font-size:32px;
        margin:0 0 0 1em;

        line-height: 1.5;
    }
    .info-bar h1:before {
        content: "\25BC";
        font-size: 23px;
        position: absolute;
        left: -1.2em;
        top: 50%;
        transform: translateY(-50%);
        @include stroke(3, $panel--blue-dark);
    }
    @media (max-width: 700px) {
        .info-bar h1 {
            font-size: 32px * 0.7;
        }

        .info-bar h1:before {
            font-size: 32px * 0.52;

        }
    }

</style>