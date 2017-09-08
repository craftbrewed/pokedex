<template>
    <div class="screen">
        <info-nav></info-nav>
        <router-view name="bottomScreenInfo"></router-view>
    </div>
</template>

<script type="text/babel">
    import infoNav from './nav.vue';
    export default {
        components:{
            infoNav
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/modules/bottom-screen-info.scss";
</style>