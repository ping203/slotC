(function () {


    var codeVQMM = uc.VQMM = BaseLayer.extend({
        ctor: function () {
            this.pn_vqmm = null;
            this.btninfo = null;
            this.btnclose = null;
            this.notice = null;
            this.btnStart = null;
            this.btnCloseNotice = null;
            this.txtNotice = null;

            this.VQMMVongngoai = null;
            this.VQMMVongtrong = null;
            this.vong_vin = null;
            this.VQMMResultVongNgoai = "";
            this.VQMMResultVongTrong = "";
            this.VQMMResultVongVin = "";

            this.VQMMbtnStart = null;
            this.VQMMNotice = null;
            this.lb_soluotquay = null;
            this.countVQMM = null;
            this.content_mess_trong = "";
            this.content_mess_ngoai = "";
            this.content_mess_vin = "";
            this.gocrotate = 0;
            this.gocrotateIn = 0;
            this.isRotate = false;
            this.isStopVongTrong = false;
            this.deltarotate = 10;
            this.deltarotateIn = 8;
            this.gocsosanh = 360;
            this.gocsosanhIn = 360;
            this.isresult = false;
            this.count_wait = 0;
            this.currentMoneyVin = null;
            this.currentMoneyXu = null;

            this.rotate_wait_result = 0;
            this.rotate_wait_resultIn = 0;
            this.playOrNot = false;

            this.pn_tanthu = null;
            this.btn_close_tanthu = null;
            this.btn_thamgia_tanthu = null;
            this.txt_user_tanthu = null;
            if (lobby.facebook_canvas == false)
                this.link_tanthu = GameManager.webViewLink.linkTanThu;

            this.pn_light = null;
            this.pn_chan = null;
            this.pn_le = null;
            this.is_light_on = false;
            this.btnguild = null;

            this._super("VongQuayMM");
            //this.initWithBinaryFile("res/VongQuayMM.json");
            return true;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ResVQMM/Plist_VQMM.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/PlistImageChung.plist");
            this.addLayout(this, "pn_vqmm", cc.p(640, 360), null, cc.size(1280, 720), true);
            this.pn_vqmm.setScale(0);
            this.addLayout(this.pn_vqmm, "pn_lopmo", cc.p(640, 360), null, cc.size(1280, 720), true);
            this.pn_lopmo.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pn_lopmo.setBackGroundColor(GuiUtil.color("#000000"));
            this.pn_lopmo.setBackGroundColorOpacity(178);

            this.addSprite(this.pn_vqmm, "bg_vongvin", cc.p(397.69, 337.49), res_VQMM + "/bg_vong_vin.png");
            this.addSprite(this.pn_vqmm, "vong_vin", cc.p(397.69, 316.49), res_VQMM + "/vong_vin.png");
            this.addSprite(this.pn_vqmm, "muiten_small", cc.p(396.84, 501.10), res_VQMM + "/muiten.png");
            this.muiten_small.setScale(0.8);
            this.addSprite(this.pn_vqmm, "BackVQMM", cc.p(810.72, 345.02), res_VQMM + "/BackVQMM.png");

            this.addLayout(this.pn_vqmm, "VQMMVongngoai", cc.p(810.75, 315.99), null, cc.size(200, 200), true);
            this.addSprite(this.VQMMVongngoai, "spnoidung", cc.p(100, 100), res_VQMM + "/Vongngoai.png");
            this.addSprite(this.pn_vqmm, "VQMMVongtrong", cc.p(810.72, 316), res_VQMM + "/Vongtrong.png");
            this.addImage(this.pn_vqmm, "muiten", cc.p(811.03, 554.10), res_VQMM + "/muiten.png", cc.size(181, 69));

            this.addButton(this.pn_vqmm, "VQMMbtnStart", codeVQMM.BTN_STARTROTATE, cc.p(810.71, 314.85), true, res_VQMM + "/btnQuay.png", res_VQMM + "/btnQuay_s.png");
            this.VQMMbtnStart.setPressedActionEnabled(false);
            // this.VQMMbtnStart.loadTextureDisabled(res_VQMM+ "/btnQuay_s.png");
            this.addButton(this.pn_vqmm, "btninfo", codeVQMM.BTN_INFO, cc.p(565.03, 495.77), true, res_VQMM + "/btn_info.png", res_VQMM + "/btn_info.png");
            this.addButton(this.pn_vqmm, "btnguild", codeVQMM.BTN_GUILD, cc.p(228.37, 495.77), true, res_VQMM + "/Hoi.png", res_VQMM + "/Hoi.png");
            this.addButton(this.pn_vqmm, "btnclose", codeVQMM.BTN_CLOSEGAME, cc.p(1066.46, 495.78), true, "res/Minigame/ImageChung/btn_closegame.png", "res/Minigame/ImageChung/btn_closegame.png");

            this.addSprite(this.pn_vqmm, "bg_number", cc.p(397.69, 316.49), res_VQMM + "/bg_number_luot.png");
            this.addText(this.pn_vqmm, "lb_soluotquay", cc.p(398.69, 315.49), "2", fontRobotoMedium.fontName, 80);
            this.lb_soluotquay.ignoreContentAdaptWithSize(false);
            this.lb_soluotquay.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.lb_soluotquay.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_soluotquay.setContentSize(cc.size(105, 103));
            this.lb_soluotquay.setColor(GuiUtil.color("#cc0000"));

            this.addSprite(this.pn_vqmm, "trangtri", cc.p(450.03, 65.79), res_VQMM + "/bg_vonquay.png");

            this.addLayout(this.pn_vqmm, "pn_light", cc.p(0, 0), null, cc.size(0, 0), true);
            this.addLayout(this.pn_light, "pn_chan", cc.p(0, 0), null, cc.size(0, 0), true);
            this.addLayout(this.pn_light, "pn_le", cc.p(0, 0), null, cc.size(0, 0), true);
            this.addSprite(this.pn_chan, "sp_1", cc.p(565.53, 317.11), res_VQMM + "/light.png");
            this.addSprite(this.pn_chan, "sp_2", cc.p(688.66, 529.64), res_VQMM + "/light.png");
            this.addSprite(this.pn_chan, "sp_3", cc.p(933.73, 530.65), res_VQMM + "/light.png");
            this.addSprite(this.pn_chan, "sp_4", cc.p(1057.72, 317.65), res_VQMM + "/light.png");
            this.addSprite(this.pn_chan, "sp_5", cc.p(934.18, 103.26), res_VQMM + "/light.png");
            this.addSprite(this.pn_chan, "sp_6", cc.p(687.33, 104.90), res_VQMM + "/light.png");
            this.addSprite(this.pn_chan, "sp_7", cc.p(260.83, 454.98), res_VQMM + "/light.png");
            this.addSprite(this.pn_chan, "sp_8", cc.p(535.20, 454.14), res_VQMM + "/light.png");
            this.addSprite(this.pn_chan, "sp_9", cc.p(535.11, 179.32), res_VQMM + "/light.png");
            this.addSprite(this.pn_chan, "sp_10", cc.p(260.85, 179.09), res_VQMM + "/light.png");
            this.sp_7.setScale(0.7);
            this.sp_8.setScale(0.7);
            this.sp_9.setScale(0.7);
            this.sp_10.setScale(0.7);

            this.addSprite(this.pn_le, "l_1", cc.p(599.24, 439.49), res_VQMM + "/light.png");
            this.addSprite(this.pn_le, "l_2", cc.p(1024.29, 440.10), res_VQMM + "/light.png");
            this.addSprite(this.pn_le, "l_3", cc.p(1024.44, 194.36), res_VQMM + "/light.png");
            this.addSprite(this.pn_le, "l_4", cc.p(810.21, 70.95), res_VQMM + "/light.png");
            this.addSprite(this.pn_le, "l_5", cc.p(598.64, 192.90), res_VQMM + "/light.png");
            this.addSprite(this.pn_le, "l_6", cc.p(203.77, 316.40), res_VQMM + "/light.png");
            this.l_6.setScale(0.7);

            this.addLayout(this.pn_vqmm, "VQMMNotice", cc.p(809.73, 322.03), null, cc.size(611, 250), true);
            this.VQMMNotice.setScale(0);
            this.VQMMNotice.setVisible(false);
            this.addImage(this.VQMMNotice, "bg_notice", cc.p(307.24, 121), res_VQMM + "/notice.png", cc.size(508, 261));
            this.addButton(this.VQMMNotice, "btnCloseNotice", codeVQMM.BTN_CLOSENOTICE, cc.p(548.48, 210.64), true, "res/Minigame/ImageChung/btn_closegame.png", "res/Minigame/ImageChung/btn_closegame.png");
            this.addText(this.VQMMNotice, "txtNotice", cc.p(306.80, 123.94), "", fontRobotoMedium.fontName, 22);
            this.txtNotice.ignoreContentAdaptWithSize(false);
            this.txtNotice.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txtNotice.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.txtNotice.setContentSize(cc.size(300, 200));
            this.txtNotice.setColor(GuiUtil.color("#FFFFFF"));
            this.txtNotice.setString("");

            this.addLayout(this, "pn_tanthu", cc.p(640, 336), null, cc.size(707, 367), true);
            this.pn_tanthu.setVisible(false);
            this.pn_tanthu.setScale(0);
            this.addImage(this.pn_tanthu, "bg", cc.p(354.59, 184.79), "res/ResourceMenuTab/Mail/bgtab_mail.png", cc.size(707, 370));
            this.addLayout(this.pn_tanthu, "nen", cc.p(353.59, 191.99), null, cc.size(686, 219), false);
            this.nen.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.nen.setBackGroundColor(GuiUtil.color("#702623"));
            this.nen.setBackGroundColorOpacity(150);

            this.addImage(this.pn_tanthu, "titile", cc.p(353.59, 344.97), "res/Minigame/ImageChung/Title.png", cc.size(436, 62));
            this.addText(this.pn_tanthu, "txt_title", cc.p(354.59, 344.62), "HƯỚNG DẪN TÂN THỦ", RobotoRegular.fontName, 32);
            this.txt_title.ignoreContentAdaptWithSize(false);
            this.txt_title.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_title.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.txt_title.setContentSize(cc.size(350, 38));
            this.txt_title.setColor(GuiUtil.color("#AF4900"));
            this.addButton(this.pn_tanthu, "btn_close_tanthu", codeVQMM.BTN_CLOSE_TANTHU, cc.p(672.50, 335.66), true, res_Lobby + "/btnClose.png", res_Lobby + "/btnClose_s.png");

            this.addLayout(this.pn_tanthu, "pn_noidung", cc.p(14.63, -45.38), null, cc.size(0, 0), true);
            this.addText(this.pn_noidung, "Text_2", cc.p(339.59, 248.31), "Chào\n\n" +
                "Cảm ơn bạn đã lựa chọn " + GameManager.webViewLink.productName + ".com.\n" +
                "Để nhận GiftCode Tân Thủ, bạn vui lòng tham gia và điền đầy đủ thông tin theo hướng dẫn.\n\n" +
                "***Lưu ý:\n" +
                "   - 1 Tài khoản chỉ được nhận 1 Giftcode Tân Thủ.\n" +
                "   - Tài khoản phải được kích hoạt bảo mật bằng SĐT mới sử dụng Giftcode.\n" +
                "   - Cố tình sử dụng nhiều Giftcode hoặc lợi dụng kẽ hở của game để trục lợi sẽ bị khóa.", RobotoRegular.fontName, 16);
            this.Text_2.ignoreContentAdaptWithSize(false);
            this.Text_2.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.Text_2.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
            this.Text_2.setContentSize(cc.size(673, 171));
            this.Text_2.setColor(GuiUtil.color("#FFFFFF"));

            this.addButtonStructure(this.pn_tanthu, "btn_thamgia_tanthu", codeVQMM.BTN_JOIN_TANTHU, cc.p(357.59, 43.12), true,
                ["res/ResourceMenuTab/Mail/xbutton.png", "res/ResourceMenuTab/Mail/xbutton.png"]).setScale(1, 1);
            this.btn_thamgia_tanthu.ignoreContentAdaptWithSize(false);
            this.btn_thamgia_tanthu.setContentSize(cc.size(362, 51));
            this.addTextStructure(this.pn_tanthu, "Text_3", cc.p(354.59, 46.57), "ĐĂNG KÝ NHẬN GIFTCODE", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.Text_3.setColor(GuiUtil.color(162, 105, 64));
            this.addText(this.pn_tanthu, "txt_user_tanthu", cc.p(149.58, 278.93), "user", RobotoRegular.fontName, 16);
            this.txt_user_tanthu.ignoreContentAdaptWithSize(false);
            this.txt_user_tanthu.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.txt_user_tanthu.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.txt_user_tanthu.setContentSize(cc.size(173, 19));
            this.txt_user_tanthu.setColor(GuiUtil.color("#F6EB75"));

            this.lb_soluotquay.setString(userInfo.userData.luckyRotate);
            this.countVQMM = userInfo.userData.luckyRotate;
            this.pn_vqmm.runAction(cc.scaleTo(0.2, 1));

            if (lobby.isNewUser == true) {
                this.pn_tanthu.setVisible(false);
                this.pn_tanthu.runAction(cc.scaleTo(0.2, 1));
                lobby.isNewUser = false;
            }
        },
        EffectLight: function () {
            this.pn_light.stopAllActions();
            if (this.is_light_on == false) {
                this.pn_le.setVisible(false);
                this.pn_chan.setVisible(true);
                this.is_light_on = true;
            } else {
                this.pn_le.setVisible(true);
                this.pn_chan.setVisible(false);
                this.is_light_on = false;
            }
            this.pn_light.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(this.EffectLight, this)));
        },
        EffectLightFinish: function () {
            this.pn_light.stopAllActions();
            if (this.is_light_on == false) {
                this.pn_le.setVisible(true);
                this.pn_chan.setVisible(true);
                this.is_light_on = true;
            } else {
                this.pn_le.setVisible(false);
                this.pn_chan.setVisible(false);
                this.is_light_on = false;
            }
            this.pn_light.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(this.EffectLightFinish, this)));
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case codeVQMM.BTN_CLOSE_TANTHU:
                    this.pn_tanthu.setScale(0);
                    this.pn_tanthu.setVisible(false);
                    break;
                case codeVQMM.BTN_JOIN_TANTHU:
                    if (cc.sys.isNative) {
                        ConnectNative.openWebView(GameManager.webViewLink.linkTanThu);
                    } else
                        window.open(GameManager.webViewLink.linkTanThu);
                    break;
                case codeVQMM.BTN_INFO:
                    openvongquay_ls();
                    break;
                case codeVQMM.BTN_CLOSEGAME:
                    this.close();
                    break;
                case codeVQMM.BTN_STARTROTATE:
                    if (this.countVQMM > 0) {
                        this.VQMMbtnStart.setEnabled(false);
                        var vqmmSend = new CmdSendVQMM();
                        vqmmSend.putStartVQMM();
                        Minigame.miniGameClient.send(vqmmSend);
                        vqmmSend.clean();
                    } else {
                        this.VQMMbtnStart.setEnabled(true);
                        this.showNoticeVQMM("Bạn đã hết lượt quay!");
                    }
                    break;
                case codeVQMM.BTN_CLOSENOTICE:
                    this.VQMMNotice.runAction(cc.scaleTo(0.2, 0));
                    this.VQMMNotice.setVisible(false);
                    break;
                case codeVQMM.BTN_GUILD:
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        if (lobby.open_payment_ios == false)
                            return;
                    }
                    ConnectNative.openWebView(GameManager.webViewLink.guildVQMM);
                    // openvqmm_thele();
                    break;
            }
        },

        stopRotate: function () {
            //gI.vqmm.unscheduleUpdate();
            gI.vqmm.VQMMVongngoai.stopAllActions();
            gI.vqmm.VQMMVongngoai.setRotation(0);
            gI.vqmm.VQMMVongtrong.stopAllActions();
            gI.vqmm.VQMMVongtrong.setRotation(0);
            gI.vqmm.vong_vin.stopAllActions();
            gI.vqmm.vong_vin.setRotation(0);
            gI.vqmm.VQMMbtnStart.setEnabled(true);
            gI.vqmm.btninfo.setEnabled(true);
            if (this.playOrNot == true) {
                if (userInfo.userData == null) {
                } else {
                    userInfo.userData.vinTotal = gI.vqmm.currentMoneyVin;
                    userInfo.userData.xuTotal = gI.vqmm.currentMoneyXu;

                    menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(gI.vqmm.currentMoneyVin)));
                    menutab.userManager.lb_blance_xu.setString(formatMoney(0, 3, parseInt(gI.vqmm.currentMoneyXu)));
                }
                this.playOrNot = false;
            }
        },

        TurnOffNotice: function () {
            this.VQMMNotice.setScale(0);
            this.VQMMNotice.setVisible(false);
            this.VQMMNotice.stopAllActions();
        },

        StartRotate: function () {
            gI.vqmm.VQMMVongngoai.stopAllActions();
            gI.vqmm.VQMMVongngoai.setRotation(0);
            gI.vqmm.VQMMVongtrong.stopAllActions();
            gI.vqmm.VQMMVongtrong.setRotation(0);
            gI.vqmm.vong_vin.stopAllActions();
            gI.vqmm.vong_vin.setRotation(0);
            var data_vongngoai = this.getTimeAndRotate_Ngoai();
            var R_vongngoai = cc.rotateBy(data_vongngoai[1], data_vongngoai[0]);
            var action_R_vongngoai = R_vongngoai.easing(cc.easeQuinticActionInOut());
            this.VQMMVongngoai.runAction(action_R_vongngoai);

            var data_vongtrong = this.getTimeAndRotate_Trong();
            var R_vongtrong = cc.rotateBy(data_vongtrong[1], data_vongtrong[0]);
            var action_R_vongtrong = R_vongtrong.easing(cc.easeQuinticActionInOut());
            this.VQMMVongtrong.runAction(cc.sequence(action_R_vongtrong, cc.callFunc(this.FinishRotate, this)));

            var data_vongVin = this.getTimeAndRotate_Vin();
            var R_vongVin = cc.rotateBy(data_vongVin[1], data_vongVin[0]);
            var action_R_vongVin = R_vongVin.easing(cc.easeQuinticActionInOut());
            this.vong_vin.runAction(action_R_vongVin);

            this.EffectLight();
        },

        getTimeAndRotate_Ngoai: function () {
            var gocRotate = 0;  // 1440;
            var timeRotate = 0; // 4
            if (this.VQMMResultVongNgoai == "KhoBau3") {
                gocRotate = 1455;
                timeRotate = 7;
                this.content_mess_ngoai = "3 lượt quay Kho Báu";
            } else if (this.VQMMResultVongNgoai == "NuDiepVien1") {
                var arr = [1575, 1785];
                var ran = this.getRandomNumber(0, 1);
                gocRotate = arr[ran];
                timeRotate = 7;
                this.content_mess_ngoai = "1 lượt quay Nữ Điệp Viên";
            } else if (this.VQMMResultVongNgoai == "NuDiepVien2") {
                gocRotate = 1485;
                timeRotate = 7.1;
                this.content_mess_ngoai = "2 lượt quay Nữ Điệp Viên";
            } else if (this.VQMMResultVongNgoai == "KhoBau1") {
                gocRotate = 1725;
                timeRotate = 7;
                this.content_mess_ngoai = "1 lượt quay Kho Báu";
            } else if (this.VQMMResultVongNgoai == "fail") {
                gocRotate = 1695;
                timeRotate = 6.7;
                this.content_mess_ngoai = "";
            } else if (this.VQMMResultVongNgoai == "NuDiepVien3") {
                gocRotate = 1665;
                timeRotate = 6.5;
                this.content_mess_ngoai = "3 lượt quay Nữ Điệp Viên";
            } else if (this.VQMMResultVongNgoai == "SieuAnhHung2") {
                gocRotate = 1755;
                timeRotate = 6.8;
                this.content_mess_ngoai = "2 lượt quay Siêu Anh Hùng";
            } else if (this.VQMMResultVongNgoai == "KhoBau2") {
                gocRotate = 1605;
                timeRotate = 6;
                this.content_mess_ngoai = "2 lượt quay Kho Báu";
            } else if (this.VQMMResultVongNgoai == "SieuAnhHung3") {
                gocRotate = 1545;
                timeRotate = 7.04;
                this.content_mess_ngoai = "3 lượt quay Siêu Anh Hùng";
            } else if (this.VQMMResultVongNgoai == "more") {
                gocRotate = 1515;
                timeRotate = 6.95;
                this.content_mess_ngoai = "Thêm 1 lượt";
            } else if (this.VQMMResultVongNgoai == "SieuAnhHung1") {
                gocRotate = 1635;
                timeRotate = 6;
                this.content_mess_ngoai = "1 lượt quay Siêu Anh Hùng";
            }
            var data = [gocRotate, timeRotate];
            return data;
        },
        getTimeAndRotate_Trong: function () {
            var gocRotate = 0;  // 1800;
            var timeRotate = 0; // 4
            if (this.VQMMResultVongTrong == "200000") {
                gocRotate = 1822.5;
                timeRotate = 8.4;
                this.content_mess_trong = "200K Xu";
            } else if (this.VQMMResultVongTrong == "2000000") {
                gocRotate = 1867.5;
                timeRotate = 8.3;
                this.content_mess_trong = "2M Xu";
            } else if (this.VQMMResultVongTrong == "500000") {
                gocRotate = 1912.5;
                timeRotate = 8.2;
                this.content_mess_trong = "500K Xu";
            } else if (this.VQMMResultVongTrong == "1000000") {
                gocRotate = 1957.5;
                timeRotate = 8.2;
                this.content_mess_trong = "1M Xu";
            } else if (this.VQMMResultVongTrong == "300000") {
                gocRotate = 2002.5;
                timeRotate = 8.1;
                this.content_mess_trong = "300K Xu";
            } else if (this.VQMMResultVongTrong == "3000000") {
                gocRotate = 2047.5;
                timeRotate = 8.1;
                this.content_mess_trong = "3M Xu";
            } else if (this.VQMMResultVongTrong == "100000") {
                gocRotate = 2092.5;
                timeRotate = 8;
                this.content_mess_trong = "100K Xu";
            } else if (this.VQMMResultVongTrong == "5000000") {
                gocRotate = 2137.5;
                timeRotate = 8;
                this.content_mess_trong = "5M Xu";
            }
            var data = [gocRotate, timeRotate];
            return data;
        },
        getTimeAndRotate_Vin: function () {
            var gocRotate = 0;  // 1800;
            var timeRotate = 0; // 4
            if (this.VQMMResultVongVin == "1000") {
                this.content_mess_vin = "1K " + GameManager.config.moneyName;
                gocRotate = -2137.5;
                timeRotate = 7.1;
            } else if (this.VQMMResultVongVin == "10000") {
                this.content_mess_vin = "10K " + GameManager.config.moneyName;
                gocRotate = -2092.5;
                timeRotate = 7.1;
            } else if (this.VQMMResultVongVin == "2000") {
                this.content_mess_vin = "2K " + GameManager.config.moneyName;
                gocRotate = -2047.5;
                timeRotate = 7.2;
            } else if (this.VQMMResultVongVin == "50000") {
                this.content_mess_vin = "50K " + GameManager.config.moneyName;
                gocRotate = -2002.5;
                timeRotate = 7.2;
            } else if (this.VQMMResultVongVin == "5000") {
                this.content_mess_vin = "5K " + GameManager.config.moneyName;
                gocRotate = -1957.5;
                timeRotate = 7;
            } else if (this.VQMMResultVongVin == "20000") {
                this.content_mess_vin = "20K " + GameManager.config.moneyName;
                gocRotate = -1912.5;
                timeRotate = 7;
            } else if (this.VQMMResultVongVin == "fail") {
                this.content_mess_vin = "";
                gocRotate = -1867.5;
                timeRotate = 6.9;
            } else if (this.VQMMResultVongVin == "100000") {
                this.content_mess_vin = "100K " + GameManager.config.moneyName;
                gocRotate = -1822.5;
                timeRotate = 6.9;
            }
            var data = [gocRotate, timeRotate];
            return data;
        },

        FinishRotate: function () {
            this.EffectLightFinish();
            this.VQMMbtnStart.setEnabled(true);
            this.btninfo.setEnabled(true);
            userInfo.userData.vinTotal = this.currentMoneyVin;
            userInfo.userData.xuTotal = this.currentMoneyXu;
            menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(this.currentMoneyVin)));
            menutab.userManager.lb_blance_xu.setString(formatMoney(0, 3, parseInt(this.currentMoneyXu)));
            this.currentMoneyVin = 0;
            this.currentMoneyXu = 0;
            this.playOrNot = false;
            if (this.countVQMM > 0) {
                this.lb_soluotquay.setString(this.countVQMM);
            } else {
                this.lb_soluotquay.setString("0");
            }

            if (this.VQMMResultVongVin == "fail") {
                if (this.VQMMResultVongNgoai == "fail") {
                    this.showNoticeVQMM("Chúc mừng bạn nhận được \n" + this.content_mess_trong + "!");
                } else {
                    this.showNoticeVQMM("Chúc mừng bạn nhận được \n" + this.content_mess_trong + " và " + this.content_mess_ngoai + "!");
                }
            } else {
                if (this.VQMMResultVongNgoai == "fail") {
                    this.showNoticeVQMM("Chúc mừng bạn nhận được \n" + this.content_mess_vin + " và " + this.content_mess_trong + "!");
                } else {
                    this.showNoticeVQMM("Chúc mừng bạn nhận được \n" + this.content_mess_vin + ", " + this.content_mess_trong + "\nvà " + this.content_mess_ngoai + "!");
                }
            }
        },
        responseVQMM: function (error, prizeVin, prizeXu, prizeSlot, remainCount, currentMoneyVin, currentMoneyXu) {
            cc.log("error: " + error + " prizeVin: " + prizeVin + " prizeXu: " + prizeXu + " prizeSlot: " + prizeSlot + " remainCount: " + remainCount + "currentMoneyVin: " + currentMoneyVin + "currentMoneyXu: " + currentMoneyXu);

            if (error == 0) {
                this.lb_soluotquay.setString(this.countVQMM - 1);

                this.countVQMM = remainCount;
                userInfo.userData.luckyRotate = remainCount;

                this.playOrNot = true;
                this.result = true;

                this.VQMMResultVongTrong = prizeXu;
                this.VQMMResultVongNgoai = prizeSlot;
                this.VQMMResultVongVin = prizeVin;
                this.StartRotate();

                this.currentMoneyVin = currentMoneyVin;
                this.currentMoneyXu = currentMoneyXu;
            } else if (error == 1) {
                this.showNoticeVQMM("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                this.isRotate = false;
                this.count_wait = 0;
                this.VQMMbtnStart.setEnabled(true);
                this.btninfo.setEnabled(false);
            } else if (error == 2) {
                this.showNoticeVQMM("Bạn đã hết lượt quay!");
                this.isRotate = false;
                this.count_wait = 0;
                this.VQMMbtnStart.setEnabled(true);
                this.btninfo.setEnabled(false);
            } else if (error == 3) {
                this.showNoticeVQMM("Mỗi ngày chỉ được quay tối đa 2 lần!");
                this.isRotate = false;
                this.count_wait = 0;
                this.VQMMbtnStart.setEnabled(true);
                this.btninfo.setEnabled(false);
            }
        },
        showNoticeVQMM: function (str) {
            this.txtNotice.setString(str);
            this.VQMMNotice.setVisible(true);
            this.VQMMNotice.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.delayTime(3.5), cc.callFunc(this.TurnOffNotice, this)));
        },

        getRandomNumber: function (min, max) {
            var vRandom = Math.floor(Math.random() * (max - min + 1)) + min;
            return vRandom;
        },
        open: function () {
            if(gI.vqmm) return;

            gI.vqmm = new codeVQMM();
            var curScene = SceneMgr.getInstance().getRunningScene();
            curScene.addGUI(gI.vqmm, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_VQMM);

            gI.vqmm.lb_soluotquay.setString(userInfo.userData.luckyRotate);
            gI.vqmm.countVQMM = userInfo.userData.luckyRotate;
            gI.vqmm.txt_user_tanthu.setString(userInfo.userData.nickname);
            gI.popUp.closeLoading();
        },
        close: function () {
            if(!gI.vqmm) return;
            gI.vqmm.pn_vqmm.runAction(cc.scaleTo(0.2, 0));
            gI.vqmm.stopRotate();
            closevongquay_ls();
            cc.spriteFrameCache.removeSpriteFramesFromFile("res/Minigame/ResVQMM/Plist_VQMM.plist");
            GuiUtil.removeTextureList(g_resources_mn_vqmm);
            gI.vqmm.removeFromParent();
            gI.vqmm = null;
        }
    });

    codeVQMM.BTN_INFO = 1;
    codeVQMM.BTN_CLOSEGAME = 2;
    codeVQMM.BTN_STARTROTATE = 3;
    codeVQMM.BTN_GETFREE = 4;
    codeVQMM.BTN_CLOSENOTICE = 5;

    codeVQMM.BTN_CLOSE_TANTHU = 6;
    codeVQMM.BTN_JOIN_TANTHU = 7;

    codeVQMM.BTN_GUILD = 8;
})()

