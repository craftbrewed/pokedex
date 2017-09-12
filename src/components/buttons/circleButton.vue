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
                console.log("click");
                Pokedex.dispatch.$emit('buttonClick');
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