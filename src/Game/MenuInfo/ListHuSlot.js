var ListHuSlot = BaseLayer.extend(
    {
        ctor: function () {
            this._super();
            this.sp_starhu1 = null;
            this.sp_starhu2 = null;
            this.sp_starhu3 = null;

            return true;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/PlistMiniGame.plist");
            this.addImage(this, "pn_list_hu", cc.p(152, 593.5), res_ResourceMenuTab + "/img_listhu.png", cc.size(92, 91));
            this.addSprite(this["pn_list_hu"], "sp_starhu3", cc.p(20, 53), res_ResourceMenuTab + "/star_allhu.png");
            this.addSprite(this["pn_list_hu"], "sp_starhu2", cc.p(39, 78.5), res_ResourceMenuTab + "/star_allhu.png");
            this.addSprite(this["pn_list_hu"], "sp_starhu1", cc.p(70, 38.5), res_ResourceMenuTab + "/star_allhu.png");
            this.addLayout(this["pn_list_hu"], "pn_content", cc.p(0, 0), null, cc.size(0, 0), true);
            this["pn_content"].setAnchorPoint(0, 0);
            this["pn_content"].setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this["pn_content"].setBackGroundColor(GuiUtil.color("#96C8FF"));
            this["pn_content"].setBackGroundColorOpacity(0.4 * 255);
            this.addSprite(this["pn_content"], "bg_list_hu", cc.p(48.84, -204.64), res_ResourceMenuTab + "/bg_listhu.png");
            this.addButton(this.pn_content, "btn_listhu_room1", menuinfo.BTN_LIST_HU_ROOM1, cc.p(-17, -32), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            this.btn_listhu_room1.setContentSize(cc.size(66, 39));
            this.addButton(this.pn_content, "btn_listhu_room2", menuinfo.BTN_LIST_HU_ROOM2, cc.p(48.75, -32), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            this.btn_listhu_room2.setContentSize(cc.size(66, 39));
            this.addButton(this.pn_content, "btn_listhu_room3", menuinfo.BTN_LIST_HU_ROOM3, cc.p(114.75, -32), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            this.btn_listhu_room3.setContentSize(cc.size(66, 39));
            this.addText(this["pn_content"], "lb_listhu_room1", cc.p(-17, -32), "100", RobotoRegular.fontName, 22);
            this.lb_listhu_room1.setColor(GuiUtil.color("#FFB600"));
            this.addText(this["pn_content"], "lb_listhu_room2", cc.p(48.75, -32), "1K", RobotoRegular.fontName, 22);
            this.addText(this["pn_content"], "lb_listhu_room3", cc.p(114.75, -32), "10K", RobotoRegular.fontName, 22);

            this.addListView(this.pn_content, "sc_list_hu", cc.p(-54, -50.75), cc.size(206, 348));
            this.sc_list_hu.setAnchorPoint(0, 1);
            this.sc_list_hu.setPosition(cc.p(-54, -50.75));
            this.sc_list_hu.setScrollBarEnabled(false);
            this.sc_list_hu.setContentSize(cc.size(206, 348));
            this.sc_list_hu.setClippingEnabled(true);

            this.addItemToList();

            this.effectAllHu();

            //this["sc_list_hu"] = new ccui.ScrollView();
            //this["sc_list_hu"].setPosition(cc.p(-54, -50.75));
            //this["sc_list_hu"].setAnchorPoint(0, 1);
            //this["sc_list_hu"].setContentSize(cc.size(206, 348));
            //this["sc_list_hu"].setClippingEnabled(true);
            //this["sc_list_hu"].setInnerContainerSize(cc.size(206, 413));
            //this["pn_content"].addChild(this["sc_list_hu"]);
            //this.addSprite(this["sc_list_hu"], "sp_icon_minipoker", cc.p(32, 27.5), res_ResourceMenuTab + "/icon_khobau.png");
            //this["sp_icon_minipoker"].setScale(0.8);
            //this.addSprite(this["sc_list_hu"], "sp_icon_minislot", cc.p(32, 312), res_ResourceMenuTab + "/icon_khobau.png");
            //this["sp_icon_minislot"].setScale(0.8);
            //this.addSprite(this["sc_list_hu"], "sp_icon_khobau", cc.p(32, 240.5), res_ResourceMenuTab + "/icon_khobau.png");
            //this["sp_icon_khobau"].setScale(0.8);
            //this.addSprite(this["sc_list_hu"], "sp_icon_minislot_1", cc.p(32, 167.75), res_ResourceMenuTab + "/icon_khobau.png");
            //this["sp_icon_minislot_1"].setScale(0.8);
            //this.addSprite(this["sc_list_hu"], "sp_icon_minislot_2", cc.p(32, 96), res_ResourceMenuTab + "/icon_khobau.png");
            //this["sp_icon_minislot_2"].setScale(0.8);
            //this.addText(this["sc_list_hu"], "lb_minipoker", cc.p(70, 47), "Minipoker", RobotoRegular.fontName, 18);
            //this["lb_minipoker"].setAnchorPoint(0, 0.5);
            //this.addText(this["sc_list_hu"], "lb_minipoker_0", cc.p(70, 330), "Kim Cương", RobotoRegular.fontName, 18);
            //this["lb_minipoker_0"].setAnchorPoint(0, 0.5);
            //this.addText(this["sc_list_hu"], "lb_minipoker_0_0", cc.p(70, 259), "Kho Báu", RobotoRegular.fontName, 18);
            //this["lb_minipoker_0_0"].setAnchorPoint(0, 0.5);
            //this.addSprite(this["sc_list_hu"], "sp_iconVin", cc.p(73, 18.75), res_ResourceMenuTab + "/iconVin.png");
            //this["sp_iconVin"].setAnchorPoint(0, 0.5);
            //this["sp_iconVin"].setScale(0.32);
            //
            //this.addSprite(this["sc_list_hu"], "sp_icon_minipoker_0_0", cc.p(73, 304.75), res_ResourceMenuTab + "/iconVin.png");
            //this["sp_icon_minipoker_0_0"].setAnchorPoint(0, 0.5);
            //this["sp_icon_minipoker_0_0"].setScale(0.32);
            //this.addSprite(this["sc_list_hu"], "sp_icon_minipoker_0_0_0", cc.p(73, 232.5), res_ResourceMenuTab + "/iconVin.png");
            //this["sp_icon_minipoker_0_0_0"].setAnchorPoint(0, 0.5);
            //this["sp_icon_minipoker_0_0_0"].setScale(0.32);
            //this.addText(this["sc_list_hu"], "lb_hu_minipoker", cc.p(96, 18.75), "500.000", RobotoRegular.fontName, 16);
            //this["lb_hu_minipoker"].setColor(GuiUtil.color("#FFFF00"));
            //this["lb_hu_minipoker"].setAnchorPoint(0, 0.5);
            //this.addText(this["sc_list_hu"], "lb_hu_minislot", cc.p(96, 304.75), "500.000", RobotoRegular.fontName, 16);
            //this["lb_hu_minislot"].setColor(GuiUtil.color("#FFFF00"));
            //this["lb_hu_minislot"].setAnchorPoint(0, 0.5);
            //this.addText(this["sc_list_hu"], "lb_hu_khobau", cc.p(96, 232.5), "500.000", RobotoRegular.fontName, 16);
            //this["lb_hu_khobau"].setColor(GuiUtil.color("#FFFF00"));
            //this["lb_hu_khobau"].setAnchorPoint(0, 0.5);
            //this.addButton(this["sc_list_hu"], "btn_goto_vqv", menuinfo.BTN_GOTO_VQV, cc.p(1, 412), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            //this["btn_goto_vqv"].setAnchorPoint(0, 1);
            //this.addButton(this["sc_list_hu"], "btn_goto_minipoker", menuinfo.BTN_GOTO_MINIPOKER, cc.p(1, 59), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            //this["btn_goto_minipoker"].setAnchorPoint(0, 1);
            //this.addButton(this["sc_list_hu"], "btn_goto_minislot", menuinfo.BTN_GOTO_MINISLOT, cc.p(1, 341.75), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            //this["btn_goto_minislot"].setAnchorPoint(0, 1);
            //
            //this.addButton(this["sc_list_hu"], "btn_goto_khobau", menuinfo.BTN_GOTO_KHOBAU, cc.p(1, 270), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            //this["btn_goto_khobau"].setAnchorPoint(0, 1);
            //this.addButton(this["sc_list_hu"], "btn_goto_ndv", menuinfo.BTN_GOTO_NDV, cc.p(1, 195), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            //this["btn_goto_ndv"].setAnchorPoint(0, 1);
            //this.addButton(this["sc_list_hu"], "btn_goto_avenger", menuinfo.BTN_GOTO_AVENGER, cc.p(1, 120), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            //this["btn_goto_avenger"].setAnchorPoint(0, 1);
            //
            //this.addSprite(this["sc_list_hu"], "sp_icon_NDV", cc.p(32, 165.5), res_ResourceMenuTab + "/icon_khobau.png");
            //this["sp_icon_NDV"].setScale(0.8);
            //
            //this.addText(this["sc_list_hu"], "lb_minipoker_0_0_0", cc.p(70, 184), "Nữ Điệp Viên", RobotoRegular.fontName, 18);
            //this["lb_minipoker_0_0_0"].setAnchorPoint(0, 0.5);
            //this.addSprite(this["sc_list_hu"], "sp_icon_minipoker_0_0_0_0", cc.p(73, 157.5), res_ResourceMenuTab + "/iconVin.png");
            //this["sp_icon_minipoker_0_0_0_0"].setAnchorPoint(0, 0.5);
            //this["sp_icon_minipoker_0_0_0_0"].setScale(0.32);
            //this.addText(this["sc_list_hu"], "lb_hu_nudiepvien", cc.p(96, 157.5), "500.000", RobotoRegular.fontName, 16);
            //this["lb_hu_nudiepvien"].setColor(GuiUtil.color("#FFFF00"));
            //this["lb_hu_nudiepvien"].setAnchorPoint(0, 0.5);
            //this.addSprite(this["sc_list_hu"], "sp_icon_Avenger", cc.p(32, 90.5), res_ResourceMenuTab + "/icon_khobau.png");
            //this["sp_icon_Avenger"].setScale(0.8);
            //this.addText(this["sc_list_hu"], "lb_minipoker_0_0_0_0", cc.p(70, 109), "Siêu Anh Hùng", RobotoRegular.fontName, 18);
            //this["lb_minipoker_0_0_0_0"].setAnchorPoint(0, 0.5);
            //this.addSprite(this["sc_list_hu"], "sp_icon_minipoker_0_0_0_0_0", cc.p(73, 82.5), res_ResourceMenuTab + "/iconVin.png");
            //this["sp_icon_minipoker_0_0_0_0_0"].setAnchorPoint(0, 0.5);
            //this["sp_icon_minipoker_0_0_0_0_0"].setScale(0.32);
            //this.addText(this["sc_list_hu"], "lb_hu_avenger", cc.p(96, 82.5), "500.000", RobotoRegular.fontName, 16);
            //this["lb_hu_avenger"].setColor(GuiUtil.color("#FFFF00"));
            //this["lb_hu_avenger"].setAnchorPoint(0, 0.5);
            //this.addSprite(this["sc_list_hu"], "sp_icon_vqv", cc.p(32, 382.5), res_ResourceMenuTab + "/icon_khobau.png");
            //this["sp_icon_vqv"].setScale(0.8);
            //this.addText(this["sc_list_hu"], "tlt_vqv", cc.p(70, 402), "Vương Quốc "+GameManager.config.moneyName+"", RobotoRegular.fontName, 18);
            //this["tlt_vqv"].setAnchorPoint(0, 0.5);
            //this.addSprite(this["sc_list_hu"], "sp_iconVin_0", cc.p(73, 373.75), res_ResourceMenuTab + "/iconVin.png");
            //this["sp_iconVin_0"].setAnchorPoint(0, 0.5);
            //this["sp_iconVin_0"].setScale(0.32);
            //this.addText(this["sc_list_hu"], "lb_hu_vqv", cc.p(96, 373.75), "500.000", RobotoRegular.fontName, 16);
            //this["lb_hu_vqv"].setColor(GuiUtil.color("#FFFF00"));
            //this["lb_hu_vqv"].setAnchorPoint(0, 0.5);
            //this.addLayout(this, "pn_event_vipcode", cc.p(0, 0), null, cc.size(0, 0), true);
            //this["pn_event_vipcode"].setAnchorPoint(0, 0);
            //this["pn_event_vipcode"].setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            //this["pn_event_vipcode"].setBackGroundColor(GuiUtil.color("#96C8FF"));
            //this["pn_event_vipcode"].setBackGroundColorOpacity(0.4 * 255);
        },
        addItemToList : function(){
            this.sc_list_hu.removeAllChildren();

            for(var i = 0; i < ItemHuSlot.length; i ++) {
                var cellList = new ccui.Layout();
                cellList.height = 70;
                cellList.width = this.sc_list_hu.width;
                cellList.setPosition(cc.p(0, 0));
                cellList.setName(ItemHuSlot[i].name);

                this.addSprite(cellList, "sp" + i, cc.p(cellList.width/7.2, cellList.height/2), ItemHuSlot[i].image, checkLoadtextture(ItemHuSlot[i].image));
                GuiUtil.changeSprite(this["sp" + i], ItemHuSlot[i].image);
                this["sp" + i].setScale(ItemHuSlot[i].scale);

                this.addText(cellList, "txt", cc.p(cellList.width/2 + 30, cellList.height/2 + 12), ItemHuSlot[i].fullname, RobotoRegular.fontName, 18);
                this.addText(cellList, ItemHuSlot[i].lbl_money, cc.p(cellList.width/2 + 30, cellList.height/2 - 16), "500.000", RobotoRegular.fontName, 18);
                this[ItemHuSlot[i].lbl_money].setColor(cc.color("ffff00"));

                this.addSprite(cellList, "sp_xe", cc.p(cellList.width/2 + 90, cellList.height/2 - 16), "res/ResourceMenuTab/iconVin.png");
                this.sp_xe.setScale(0.38);

                this.sc_list_hu.pushBackCustomItem(cellList);
            }
        },

        effectAllHu: function () {
            var fadeInStar = new cc.FadeIn(1.2);
            var fadeOutStar = new cc.FadeOut(1.2);
            var spawnIn = cc.spawn(fadeOutStar, cc.scaleTo(1.2, 0));
            var spawnOut = cc.spawn(fadeInStar, cc.scaleTo(1.2, 1));
            var sequence = cc.sequence(spawnIn, cc.delayTime(0.3), spawnOut);
            this.sp_starhu1.runAction(cc.repeatForever(sequence));

            var fadeInStar2 = new cc.FadeIn(1);
            var fadeOutStar2 = new cc.FadeOut(1);
            var spawnIn2 = cc.spawn(fadeOutStar2, cc.scaleTo(1, 0));
            var spawnOut2 = cc.spawn(fadeInStar2, cc.scaleTo(1, 0.8));
            var sequence2 = cc.sequence(spawnOut2, cc.delayTime(0.5), spawnIn2);
            this.sp_starhu2.runAction(cc.repeatForever(sequence2));

            var fadeInStar3 = new cc.FadeIn(0.7);
            var fadeOutStar3 = new cc.FadeOut(0.7);
            var spawnIn3 = cc.spawn(fadeOutStar3, cc.scaleTo(0.7, 0));
            var spawnOut3 = cc.spawn(fadeInStar3, cc.scaleTo(0.7, 0.4));
            var sequence3 = cc.sequence(spawnIn3, cc.delayTime(0), spawnOut3);
            this.sp_starhu3.runAction(cc.repeatForever(sequence3));
        },
    }
)

var ItemHuSlot = [
    {
        name : "vuongquocvin",
        fullname : "Vương Quốc Vin",
        image : "res/Lobby/IconGame/vuongquocvin.png",
        scale : 0.28,
        callback : "",
        lbl_money : "lb_hu_vqv"
    },
    {
        name : "sieuanhhung",
        fullname : "Siêu Anh Hùng",
        image : "res/Lobby/IconGame/avenger.png",
        scale : 0.28,
        callback : "",
        lbl_money : "lb_hu_avenger"
    },
    {
        name : "nudiepvien",
        fullname : "Nữ Điệp Viên",
        image : "res/Lobby/IconGame/nudiepvien.png",
        scale : 0.28,
        callback : "",
        lbl_money : "lb_hu_nudiepvien"
    },
    {
        name : "khobau",
        fullname : "Kho Báu",
        image : "res/Lobby/IconGame/khobau.png",
        scale : 0.28,
        callback : "",
        lbl_money : "lb_hu_khobau"
    },
    {
        name : "minipoker",
        fullname : "MiniPoker",
        image : "res/Minigame/mini_poke.png",
        scale : 0.8,
        callback : "",
        lbl_money : "lb_hu_minipoker"
    },
    {
        name : "minislot",
        fullname : "Kim Cương",
        image : "res/Minigame/poke_ball.png",
        scale : 0.8,
        callback : "",
        lbl_money : "lb_hu_minislot"
    }
];