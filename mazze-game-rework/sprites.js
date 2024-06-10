const gravity = 0.6;
const backgroundSprite = "../assets/background/dungeon.jpg"

class Sprite {
    constructor({position, velocity, dimensions, source}) {
        this.position = position;
        this.velocity = velocity;
        this.width = dimensions?.width;
        this.height = dimensions?.height;

        if(source){
            this.image = new Image();
            this.image.src = source;
            this.width = this.image.width;
            this.height =  this.image.height;
        };
    }

    draw(){
        if(this.image){
            context.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            ); 
        }else {
            context.fillStyle = "white";
            context.fillRect(this.position.x, this.position.y, this.width, this.height);

        }

        if (this.isAttacking){
            context.fillStyle = "red";
            context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    update(){
        this.draw();
    }
}

class Mover extends Sprite{
    constructor({
        position,
        velocity,
        dimensions
    }) {
        super({
            position,
            velocity,
            dimensions
        })

        this.velocity = velocity;
        this.width = dimensions.width;
        this.height = dimensions.height;

        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 125,
            height:50
        }

        this.isAttacking;
        this.attackCoolDown = 500;
        this.onAttackCoolDown;
        this.lastKeyPressed;
        this.onGround;
    }
    update(){
        if (Math.ceil(this.position.y + this.height) >= canvas.height){
            this.onGround = true;
        } else {
            this.onGround = false;
        }

        if (this.position.y + this.height > canvas.height){
            this.position.y = canvas.height - this.height;
            this.velocity.y = 0
        } else{
            if (!this.onGround) this.velocity.y += gravity
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.attackBox.position.x = this.position.x;
        this.attackBox.position.y = this.position.y;

        this.draw();
    }

    attack(){
        if (this.onAttackCoolDown) return;

        this.isAttacking = true;
        this.onAttackCoolDown = true;

        setTimeout(() => {
            this.isAttacking = false;
        }, 100);

        setTimeout(() => {
            this.onAttackCoolDown = false;
        }, this.attackCoolDown);
    }

    jump(){
        if(!this.onGround) return;
        this.velocity.y -= 16;
    }

};

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    source: backgroundSprite
});

const player = new Mover({
    position: {
        x: 0,
        y: 0
    },
    velocity: {  
        x: 0,
        y: 0
    },
    dimensions: {
        width: 50,
        height: 150
    }
});

