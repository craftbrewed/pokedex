<template>
    <div class="error-modal modal-container" v-bind:class="{ 'can-close' : model.canClose, open: this.open }" >
            <div class="dialog--wrapper" >
                <div class="dialog">
                    <p class="error--title"> {{model.title}} </p>
                    <p class="error--body"> {{model.body}} </p>
                    <p class="error--status-code" v-if="model.status"> Status Code: {{model.status}}  </p>
                    <div class="container bring-to-bottom height--5vh">
                        <div class="row">
                            <div class="col-3">
                                <p>github</p>
                            </div>
                            <div class="col-6">
                                <p class="error--contact-info"> {{model.email}} </p>
                            </div>
                            <div class="col-3">
                                <p class="error--pokedex-version"> Version No. {{model.version}} </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    </div>
</template>

<script type="text/babel">
    export default {
        data(){
            return {
                open : false,
                modelDefaults : {
                    'title' : "Oh god, a generic error.",
                    'body'  : "This means we have no clue what went wrong...",
                    'version' : "0.1",
                    'email' : "contact@craftbrewed.io",
                    'canClose' : true,
                },
                model : {}
            }
        },
        methods: {
            setHaltState(state){
                if(state){
                    this.$el.classList.add('halt', 'animate');
                }else{
                    this.$el.classList.remove('halt', 'animate');
                    this.closeModal();
                }
            },
            openModal(data){
                if(!this.open){
                    this.model = this.$lodash.extend(this.modelDefaults, data);
                    this.$el.classList.add('open');
                    setTimeout(() => {
                        this.$el.classList.add('animate');
                    }, 1);
                    this.open = true;
                }

            },
            closeModal(){
                if(this.open){
                    this.$el.classList.remove('open', 'animate', 'halt');
                    this.model = {};
                    this.open = false;
                }

            }
        },
        created(){
            Pokedex.dispatch.$on( 'setHaltState', state =>{
                this.setHaltState(state);
            });
            Pokedex.dispatch.$on( 'modalOpen', info =>{
               this.openModal(info);
            });
            Pokedex.dispatch.$on( 'modalClose', () => {
               this.closeModal();
            });
            Pokedex.dispatch.$on( 'toggleModal',  info => {
                (this.open) ? this.closeModal() : this.openModal(info);
            });

        }
    }
</script>

<style lang="scss">
    @import "./../../assets/styles/modules/modal.scss";
</style>