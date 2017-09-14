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
                this.spinInterval = setInterval(() => {
                    if(count>0 && this.spinning){
                        clearInterval(this.spinInterval);
                        count--;
                        this.spinVars.rotated= this.spinVars.rotated+(v * (count/10000));
                        this.rotatePokeball(this.spinVars.rotated);
                        this.emitChange();
                        this.spinAtVelocity(v, count);
                    }else{
                        this.spinning = false;
                        clearInterval(this.spinInterval);
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
            Pokedex.EventBus.$on('listItemChange', (by, noSpin) =>{
                if(!noSpin && (this.spinning === false || this.spinVars.pointerDown === false)){
                    this.rotatePokeball(by + this.spinVars.lastSpinDelta);
                }
            });
            Pokedex.EventBus.$on('cancelSpin', ()=>{
                this.spinning = false;
                clearInterval(this.spinInterval);
            });
            this.emitChange = this.$lodash.throttle(() => {
                if(this.spinVars.lastSpinDirection >= 0){
                    Pokedex.EventBus.$emit('listItemChange', 1);
                }else{
                    Pokedex.EventBus.$emit('listItemChange', -1);
                }

            }, 50);
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/modules/big-pokeball.scss";

</style>