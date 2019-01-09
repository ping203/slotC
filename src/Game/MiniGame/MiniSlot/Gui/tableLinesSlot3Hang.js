var TableLinesSlot3Hang = BaseLayer.extend({
    ctor: function (parent) {
        this._super();

        // @Declare Available
        this.avai_parent = parent;
        this.pSize = cc.size(550, 495);

        // @Declare Variable
        this.pathTexture = 'res/MiniGame/MiniSlot/table-lines/';
        this.arrItemLinePosition = [
            cc.p(30, 410), cc.p(130, 410), cc.p(230, 410), cc.p(330, 410), cc.p(430, 410),
            cc.p(30, 330), cc.p(130, 330), cc.p(230, 330), cc.p(330, 330), cc.p(430, 330),
            cc.p(30, 250), cc.p(130, 250), cc.p(230, 250), cc.p(330, 250), cc.p(430, 250),
            cc.p(30, 170), cc.p(130, 170), cc.p(230, 170), cc.p(330, 170), cc.p(430, 170),
        ];

        // @Declare variable UI
        this.ui_table_lines = null; // UI Container
        this.ui_close_table = null;
        this.ui_items = [];
        this.ui_title = null;
        this.ui_btn_le = null;
        this.ui_btn_chan = null;
        this.ui_btn_tatca = null;
        this.ui_btn_bo = null;

        return true;
    },
    customizeGUI: function () {
        var texType = ccui.Widget.LOCAL_TEXTURE;
        this.addLayout(this, 'ui_table_lines', cc.p(0, 0), this.pathTexture + 'bg.png', this.pSize, true);
        this.addText(this.ui_table_lines, 'ui_title', cc.p(this.pSize.width / 2, 455), 'CHỌN DÒNG', UTMBebas.fontName, 40);
        this.ui_title.setColor(GuiUtil.color('#fffc9e'));
        this.addButton(this.ui_table_lines, 'ui_close_table', TableLinesSlot3Hang.BTN_CLOSE, cc.p(510, 473), false, 'res/MenuTab/btn-close.png', 'res/MenuTab/btn-close.png', texType);
        this.addButton(this.ui_table_lines, 'ui_btn_le', TableLinesSlot3Hang.BTN_LE, cc.p(113, 48.5), true, 'res/MiniGame/MiniSlot/bg-button.png', 'res/MiniGame/MiniSlot/bg-button-active.png', texType);
        this.ui_btn_le.setTitleText('LẺ');
        this.ui_btn_le.setTitleFontName(UTMBebas.fontName);
        this.ui_btn_le.setTitleFontSize(36);
        this.ui_btn_le.setTitleColor(GuiUtil.color('#2a2c49'));
        this.addButton(this.ui_table_lines, 'ui_btn_chan', TableLinesSlot3Hang.BTN_CHAN, cc.p(223, 48.5), true, 'res/MiniGame/MiniSlot/bg-button.png', 'res/MiniGame/MiniSlot/bg-button-active.png', texType);
        this.ui_btn_chan.setTitleText('CHẴN');
        this.ui_btn_chan.setTitleFontName(UTMBebas.fontName);
        this.ui_btn_chan.setTitleFontSize(36);
        this.ui_btn_chan.setTitleColor(GuiUtil.color('#2a2c49'));
        this.addButton(this.ui_table_lines, 'ui_btn_tatca', TableLinesSlot3Hang.BTN_TATCA, cc.p(333, 48.5), true, 'res/MiniGame/MiniSlot/bg-button.png', 'res/MiniGame/MiniSlot/bg-button-active.png', texType);
        this.ui_btn_tatca.setTitleText('TẤT CẢ');
        this.ui_btn_tatca.setTitleFontName(UTMBebas.fontName);
        this.ui_btn_tatca.setTitleFontSize(36);
        this.ui_btn_tatca.setTitleColor(GuiUtil.color('#2a2c49'));
        this.addButton(this.ui_table_lines, 'ui_btn_bo', TableLinesSlot3Hang.BTN_BO, cc.p(443, 48.5), true, 'res/MiniGame/MiniSlot/bg-button.png', 'res/MiniGame/MiniSlot/bg-button-active.png', texType);
        this.ui_btn_bo.setTitleText('BỎ');
        this.ui_btn_bo.setTitleFontName(UTMBebas.fontName);
        this.ui_btn_bo.setTitleFontSize(36);
        this.ui_btn_bo.setTitleColor(GuiUtil.color('#2a2c49'));

        // this.ui_btn_le.setAnchorPoint(0, 0);
        this.generateItem();
    },
    generateItem: function () {
        var self = this;
        var texType = ccui.Widget.LOCAL_TEXTURE;
        this.arrItemLinePosition.forEach(function (value, index) {
            ccui.Layout.prototype._isSelected = false;
            var layout = new ccui.Layout();
            layout.setContentSize(cc.size(90, 70));
            var image = new ccui.ImageView(self.pathTexture + ((index + 1 > 9) ? (index + 1) + '.png' : ('0' + (index + 1) + '.png')), texType);
            image.setPosition(cc.p(45, 35));
            layout.setPosition(value);
            layout.setAnchorPoint(0, 1);
            layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            layout.setBackGroundColor(GuiUtil.color('#e29933'));
            layout.setTouchEnabled(true);
            layout.addTouchEventListener(self.onTouchEventHandler, self);
            layout.setTag(index + 1);
            self.ui_items[index] = layout;
            layout.addChild(image);
            self.ui_table_lines.addChild(layout);
        });
    },
    onButtonRelease: function (sender, id) {
        var self = this;
        switch (id) {
            case TableLinesSlot3Hang.BTN_CLOSE:
                this.hide();
                break;
            case TableLinesSlot3Hang.BTN_LE:
                this.removeSelectedAllItem();
                this.ui_items.forEach(function (item, index) {
                    if (index % 2 === 0) {
                        self.itemSelected(item);
                    }
                });
                break;
            case TableLinesSlot3Hang.BTN_CHAN:
                this.removeSelectedAllItem();
                this.ui_items.forEach(function (item, index) {
                    if (index % 2 !== 0) {
                        self.itemSelected(item);
                    }
                });
                break;
            case TableLinesSlot3Hang.BTN_TATCA:
                this.selectedAllItem();
                break;
            case TableLinesSlot3Hang.BTN_BO:
                this.removeSelectedAllItem();
                break;
            default:
                if (id > 0 && id <= 20) {
                    this.itemSelected(this.ui_items[id - 1]);
                }
                break;

        }
    },
    itemSelected: function (item) {
        item.setBackGroundColor(GuiUtil.color(!item._isSelected ? '#e29933' : '#4d5ced'));
        item._isSelected = !item._isSelected;
    },
    removeSelectedAllItem: function () {
        this.ui_items.forEach(function (item) {
            item._isSelected = false;
            item.setBackGroundColor(GuiUtil.color('#4d5ced'));
        });
    },
    selectedAllItem: function () {
        this.ui_items.forEach(function (item) {
            item._isSelected = true;
            item.setBackGroundColor(GuiUtil.color('#e29933'));
        });
    },
    getItemSelected: function () {
        return this.ui_items.reduce(function (acc, item, currentIndex) {
            if (item._isSelected)
                acc.push(currentIndex + 1);
            return acc;
        }, []);
    },
    open: function () {
        this.setVisible(true);
    },
    hide: function () {
        this.setVisible(false);
        var lineSelected = this.getItemSelected();
        this.avai_parent.ui_chon_dong.setString(lineSelected.length);
        cc.log(lineSelected.join(','));
        for (var i = 0; i < this.avai_parent.ui_lines.length; i++)
            this.avai_parent.ui_lines[i].setSelectedLine(false);
        for (i = 0; i < lineSelected.length; i++)
            this.avai_parent.ui_lines[lineSelected[i] - 1].setSelectedLine(true);
        // this.avai_parent.ui_lines[lineSelected[i] - 1].setSelectedLine(true);

    }
});

TableLinesSlot3Hang.BTN_CLOSE = 0;
// [1 - 20] setTag Item Select Line
TableLinesSlot3Hang.BTN_LE = 21;
TableLinesSlot3Hang.BTN_CHAN = 22;
TableLinesSlot3Hang.BTN_TATCA = 23;
TableLinesSlot3Hang.BTN_BO = 24;