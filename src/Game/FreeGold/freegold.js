var FreeGoldLayer = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.table = null;
        this.tabviews = null;
        this.customizeGUI();
        return true;
    },
    customizeGUI: function () {
        this.table = new BaseLayerTable();
        this.tabviews = new LayoutTabView(this, cc.size(600, 65), ['XEM VIDEO', 'TẢI APP', 'KHÁC'], 0, 0);
        this.tabviews.setPosition(cc.p(100, 520));
        this.tabviews.setTitleTab('Xem 1 video ngắn để nhận Vàng miễn phí');
        this.table.addChild(this.tabviews);
        baseLobby.getGuiLayer(BaseLobby.INDEX_POP_UP_GUI).addChild(this.table);
        this.initPlayVideo();
    },
    initPlayVideo: function () {
        new PlayVideoLayer(this.table, this.tabviews);
    },
    initDownLoadApp: function () {

    },
    initOther: function () {

    },
    onClickTab: function (tabIndex, index) {
        switch (index) {
            case 0: // Xem Video
                this.tabviews.setTitleTab('Xem 1 video ngắn để nhận Vàng miễn phí');
                break;
            case 1: // Tai App
                this.tabviews.setTitleTab('Tải APP để nhận Vàng miễn phí');
                break;
            case 2: // Khac
                break;
        }
    }
});
