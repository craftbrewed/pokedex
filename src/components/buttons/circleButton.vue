<template>
    <button @click=click class="circle-button">
        <slot></slot>
    </button>
</template>

<script type="text/babel">
    export default {
        props: ['type'],
        data(){
            return{

            }
        },
        methods: {
            click(){
                Pokedex.EventBus.$emit('buttonClick', this.$props.type);
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