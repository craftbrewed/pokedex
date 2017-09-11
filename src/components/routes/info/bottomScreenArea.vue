<template>
    <div class="screen bottom-area"
         @touchmove="drag" @mousemove="drag" @touchend="exit"  @mouseup="exit"
    >
        <div class="image-container">
            <img  draggable="false"  src="../../../assets/images/morning.png" :class="{show : (timeOfDay==='Morning') }">
            <img  draggable="false"  src="../../../assets/images/day.png"     :class="{show : (timeOfDay==='Day') }">
            <img  draggable="false"  src="../../../assets/images/night.png"   :class="{show : (timeOfDay==='Night') }">
        </div>

        <div class="drag-item day-night day"
             @touchstart="enter" @mousedown="enter"
        ></div>
    </div>
</template>

<script type="text/babel">
    export default {
        data(){
            return{
                dragging: false,
                dragEl: null,
                parentRect: null,
                elementRect: null,
                navRect: null,
                currentX: null,
                currentY: null
            }
        },
        computed:{
            timeOfDay(){
                return this.$store.getters.getTimeOfDay;
            }
        },
        methods:{
            checkCollision(x, y){
                let hitBox1 = {
                        x: x,
                        y: y,
                        radius: this.elementRect.width/2
                    },
                    hitBox2 = {
                        x : this.parentRect.width / 2 - 26,
                        y : this.parentRect.height +  (this.parentRect.height/3) + 30  ,
                        radius: this.parentRect.width / 2
                    },
                    dx = hitBox1.x - hitBox2.x,
                    dy = hitBox1.y - hitBox2.y,
                    distance = Math.sqrt(dx * dx + dy * dy),
                    collision = false;
                if(distance < hitBox1.radius + hitBox2.radius){
                    collision = true;
                }

                return collision;
            },
            isInXBounds(x){
                let inBounds = true;
                let collision = this.checkCollision(x, this.currentY);
                if(
                        x < 0 ||
                        x > (this.parentRect.width - this.elementRect.width) ||
                        collision
                ){
                    inBounds = false;
                }

                return inBounds;
            },
            isInYBounds(y){
                let inBounds = true;
                let collision = this.checkCollision(this.currentX, y);

                if(     y > (this.parentRect.height - this.elementRect.height) ||
                        y < ( this.navRect.height ) ||
                        collision
                ){
                    inBounds = false;
                }

                return inBounds;
            },
            getTimeOfDay(x){
                let thirdWidth = Math.floor(this.parentRect.width / 3);
                let newTimeOfDay = this.currentTimeOfDay;
                if(x < thirdWidth){
                    newTimeOfDay = "Morning";
                }
                if(x >= thirdWidth && x < thirdWidth*2 ){
                    newTimeOfDay = "Day";
                }
                if(x >= thirdWidth*2){
                    newTimeOfDay = "Night";
                }

                if(newTimeOfDay !== this.timeOfDay){
                    this.$store.commit('setTimeOfDay', newTimeOfDay)
                }
            },
            enter(e){
                if(!this.dragging){
                    this.dragging = true;

                }
            },
            exit(e){
                this.dragging = false;
            },
            drag(e){
                if(this.dragging){
                    let x = (e.touches) ? e.touches[0].pageX : e.pageX,
                        y = (e.touches) ? e.touches[0].pageY : e.pageY;

                    x -= this.parentRect.left + (this.elementRect.width / 2);
                    y -= this.parentRect.top - (this.elementRect.height );
                    if(this.isInYBounds(y)){
                        this.dragEl.style.top  = y+"px";
                        this.currentY = y;
                    }
                    if(this.isInXBounds(x)){
                        this.dragEl.style.left = x+"px";
                        this.currentX = x;
                        this.getTimeOfDay(x);
                    }

                }
            }
        },
        watch:{

        },
        mounted(){
            this.$nextTick(()=>{
                this.dragEl = this.$el.querySelector('.drag-item');
                this.parentRect = this.$el.getBoundingClientRect();
                this.elementRect = this.dragEl.getBoundingClientRect();
                this.navRect = document.querySelector('nav.info').getBoundingClientRect();
                this.currentX = this.navRect.left;
                this.currentY = this.navRect.top;
            });
        }
    }
</script>

<style lang="scss">
    .drag-item{
        cursor: pointer;
        position: absolute;
        top:50%;
        left:50%;
        z-index: 1000;
    }
    .bottom-area .image-container{
        position: absolute;
        bottom: 0;
        left:0;
        width:100%;
        height: 85%;
        z-index: 50;
    }
    .bottom-area img{
        position: absolute;
        height: 100%;
        width: auto;
        top:0;
        pointer-events: none;
        touch-action: none;
        user-select: none;
        transition: opacity 200ms linear;
    }
    .bottom-area img:not(.show){
        opacity: 0;
    }
    .bottom-area img:nth-child(1){
        z-index: 997;
    }
    .bottom-area img:nth-child(2){
        z-index: 998;
    }
    .bottom-area img:nth-child(3){
        z-index: 999;
    }

</style>