var mail_info = null;
var mail_infoX = null;
var mail_infoY = null;
var mail_infoAppear = null;

var code_mail_info = BaseLayer.extend(
    {
        ctor: function () {

            this.resourcePath = "res/ResourceMenuTab/Mail/";
            this.commonImagePath = "res/ResourceMenuTab/";
            this.ImageChungPath = "res/Minigame/ImageChung/";
            // panel mail
            this.arrMail = [];
            this.page_max = 0;
            this.current_page = 1;

            this._super("code_mail_info");
            // this.initWithBinaryFile("res/mail_info.json");
            return true;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Mail/PlistMail.plist");
            this.initPnInboxMail();
            this.initPnReadMail();
            this.otherCustorm();
        },

        initPnInboxMail: function () {
            var layout = this.addLayoutStructure(this, "pn_inbox_mail", cc.p(640.00, 360.00), "", cc.size(1280.00, 720.00), true);

            this.addSpriteStructure(layout, "bg_tab_menu", cc.p(640, 360.41), "bgtab_mail.png");
            this.addButtonStructure(layout, "btn_close_inbox", code_mail_info.BTN_CLOSE_MAIL, cc.p(1145.01, 632.01), true, res_Lobby + "/btnClose.png");
            //this.addSpriteStructure(layout, "bg_title", cc.p(640, 648.19), "Title.png");
            this.addSpriteStructureWithoutResourcePath(layout, "bg_title", cc.p(640, 648.19), res_Lobby + "/titile.png");

            this.addTextStructure(layout, "txtInbox", cc.p(640.00, 651.10), "HÒM THƯ", UTMBebas.fontName, "38", "#642A00", {__size: cc.size(200, 45)});
            this.txtInbox.setColor(GuiUtil.color(162,105,64));
            //this.addImage(layout, "Image_1", cc.p(640, 616.96), this.commonImagePath + "Mail/lopmo.png", cc.size(950.00, 515.00));
            //this.Image_1.setAnchorPoint(0.5, 1.00);

            var sv_mail = this.sv_mail = new ccui.ListView();
            sv_mail.setScrollBarEnabled(0);
            sv_mail.setContentSize(cc.size(940.00, 508.00));
            sv_mail.setPosition(cc.p(640.00, 612.97));
            sv_mail.setAnchorPoint(cc.p(0.50, 1.00));
            layout.addChild(sv_mail);

            var pn_button = this.addLayoutStructure(layout, "pn_button", cc.p(640.00, 82.00), "", cc.size(0, 0), true, {
                anchorX: 0,
                anchorY: 0
            });

            this.addSpriteStructureWithoutResourcePath(pn_button, "sp_page1", cc.p(-7.00, -3.00), this.ImageChungPath + "number.png");
            this.addTextStructure(pn_button, "lb_currentpage", cc.p(-7.31, -2.77), "", fontRobotoBold.fontName, "19", "#FFFFFF", {__size: cc.size(88.00, 23)});
            this.lb_currentpage.setColor(GuiUtil.color(162,105,64));

            this.addButtonStructure(pn_button, "btn_backall", code_mail_info.BTN_MAIL_BACKALL, cc.p(-147.01, -3.00), true, [this.ImageChungPath + "number_backall.png", this.ImageChungPath + "number_backall_s.png"]);
            this.addButtonStructure(pn_button, "btn_back", code_mail_info.BTN_MAIL_BACK, cc.p(-91.00, -3.00), true, [this.ImageChungPath + "number_back.png", this.ImageChungPath + "number_back_s.png"]);
            this.addButtonStructure(pn_button, "btn_next", code_mail_info.BTN_MAIL_NEXT, cc.p(77.00, -3.00), true, [this.ImageChungPath + "number_back.png", this.ImageChungPath + "number_back_s.png"]).setRotationY(180);
            this.addButtonStructure(pn_button, "btn_next_all", code_mail_info.BTN_MAIL_NEXTALL, cc.p(132.91, -3.00), true, [this.ImageChungPath + "number_backall.png", this.ImageChungPath + "number_backall_s.png"]).setRotationY(180);

        },

        initPnReadMail: function () {

            var layout = this.addLayoutStructure(this, "pn_read_mail", cc.p(640.00, 360.00), "", cc.size(1280.00, 720.00), true);

            this.addSpriteStructure(layout, "Image_2", cc.p(641.00, 345.00), "bgtab_mail_s.png");
            this.addButtonStructure(layout, "btn_close_read_mail", code_mail_info.BTN_CLOSE_READ_MAIL, cc.p(1070.15, 577.04), true, res_Lobby + "/btnClose.png");

            var pn_content = this.addLayoutStructure(layout, "pn_content", cc.p(640.00, 323.00), "", cc.size(920.00, 450.00), true);
            this.initPnContent();
        },

        initPnContent: function () {

            var layout = this.pn_content;
            layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            layout.setBackGroundColor(GuiUtil.color("#1E2D64"));
            layout.setBackGroundColorOpacity(0);

            this.addTextStructure(layout, "txt_title", cc.p(65.56, 424.61), "", fontRobotoBold.fontName, "18", "#FFDF58", {
                __size: cc.size(800.00, 30.00),
                anchorX: 0
            }).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            ;
            this.addTextStructure(layout, "txt_author", cc.p(65.56, 391.61), "", RobotoRegular.fontName, "18", "#F7EBC6", {
                __size: cc.size(800.00, 30.00),
                anchorX: 0
            }).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            ;

            var sc_content = this.sc_content = new ccui.ListView();
            sc_content.setScrollBarEnabled(0);
            sc_content.setContentSize(cc.size(800.00, 193.00));
            sc_content.setPosition(cc.p(65.56, 177.60));
            sc_content.setAnchorPoint(cc.p(0, 0));
            // sc_content.setGravity(ccui.ListView.GRAVITY_LEFT);
            // sc_content.setGravity(ccui.ListView.GRAVITY_LEFT);
            // window.sc_content = sc_content;
            sc_content.jumpToTop();
            layout.addChild(sc_content);

            this.addTextStructure(sc_content, "txt_content", cc.p(0.00, 0.00), "", RobotoRegular.fontName, "18", "#FFFFFF", {
                __size: cc.size(800.00, 280.00),
                anchorX: 0,
                anchorY: 0
            }).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.txt_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
            // this.txt_content.width =  800;
            // window.txt_content = this.txt_content;
            // this.txt_content.setC(cc.VERTICAL_TEXT_ALIGNMENT_TOP);


            var vach = this.addLayoutStructure(layout, "vach", cc.p(459.00, 372.00), "", cc.size(907.00, 1), false, {scaleY: 2});
            vach.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            vach.setBackGroundColor(GuiUtil.color("#FFFFFF"));
            vach.setBackGroundColorOpacity(255);

            var vach_0 = this.addLayoutStructure(layout, "vach_0", cc.p(459.00, 176.00), "", cc.size(907.00, 1), false, {scaleY: 2});
            vach_0.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            vach_0.setBackGroundColor(GuiUtil.color("#FFFFFF"));
            vach_0.setBackGroundColorOpacity(255);

            this.addTextStructure(layout, "txt_footer1", cc.p(68.53, 158.31), "GAME BÀI " + GameManager.config.moneyName.toUpperCase()+ " CLUB", fontRobotoBold.fontName, "20", "#FFFFFF", {anchorX: 0});
            this.addTextStructure(layout, "txt_footer2", cc.p(68.53, 129.60), "Trang chủ:", RobotoRegular.fontName, "18", "#FFFFFF", {anchorX: 0});
            this.addTextStructure(layout, "txt_footer3", cc.p(68.53, 101.60), "Email hỗ trợ:", RobotoRegular.fontName, "18", "#FFFFFF", {anchorX: 0});
            this.addTextStructure(layout, "txt_footer4", cc.p(68.53, 74.60), "Tin tức: ", RobotoRegular.fontName, "18", "#FFFFFF", {anchorX: 0});
            this.addTextStructure(layout, "txt_footer5", cc.p(68.53, 47.60), "Fanpage:", RobotoRegular.fontName, "18", "#FFFFFF", {anchorX: 0});
            this.addTextStructure(layout, "txt_footer6", cc.p(68.53, 17.60), "Groups: ", RobotoRegular.fontName, "18", "#FFFFFF", {anchorX: 0});

            var footerTextOptions = {
                titleColor: GuiUtil.color("#ffde00"),
                titleFontName: fontArial.fontName,
                titleFontSize: 18
            }

            this.addButtonStructure(layout, "btn_groups", code_mail_info.BTN_GROUPS, cc.p(325.89, 15.40), false, this.resourcePath + "link_group.png");
            this.addButtonStructure(layout, "btn_fanpage", code_mail_info.BTN_FANPAGE, cc.p(255.64, 40.80), false, this.commonImagePath + "BaoMat/bt1.png",
                this.createButtonText(""+GameManager.webViewLink.fanpage+"", footerTextOptions)).setContentSize(cc.size(372.00, 26));
            this.addButtonStructure(layout, "btn_news", code_mail_info.BTN_NEWS, cc.p(207.09, 72.60), false, this.resourcePath + "link_new.png");
            this.addButtonStructure(layout, "btn_email_support", code_mail_info.BTN_EMAIL_SUPPORT, cc.p(252.82, 99.60), false, this.resourcePath + "link_hotro.png");
            this.addButtonStructure(layout, "btn_homepage", code_mail_info.BTN_HOMEPAGE, cc.p(233.47, 127.60), false, this.resourcePath + "link_homepage.png");

            this.addButtonStructure(layout, "btn_add_giftcode", code_mail_info.BTN_ADD_GIFTCODE, cc.p(913.45, 173.66), false, [this.resourcePath + "xbutton.png", this.resourcePath + "xbutton.png"], {
                anchorX: 1,
                anchorY: 1
            }).setContentSize(cc.size(180.00, 45));
            this.addTextStructure(this.btn_add_giftcode, "lb", cc.p(87.01, 25.55), "Nhận GiftCode", UTMBebas.fontName, "20", "#FFFFFF").setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.lb.setColor(GuiUtil.color(162,105,64));
        },

        otherCustorm: function () {
            this.sc_content.setScrollBarEnabled(false);

            this.btn_fanpage.setTitleText(""+GameManager.webViewLink.fanpage+"");

            // panel Mail
            this.sv_mail.setTouchEnabled(true);
            this.sv_mail.setClippingEnabled(true);
            this.sv_mail.setScrollBarEnabled(false);

            this.pn_inbox_mail.setVisible(false);
            this.pn_read_mail.setScale(0);
            this.pn_read_mail.setVisible(false);
            this.pn_inbox_mail.runAction(cc.sequence(cc.scaleTo(0, 0), cc.delayTime(0.01), cc.callFunc(this.showmail_info)));
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case code_mail_info.BTN_ADD_GIFTCODE:
                    mail_info.pn_read_mail.runAction(cc.scaleTo(0.2, 0));
                    mail_info.pn_read_mail.setVisible(false);
                    opengiftcode2(menutab,this.saveGiftcode_mail);
                    closemail_info();

                    break;
                case code_mail_info.BTN_CLOSE_MAIL:
                    closemail_info();
                    break;
                case code_mail_info.BTN_CLOSE_MAIL:
                    mail_info.pn_inbox_mail.runAction(cc.scaleTo(0.2, 0));
                    break;
                case code_mail_info.BTN_NHAN_LUOT_QUAY:
                    mail_info.pn_ma_xac_nhan_mail.setVisible(true);
                    mail_info.pn_ma_xac_nhan_mail.runAction(cc.scaleTo(0.2, 1));
                    break;
                case code_mail_info.BTN_XOA_MAIL:
                    break;
                case code_mail_info.BTN_CLOSE_READ_MAIL:
                    mail_info.pn_read_mail.runAction(cc.scaleTo(0.2, 0));
                    mail_info.pn_read_mail.setVisible(false);
                    break;
                case code_mail_info.BTN_MAIL_BACKALL:
                    if (this.current_page != 1) {
                        this.current_page = 1;
                        this.parserDataMailUser();
                    }
                    break;
                case code_mail_info.BTN_MAIL_BACK:
                    if (this.current_page >= 2) {
                        this.current_page = this.current_page - 1;
                        this.parserDataMailUser();
                    }
                    break;
                case code_mail_info.BTN_MAIL_NEXT:
                    if (this.current_page < this.page_max) {
                        this.current_page = this.current_page + 1;
                        this.parserDataMailUser();
                    }
                    break;
                case code_mail_info.BTN_MAIL_NEXTALL:
                    cc.log("current_page : " + this.current_page + " page_max : " + this.page_max);
                    if (this.current_page != this.page_max) {
                        this.current_page = this.page_max;
                        this.parserDataMailUser();
                    }
                    break;
                case code_mail_info.BTN_HOMEPAGE:
                    if (cc.sys.isNative) {
                        // ConnectNative.openWebView(GameManager.webViewLink.gameLink);
                    } else {
                        if (lobby.facebook_canvas == false)
                            window.open(GameManager.webViewLink.gameLink);
                    }
                    break;
                case code_mail_info.BTN_EMAIL_SUPPORT:
                    break;
                case code_mail_info.BTN_NEWS:
                    if (cc.sys.isNative) {
                        ConnectNative.openWebView(GameManager.webViewLink.baseLink);
                    } else {
                        if (lobby.facebook_canvas == false)
                            window.open(GameManager.webViewLink.baseLink);
                    }
                    break;
                case code_mail_info.BTN_FANPAGE:
                    if (cc.sys.isNative) {
                        ConnectNative.openWebView(GameManager.webViewLink.fanpage);
                    } else {
                        if (lobby.facebook_canvas == false)
                            window.open(GameManager.webViewLink.fanpage);
                    }
                    break;
                case code_mail_info.BTN_GROUPS:
                    if (cc.sys.isNative) {
                        ConnectNative.openWebView(GameManager.webViewLink.groupFB);
                    } else {
                        if (lobby.facebook_canvas == false)
                            window.open(GameManager.webViewLink.groupFB);
                    }
                    break;
            }
        },
        showmail_info: function () {
            mail_info.pn_inbox_mail.setVisible(true);
            mail_info.pn_inbox_mail.runAction(cc.scaleTo(0.2, 1));
        },
        addLoading: function () {

            cc.log("addLoading");
            if (this.pn_inbox_mail.getChildByName("loadingdata") == null) {
                var loading = this.addSpriteStructureWithoutResourcePath(this.pn_inbox_mail, "loadingdata", cc.p(640.3, 329.85), "res/ResourceMenuTab/Mail/btnRefresh.png");
                loading.setPosition(cc.p(640.3, 329.85));
                loading.setName("loadingdata");
                // this.pn_inbox_mail.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            } else {
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pn_inbox_mail.getChildByName("loadingdata").setVisible(true);
                this.pn_inbox_mail.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },

        closeLoading: function () {
            this.pn_inbox_mail.getChildByName("loadingdata").stopAllActions();
            this.pn_inbox_mail.getChildByName("loadingdata").setVisible(false);
        },

        callBackError: function (response) {
            this.closeLoading();
        },

        parserDataMailUser: function () {
            //var url = urlGetMailUser(userInfo.userData.nickname,this.current_page);
            var url = urlGetMailUser(userInfo.userData.nickname, this.current_page, userInfo.accessToken);
            //cc.log("url " + url);
            sendRequest(url, null, false, mail_info.callBackMailUser, mail_info.callBackError);
            mail_info.addLoading();
        },
        callBackMailUser: function (response) {
            //cc.log("callBackMailUser " + response);
            if (response != "") {
                var jsonData = JSON.parse(response);
                var success = jsonData["success"];
                var errorCode = jsonData["errorCode"];
                if (success) {
                    if (mail_info.arrMail != null)
                        while (mail_info.arrMail.length > 0) {
                            mail_info.arrMail.pop();
                        }

                    var MailUser = jsonData["transactions"];
                    if (MailUser == "") {
                        mail_info.closeLoading();
                    }
                    for (var i = 0; i < MailUser.length; i++) {
                        var counter = MailUser[i];
                        mail_info.arrMail.push(counter);
                    }
                    mail_info.reload_BangMail();
                    if (jsonData["totalPages"] > 1000)
                        mail_info.page_max = 1000;
                    else
                        mail_info.page_max = jsonData["totalPages"];
                    mail_info.lb_currentpage.setString(mail_info.current_page + "/" + mail_info.page_max);
                } else {
                    if (mail_info.arrMail != null)
                        while (mail_info.arrMail.length > 0) {
                            mail_info.arrMail.pop();
                        }
                    //var MailUser = jsonData["transactions"];
                    //for (var i = 0; i < MailUser.length; i++) {
                    //    var counter = MailUser[i];
                    //    mail_info.arrMail.push(counter);
                    //}
                    mail_info.reload_BangMail();
                    mail_info.closeLoading();
                    mail_info.lb_currentpage.setString("");
                    mail_info.page_max = 1;
                }
            }
        },

        reload_BangMail: function () {
            this.sv_mail.removeAllItems();
            this.sv_mail.removeAllChildren();
            var cellHeight = 100;
            var positionY = 42;
            var fonts = {fontName: "Roboto-Medium", src: [{src: "res/Font/Roboto-Medium.ttf", type: "truetype"}]};
            this.saveLenghtArray = this.arrMail.length;
            //cc.log("lengh : " + this.arrMail.length);
            for (var i = 0; i < this.arrMail.length; i++) {
                var cellList = new ccui.Layout();
                cellList.height = cellHeight;
                cellList.width = this.sv_mail.width;
                cellList.setName("cell" + i);
                cellList.setPosition(cc.p(0, 0));

                var bgmail = this.addSpriteStructureWithoutResourcePath(cellList, "__bgmail", cc.p(471, positionY), "res/ResourceMenuTab/Mail/bgtab_mail_small.png");
                bgmail.setScaleY(98/103);
                bgmail.setPosition(cc.p(471, positionY));

                if (parseInt(mail_info.arrMail[i].status) == 0)
                    var sp_mailRead = this.addSpriteStructureWithoutResourcePath(cellList, "sp_mail" + i, cc.p(80, bgmail.y), "res/ResourceMenuTab/Mail/IconMail.png");
                else
                    var sp_mailRead = this.addSpriteStructureWithoutResourcePath(cellList, "sp_mail" + i, cc.p(80, bgmail.y), "res/ResourceMenuTab/Mail/IconMail_s.png");
                sp_mailRead.setPosition(cc.p(80, bgmail.y));

                var lbtitile = new cc.LabelTTF('', fonts.fontName, 18, cc.size(720, 30), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbtitile.setPosition(cc.p(500.74, bgmail.y + 25));
                lbtitile.setString(mail_info.arrMail[i].title);
                lbtitile.setColor(GuiUtil.color("#ffdf58"));

                var lbtime = new cc.LabelTTF('', fonts.fontName, 16, cc.size(720, 30), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbtime.setPosition(cc.p(500.74, bgmail.y));
                lbtime.setString(mail_info.arrMail[i].author + " - " + StringUtility.formatDateTime(mail_info.arrMail[i].createTime));
                lbtime.setColor(GuiUtil.color("#f7ebc6"));

                var lbcontent = new cc.LabelTTF('', fonts.fontName, 16, cc.size(720, 20), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
                lbcontent.setPosition(cc.p(500.74, bgmail.y - 25));
                var str = mail_info.arrMail[i].content;
                lbcontent.setString(str);
                if (str.length >= 85)
                    lbcontent.setString(str.substr(0, 85) + "...");

                var button = new ccui.Button();
                GuiUtil.loadTextureNormal(button, "res/ResourceMenuTab/Mail/btn_readmail.png");
                button.setPosition(cc.p(471, positionY));
                button.setName(i);

                button.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            this.detail_mail(sender.name);
                            break;
                    }

                }, this);

                if (parseInt(mail_info.arrMail[i].sysMail) != 0) {
                    var btnRecycle = new ccui.Button();
                    GuiUtil.loadTextureNormal(btnRecycle, "res/ResourceMenuTab/Mail/btnBin.png");
                    btnRecycle.setPosition(cc.p(890, positionY));
                    btnRecycle.setName(i);

                    btnRecycle.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.Delete_Mail(sender.name);
                                break;
                        }

                    }, this);
                    cellList.addChild(btnRecycle);
                }

                // cellList.addChild(bgmail);
                // cellList.addChild(sp_mailRead);
                cellList.addChild(lbtitile);
                cellList.addChild(lbtime);
                cellList.addChild(lbcontent);
                cellList.addChild(button);


                this.sv_mail.pushBackCustomItem(cellList);
                this.closeLoading();
            }
        },
        detail_mail: function (name) {
            //cc.log("name : " + name);
            this.txt_title.setString(mail_info.arrMail[name].title);
            this.txt_author.setString(mail_info.arrMail[name].author + " - " + StringUtility.formatDateTime(mail_info.arrMail[name].createTime));
            this.txt_content.setString(mail_info.arrMail[name].content);

            if (parseInt(mail_info.arrMail[name].status) == 0) {
                this.parserUpdateMail(mail_info.arrMail[name].mail_id);
                gI.magicDoor.Number_Mail_Unread = gI.magicDoor.Number_Mail_Unread - 1;
                if (Number(gI.magicDoor.Number_Mail_Unread) > 0) {
                    //gI.magicDoor.pCountEmail1.setVisible(true);
                   // gI.magicDoor.pCountEmail2.setVisible(true);
                    //gI.magicDoor.lb_count_email1.setString(gI.magicDoor.Number_Mail_Unread);
                   // gI.magicDoor.lb_count_email2.setString(gI.magicDoor.Number_Mail_Unread);
                } else {
                    //gI.magicDoor.pCountEmail1.setVisible(false);
                   // gI.magicDoor.pCountEmail2.setVisible(false);
                    //gI.magicDoor.lb_count_email1.setString("");
                  //  gI.magicDoor.lb_count_email2.setString("");
                }
                if (mail_info.sv_mail.getChildByName("cell" + name) != null) {
                    var cellList = new ccui.Layout();
                    cellList = mail_info.sv_mail.getChildByName("cell" + name);
                    if (cellList.getChildByName("sp_mail" + name) != null) {
                        var sp_mailRead = new cc.Sprite();
                        sp_mailRead = cellList.getChildByName("sp_mail" + name);
                        GuiUtil.changeSprite(sp_mailRead, "res/ResourceMenuTab/Mail/IconMail_s.png");
                    }
                }
            }
            if (mail_info.arrMail[name].giftCode == null || mail_info.arrMail[name].giftCode == "null") {
                this.btn_add_giftcode.setVisible(false);
            } else {
                this.btn_add_giftcode.setVisible(true);
                this.saveGiftcode_mail = mail_info.arrMail[name].giftCode;
            }

            this.pn_read_mail.setVisible(true);
            this.pn_read_mail.runAction(cc.scaleTo(0.2, 1));
        },

        Delete_Mail: function (name) {
            this.idMail = mail_info.arrMail[name].mail_id;
            //cc.log("idMail: "+ this.idMail);
             gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn xóa thư này!", "ĐỒNG Ý", "HỦY", this.parserDeleteMail, null);
        },

        parserUpdateMail: function (mailid) {
            //var url = urlGetMailUser(userInfo.userData.nickname,this.current_page);
            var url = urlUpdateMailUser(mailid);
            //cc.log("url " + url);
            sendRequest(url, null, false, mail_info.callBackUpdateMail, mail_info.callBackError);
        },

        callBackUpdateMail: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                //cc.log("success");
            }
        },

        parserDeleteMail: function () {
            //var url = urlGetMailUser(userInfo.userData.nickname,this.current_page);
            var url = urlDeleteMailUser(mail_info.idMail);
            //cc.log("url " + url);
            sendRequest(url, null, false, mail_info.callBackDeleteMail, mail_info.callBackError);
        },
        callBackDeleteMail: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                if (mail_info.saveLenghtArray == 1) {
                    if (mail_info.current_page > 1)
                        mail_info.current_page = mail_info.current_page - 1;
                }
                mail_info.parserDataMailUser();
            }
        },


        open : function () {
            if (mail_info)  return;
            mail_info = new code_mail_info();
            mail_infoX = mail_info.getPosition().x;
            mail_infoY = mail_info.getPosition().y;
            var curScene = SceneMgr.getInstance().getRunningScene();
            curScene.addGUI(mail_info, BaseScene.INDEX_INFO_GUI, 0);

            mail_info.parserDataMailUser();
            if (!cc.sys.isNative)
                lobby.menuLayer.pauseItemGameListen();

               // menutab.pauseHeader();
          //  Minigame.btn_mail.stopAllActions();
        },
        close : function () {
            closemail_info();
        }
    }
);
// panel mail
code_mail_info.BTN_CLOSE_MAIL = 160;
code_mail_info.BTN_NHAN_LUOT_QUAY = 161;
code_mail_info.BTN_XOA_MAIL = 162;
code_mail_info.BTN_CLOSE_READ_MAIL = 163;
code_mail_info.BTN_CLOSE_NHAN_LUOT_QUAY = 164;
code_mail_info.BTN_REFRESH_NHAN_LUOT_QUAY = 165;
code_mail_info.BTN_NHAN_LUOT_QUAY = 166;
code_mail_info.BTN_MAIL_BACKALL = 7;
code_mail_info.BTN_MAIL_BACK = 8;
code_mail_info.BTN_MAIL_NEXTALL = 9;
code_mail_info.BTN_MAIL_NEXT = 10;

code_mail_info.BTN_HOMEPAGE = 1;
code_mail_info.BTN_EMAIL_SUPPORT = 2;
code_mail_info.BTN_NEWS = 3;
code_mail_info.BTN_FANPAGE = 4;
code_mail_info.BTN_GROUPS = 5;
code_mail_info.BTN_ADD_GIFTCODE = 6;

var ReadMail = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            mail_info.pn_read_mail.setVisible(true);
            mail_info.pn_read_mail.runAction(cc.scaleTo(0.2, 1));
            return true;
        }
        return false;
    },
});
closemail_info = function () {
    if (mail_info === null) {
        return;
    }
    if (!cc.sys.isNative)
        lobby.menuLayer.resumeItemGameListen();
    mail_info.removeFromParent(true);
    mail_info = null;
};
