/**
 * Created by claim on 27.12.15.
 */


/**
 *
 * @param config
 * @param config.width - canvas width
 * @param config.height - canvas height
 * @param [config.font="14pt monospace"] - canvas height
 * @constructor
 */
var Terminal = function (config) {
    var self = this;
    this.width = config.width;
    this.height = config.height;
    this.font = config.font || '16pt Courier';

    this.terminalPrefix = "> ";
    this.promptHeartbeat = 30;
    this.prompt = String.fromCharCode(parseInt("25AE", 16));
    this.tick = 0;

    this.userInputLine = "";
    this.userWritten = 0;

    this.gamegine = new GAMEGINE({
        canvas: 'terminal',
        width: this.width,
        height: this.height,
        fps: 60,
        ops: 60
    }, this);
    this.gamegine.start();

    this.listener_keydown = function (event) {
        event = event || window.event;
        var key = event.which || event.keyCode;
        if (key === 8) {
            self.userWritten = 10;
            self.userInputLine = self.userInputLine.substr(0, self.userInputLine.length - 1);
        } else if (key === 9) {
            event.preventDefault();
        } else {
            console.info(key);
        }
    };

    this.listener_keypress = function (event) {
        event = event || window.event;
        var key = event.which || event.keyCode;
        if (key !== 13) {
            self.userWritten = 10;
            self.userInputLine += String.fromCharCode(key);
        } else {
            //TODO someone pressed enter
        }
    };

    document.addEventListener('keypress', this.listener_keypress);
    document.addEventListener('keydown', this.listener_keydown);
};

Terminal.prototype.logic = function () {
    this.tick += 1;
    if (this.userWritten > 0) {
        this.userWritten -= 1;
    }
};

Terminal.prototype.render = function (context) {
    var toDisplay = this.terminalPrefix + this.userInputLine;

    if (this.userWritten === 0) {
        if (this.tick % (2 * this.promptHeartbeat) < this.promptHeartbeat) {
            toDisplay += this.prompt;
        }
    } else {
        toDisplay += this.prompt;
    }
    context.clearRect(0, 0, this.width, this.height);
    context.font = this.font;
    context.fillStyle = "green";
    context.fillText(toDisplay, 20, 30);
};

Terminal.prototype.init = function (context) {

};