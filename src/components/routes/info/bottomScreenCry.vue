<template>
    <div class="screen bottom-cry">
        <div class="container">
            <div class="row full-height">
                <div class="col-5 text-center">
                    <div class="decoration--column"></div>
                    <div class="slider--container">
                        <div class=slider--container-inner>
                            <div @mousedown="slider" @touchstart="slider" class="audio-glyph slider center"></div>
                        </div>
                        <h2 class="slider--label">CHORUS</h2>

                    </div>
                <div class="bottom-decoration">
                    <div class="panner--container">
                        <div class="audio-glyph panner" @mousedown="panner" @touchstart="panner"></div>
                    </div>
                </div>

                </div>
                <div class="col-7 full-height">
                        <div class="big-pokeball">
                            <div class="red-half"></div>
                            <div class="pokeball-inner"></div>
                            <circle-button><div class="html-glyph">&#9654;</div></circle-button>
                        </div>
                </div>
            </div>
        </div>
        <audio id="cryElement" :src="pokeCry" v-show="false"></audio>
    </div>
</template>

<script type="text/babel">
    import circleButton from "../../buttons/circleButton.vue";
    export default {
        components: { circleButton },
        data(){
            return{
                sliderEl : null,
                pannerEl : null,
                sliderBox: null,
                isSliding: false,
                slideX: 0,
                isPanning: false,
                panY: 0,
                lastRotate: 0,
                animationFrame: null,
                sliderStates: ['left--3', 'left--2', 'left--1', 'center', 'right--1', 'right--2', 'right--3'],
                sliderIdx: 3
            }
        },
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
            slide(direction){
                this.animateSlider(Date.now(), direction);
            },
            slider(evt){
                this.isSliding = true;
                this.slideX = this.sliderBox.left+(this.sliderBox.width/2);
            },
            sliderMove(evt){
                if(this.isSliding){

                    let x = (evt.touches) ? evt.touches[0].pageX : evt.pageX;
                    if(Math.abs(x - this.slideX) > 6){
                        if(x > this.slideX){
                            this.slide(1);
                        }else if(x < this.slideX){
                            this.slide(-1);
                        }
                        this.slideX = x;
                    }
                }
            },
            sliderCancel(){
                this.isSliding = false;
                cancelAnimationFrame(this.animationFrame);
            },
            animateSlider(countStart, direction){
                this.animationFrame = requestAnimationFrame(()=>{

                    let delta = Date.now() - countStart;
                    if(delta > 50){
                        this.stepSlider(direction);
                        countStart = Date.now();
                        return;
                    }
                    this.animateSlider(countStart, direction);
                });
            },
            stepSlider(direction){
                let nextIdx = this.sliderIdx + direction;
                if(nextIdx > 0 && nextIdx < this.sliderStates.length-1){
                    this.sliderEl.classList.remove(this.sliderStates[this.sliderIdx]);
                    this.sliderIdx = nextIdx;
                    this.sliderEl.classList.add(this.sliderStates[this.sliderIdx]);
                }
                cancelAnimationFrame(this.animationFrame);
            },
            panner(evt){
                this.isPanning = true;
                this.lastPanY = (evt.touches) ? evt.touches[0].pageY : evt.pageY;
            },
            pannerMove(evt){
                if(this.isPanning){
                    let nextY = (evt.touches) ? evt.touches[0].pageY : evt.pageY,
                            delta = (nextY - this.lastPanY),
                            lastSpin = window.getComputedStyle(this.pannerEl).transform;
                    delta += this.lastRotate;
                    delta = delta % 360;
                    if(Math.abs(delta) < 120){
                        this.pannerEl.style.transform = "rotate("+delta+"deg)";
                    }
                }

            },
            pannerCancel(){
                this.isPanning = false;
                this.lastRotate = parseInt(this.pannerEl.style.transform.match(/-?\d+/g), 10);
                if(isNaN(this.lastRotate)){
                    this.lastRotate = 0;
                }
            },
            moveHandler(evt){
                this.sliderMove(evt);
                this.pannerMove(evt);
            },
            endHandler(){
                this.sliderCancel();
                this.pannerCancel();
            }
        },
        destroyed(){
            document.body.removeEventListener('mousemove', this.sliderMove);
            document.body.removeEventListener('mouseup', this.sliderCancel);
        },
        mounted(){
            this.sliderEl = this.$el.querySelector('.audio-glyph.slider');
            this.sliderBox = this.sliderEl.getBoundingClientRect();
            this.pannerEl = this.$el.querySelector('.audio-glyph.panner');
            let pannerBox = this.pannerEl.getBoundingClientRect(),
                panCenterX = (pannerBox.width/2),
                panCenterY = (pannerBox.height/2);

            this.pannerEl.style.transformOrigin = panCenterX+"px "+panCenterY+"px";


            document.body.addEventListener('mousemove', this.moveHandler);
            document.body.addEventListener('touchmove', this.moveHandler);
            document.body.addEventListener('mouseup', this.endHandler);
            document.body.addEventListener('touchend', this.endHandler);
        },
        created(){
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/modules/big-pokeball.scss";
    @import "../../../assets/styles/modules/bottom-screen-cry.scss";

</style>