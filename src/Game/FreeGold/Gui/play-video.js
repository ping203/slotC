var PlayVideoLayer = BaseLayer.extend({
    ctor: function (table) {
        this._super();
        this._table = table;
        this.customizeGUI();
        return true;
    },
    customizeGUI: function () {
        var content = new LayoutListViewFreeGoldLayer(this._table, ['2.000', '3.000', '4.000', '5.000'], 0);
        this._table.setTitleText('NHẬN GOLD MIỄN PHÍ');
        this._table._pContent.addChild(content);
    },
});