<template>
    <button @click=click class="circle-button">
        <slot></slot>
    </button>
</template>

<script type="text/babel">
    export default {
        data(){
            return{

            }
        },
        methods: {
            click(){
                this.$emit('click')
            }
        },
        mounted(){

        },
        created(){
        }
    }
</script>

<style lang="scss">

</style>