/**
 * Created by claim on 27.12.15.
 */


/**
 *
 * @param config
 * @param config.width - canvas width
 * @param config.height - canvas height
 * @constructor
 */
var Terminal = function (config) {

    var self = this;
    this.width = config.width;
    this.height = config.height;

    this.gamegine = new GAMEGINE({
        canvas: 'terminal',
        width: this.width,
        height: this.height,
        fps: 60,
        ops: 60
    }, this);
    this.gamegine.start();
};

Terminal.prototype.logic = function () {

};

Terminal.prototype.render = function (context) {

};

Terminal.prototype.init = function (context) {

};