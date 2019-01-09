var ItemColumnSlot3HangLayer = BaseLayer.extend({
    ctor: function () {
        this._super();
        // @Declare available

        // @Declare variable data
        this.arrDiamonTexture = [
            'res/MiniGame/MiniSlot/diamon-red.png',
            'res/MiniGame/MiniSlot/diamon-yellow.png',
            'res/MiniGame/MiniSlot/diamon-purple.png',
            'res/MiniGame/MiniSlot/diamon-green.png',
            'res/MiniGame/MiniSlot/diamon-blue.png',
            'res/MiniGame/MiniSlot/diamon-sliver.png'
        ];
        // @Declare variable UI
        this.ui_list_diamon = [];
        return true;
    },
    create30DiamonRandom: function () {
        var texType = ccui.Widget.LOCAL_TEXTURE;
        for (var i = 0; i < 30; i++) {
            var index = Math.floor(Math.random() * 6);
            this.ui_list_diamon[i] = new ccui.ImageView(this.arrDiamonTexture[index], texType);
        }
        this.ui_list_diamon[0].setOpacity(100);
        this.ui_list_diamon[1].setOpacity(150);
        this.ui_list_diamon[2].setOpacity(200);
        return this.ui_list_diamon;
    },

    runSpin: function (col, time_ease) {
        var self = this;
        col.runAction(cc.sequence([cc.moveTo(.3, col.x, 10), cc.moveTo(1.5, col.x, -col.height + 260).easing(cc.easeInOut(time_ease))]));
        setTimeout(function () {
            var texType = ccui.Widget.LOCAL_TEXTURE;
            var temp = [
                self.ui_list_diamon[0]._textureFile,
                self.ui_list_diamon[1]._textureFile,
                self.ui_list_diamon[2]._textureFile
            ];
            self.ui_list_diamon[27].loadTexture(temp[0] ,texType);
            self.ui_list_diamon[28].loadTexture(temp[1] ,texType);
            self.ui_list_diamon[29].loadTexture(temp[2] ,texType);
            col.y = 5;
        }, 1800);
    },
    update: function (item, item1, item2) {
        this.ui_list_diamon[0].loadTexture(this.arrDiamonTexture[item]);
        this.ui_list_diamon[1].loadTexture(this.arrDiamonTexture[item1]);
        this.ui_list_diamon[2].loadTexture(this.arrDiamonTexture[item2]);
    }
});