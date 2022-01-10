export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;

        this.intervalId = null;
        this.isPlaying = false;
        this.isRock = false;

        document.addEventListener('keydown', this.handleKeyDown.bind(this)) // привязываем к объекту 
        document.addEventListener('keyup', this.handleKeyUp.bind(this))

        this.view.renderStartScreen();

    }

    update() {
        this.game.movePieceDown();
        this.updateView();
    }

    play() {
        this.isRock = true;
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
        this.soundClick();
    }

    pause() {
        this.isRock = false;
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
        this.soundClick();
    }

    reset() {
        this.game.reset();
        this.play();
    }

    updateView() {
        const state = this.game.getState();

        if (state.isGameOver) {
            this.view.renderEndScreen(state);
        } else if (!this.isPlaying) {
            this.view.renderPauseScreen();
        } else {
            this.view.renderMainScreen(state);
        }
    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100;

        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update();          
            }, speed > 0 ? speed : 100);
        }
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    handleKeyDown(event) {
        const state = this.game.getState();

        switch (event.keyCode) {
            case 68: // D
                this.game.movePieceD()
                this.updateView();
                break;
            case 83: // S
                this.game.movePieceS()
                break;               
            case 13: // ENTER
                if (state.isGameOver) {
                    this.reset();
                } else if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case 37: // left arrow
                this.game.movePieceLeft();
                this.updateView();
                break;
            case 38: // up arrow;
                this.game.rotatePiece();
                this.updateView();
                break;
            case 39: // right arrow;
                this.game.movePieceRight();
                this.updateView();
                break;
            case 40: // down arrow;
                this.stopTimer();
                this.game.movePieceDown();
                this.updateView();
                break;
        }
    }    

    handleKeyUp(event){
        switch (event.keyCode) {
            case 40: // down arrow;
                this.startTimer();
                break;
        }
    }


    

    soundClick() { 

        function stop() {
            audio.pause();
            audio.currentTime = 0;
        }
            const audio = document.createElement("AUDIO"); //new Audio(); 
            audio.src = './src/sounds/tsiwr.mp3'; 
        if (this.isRock) {
            audio.play();
            console.log('play');
            //audio.autoplay = true; // Автоматически запускаем
        } else {
            
            console.log('stop1');
            audio.pause();
            audio.src = audio.src;
            console.log('stop2');
        }
    }
}