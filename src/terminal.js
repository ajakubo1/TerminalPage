/**
 * Created by claim on 27.12.15.
 */


/**
 *
 * @param config
 * @constructor
 */
var Terminal = function (config) {

    var self = this;

    this.resized = function () {

    };

    this.run = function (frameTime) {
        if (self.running) {
            var tickCount = Math.floor((frameTime - self.updateTime) / self.tickLength), i;
            if (tickCount > 0) {

                self.updateTime += tickCount * self.tickLength;

                self.tickCount += tickCount;

                if(self.tickCount > self.tickMax) {
                    self.tickCount = 0;
                }

                for (i = 0; i < self.buttons.length; i += 1) {
                    self.buttons[i].redrawBackground(self.tickCount);
                }

                self.redrawButtons();
            }
            window.requestAnimationFrame(self.run);
        }
    };
};