var DownLoadAppLayer = BaseLayer.extend({
    ctor: function (table) {
        this._super();
        this._pSwitchTab = table.getPSwitchTab();
        this._pContent = table.getPContent();
        this.customizeGUI();
        return true;
    },
    customizeGUI: function () {
        this.addText(this._pSwitchTab, 'txt-switch', cc.p(20, this._pSwitchTab.height / 2), 'Tải App để nhận Vàng miễn phí.', RobotoRegular.fontName, 22);
        this['txt-switch'].setAnchorPoint(0, 0.5);
    },
    onButtonRelease: function (btn, id) {

    }
});