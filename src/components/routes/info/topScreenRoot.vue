<template>
    <div class="screen">
        <info-bar></info-bar>
        <router-view name="topScreenInfo"></router-view>
    </div>
</template>

<script type="text/babel">
    import infoBar from "../../modules/infoBar.vue";
    export default {
        components: {
            infoBar
        }
    }
</script>

<style lang="scss">

</style>