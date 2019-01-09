var vongquay_ls = null;
var vongquay_lsX = 0;
var vongquay_lsY = 0;


var codeVQMM_LS = BaseLayerTable.extend(
    {
        ctor: function () {

            this._super("codeVQMM_LS");
            this._moneyType = MONEY_VIN;
        },
        customizeGUI: function () {
            this.setTitleText("LỊCH SỬ GIAO DỊCH");
            this.createContentListView();
            this.createControlView();
            this.getDatas(1);
            this.arrTopUser = [];
            return;


            this.addSprite(this, "PanelLSGD", cc.p(629.88, 352.78), "res/Minigame/ImageChung/Bg_AllBang.png");
            this.addLayout(this.PanelLSGD, "nen", cc.p(353.84, 219.82), null, cc.size(685, 412), false);
            this.nen.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.nen.setBackGroundColor(GuiUtil.color("#4049A1"));
            this.nen.setBackGroundColorOpacity(150);

            this.addImage(this.PanelLSGD, "nenTitle", cc.p(355.31, 471.82), "res/Minigame/ImageChung/Title.png", cc.size(478, 62));
            this.addText(this.PanelLSGD, "txt_title", cc.p(355.30, 466.88), "LỊCH SỬ GIAO DỊCH", RobotoRegular.fontName, 32);
            this.txt_title.ignoreContentAdaptWithSize(false);
            this.txt_title.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_title.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.txt_title.setContentSize(cc.size(300, 35));
            this.txt_title.setColor(GuiUtil.color("#AF4900"));
            this.addButton(this.PanelLSGD, "btnCloseLS", codeVQMM_LS.BTN_CLOSELICHSU, cc.p(671.25, 463.17), true, "res/Minigame/ImageChung/btn_closegame.png", "res/Minigame/ImageChung/btn_closegame.png");
            this.addListView(this.PanelLSGD, "list_ls_VQMM", cc.p(354.05, 211.44), cc.size(680, 300));
            this.list_ls_VQMM.setTouchEnabled(true);
            this.list_ls_VQMM.setClippingEnabled(true);
            this.list_ls_VQMM.setScrollBarEnabled(false);

            this.addLayout(this.PanelLSGD, "pn_title", cc.p(354, 391.90), null, cc.size(650, 61), false);
            this.addText(this.pn_title, "t1", cc.p(55.49, 30.51), "Phiên", fontRobotoMedium.fontName, 18);
            this.t1.setColor(GuiUtil.color("#FFDF58"));
            this.addText(this.pn_title, "t2", cc.p(205.20, 30.51), "Thời gian", fontRobotoMedium.fontName, 18);
            this.t2.setColor(GuiUtil.color("#FFDF58"));
            this.addText(this.pn_title, "t3", cc.p(338.89, 14.70), "Vòng "+ GameManager.config.moneyNameUpper, fontRobotoMedium.fontName, 18);
            this.t3.setColor(GuiUtil.color("#FFDF58"));
            this.addText(this.pn_title, "t4", cc.p(446.89, 15.70), "Vòng Xu", fontRobotoMedium.fontName, 18);
            this.t4.setColor(GuiUtil.color("#FFDF58"));
            this.addText(this.pn_title, "t5", cc.p(459.20, 48.23), "Kết quả", fontRobotoMedium.fontName, 18);
            this.t5.setColor(GuiUtil.color("#FFDF58"));
            this.addText(this.pn_title, "t6", cc.p(582.89, 15.70), "Vòng Slot", fontRobotoMedium.fontName, 18);
            this.t6.setColor(GuiUtil.color("#FFDF58"));

            this.addLayout(this.PanelLSGD, "pn_page", cc.p(0, 0), null, cc.size(0, 0), false);
            this.addButton(this.pn_page, "btn_back_all", codeVQMM_LS.BTN_BACKALL_LS_VQ, cc.p(223.24, 39.30), true, "res/Minigame/ImageChung/number_backall.png", "res/Minigame/ImageChung/number_backall_s.png");
            this.addButton(this.pn_page, "btn_back", codeVQMM_LS.BTN_BACK_LS_VQ, cc.p(273.51, 39.30), true, "res/Minigame/ImageChung/number_back.png", "res/Minigame/ImageChung/number_back_s.png");
            this.addButton(this.pn_page, "btn_next_all", codeVQMM_LS.BTN_NEXTALL_LS_VQ, cc.p(476.52, 39.30), true, "res/Minigame/ImageChung/number_backall.png", "res/Minigame/ImageChung/number_backall_s.png");
            this.addButton(this.pn_page, "btn_next", codeVQMM_LS.BTN_NEXT_LS_VQ, cc.p(426.24, 39.30), true, "res/Minigame/ImageChung/number_back.png", "res/Minigame/ImageChung/number_back_s.png");
            this.btn_next_all.setRotation(180);
            this.btn_next.setRotation(180);

            this.addSprite(this.pn_title, "s1", cc.p(125.88, 30.52), res_VQMM + "/vachdung.png");
            this.s1.setScaleX(2);
            this.s1.setScaleY(1.49);
            this.addSprite(this.pn_title, "s2", cc.p(284.88, 30.52), res_VQMM + "/vachdung.png");
            this.s2.setScaleX(2);
            this.s2.setScaleY(1.49);
            this.addSprite(this.pn_title, "s3", cc.p(392.88, 15.55), res_VQMM + "/vachdung.png");
            this.s3.setScaleX(2);
            this.s3.setScaleY(0.76);
            this.addSprite(this.pn_title, "s4", cc.p(500.88, 15.55), res_VQMM + "/vachdung.png");
            this.s4.setScaleX(2);
            this.s4.setScaleY(0.76);
            this.addSprite(this.pn_title, "s5", cc.p(474.78, 31.27), res_VQMM + "/vachdung.png");
            this.s5.setRotation(90);
            this.s5.setScaleX(2);
            this.s5.setScaleY(9.24);

            this.addSprite(this.pn_page, "Sprite_2", cc.p(349.41, 39.30), "res/Minigame/ImageChung/number_s.png");
            this.addText(this.pn_page, "lb_page", cc.p(350.29, 39.30), "....", RobotoRegular.fontName, 16);
            this.lb_page.ignoreContentAdaptWithSize(false);
            this.lb_page.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.lb_page.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_page.setContentSize(cc.size(86, 26));
            this.lb_page.setColor(GuiUtil.color("#FFFFFF"));

            this.PanelLSGD.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.onshow, this)));
            //this.setDraggableLayout(this.PanelLSGD);
        },

        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 445), codeVQMM_LS.arrInfoColom);
            this.lv_toi_chon_ca = this._pContent._listView;
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 342));
            this.addChild(this._pContent);
        },
        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(640, 86));
            this.addChild(this._pControl);
        },

        getDatas: function (page) {
            this.showLoading();
            var url = urlLichSuVQMM_NEW(userInfo.userData.nickname, page);
            sendRequest(url, null, false, this.callBackSuccess.bind(this), this.callBackError.bind(this));
        },

        callBackError: function (response) {
            this.hideLoading();
        },

        formatData: function (data) {
            data.transTimeText = StringUtility.formatDateTime(data.transTime);
            data.resultXuText = this.get_text_vong_xu(data.resultXu);
            data.resultSlotText = this.get_text_vong_slot(data.resultSlot);
            data.resultVinText = this.get_text_vong_vin(data.resultVin);
            return data;
        },

        callBackError: function (response) {
            this.hideLoading();
        },
        onClickControl: function (tag, currentPage) {
            this.getDatas(currentPage);
        },

        callBackSuccess: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            this.hideLoading();
            this._pControl.setTotalPage(jsonData["totalPages"]);
            if (success) {
                var results = jsonData["results"] || [];
                this._pContent.setData(results.map(this.formatData.bind(this)));
            }
        },
        reloadLSVQMM: function () {
            this.list_ls_VQMM.removeAllItems();
            var cellHeight = 30;
            var positionY = 12;
            var fonts = {fontName: "Roboto-Medium", src: [{src: "res/Font/Roboto-Medium.ttf", type: "truetype"}]};
            for (var i = 0; i < this.array_lsVQMM.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.list_ls_VQMM.width;

                var cellList = null;
                if (i % 2 == 0) {
                    cellList = new cc.LayerColor(GuiUtil.color(23, 57, 106));
                } else {
                    cellList = new cc.LayerColor(GuiUtil.color("#39489E"));
                }
                //cellList.setBackGroundColorOpacity(50);
                cellList.height = cellHeight;
                cellList.width = this.list_ls_VQMM.width;

                var lbPhien = new cc.LabelTTF('', fonts.fontName, 14, cc.size(140, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5, 0.5);
                lbPhien.setPosition(cc.p(71.49, positionY));
                lbPhien.setString(vongquay_ls.array_lsVQMM[i].transId);
                lbPhien.setColor(GuiUtil.color("#e8daad"));

                var lbTime = new cc.LabelTTF('', fonts.fontName, 14, cc.size(159, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setPosition(cc.p(221.2, positionY));
                lbTime.setString(StringUtility.formatDateTime(vongquay_ls.array_lsVQMM[i].transTime));
                lbTime.setColor(GuiUtil.color("#e8daad"));

                var lbVongXu = new cc.LabelTTF('', fonts.fontName, 14, cc.size(107, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbVongXu.setPosition(cc.p(461.65, positionY));
                vongquay_ls.get_text_vong_xu(vongquay_ls.array_lsVQMM[i].resultXu);
                lbVongXu.setString(vongquay_ls.text_vong_trong);
                lbVongXu.setColor(GuiUtil.color("#c0c1c3"));

                var lbVongSlot = new cc.LabelTTF('', fonts.fontName, 14, cc.size(163, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbVongSlot.setPosition(cc.p(598.05, positionY));
                vongquay_ls.get_text_vong_slot(vongquay_ls.array_lsVQMM[i].resultSlot);
                lbVongSlot.setString(vongquay_ls.text_vong_ngoai);
                lbVongSlot.setColor(GuiUtil.color(vongquay_ls.macolor));

                var lbVongVin = new cc.LabelTTF('', fonts.fontName, 14, cc.size(163, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbVongVin.setPosition(cc.p(353.71, positionY));
                lbVongVin.setString(vongquay_ls.get_text_vong_vin(vongquay_ls.array_lsVQMM[i].resultVin));
                if (vongquay_ls.array_lsVQMM[i].resultVin == "fail") {
                    lbVongVin.setColor(GuiUtil.color("#c0c1c3"));
                } else
                    lbVongVin.setColor(GuiUtil.color("#E702FE"));

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite1.setScaleY(1);
                aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(141, positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite2.setScaleY(1);
                aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(300, positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite3.setScaleY(1);
                aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(408.09, positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite4.setScaleY(1);
                aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(515.95, positionY + 3));

                cellList.addChild(lbPhien);
                cellList.addChild(lbTime);
                cellList.addChild(lbVongXu);
                cellList.addChild(lbVongSlot);
                cellList.addChild(lbVongVin);

                cellList.addChild(aSprite1);
                cellList.addChild(aSprite2);
                cellList.addChild(aSprite3);
                cellList.addChild(aSprite4);
                cl1.addChild(cellList);

                this.list_ls_VQMM.pushBackCustomItem(cl1);
                this.closeLoading();
            }
        },
        callBackError: function (response) {
            this.closeLoading();
        },
        get_text_vong_xu: function (value) {
            if (value == "200000") { ////// 5M xu
                vongquay_ls.text_vong_trong = "200K Xu";
            } else if (value == "2000000") { ////// 500K xu
                vongquay_ls.text_vong_trong = "2M Xu";
            } else if (value == "500000") { ////// 1M xu
                vongquay_ls.text_vong_trong = "500K Xu";
            } else if (value == "1000000") { ////// 200k Xu
                vongquay_ls.text_vong_trong = "1M Xu";
            } else if (value == "300000") { ////// them luot
                vongquay_ls.text_vong_trong = "300K Xu";
            } else if (value == "3000000") { ////// 300k xu
                vongquay_ls.text_vong_trong = "3M Xu";
            } else if (value == "100000") { ////// 2m xu
                vongquay_ls.text_vong_trong = "100K Xu";
            } else if (value == "5000000") { ////// 100k xu
                vongquay_ls.text_vong_trong = "5M Xu";
            }
            return vongquay_ls.text_vong_trong;
        },
        get_text_vong_vin: function (value) {
            var txt = ""
            if (value == "1000") { ////// 5M xu
                txt = "1K "+ GameManager.config.moneyName;
            } else if (value == "10000") { ////// 500K xu
                txt = "10K "+ GameManager.config.moneyName;
            } else if (value == "2000") { ////// 1M xu
                txt = "2K "+ GameManager.config.moneyName;
            } else if (value == "50000") { ////// 200k Xu
                txt = "50K "+ GameManager.config.moneyName;
            } else if (value == "5000") { ////// them luot
                txt = "5K "+ GameManager.config.moneyName;
            } else if (value == "20000") { ////// 300k xu
                txt = "20K "+ GameManager.config.moneyName;
            } else if (value == "fail") { ////// 2m xu
                txt = "Trượt";
            } else if (value == "100000") { ////// 100k xu
                txt = "100K "+ GameManager.config.moneyName;
            }
            return txt;
        },
        get_text_vong_slot: function (value) {
            if (value == "KhoBau3") {
                vongquay_ls.text_vong_ngoai = "3 lượt Kho Báu";
                vongquay_ls.macolor = "#E3E300";
            } else if (value == "NuDiepVien1") { ////// 1K vin
                vongquay_ls.text_vong_ngoai = "1 lượt Nữ Điệp Viên";
                vongquay_ls.macolor = "#E3E300";
            } else if (value == "NuDiepVien2") { ////// Truot roi
                vongquay_ls.text_vong_ngoai = "2 lượt Nữ Điệp Viên";
                vongquay_ls.macolor = "#E3E300";
            } else if (value == "KhoBau1") { ////// 50k vin
                vongquay_ls.text_vong_ngoai = "1 lượt Kho Báu";
                vongquay_ls.macolor = "#E3E300";
            } else if (value == "fail") { ////// 2k vin
                vongquay_ls.text_vong_ngoai = "Trượt";
                vongquay_ls.macolor = "#c0c1c3";
            } else if (value == "NuDiepVien3") { ////// 200k xu
                vongquay_ls.text_vong_ngoai = "3 lượt Nữ Điệp Viên";
                vongquay_ls.macolor = "#E3E300";
            } else if (value == "SieuAnhHung2") { ////// 10k vin
                vongquay_ls.text_vong_ngoai = "2 lượt Siêu Anh Hùng";
                vongquay_ls.macolor = "#E3E300";
            } else if (value == "KhoBau2") { ////// 1 kho bau
                vongquay_ls.text_vong_ngoai = "2 lượt Kho Báu";
                vongquay_ls.macolor = "#E3E300";
            } else if (value == "SieuAnhHung3") { ////// 100k xu
                vongquay_ls.text_vong_ngoai = "3 lượt Siêu Anh Hùng";
                vongquay_ls.macolor = "#E3E300";
            } else if (value == "more") { ////// 20k vin
                vongquay_ls.text_vong_ngoai = "Thêm lượt";
                vongquay_ls.macolor = "#c0c1c3";
            } else if (value == "SieuAnhHung1") { ////// 5k vin
                vongquay_ls.text_vong_ngoai = "1 lượt Siêu Anh Hùng";
                vongquay_ls.macolor = "#E3E300";
            }
            return vongquay_ls.text_vong_ngoai;
        },
        setNullFromParent : function () {
            vongquay_ls = null;
        }

    }
);

codeVQMM_LS.BTN_CLOSELICHSU = 1;
codeVQMM_LS.BTN_BACKALL_LS_VQ = 2;
codeVQMM_LS.BTN_BACK_LS_VQ = 3;
codeVQMM_LS.BTN_NEXTALL_LS_VQ = 4;
codeVQMM_LS.BTN_NEXT_LS_VQ = 5;


codeVQMM_LS.arrInfoColom = [
    {
        name: "Phiên",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "transId",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thời gian",
        width: 3,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "transTime",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Vòng "+ GameManager.config.moneyNameUpper,
        width: 2,
        color: LayoutListView.COLOR_MONEY,
        apiName: "resultVinText",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Vòng xu",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "resultXuText",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Vòng slot",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "resultSlotText",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];


openvongquay_ls = function () {
    if(vongquay_ls) return;
    vongquay_ls = new codeVQMM_LS();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(vongquay_ls, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_VQMM + 100);
};
closevongquay_ls = function () {
    if(vongquay_ls) {
        vongquay_ls.removeFromParent();
        vongquay_ls = null;
    }
};