/**
 * Created by B150M on 3/23/2018.
 */
var VipLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super();
            this.pn_profile = parent;
            this.save_vin_exchange_vippoint = 0;
            return true;
        },

        customizeGUI: function () {
            this.initPnVip();
            this.initPnThongBao();

        },

        initPnVip: function () {
            var layout = this.addLayoutStructure(this, "pn_vip", cc.p(0, -10), "", cc.size(0.00, 0.00), true, {visible: true});

            this.addImage(layout, "Image_1_0", cc.p(343.81, 386.56), res_ResourceMenuTab_Profile + "/nen_hoso.png", cc.size(436, 200));
            this.addImage(layout, "Image", cc.p(343.81, 177.56), res_ResourceMenuTab_Profile + "/nen_hoso.png", cc.size(436, 200));
            this.addImage(layout, "Image3", cc.p(866, 265.21), res_ResourceMenuTab_Profile + "/nen_hoso.png", cc.size(577, 382.5));

            //this.addSpriteStructureWithoutResourcePath(layout, "Image_0", cc.p(576.45, 456.46), this.commonImagePath + "Mail/lopmo.png").setAnchorPoint(0, 1);
            //this.Image_0.setScale(580.00 / 1002.00, 382.50 / 449.00);

            this.addSpriteStructure(layout, "bg_sp_vip_0", cc.p(640.00, 529.45), res_ResourceMenuTab_Profile + "/bg_hoso.png");
            this.addSpriteStructure(layout, "bg_sp_vip1", cc.p(875.00, 529.45), res_ResourceMenuTab_Profile + "/bg_hoso.png", {anchorX: 0});

            var sliderImages = [res_ResourceMenuTab_BaoMat + "/bt1.png", res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab + "/Vip/lv_vip_user.png"]
            this.addSliderStructure(layout, "slider_da", cc.p(275.00, 539.55), cc.size(142.00, 39.00), 0, sliderImages, false, {anchorX: 1});
            this.addSliderStructure(layout, "slider_dong", cc.p(435.00, 539.55), cc.size(160.00, 17.00), 0, sliderImages, false, {anchorX: 1});
            this.addSliderStructure(layout, "slider_bac", cc.p(611.00, 539.55), cc.size(176.00, 17.00), 0, sliderImages, false, {anchorX: 1});
            this.addSliderStructure(layout, "slider_vang", cc.p(775.00, 539.55), cc.size(164.00, 17.00), 0, sliderImages, false, {anchorX: 1});
            this.addSliderStructure(layout, "slider_bk", cc.p(931.00, 539.55), cc.size(156.00, 17.00), 0, sliderImages, false, {anchorX: 1});
            this.addSliderStructure(layout, "slider_kc", cc.p(1153.00, 539.55), cc.size(222.00, 17.00), 0, sliderImages, false, {anchorX: 1});

            this.addSpriteStructureWithoutResourcePath(layout, "sp_vip", cc.p(640.00, 532.20), res_ResourceMenuTab + "/Vip/lv_vip.png", {nestedProp: true});
            this.addSpriteStructureWithoutResourcePath(layout, "sp_vip_muc", cc.p(640.00, 530.20), res_ResourceMenuTab + "/Vip/lv_vip_muc.png");

            this.initPnCapDo();
            this.initPnPhanThuong();
            this.initPnPhanThuongBig();
            this.funGetVipPoint();
        },

        initPnCapDo: function () {
            var layout = this.addLayoutStructure(this.pn_vip, "pn_cap_do_hien_tai", cc.p(126.000, 479.32), "", cc.size(436.00, 172.00), true, {
                anchorX: 0,
                anchorY: 1
            });
            this.addSpriteStructureWithoutResourcePath(layout, "sp_tab", cc.p(218.13, 162.76), res_ResourceMenuTab + "/Vip/tab_vip.png");
            this.addTextStructure(layout, "lb_0", cc.p(218.13, 163.66), "CẤP ĐỘ HIỆN TẠI CỦA BẠN", RobotoRegular.fontName, "20", "#FFFFFF", {__size: cc.size(270.00, 23)});
            this.addTextStructure(layout, "lb_cap_do_hien_tai", cc.p(417.00, 117.48), "100.000", RobotoRegular.fontName, "17", "#FFFA00", {anchorX: 1});
            GuiUtil.setBackGroundColor(this.addLayoutStructure(layout, "vach_1", cc.p(218.13, 93.76), "", cc.size(437.00, 1), true), GuiUtil.color("#FFFFFF"), 255);
            this.addTextStructure(layout, "lb", cc.p(2.40, 114.97), "Cấp độ hiện tại", RobotoRegular.fontName, "17", "#FFFFFF", {anchorX: 0});
            this.addTextStructure(layout, "lb", cc.p(2.40, 69.97), "Điểm Vip point cấp độ tiếp theo", RobotoRegular.fontName, "17", "#FFFFFF", {anchorX: 0});
            this.addTextStructure(layout, "lb_diem_vip_tiep_theo", cc.p(417.00, 69.97), "500.000", RobotoRegular.fontName, "17", "#FFFA00", {anchorX: 1});
            this.addTextStructure(layout, "lb2", cc.p(2.40, 22.97), "Tổng điểm Vip point đã tích lũy", RobotoRegular.fontName, "17", "#FFFFFF", {anchorX: 0});
            GuiUtil.setBackGroundColor(this.addLayoutStructure(layout, "vach_2", cc.p(218.13, 44.76), "", cc.size(437.00, 1), true), GuiUtil.color("#FFFFFF"), 255);
            this.addTextStructure(layout, "lb_tong_diem_vippoint", cc.p(417.00, 22.97), "3.000.000", RobotoRegular.fontName, "17", "#FFFA00", {anchorX: 1});
        },

        initPnPhanThuong: function () {
            var layout = this.addLayoutStructure(this.pn_vip, "pn_phan_thuong_hien_tai", cc.p(126.000, 271.32), "", cc.size(436.00, 194.00), true, {
                anchorX: 0,
                anchorY: 1
            });
            this.addSpriteStructureWithoutResourcePath(layout, "sp_tab", cc.p(218.13, 200.76), res_ResourceMenuTab + "/Vip/tab_vip.png");
            this.addTextStructure(layout, "lb_0", cc.p(218.13, 201.66), "PHẦN THƯỞNG HIỆN TẠI CỦA BẠN", RobotoRegular.fontName, "20", "#FFFFFF", {__size: cc.size(350.00, 23)});
            this.addTextStructure(layout, "lb_diem_vp_hien_co", cc.p(417.00, 155.48), "100", RobotoRegular.fontName, "17", "#FFFA00", {anchorX: 1});
            GuiUtil.setBackGroundColor(this.addLayoutStructure(layout, "vach_1", cc.p(218.13, 131.76), "", cc.size(437.00, 1), true), GuiUtil.color("#FFFFFF"), 255);
            this.addTextStructure(layout, "lb", cc.p(2.40, 152.97), "Điểm Vip point hiện có", RobotoRegular.fontName, "17", "#FFFFFF", {anchorX: 0});
            this.addTextStructure(layout, "lb", cc.p(1.55, 104.97), "Bạn có thể nhận được điểm thưởng từ những cấp độ đạt \nđược Điểm thưởng có thể quy đổi thành vật phẩm",
                RobotoRegular.fontName, "17", "#FFFFFF", {
                    anchorX: 0,
                    __size: cc.size(432, 40)
                }).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addSpriteStructure(layout, "sp_nen", cc.p(218.13, 42.76), res_ResourceMenuTab_Profile + "/bg_hoso.png", {
                scaleX: 1.48,
                scaley: 1.15
            });
            this.addButtonStructure(layout, "btn_nhan_thuong_vip", VipLayer.BTN_GOTO_NHANTHUONG_VIP, cc.p(222.13, 41.80), true, [res_ResourceMenuTab + "/Vip/btn_nhanthuongvip.png", res_ResourceMenuTab + "/Vip/btn_nhanthuongvip_s.png"]);
        },

        initPnPhanThuongBig: function () {
            var layout = this.addLayoutStructure(this.pn_vip, "pn_phan_thuong_hien_tai", cc.p(577.68, 77.33), "", cc.size(577.00, 408.00), true, {
                anchorX: 0,
                anchorY: 0
            });
            this.addSpriteStructureWithoutResourcePath(layout, "sp_tab", cc.p(287.97, 187.77), res_ResourceMenuTab + "/Vip/tab_phai_vip.png");
            this.addSpriteStructureWithoutResourcePath(layout, "sp_title", cc.p(288.50, 392.90), res_ResourceMenuTab + "/Vip/tab_vip.png", {scaleX: 1.33});
            this.addTextStructure(layout, "lb_title", cc.p(288.50, 392.90), "PHẦN THƯỞNG HIỆN TẠI CỦA BẠN", RobotoRegular.fontName, "20", "#FFFFFF");
        },

        initPnThongBao: function () {
            var layout = this.addLayoutStructure(this, "pn_thongbao", cc.p(640.00, 351.00), "", cc.size(0.00, 0.00), true, {visible: false});
            this.addButtonStructure(layout, "btn_close_thongbao", VipLayer.BTN_CLOSE_THONGBAO, cc.p(0, 10), false, res_ResourceMenuTab_Shopping + "/btn_shop.png");
            this.addSpriteStructureWithoutResourcePath(layout, "bg", cc.p(0, 98), res_ResourceMenuTab_Mail+ "/bg_supersmaill_mail.png").setAnchorPoint(0.5, 1);
            this.bg.setScale(760.00 / 560.00, 150.00 / 242.00);
            this.addTextStructure(layout, "Text_14", cc.p(0, 58.00), "THÔNG BÁO", fontRobotoRegular.fontName, "36", "#FFFFFF", {__size: cc.size(240, 42)});
            this.addTextStructure(layout, "ct_success", cc.p(0, 13.00), "Đổi Vip point thành công, bạn nhận được:", fontRobotoRegular.fontName, "18", "#FFFFFF", {__size: cc.size(400, 21)});
            this.addTextStructure(layout, "ct_vin", cc.p(0, -18.00, "+ 1.000.000 "+GameManager.config.moneyName+"", fontRobotoRegular.fontName, "20", "#F400FF", {__size: cc.size(400, 25)}));


        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case VipLayer.BTN_GOTO_NHANTHUONG_VIP:
                    if (cc.sys.isNative) {

                        ConnectNative.openWebView(GameManager.webViewLink.thuongVip);

                    } else {

                        window.open(GameManager.webViewLink.thuongVip);
                    }
                    break;
                case VipLayer.BTN_CLOSE_THONGBAO:
                    this.pn_thongbao.setVisible(false);
                    this.pn_thongbao.setScale(0);
                    this.ct_vin.setString("");


                    break;
            }
        },

        funGetVipPoint: function () {
            var url = urlGetVipPoint(userInfo.userData.nickname);
            //cc.log("url " + url);
            sendRequest(url, null, false, this.callBackGetVippoint.bind(this), this.callBackError.bind(this));
        },
        callBackGetVippoint: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            var ratioList = jsonData["ratioList"];
            this.save_vin_exchange_vippoint = 0;
            if (success) {
                userInfo.userData.vippoint = jsonData["vippoint"];
                userInfo.userData.vippointSave = jsonData["vippointSave"];
                this.lb_diem_vp_hien_co.setString(formatMoney(0, 3,userInfo.userData.vippoint));
                this.lb_tong_diem_vippoint.setString(formatMoney(0, 3,userInfo.userData.vippointSave));
                this.genVipPoint(userInfo.userData.vippointSave);
                this.checkVipPoint_Profile(userInfo.userData.vippointSave);

                var cellHeight = 38;
                var positionY = 398.85;
                var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};

                for (var i = 1; i < (ratioList.length + 1); i++) {
                    if (this.pn_vip.getChildByName("lb_vip_ht_" + i) == null) {
                        var lb_vip_ht = new cc.LabelTTF('', fonts.fontName, 15, cc.size(137, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                        lb_vip_ht.setName("lb_vip_ht_" + i);
                        lb_vip_ht.setAnchorPoint(0.5, 0.5);
                        lb_vip_ht.setPosition(cc.p(782.78, positionY));
                        lb_vip_ht.setString(formatMoney(0, 3, userInfo.userData.vippoint));
                        lb_vip_ht.setColor(GuiUtil.color("#ffffff"));

                        this.pn_vip.addChild(lb_vip_ht);
                    } else {
                        var lb_vip_ht = this.pn_vip.getChildByName("lb_vip_ht_" + i);
                        lb_vip_ht.setString(formatMoney(0, 3, userInfo.userData.vippoint));
                    }

                    if (this.pn_vip.getChildByName("lb_vip_ex_" + i) == null) {
                        var lb_vip_ex = new cc.LabelTTF('', fonts.fontName, 15, cc.size(152, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                        lb_vip_ex.setName("lb_vip_ex_" + i);
                        lb_vip_ex.setAnchorPoint(0.5, 0.5);
                        lb_vip_ex.setPosition(cc.p(919.54, positionY));
                        var heso = userInfo.userData.vippoint * parseInt(ratioList[i - 1]);
                        lb_vip_ex.setString(formatMoney(0, 3, heso));
                        lb_vip_ex.setColor(GuiUtil.color("#FFFF00"));

                        this.pn_vip.addChild(lb_vip_ex);
                    } else {
                        var lb_vip_ex = this.pn_vip.getChildByName("lb_vip_ex_" + i);
                        var heso = userInfo.userData.vippoint * parseInt(ratioList[i - 1]);
                        lb_vip_ex.setString(formatMoney(0, 3, heso));
                    }

                    if (i != 1) {
                        if (i != this.mucNhanVip || userInfo.userData.vippoint <= 0) {
                            if (this.pn_vip.getChildByName("btn_nhanthuong_" + i) == null) {
                                var button = new ccui.Button();
                                GuiUtil.loadTextureNormal(button, "res/ResourceMenuTab/Vip/btn_nhanthuong_dis.png");
                                button.setName("btn_nhanthuong_" + i);
                                button.setPosition(cc.p(1074.95, positionY));
                                button.setEnabled(false);
                                button.addTouchEventListener(function (sender, type) {
                                    switch (type) {
                                        case ccui.Widget.TOUCH_ENDED:
                                            this.detail_nhan_vip(sender.name);
                                            break;
                                    }

                                }, this);
                                this.pn_vip.addChild(button);
                            } else {
                                var button = this.pn_vip.getChildByName("btn_nhanthuong_" + i);
                                GuiUtil.loadTextureNormal(button, "res/ResourceMenuTab/Vip/btn_nhanthuong_dis.png");
                                button.setEnabled(false);
                            }
                        } else {
                            if (this.pn_vip.getChildByName("btn_nhanthuong_" + i) == null) {
                                var button = new ccui.Button();
                                GuiUtil.loadTextureNormal(button, "res/ResourceMenuTab/Vip/btn_nhanthuong.png");
                                GuiUtil.loadTexturePressed(button, "res/ResourceMenuTab/Vip/btn_nhanthuong_s.png");
                                button.setName("btn_nhanthuong_" + i);
                                button.setPosition(cc.p(1074.95, positionY));
                                button.setEnabled(true);

                                button.addTouchEventListener(function (sender, type) {
                                    switch (type) {
                                        case ccui.Widget.TOUCH_ENDED:
                                            this.detail_nhan_vip(sender.name);
                                            break;
                                    }

                                }, this);
                                this.pn_vip.addChild(button);
                                this.save_vin_exchange_vippoint = userInfo.userData.vippoint * parseInt(ratioList[i - 1]);
                            } else {
                                var button = this.pn_vip.getChildByName("btn_nhanthuong_" + i);
                                GuiUtil.loadTextureNormal(button, "res/ResourceMenuTab/Vip/btn_nhanthuong.png");
                                GuiUtil.loadTexturePressed(button, "res/ResourceMenuTab/Vip/btn_nhanthuong_s.png");
                                button.setEnabled(true);
                                this.save_vin_exchange_vippoint = userInfo.userData.vippoint * parseInt(ratioList[i - 1]);
                            }
                        }
                    }

                    positionY = positionY - 38;
                }
            } else {
                gI.popUp.openPanel_Alert_Lobby("Hệ thống đang tạm thời gián đoạn!");
            }
        },

        detail_nhan_vip: function (value) {
            cc.log("click vao");
            gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn nhận thưởng vippoint\nTương ứng với cấp Vippoint hiện tại bạn nhận được :\n" +
                formatMoney(0, 3, this.save_vin_exchange_vippoint) + " " + GameManager.config.moneyName + " ?", "ĐỒNG Ý", "HỦY", this.confirmNhanThuongVipPoint, null);
        },
        confirmNhanThuongVipPoint: function () {
            if (gI.mainSocket.listener.isLogged) {
                cc.log("go");
                var profileUser = new CmdSendExchangeVippont();
                profileUser.putExchangeVippint();
                gI.mainSocket.send(profileUser);
                profileUser.clean();
            } else {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                gI.mainSocket.connectSocket();
            }
        },

        responseExchangeVippoint: function (error) {
            cc.log("error3 : " + error);
            if (error == 0) {
                //cc.log("vao day : " );
                openpn_otp("Vui lòng nhập mã OTP để hoàn tất nhận thưởng Vip point!", 1,4);
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Hệ thống đang tạm thời gián đoạn!");
            } else if (error == 2) {
                cc.log("vao fix");
                gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Bạn chưa đăng ký bảo mật!\n Bạn có muốn đăng ký luôn không?", "ĐỒNG Ý", "HỦY", menutab.profileLayer.gotoSercurity, null);
            }
        },

        responseResultExchangeVippoint: function (error, currentMoney, moneyAdd) {
            cc.log("error4 : " + error + " currentMoney : " + currentMoney + " moneyAdd : " + moneyAdd);
            if (error == 0) {
                this.pn_thongbao.setVisible(true);
                this.pn_thongbao.runAction(cc.scaleTo(0.2, 1));
                this.ct_vin.setString("+" + formatMoney(0, 3, parseInt(moneyAdd)) + " " + GameManager.config.moneyName + "");
                if (userInfo == null) {
                } else {
                    userInfo.userData.vinTotal = currentMoney;
                    menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                }
                this.funGetVipPoint();
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Hệ thống đang tạm thời gián đoạn!");
            } else if (error == 2) {
                gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Bạn chưa đăng ký bảo mật!\n Bạn có muốn đăng ký luôn không?", "ĐỒNG Ý", "HỦY", menutab.profileLayer.gotoSercurity, null);
            }
        },

        callBackError: function (response) {
        },

        checkVipPoint_Profile: function (value) {
            this.resetAllVippointSlider();
            if (value <= 80) {
                this.lb_diem_vip_tiep_theo.setString("80");
                this.slider_da.setPercent(100 * userInfo.userData.vippointSave / 80);
                this.mucNhanVip = 1;
            } else if (value > 80 && value <= 800) {
                this.lb_diem_vip_tiep_theo.setString("800");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100 * userInfo.userData.vippointSave / 800);
                this.mucNhanVip = 2;
            } else if (value > 800 && value <= 4500) {
                this.lb_diem_vip_tiep_theo.setString("4.500");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100 * userInfo.userData.vippointSave / 4500);
                this.mucNhanVip = 3;
            } else if (value > 4500 && value <= 8600) {
                this.lb_diem_vip_tiep_theo.setString("8.600");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100 * userInfo.userData.vippointSave / 8600);
                this.mucNhanVip = 4;
            } else if (value > 8600 && value <= 12000) {
                this.lb_diem_vip_tiep_theo.setString("12.000");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100);
                this.slider_bk.setPercent(100 * userInfo.userData.vippointSave / 50000);
                this.mucNhanVip = 5;
            } else if (value > 12000 && value <= 50000) {
                this.lb_diem_vip_tiep_theo.setString("50.000");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100);
                this.slider_bk.setPercent(100 * userInfo.userData.vippointSave / 50000);
                this.mucNhanVip = 6;
            } else if (value > 50000 && value <= 100000) {
                this.lb_diem_vip_tiep_theo.setString("100.000");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100);
                this.slider_bk.setPercent(100);
                this.slider_kc.setPercent(100 * userInfo.userData.vippointSave / 1000000);
                this.mucNhanVip = 7;
            } else if (value > 100000 && value <= 200000) {
                this.lb_diem_vip_tiep_theo.setString("200.000");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100);
                this.slider_bk.setPercent(100);
                this.slider_kc.setPercent(100 * userInfo.userData.vippointSave / 1000000);
                this.mucNhanVip = 8;
            } else if (value > 200000) {
                this.lb_diem_vip_tiep_theo.setString("1.000.000");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100);
                this.slider_bk.setPercent(100);
                this.slider_kc.setPercent(100 * userInfo.userData.vippointSave / 1000000);
                this.mucNhanVip = 9;
            }
        },
        resetAllVippointSlider: function () {
            this.slider_da.setPercent(0);
            this.slider_dong.setPercent(0);
            this.slider_bac.setPercent(0);
            this.slider_vang.setPercent(0);
            this.slider_bk.setPercent(0);
            this.slider_kc.setPercent(0);
        },

        genVipPoint:function (value) {
            for (var i = 0; i < vipPointDefine.length; i++)
            {
                if(value > vipPointDefine[i].minVp && value <= vipPointDefine[i].maxVp)
                {
                    this.lb_cap_do_hien_tai.setString(vipPointDefine[i].name);
                }
            }
        },


    });


VipLayer.BTN_GOTO_NHANTHUONG_VIP = 1;