<template>
    <div class="bottom-screen">
        <div class="container">
            <router-view class="view" name="bottomScreen"></router-view>
        </div>
    </div>
</template>

<script type="text/babel">
    export default{
        components: {
        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/vars/pallette.scss";
    .bottom-screen{
        background-color: $light-yellow--background;
        overflow: hidden;
        position: relative;
        height: calc(49vh);
    }
</style>