<template>
    <nav class="info">
        <div class="column-left">
            <router-link to="/info">

                <square-button indicator="1" :class="{selected : selected === 'info' }">
                    <span class="button-text">info</span>
                </square-button>
            </router-link>
            <router-link to="/info/area">
                <square-button indicator="1" :class="{selected : selected === 'area' }">
                    <span class="button-text">area</span>
                </square-button>
            </router-link>
            <router-link to="/info/cry">
                <square-button indicator="1" :class="{selected : selected === 'cry' }">
                    <span class="button-text">cry</span>
                </square-button>
            </router-link>
            <router-link to="/info/size">
                <square-button indicator="1" :class="{selected : selected === 'size' }">
                    <span class="button-text">size</span>
                </square-button>
            </router-link>
        </div>
        <div class="column-right">
            <router-link to="/" class="align-right">
                <square-button indicator="1" class="glyph">
                    <span slot="glyph" class="button-glyph back" ></span>
                </square-button>
            </router-link>
        </div>
    </nav>
</template>

<script type="text/babel">
    import squareButton from "../../buttons/squareButton.vue";
    export default {
        components:{ squareButton },
        data(){
            return{}
        },
        computed:{
            selected(){
                let path = this.$route.path.split('/');
                return path[path.length-1]
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/modules/info-nav.scss";
</style>