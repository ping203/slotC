/**
 * Created by B150M on 8/1/2017.
 */
var detailLSGD = null;

var ChiTietLSGDLayer = BaseLayer.extend(
    {
        maGd :null,
        txtTG :null,
        txtDV : null,
        txtPS : null,
        txtSD : null,
        txtMT : null,
        type : null,

        ctor: function (magd,txttg,txtdv,txtps,txtsd,txtmt,type) {
            this._super();
            this.maGd = magd;
            this.txtTG = txttg;
            this.txtDV = txtdv;
            this.txtPS = txtps;
            this.txtSD = txtsd;
            this.txtMT = txtmt;
            this.type = type;
        },

        customizeGUI: function () {
            this.addLayout(this,"abcxyzaa",cc.p(640, 360),null,cc.size(1280,720), true);
            this.abcxyzaa.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.abcxyzaa.setBackGroundColor(cc.color.BLACK);
            this.abcxyzaa.setBackGroundColorOpacity(200);
            this.addLayout(this, "pn_chitiet", cc.p(640, 360), null, cc.size(560, 242), true);
            this.addImage(this["pn_chitiet"],"bg",cc.p(280.5, 75),res_Lobby+"/bground_tab.png",cc.size(571,338));
            this.bg.setScale9Enabled(false);
            this.bg.ignoreContentAdaptWithSize(false);
            this.bg.setContentSize(cc.size(571,338));
            //this.addSprite(this["pn_chitiet"], "bg", cc.p(280.5, 75), res_ResourceMenuTab_Mail + "/bg_supersmaill_mail.png");

            this.addSprite(this["pn_chitiet"], "bg_title", cc.p(280.5, 220), res_Lobby + "/titile.png");
            //this["bg_title"].setScale(0.8);
            this.addText(this["pn_chitiet"], "txt_title", cc.p(280.5, 222), "CHI TIẾT", UTMBebas.fontName, 35);
            this["txt_title"].setColor(GuiUtil.color(162,105,64));
            this.addButton(this["pn_chitiet"], "btn_close_chitiet", ChiTietLSGDLayer.BTN_CLOSE_CHITIET_LS, cc.p(532, 208), true, res_Lobby + "/btnClose.png", res_Lobby + "/btnClose_s.png");

            this.addImage(this["pn_chitiet"],"pn_nen",cc.p(280,-7),res_Lobby+"/bg_content.png",cc.size(541,155));
            this.pn_nen.setScale9Enabled(false);
            this.pn_nen.ignoreContentAdaptWithSize(false);
            this.pn_nen.setContentSize(cc.size(541,155));

            this.addText(this["pn_chitiet"],"txtgd",cc.p(66.5,164.5),"Mã giao dịch: ",fontArial.fontName,15);

            this["txtgd"].setColor(GuiUtil.color("#FFDF58"));
            this.addText(this["pn_chitiet"],"txt_maGD",cc.p(198.5,164.5),this.maGd,fontArial.fontName,15);
            this["txt_maGD"].setColor(GuiUtil.color("#E8DAAD"));
            this["txt_maGD"].setContentSize(cc.size(171,20));
            this["txt_maGD"].setName("txt_maGD");

            this.addText(this["pn_chitiet"],"txttg",cc.p(320.5,164.5),"Thời gian: ",fontArial.fontName,15);
            this["txttg"].setColor(GuiUtil.color("#FFDF58"));
            this.addText(this["pn_chitiet"],"txt_timeGD",cc.p(442.5,164.5),this.txtTG,fontArial.fontName,15);
            this["txt_timeGD"].setColor(GuiUtil.color("#E8DAAD"));
            this["txt_timeGD"].setContentSize(cc.size(171,20));
            this["txt_timeGD"].setName("txt_timeGD");
            this.addText(this["pn_chitiet"],"txtdv",cc.p(49.5,136.5),"Dịch vụ: ",fontArial.fontName,15);
            this["txtdv"].setColor(GuiUtil.color("#FFDF58"));
            this.addText(this["pn_chitiet"],"txt_dichvu",cc.p(310.5,136.5),this.txtDV,fontArial.fontName,15);
            this["txt_dichvu"].setColor(GuiUtil.color("#E8DAAD"));
            this["txt_dichvu"].setContentSize(cc.size(463,20));
            this["txt_dichvu"].setName("txt_dichvu");

            this.addText(this["pn_chitiet"],"txtps",cc.p(56,109),"Phát sinh: ",fontArial.fontName,15);
            this["txtps"].setColor(GuiUtil.color("#FFDF58"));
            this.addText(this["pn_chitiet"],"txt_phatsinh",cc.p(190.5,109),this.txtPS,fontArial.fontName,15);
            this["txt_phatsinh"].setContentSize(cc.size(195,20));
            this["txt_phatsinh"].setName("txt_phatsinh");
            this.addText(this["pn_chitiet"],"txtsd",cc.p(309,109),"Số dư: ",fontArial.fontName,15);
            this["txtsd"].setColor(GuiUtil.color("#FFDF58"));
            this.addText(this["pn_chitiet"],"txt_sodu",cc.p(439.5,109),this.txtSD,fontArial.fontName,15);
            this["txt_sodu"].setContentSize(cc.size(212,20));
            this["txt_sodu"].setName("txt_sodu");
            this.addText(this["pn_chitiet"],"txtmt",cc.p(280,83),"Mô tả",fontArial.fontName,15);
            this["txtmt"].setColor(GuiUtil.color("#FFDF58"));

            this.addText(this["pn_chitiet"],"txt_mota",cc.p(280,-8),this.txtMT,fontArial.fontName,15);
            this["txt_mota"].ignoreContentAdaptWithSize(false);
            this["txt_mota"].setContentSize(cc.size(529,150));
            this["txt_mota"].setColor(GuiUtil.color("#E8DAAD"));
            this["txt_mota"].setName("txt_mota");
            if(this.type == 1 || this.type == 3 || this.type == 5 ){
                this["txt_sodu"].setColor(GuiUtil.color("#FFFF00"));
                this["txt_phatsinh"].setColor(GuiUtil.color("#FFFF00"));
            }else{
                this["txt_sodu"].setColor(GuiUtil.color(192,193,195));
                this["txt_phatsinh"].setColor(GuiUtil.color(192,193,195));
            }

        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case ChiTietLSGDLayer.BTN_CLOSE_CHITIET_LS :
                    closeChiTietLSGDLayer();
                    break;
            }
        }

    }
);

ChiTietLSGDLayer.BTN_CLOSE_CHITIET_LS = 11;
openDetailLSGDGame = function (layer,magd,txttg,txtdv,txtps,txtsd,txtmt,type) {
    detailLSGD = new ChiTietLSGDLayer(magd,txttg,txtdv,txtps,txtsd,txtmt,type);
    layer.addChild(detailLSGD);
};


closeChiTietLSGDLayer = function () {
    if (detailLSGD != null) {
        detailLSGD.removeFromParent(true);
        detailLSGD = null;
    }
};