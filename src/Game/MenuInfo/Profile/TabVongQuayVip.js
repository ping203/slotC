/**
 * Created by B150M on 3/23/2018.
 */
var TabVongQuayVipLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super();
            this.pn_profile = parent;
            return true;
        },

        customizeGUI: function () {
            this.initPnVongQuayVip();
        },
        initPnVongQuayVip: function () {
            var layout = this.addLayoutStructure(this, "pn_vongquayvip", cc.p(0, 0), "", cc.size(0.00, 0), true);

            this.addImage(layout, "Image_14", cc.p(640.29, 326.07), res_ResourceMenuTab_Profile + "/nen_hoso.png", cc.size(1036, 360.53));

            this.addSpriteStructureWithoutResourcePath(layout, "Image1", cc.p(640.29, 579.15), res_ResourceMenuTab + "/Vip/tab_vip.png").setAnchorPoint(0.5, 1);
            this.Image1.setScale(1159.00 / 488.00, 1);
            // return;
            this.addButtonStructure(layout, "btn_vqv", TabVongQuayVipLayer.BTN_GOTO_VQV, cc.p(640.29, 101.64), true,
                [res_ResourceMenuTab_Profile + "/btn_vongquay.png", res_ResourceMenuTab_Profile + "/btn_vongquay_s.png"]);
            this.addTextStructure(layout, "Text_1", cc.p(638.97, 527.56), "THỂ LỆ", UTMBebas.fontName, "30", "#FFFFFF");
            //this.Text_1.setColor(GuiUtil.color(162,105,64));

            var sc_thele_vqv = this.addListViewStructure(layout, "sc_thele_vqv", cc.p(660.29, 497.00), cc.size(950.00, 340.00), {
                anchorY: 1,
                anchorX: 0.5
            });
            var array = guilHuongDanVQV();
            initRichText(this.sc_thele_vqv, array);
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case TabVongQuayVipLayer.BTN_GOTO_VQV :
                    menutab.profileLayer.closeProfileLayer();
                    openvq_vip();
                    break;
            }
        },





    });


TabVongQuayVipLayer.BTN_GOTO_VQV =1;