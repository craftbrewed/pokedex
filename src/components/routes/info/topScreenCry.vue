<template>
    <div class="screen top-area">
        <div class="container">
            <div class="row flex-center ">
                <div class="col-4">
                    <poke-sprite changeBackdrop="cry"></poke-sprite>
                </div>
                <div class="col-8">
                    <div class="spectrogram-top square-border-white">
                        <canvas></canvas>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="spectrogram-2"></div>
            </div>
        </div>
    </div>

</template>

<script type="text/babel">
    import pokeSprite from '../../modules/pokeSprite.vue';
    export default {
        data(){
            return{
                waveSurfer: null,
                waveConfig:{
                    container: ".spectrogram-2",
                    waveColor: '#29debd',
                    progressColor: '#29debd',
                    cursorColor: 'transparent',
                    hideScrollbar: true,
                    height: 130
                },
                barSurfer: null,
                barConfig:{
                    container: ".spectrogram-top",
                    waveColor: '#29debd',
                    progressColor: '#29debd',
                    cursorColor: 'transparent',
                    hideScrollbar: true,
                    height: 130,
                    barWidth: 2
                }
            }
        },
        components: { pokeSprite },
        computed:{
            pokeCry(){
                let id = this.$store.getters.currentId,
                        name = this.$store.getters.current.name,
                        sound = '';

                if(id){
                    sound =  './pokesprites/'+id+'/cries/'+name+'.wav';
                }

                return sound;
            }
        },
        methods:{
            audioPlay(){
                this.waveSurfer.play();
            }
        },

        mounted(){
            this.$nextTick(()=>{
                this.waveSurfer = this.$WaveSurver.create(this.waveConfig);

                this.waveSurfer.load(this.pokeCry);
                this.waveSurfer.on('play', e =>{
                    this.waveSurfer.mediaContainer.querySelector('wave').classList.add('playMove');
                });
                this.$el.querySelector('.spectrogram-2 wave').addEventListener('transitionend', (e) =>{
                    e.target.classList.add('finished');
                   setTimeout(()=>{
                        e.target.classList.remove('playMove', 'finished');
                    }, 10);
                });
            });


        },
        destroyed(){
            Pokedex.dispatch.$off('buttonClick', this.audioPlay);
        },
        watch:{
            'pokeCry' (){

            }
        },
        created(){
            Pokedex.dispatch.$on('buttonClick', this.audioPlay);
        }

    }
</script>

<style lang="scss">
    @import "../../../assets/styles/modules/top-screen-cry.scss";
</style>