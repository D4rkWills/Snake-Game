var Snake;
Snake= class {
    constructor(x, y, velX, velY, color, type, ord) {
        this.x= x;
        this.y= y;
        this.velX= velX;
        this.velY= velY;
        this.snake;
        this.color= color;
        this.type= type || "head";
        this.ord= ord || 1;
    };
    draw() {
        if (this.snake) {
            this.snake.draw();
            this.snake.velX= this.velX;
            this.snake.velY= this.velY;
            if (this.snake.x> width) {
                this.snake.x= -10;
            } else if (this.snake.x< -10) {
                this.snake.x= width;
            };
            if (this.snake.y> height) {
                this.snake.y= -10;
            } else if (this.snake.y< -10) {
                this.snake.y= height;
            };
        } else {
            context.clearRect(this.x, this.y, 10, 10);
        };
        this.x+= this.velX;
        this.y+= this.velY;
        path[this.ord]= this.requestPath();
        context.fillStyle= this.color;
        context.fillRect(this.x, this.y, 10, 10);
        if (this.x> width) {
            this.x= -10;
        } else if (this.x< -10) {
            this.x= width;
        };
        if (this.y> height) {
            this.y= -10;
        } else if (this.y< -10) {
            this.y= height;
        };
    };
    add() {
        if (!this.snake) {
            this.snake= new Snake(this.x - this.velX, this.y - this.velY, this.velX, this.velY, "green", "piece", this.ord + 1);
        } else {
            this.snake.add();
        };
    };
    requestPath() {
        return {x: this.x, y: this.y, type: this.type};
    };
};