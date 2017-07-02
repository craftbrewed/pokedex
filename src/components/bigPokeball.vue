<template>
    <div @mousedown="pointerDown"
         @mouseup="pointerUp"
         @mousemove="move"
         @mouseout="pointerOut"
         @touchmove="move"
         @touchstart="pointerDown"
         @touchend="pointerUp"
     class="big-pokeball">
        <div class="red-half"></div>
        <div class="pokeball-inner"></div>
    </div>
</template>

<script type="text/babel">
    export default {

        methods: {
            rotatePokeball(delta){
                delta = delta%360;

                this.spinVars.lastSpinDirection = delta - this.spinVars.lastSpinDelta;
                this.spinVars.lastSpinDelta = delta;
                this.$el.style.transform = "rotate( "+delta+"deg )";
                this.spinVars.rotated = delta;
            },
            spinAtVelocity(v, count){
                var a = setInterval(() => {
                    if(count>0 && this.spinning){
                        clearInterval(a);
                        count--;
                        this.spinVars.rotated= this.spinVars.rotated+(v * (count/10000));
                        this.rotatePokeball(this.spinVars.rotated);
                        this.emitChange();
                        this.spinAtVelocity(v, count);
                    }else{
                        this.spinnign = false;
                        clearInterval(a);
                    }
                }, 100/count*2);
            },
            calculateSpinMomentum(y){
                this.spinVars.pointerDown = false;
                var spinTime = 50/(+new Date()-this.spinVars.timeStart);

                //longer distance, shorter spinTime = more momentum
                var velocity = Math.floor(Math.pow(Math.abs(this.spinVars.realDeltaY), spinTime));
                if(velocity > 1){
                    this.spinning = true;
                    velocity = (velocity*15 > 350) ? 350 : velocity * 15;
                    velocity = (this.spinVars.realDeltaY > 0) ? velocity : velocity*-1;
                    this.spinAtVelocity(velocity, Math.abs(velocity) );
                }
            },
            setTouchEvent(touches){
                if(touches){
                    this.touch = true;
                }
                if(!touches && this.touch === true){
                    this.touch = false;
                }

            },
            //events
            pointerDown(e){
                this.setTouchEvent(e.touches);

                if(!e.touches && this.touch){
                    return;
                }
                this.spinning = false;
                var y = (this.touch) ? e.touches[0].clientY : e.y;

                this.spinVars.mouseDownY = y+this.spinVars.rotated;
                this.spinVars.touchLastMove = y;
                this.spinVars.mouseDownReal = y;
                this.spinVars.pointerDown = true;
                this.spinVars.timeStart = +new Date();
            },
            pointerUp(e){
                if(!e.touches && this.touch){
                    return;
                }

                var y = (this.touch) ? this.spinVars.touchLastMove : e.y;

                this.spinVars.realDeltaY = -( y - this.spinVars.mouseDownReal);
                if(this.spinVars.pointerDown){
                    this.calculateSpinMomentum();
                }
            },
            pointerOut(e){
                if(this.spinVars.pointerDown){
                    this.calculateSpinMomentum();
                }
            },
            move(e){
                if(!e.touches && this.touch){
                    return;
                }
                var y = (this.touch) ? e.touches[0].clientY : e.y;
                this.spinVars.touchLastMove = y;
                if(this.spinVars.pointerDown){
                    this.spinVars.deltaY = -( y - this.spinVars.mouseDownY );
                    this.rotatePokeball(this.spinVars.deltaY);
                    this.emitChange();
                }
            }
        },
        created(){
            this.touch = false;
            this.spinning = false;
            this.spinVars = {
                pointerDown: false,
                deltaY: 0,
                timeStart: null,
                mouseDownY: null,
                movement: 0,
                rotated: 0,
                realDeltaY : 0,
                touchLastMove: 0,
                lastSpinDelta: 0,
                lastSpinDirection: 0
            };
            Pokedex.dispatch.$on('listItemChange', (by) =>{
                if(this.spinning === false || this.spinVars.pointerDown === false){
                    this.rotatePokeball(by + this.spinVars.lastSpinDelta);
                }
            });

            this.emitChange = this.$lodash.throttle(() => {
                if(this.spinVars.lastSpinDirection >= 0){
                    Pokedex.dispatch.$emit('listItemChange', 1);
                }else{
                    Pokedex.dispatch.$emit('listItemChange', -1);
                }

            }, 50);
        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/vars/pallette.scss";
    $poke-height: calc( 100% - 26px);
    $border-width: 10px;
    $border-half: $border-width / 2;

    .big-pokeball {
        height: 50vh;
        width: 50vh;
        border-radius: 50%;
        border: solid $border-width #907850;
        position: absolute;
        top: -1.5vh;
        overflow: hidden;
        background-color: $pokeball-white;
        z-index: 9999;
    }
    .big-pokeball:before{
        position: absolute;
        content: '';
        height:calc(50% - #{$border-width + $border-half});
        width:100%;
        //background-color: $pokeball--red;
        border-bottom: solid $border-width  #907850;
        top:10px
    }
    .big-pokeball .red-half{
        position: absolute;
        background-color: $pokeball--red;
        height:calc(50% + #{$border-half} );
        width: calc(100% + #{$border-half} );
        left: -3px;
        border-radius: calc(100%) calc(100%) 0 0;
        z-index: -1;
    }
    .big-pokeball .pokeball-inner{
        background-color: $pokeball-white;
        height: calc( 25% );
        width: floor( 25% );
        border-radius: 50%;
        position:absolute;
        top:0;right:0;left:0;bottom: 0;
        margin: auto;
        border: solid $border-width  #907850;
        pointer-events: none;
    }
    .pokeball-inner:after{
        content: '';
        position: absolute;
        top:0;right:0;left:0;bottom: 0;
        width: 50%;
        height:50%;
        margin: auto;
        border-radius: 50%;
        background-color: $pokeball--border;
    }
    @media(max-width:600px){
        .big-pokeball{
            top: 1vh;
            width: 45vh;
            height: 45vh;
        }
    }

</style>