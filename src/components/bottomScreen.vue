<template>
    <div class="bottom-screen">
        <div class="container">
            <insets></insets>
            <router-view class="view" name="bottomScreen"></router-view>
        </div>
    </div>
</template>

<script type="text/babel">
    import insets from './insets.vue';
    export default{
        components: {
            insets
        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/modules/insets.scss";
    @import "../assets/styles/vars/pallette.scss";
    .bottom-screen{
        background-color: $light-yellow--background;
        overflow: hidden;
        position: relative;
        height: calc(49vh);
        padding: 5px 0 5px 10px;
    }
</style>