<template>
    <button class="square-button">
        <slot></slot>
        <slot name="glyph"></slot>
    </button>
</template>

<script type="text/babel">
    export default {}
</script>

<style lang="scss">
    @import "../../assets/styles/modules/glyphs.scss";
    @import "../../assets/styles/modules/button.scss";
</style>