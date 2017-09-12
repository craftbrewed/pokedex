<template>
    <div class="screen top-area">
        <div class="container">
            <div class="row flex-center ">
                <div class="col-4">
                    <poke-sprite changeBackdrop="cry"></poke-sprite>
                </div>
                <div class="col-8">
                    <div class="spectrogram-top square-border-white">
                        <canvas></canvas>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="spectrogram-2"></div>
            </div>
        </div>
    </div>

</template>

<script type="text/babel">
    import pokeSprite from '../../modules/pokeSprite.vue';
    export default {
        components: { pokeSprite }
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/modules/top-screen-cry.scss";
</style>