<template>
    <button class="square-button">
        <slot></slot>
        <slot name="glyph"></slot>
        <div class="indicator" v-show="indicator">
            <span class="top left"></span>
            <span class="top right"></span>
            <span class="bottom left"></span>
            <span class="bottom right"></span>
        </div>
    </button>
</template>

<script type="text/babel">
    export default {
        props: ['indicator'],
        destroyed(){

        },
        created(){

        }
    }
</script>

<style lang="scss">
    @import "../../assets/styles/modules/glyphs.scss";
    @import "../../assets/styles/modules/button.scss";
</style>