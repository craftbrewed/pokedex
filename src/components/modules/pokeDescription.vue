<template>
    <div class="pokeDescriptionOuter flex-center">
        <div class="pokeDescriptionInner flex-center">
            <p>{{flavor_text}}</p>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        computed:{
            storeLoaded(){
                return this.$store.getters.currentLoaded;
            },
            flavor_text(){
                let response = "";
                if(this.storeLoaded){
                    response = this.$store.getters.current.flavor_text_entries.filter(entry=> {
                        return entry.language.name === 'en' && entry.version.name === 'pearl'
                    })[0].flavor_text;
                }

                return response;
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/styles/vars/pallette.scss';
    $dialog-radius: 20px;
    .pokeDescriptionOuter{
        position: relative;
        width: 97%;
        height: 34%;
        background: $panel--green;
        border: solid 3px $panel--green-dark;
        border-radius: $dialog-radius;
        margin: 0 auto;
        padding:10px 7px;
        box-sizing: border-box;
    }
    .pokeDescriptionInner{
        width: 100%;
        height: 100%;
        background: $pokefont--white;
        border: solid 3px $panel--gray;
        border-radius: $dialog-radius;
    }
    .pokeDescriptionInner p{
        font-size:35px;
        width:80%;
        white-space: normal;
    }
    @media(max-width: 700px){
        .pokeDescriptionInner p{
            font-size:20px;
            width:90%;
        }
    }
</style>