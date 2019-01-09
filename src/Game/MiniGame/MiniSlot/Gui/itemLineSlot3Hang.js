var ItemLineSlot3HangLayer = BaseLayer.extend({
    ctor: function (parent, index, position, positionLine) {
        this._super();

        // @Declare Available
        this.avai_parent = parent;
        this.avai_position = position;
        this.avai_index = index;
        this.avai_positionLine = positionLine;

        // @Declare Variable Data

        // @Declare Variable UI
        this.ui_btnLine = null;
        this.ui_lineEfect = null;

        this.customizeGUI();
        return true;
    },
    customizeGUI: function () {
        var self = this;
        var textType = ccui.Widget.LOCAL_TEXTURE;
        this.setPosition(this.avai_position);

        var sprite = new cc.Sprite('res/MiniGame/MiniSlot/line-' + this.avai_index + '.png');
        this.addImage(this.avai_parent, 'ui_lineEfect', this.avai_positionLine, sprite.getTexture().url, sprite.getContentSize());
        this.ui_lineEfect.setVisible(false);
        delete sprite;

        this.addButton(this.avai_parent, 'ui_btnLine', ItemLineSlot3HangLayer.BTN_LINE_NUMBER, this.avai_position, false, 'res/MiniGame/MiniSlot/bg-line.png', 'res/MiniGame/MiniSlot/bg-line.png', textType);
        this.ui_btnLine.setTitleText(this.avai_index);
        this.ui_btnLine.setTitleFontSize(14);
        this.setSelectedLine(true);
        this.ui_btnLine.setAnchorPoint(0, 0);


        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            swallowTouches: true,
            onMouseMove: function (event) {
                var locationInNode = self.ui_btnLine.convertToNodeSpace(event.getLocation());
                var s = self.ui_btnLine.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if(self.avai_parent.getParent().isLineHover) {
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        self.showLineEffect(true);
                    } else
                        self.showLineEffect(false);
                }
            }
        }, this.ui_btnLine);
    },
    setSelectedLine: function(isSelected){
        var txt = this.ui_btnLine.getTitleText();
        this.ui_btnLine.setTitleText('');
        this.ui_btnLine.setTitleColor(GuiUtil.color(isSelected ? '#f7e788' : '#4d5ced'));
        this.ui_btnLine.setTitleText(txt);
    },
    showLineEffect: function (show) {
        this.ui_lineEfect.setVisible(show);
    }
});

ItemLineSlot3HangLayer.BTN_LINE_NUMBER = 1;