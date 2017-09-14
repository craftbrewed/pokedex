<template>
    <div class="error-modal modal-container" v-bind:class="{ 'can-close' : model.canClose, open: this.open }" >
            <div class="dialog--wrapper" >
                <div class="dialog" @click="closeModal">
                    <p class="error--title"> {{model.title}} </p>
                    <p class="error--body"> {{model.body}} </p>
                    <p class="error--status-code" v-if="model.status"> Status Code: {{model.status}}  </p>
                    <div class="container flex-center height--20">
                        <div class="row flex flex-center">
                            <div v-show="model.confirm" :class="[{'col-6' : model.canClose}, {'col-12' : !model.canClose}]">
                                <button @click="confirmClick">OK</button>
                            </div>
                            <div v-show="model.canClose" :class="[{'col-6' : model.confirm}, {'col-12' : !model.confirm}]">
                                <button @click="closeModal">Exit</button>
                            </div>

                        </div>
                    </div>
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
                    'confirm' : false
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

            },
            confirmClick(){
                this.model.onConfirm();
                this.closeModal();
            }
        },
        created(){
            Pokedex.EventBus.$on( 'setHaltState', state =>{
                this.setHaltState(state);
            });
            Pokedex.EventBus.$on( 'modalOpen', info =>{
               this.openModal(info);
            });
            Pokedex.EventBus.$on( 'modalClose', () => {
               this.closeModal();
            });
            Pokedex.EventBus.$on( 'toggleModal', info => {
                (this.open) ? this.closeModal() : this.openModal(info);
            });

        }
    }
</script>

<style lang="scss">
    @import "./../../assets/styles/modules/modal.scss";
</style>