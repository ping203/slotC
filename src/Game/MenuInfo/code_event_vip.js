var event_Vippoint = null;
var event_VippointX = null;
var event_VippointY = null;
var event_VippointAppear = null;

var code_event_Vippoint = BaseLayer.extend(
    {
        ctor: function () {
            this.resourcePath = "res/ResourceMenuTab/Vip/";
            this.commonImagePath = "res/ResourceMenuTab/";

            this.array_btn_moc = [];
            this.gotoToolTip = "";
            this.gotoUpDown = false;
            this.arrrayPlaceVip = [];
            this.arrayTop = [];
            this.placeMe = [];
            this.isMeInList = false;

            this.IntelOrStrong = false; // false muu tri true kien cuong
            this.page_bxh = 1;
            this.arrrayIntel = [];
            this.arrrayStrong = [];
            this.IntelMe = [];
            this.StrongMe = [];
            this.maxpage = 0;
            this.number_nhay = 0;

            this._super("code_event_Vippoint");
            // this.initWithBinaryFile("res/Event_Vippoint.json");
            return true;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Vip/PlistVip.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/PlistImageChung.plist");
            this.addLayoutStructure(this, "pn_event_Vip", cc.p(640.00, 360.00), "", cc.size(1280.00, 720.00), true);
            this.initBgLayer();
            this.initPnMocPoint();
            this.initNoticeMe();
            this.initNoticeTop();
            this.initPositionMe();
            this.initPNEndEvent();
            this.initPNBangTopXH();
            this.initPNBangXepHangVP();
            this.initEventRun();
            // this.initPNTheleEvent();
            this.otherCustorm();
        },

        initBgLayer: function () {
            var layout = this.pn_event_Vip;

            this.addSpriteStructure(layout, "bg", cc.p(640, 360.41), "Vip_point.png");
            this.addTextStructure(layout, "txt_time_event", cc.p(1067.81, 556.70), "00H\n00:00", fontRobotoBold.fontName, "18", undefined, {__size: cc.size(73.00, 60.00)});
        },

        initPnMocPoint: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "pn_moc_point", cc.p(0, 0), "", cc.size(0, 0), false, {
                anchorX: 0, anchorY: 0
            });
            this.addButtonStructure(layout, "btn_hide_top", code_event_Vippoint.BTN_HIDE_TOP, cc.p(640.00, 360), true, undefined).setContentSize(cc.size(1500.00, 1000.00));

            var positions = [[208.88, 178.04], [308.96, 186.70], [331.60, 265.11], [430.66, 298.81], [526.64, 307.88], [490.04, 372.84], [486.77, 432.65], [590.55, 408.25],
                [641.80, 433.95], [727.87, 466.64], [793.82, 421.27], [717.59, 354.88], [663.43, 283.91], [730.00, 230.54], [827.19, 252.51], [934.40, 264.98]];

            for (var i = 0; i < 16; i++) {
                var name = i + 1;
                this.addButtonStructure(layout, "btn_moc_" + name, code_event_Vippoint['BTN_MOC_' + name], cc.p.apply(this, positions[i]), true,
                    [this.resourcePath + "xuatphat.png", this.resourcePath + "xuatphat_chose.png", this.resourcePath + "xuatphat.png"]);
            }
            this.addSpriteStructure(layout, "sp_vitri3", cc.p(0.00, 0.00), "");
            this.addSpriteStructure(layout, "sp_vitri2", cc.p(0.00, 0.00), "");
            this.addSpriteStructure(layout, "sp_vitri1", cc.p(0.00, 0.00), "");

            this.addButtonStructure(layout, "btn_close_event_vip", code_event_Vippoint.BTN_CLOSE_EVENT_VIP, cc.p(1194.94, 618.16), true, this.commonImagePath + "Mail/btnClose.png");
        },

        initNoticeMe: function () {

            var layout = this.addLayoutStructure(this.pn_event_Vip, "notice_me", cc.p(368.36, 164.17), "", cc.size(0, 0), false, {
                anchorX: 1, anchorY: 1
            });
            var textOptions = {anchorX: 0, __size: cc.size(128.00, 19.00)};
            this.addSpriteStructure(layout, "Image_8", cc.p(-109.00, -40.00), "notice_top.png");
            this.addTextStructure(layout, "txt_name_me", cc.p(-135.99, -18.45), "top", RobotoRegular.fontName, "14", "#FFDF58", textOptions);
            this.addSpriteStructureWithoutResourcePath(layout, "avatar_me", cc.p(-175.95, -40.43), "res/common/avatar/Avatar_1.png");
            this.addTextStructure(layout, "txt_vp_me", cc.p(-134.99, -40.45), "vippoint", RobotoRegular.fontName, "14", "#FCF4D8", textOptions).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "txt_destroy_me", cc.p(-134.99, -61.45), "vippoint", RobotoRegular.fontName, "14", "#FCF4D8", textOptions).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        },

        initNoticeTop: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "notice_top", cc.p(559.69, 192.04), "notice_top.png", cc.size(221.00, 87.00), false, {
                anchorX: 0, anchorY: 0
            });
            var textOptions = {anchorX: 0, __size: cc.size(128.00, 19.00)};
            this.addTextStructure(layout, "txt_name_top", cc.p(83.01, 65.55), "top", RobotoRegular.fontName, "14", "#FFDF58", textOptions);
            this.addSpriteStructureWithoutResourcePath(layout, "avatar_top", cc.p(43.05, 43.57), "res/common/avatar/Avatar_1.png");
            this.addTextStructure(layout, "txt_vp_top", cc.p(84.01, 43.55), "vippoint", RobotoRegular.fontName, "14", "#FCF4D8", textOptions).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "txt_destroy_top", cc.p(84.01, 22.55), "vippoint", RobotoRegular.fontName, "14", "#FCF4D8", textOptions).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        },

        initPositionMe: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "position_me", cc.p(559.37, 189.46), "cotmoc.png", cc.size(32.00, 49.00), true, {
                anchorY: 0
            });
            this.addTextStructure(layout, "txt_moc", cc.p(15.51, 32.96), "", RobotoRegular.fontName, "17", "#000000", {__size: cc.size(90.00, 20.00)});

            this.addButtonStructure(this.pn_event_Vip, "btn_vinhdanh_vp", code_event_Vippoint.BTN_OPEN_BANG_XH, cc.p(583.86, 79.23), true, this.resourcePath + "btn_bangxephang.png", {anchorY: 0});
            this.addButtonStructure(this.pn_event_Vip, "btn_thele_vp", code_event_Vippoint.BTN_THE_LE, cc.p(699.32, 79.07), true, this.resourcePath + "btn_thele.png", {anchorY: 0});
        },

        initPNEndEvent: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "pn_end_event", cc.p(540.76, 290.37), "", cc.size(0, 0), true, {
                anchorY: 0,
                anchorX: 0,
                visible: false
            });

            //this.addSpriteStructureWithoutResourcePath(layout, "Image_6", cc.p(97.56, 110.50), this.commonImagePath + "Mail/bg_supersmaill_mail.png").setScaleY(80/242);

            this.addImage(layout,"Image_6",cc.p(97.56, 110.50),this.commonImagePath+"Mail/bg_supersmaill_mail.png",cc.size(560,80));
            this.Image_6.setScale9Enabled(false);
            this.Image_6.ignoreContentAdaptWithSize(false);
            this.Image_6.setContentSize(cc.size(560,80));

            this.addTextStructure(layout, "txt_content_end_event", cc.p(98.04, 112.58), "vippoint", RobotoRegular.fontName, "22", "#FFFFFF", {__size: cc.size(537.00, 63.00)});
        },

        initPNBangTopXH: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "pn_bang_topxh", cc.p(-721.62, 374.55), "", cc.size(0, 0), true, {
                anchorY: 0,
                anchorX: 0
            });
            // this.addLayoutStructure(layout, "bg_bang_xh_vp", cc.p(1009.51, 267.11), "bg_topxh.png", cc.size(322.00, 195.00), false, {anchorY: 1});

            this.addImage(layout, "bg_bang_xh_vp", cc.p(1009.51, 267.11), this.resourcePath + "bg_topxh.png", cc.size(322.00, 195.00));
            this.bg_bang_xh_vp.setAnchorPoint(0.5, 1);
            this.bg_bang_xh_vp.setCapInsets(cc.rect(15, 99, 29, 29));

            this.addSpriteStructure(layout, "bg_bxh_che", cc.p(1009.51, 268.11), "top_dai.png", {
                anchorY: 1,
                visible: false
            });

            var lv_top_xh = this.lv_top_xh = new ccui.ListView();
            // lv_top_xh.setTouchEnabled(true);
            // lv_top_xh.setBounceEnabled(true);
            // lv_top_xh.setClippingEnabled(true);
            lv_top_xh.setScrollBarEnabled(0);
            lv_top_xh.setContentSize(cc.size(225.00, 95.00));
            lv_top_xh.setPosition(cc.p(896.88, 193.32));
            lv_top_xh.setAnchorPoint(cc.p(0.00, 1.00));
            layout.addChild(lv_top_xh);
            this.addButtonStructure(layout, "btn_updown_top_vp", code_event_Vippoint.BTN_UPDOWN_VP, cc.p(1108.41, 212.55), true, this.resourcePath + "btn_muiten_vp.png", {
                rotationX: 180,
                rotationY: 180
            });
        },

        initPNBangXepHangVP: function () {
            // var layout = this.addLayoutStructure(this.pn_event_Vip, "pn_thele_event", cc.p(640.00, 360.00), "", cc.size(1280.00, 720.00), true);
        },

        initEventRun: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "event_run", cc.p(0, 0), "", cc.size(0, 0), true, {
                anchorY: 0,
                anchorX: 0,
                // visible: false
            });
            this.addSpriteStructure(layout, "ronglua", cc.p(640, 360), "RongLua.png");
            layout.runAction(cc.fadeOut(0));
            layout.setVisible(false);
        },

        initPNTheleEvent: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "pn_thele_event", cc.p(640.00, 360.00), "", cc.size(1280.00, 720.00), true);

            this.addImageStructure(layout, "bg", cc.p(640.00, 611.88), this.commonImagePath + "Mail/bgtab_mail.png", cc.size(800.00, 520.00), {anchorY: 1}).setAnchorPoint(0.5, 1);
            this.addImageStructure(layout, "title", cc.p(640.00, 617.10), this.commonImagePath + "Mail/Title.png", cc.size(439.00, 55.00), {anchorY: 1}).setAnchorPoint(0.5, 1);
            this.addTextStructure(layout, "txt_title", cc.p(641.53, 585.80), "THỂ LỆ", RobotoRegular.fontName, "34", "#642A00", {__size: cc.size(190.00, 45.00)});
            this.addButtonStructure(layout, "btn_close_thele", code_event_Vippoint.BTN_CLOSE_THELE_EVENT, cc.p(1000.27, 571.94), true, this.commonImagePath + "Mail/btnClose.png");
            this.addImageStructure(layout, "bg_0", cc.p(640.00, 542.88), this.commonImagePath + "Mail/lopmo.png", cc.size(778.00, 445.00), {anchorY: 1}).setAnchorPoint(0.5, 1);
            return;

            var nd_gold_text = "                                                           \"Vương Quốc "+GameManager.config.moneyName+" - Truy Tìm Xế Khủng\"" +
                "\n" +
                "\n" +
                "\n" +
                "9h00           05/12/2017         9h00            04/01/2018\n" +

                "I: Sự kiện 1: X2  Vippoint (VP) – Thỏa mãn đam mê" +
                "\n" +
                "\n" +
                "\n" +
                "THÔNG TIN THAM KHẢO" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "II: Sự kiện 2: Thợ săn Mưu trí\n" +
                "9h00           05/12/2017         9h00            04/01/2018\n" +
                "\n" +
                "\n" +
                "NỘI DUNG\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "TIÊU CHÍ XẾP HẠNG\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "DANH SÁCH GIẢI THƯỞNG - THỢ SĂN MƯU TRÍ\n" +
                "\n" +
                "STT          Xếp hạng                            Giải thưởng                                      Giá trị giải thưởng\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "III: Sự kiện 3: Thợ săn Kiên cường\n" +
                "9h00           05/12/2017         9h00            04/01/2018\n" +
                "\n" +
                "NỘI DUNG\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "TIÊU CHÍ  XẾP HẠNG\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "DANH SÁCH GIẢI THƯỞNG - THỢ SĂN KIÊN CƯỜNG\n" +
                "STT          Xếp hạng                            Giải thưởng                                      Giá trị giải thưởng\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "CHÚ Ý\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "LƯU Ý";

            var nd_white_text = "\n" +
                "    Chuỗi sự kiện " + GameManager.config.moneyName+ "Pro 6 \"Vương Quốc " + GameManager.config.moneyName+ " - Truy Tìm Xế Khủng\" trên cổng\n" +
                "Cơ cấu giải thưởng cực khủng với rất nhiều Xế Khủng, Iphone 8… Còn chờ gì nữa mà không tham gia ngay!\n" +
                "    Thời gian: từ            ngày                       đến            ngày\n" +
                "Nội dung: Áp dụng cho tất cả người chơi trên cổng game dân gian                        chơi bằng đồng        .\n" +
                "\n" +
                "    Thời gian: từ 9h00 ngày 05/12/2017 đến 9h00 ngày 04/01/2018 (15 ngày)\n" +
                "Trong suốt thời gian diễn ra sự kiện, số VP của người chơi đạt được khi chơi các game bằng đồng\n" +
                "" + GameManager.config.moneyName+ " sẽ được hệ thống ghi nhận và nhân đôi (X2).\n" +
                "\n" +
                "1. Vippoint là gì?\n" +
                "    VipPoint là điểm số để đánh giá sự đóng góp của bạn trên hệ thống chơi game sử dụng đồng " + GameManager.config.moneyName.toUpperCase()+ ".\n" +
                "    Dựa trên số " + GameManager.config.moneyName.toUpperCase()+ " mà bạn chơi trong hệ thống cổng game bài đổi thưởng              , mỗi 1 đơn vị bạn\n" +
                "đánh vào đều được ghi nhận và tích lũy thành điểm VIP Point. Và bạn càng chơi nhiều thì bạn sẽ\n" +
                "càng được nhiều điểm Vip Point.\n" +
                "2. Hỏi đáp VP và sự kiện\n" +
                "\n" +
                "\n" +
                "\n" +
                "Thời gian: từ            ngày                       đến            ngày                       (30 ngày)\n" +
                "\n" +
                "\n" +
                "\n" +
                "- Khi người chơi tham gia chơi ở bất kỳ game nào bằng " + GameManager.config.moneyName+ " trên cổng game               sẽ nhận được VP\n" +
                "đồng thời số VP được hệ thống ghi nhận cũng chính là quãng đường mà người chơi di chuyển tương\n" +
                "ứng trên hành trình Thám hiểm Vương Quốc " + GameManager.config.moneyName+ " Huyền Bí.\n" +
                "- Trên hành trình Thám hiểm Vương Quốc " + GameManager.config.moneyName+ " Huyền Bí, hằng ngày sẽ có ngẫu nhiên 6 lần Bộ tộc\n" +
                "Cannibal tấn công. Nếu bị Bộ tộc Cannibal tấn công, bạn phải trở lại địa điểm gần nhất để tiếp tục\n" +
                "hành trình. (Số điểm VP bị trừ khi gặp Bộ tộc Cannibal chỉ tính cho sự kiện, không ảnh hưởng đến VP của tài khoản trên               ).\n" +
                "- Đặc biệt từ khung giờ: 9h00 đến 24h00, để hỗ trợ người chơi có hành trình Thám hiểm Vương Quốc\n" +
                "" + GameManager.config.moneyName+ " Huyền Bí may mắn và thú vị, sẽ có chú khỉ thả ngẫu nhiên rất nhiều gói trợ giúp có chứa rất\n" +
                "nhiều VP và "+GameManager.config.moneyName+". Người chơi có khả năng nhận được gói trợ giúp chứa VP và " + GameManager.config.moneyName+ " nếu đủ điều kiện:\n" +
                "    + Có số VP >=1 trong thời gian diễn ra sự kiện\n" +
                "+ Online (tham gia chơi game bằng " + GameManager.config.moneyName+ ") trong thời gian thả trợ giúp\n" +
                "_Gói trợ giúp chứa VP: 3VP, 6VP, 10VP, 15VP và 30VP\n" +
                "_Gói trợ giúp chứa " + GameManager.config.moneyName+ ": 4.000 bao lì xì có giá trị từ 10.000 "+GameManager.config.moneyName+" đến 1.000.000 "+GameManager.config.moneyName+"\n" +
                "Kết thúc sự kiện top 50 người chơi đứng đầu sẽ được nhận thưởng\n" +
                "\n" +
                "\n" +
                "- Tổng Vip Point đạt được trong sự kiện (không bao gồm VP bị trừ khi gặp Bộ tộc Cannibal tấn công)\n" +
                "- Số lần nhận được gói trợ giúp chứa VP, ưu tiên nhiều hơn.\n" +
                "- Địa điểm đạt được cao nhất trên bản đồ\n" +
                "\n" +
                "\n" +
                "\n" +
                "1                   1                            Mazda3 2017 Sedan 1.5                                               650,000,000\n" +
                "2                   2                             SH 150cc 2017 ABS                                                   85,000,000\n" +
                "3                   3                             SH 125cc 2017 ABS                                                   75,000,000\n" +
                "4                 4, 5                          Iphone 8 plus 256 GB                                                 29,000,000\n" +
                "5                   6                                 10,000,000 " + GameManager.config.moneyName+ "                                                       10,000,000\n" +
                "6                   7                                   8,000,000 " + GameManager.config.moneyName+ "                                                          8,000,000\n" +
                "7                   8                                   5,000,000 " + GameManager.config.moneyName+ "                                                          5,000,000\n" +
                "8                   9                                   5,000,000 " + GameManager.config.moneyName+ "                                                          5,000,000\n" +
                "9                  10                                  3,000,000 " + GameManager.config.moneyName+ "                                                          3,000,000\n" +
                "10                 11                                  3,000,000 " + GameManager.config.moneyName+ "                                                          3,000,000\n" +
                "11                 12                                  3,000,000 " + GameManager.config.moneyName+ "                                                          3,000,000\n" +
                "12                 13                                  3,000,000 " + GameManager.config.moneyName+ "                                                          3,000,000\n" +
                "13                 14                                  3,000,000 " + GameManager.config.moneyName+ "                                                          3,000,000\n" +
                "14                 15                                  2,000,000 " + GameManager.config.moneyName+ "                                                          2,000,000\n" +
                "15                 16                                  2,000,000 " + GameManager.config.moneyName+ "                                                          2,000,000\n" +
                "16                 17                                  2,000,000 " + GameManager.config.moneyName+ "                                                          2,000,000\n" +
                "17                 18                                  2,000,000 " + GameManager.config.moneyName+ "                                                          2,000,000\n" +
                "18                 19                                  2,000,000 " + GameManager.config.moneyName+ "                                                          2,000,000\n" +
                "19                 20                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "20                 21                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "21                 22                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "22                 23                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "23                 24                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "24                 25                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "25                 26                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "26                 27                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "27                 28                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "28                 29                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "29                 30                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "30                 31                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "31                 32                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "32                 33                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "33                 34                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "34                 35                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "35                 36                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "36                 37                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "37                 38                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "38                 39                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "39                 40                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "40                 41                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "41                 42                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "42                 43                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "43                 44                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "44                 45                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "45                 46                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "46                 47                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "47                 48                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "48                 49                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "49                 50                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "\n" +
                "\n" +
                "\n" +
                "Thời gian: từ            ngày                       đến            ngày                       (30 ngày)\n" +
                "\n" +
                "\n" +
                "Bạn bị Bộ tộc Cannibal tấn công quá nhiều, bạn sợ bị ảnh hưởng hành trình đến đảo giấu vàng.\n" +
                "    Bạn đừng lo lắng vì điều đó. Trong quá trình bạn di chuyển, tổng số Vip Point bị trừ đi do gặp Bộ tộc\n" +
                "Cannibal sẽ được ghi nhận và tính vào sự kiện này.\n" +
                "    Kết thúc sự kiện top 20 người chơi đứng đầu sẽ được nhận thưởng.\n" +
                "\n" +
                "\n" +
                "- Tổng số VP bị trừ trong sự kiện.\n" +
                "- Số lần bị trừ VP (ưu tiên nhiều hơn)\n" +
                "- Địa điểm đạt được cao nhất trên bản đồ\n" +
                "\n" +
                "\n" +
                "\n" +
                "1                   1                       Honda SH 150cc 2017 ABS                                            85,000,000\n" +
                "2                   2                            Iphone 8 Plus 256 GB                                                 29,000,000\n" +
                "3                   3                                Iphone 8 128 GB                                                      26,000,000\n" +
                "4                   4                                 10.000.000 " + GameManager.config.moneyName+ "                                                       10,000,000\n" +
                "5                   5                                   8,000,000 " + GameManager.config.moneyName+ "                                                          8,000,000\n" +
                "6                   6                                   5,000,000 " + GameManager.config.moneyName+ "                                                          5,000,000\n" +
                "7                   7                                   3,000,000 " + GameManager.config.moneyName+ "                                                          3,000,000\n" +
                "8                   8                                   2,000,000 " + GameManager.config.moneyName+ "                                                          2,000,000\n" +
                "9                   9                                   2,000,000 " + GameManager.config.moneyName+ "                                                          2,000,000\n" +
                "10                 10                                  2,000,000 " + GameManager.config.moneyName+ "                                                          2,000,000\n" +
                "11                 11                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "12                 12                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "13                 13                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "14                 14                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "15                 15                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "16                 16                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "17                 17                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "18                 18                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "19                 19                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "20                 20                                  1,000,000 " + GameManager.config.moneyName+ "                                                          1,000,000\n" +
                "\n" +
                "\n" +
                "- Số điểm Vip Point bị trừ khi Bộ tộc Cannibal tấn công chỉ tính cho sự kiện, không ảnh hưởng đến VP của tài khoản trên\n" +
                "–  Nếu một tài khoản đạt 2 giải thưởng ở 2 bảng xếp hạng thì sẽ được nhận giải thưởng có giá trị\n" +
                "cao nhất. Nếu 2 giải thưởng có giá trị bằng nhau, người chơi sẽ được giải thưởng ở bảng xếp hạng\n" +
                "Thợ săn mưu trí. Giải thưởng còn lại (có giá trị bằng hoặc thấp hơn) ở Thợ săn kiên cường sẽ\n" +
                "không chuyển cho tài khoản kế tiếp. Mà Người chơi kế tiếp vẫn sẽ nhận phần thưởng ở vị trí tương\n" +
                "ứng cao nhất của mình.\n" +
                "\n" +
                "- Giải thưởng " + GameManager.config.moneyName.toUpperCase()+ " sẽ được trao trong vòng 72h sau khi kết thúc sự kiện.\n" +
                "- Giải thưởng vật lý sẽ được trao trong vòng 2 tuần ngay sau khi kết thúc sự kiện, giải thưởng vật lý\n" +
                "không bao gồm các phụ phí liên quan.\n" +
                "- Giải thưởng vật lý có thể quy đổi thành " + GameManager.config.moneyName.toUpperCase()+ ".\n" +
                "- Trong vòng 10 ngày, đối với những khách hàng trúng giải thưởng hiện vật mà ban tổ chức không\n" +
                "liên lạc được thì giải thưởng hiện vật sẽ được quy đổi tương đương sang "+GameManager.config.moneyNameUpper+" và chuyển vào tài khoản\n" +
                "trúng giải (tính từ ngày kết thúc sự kiện).\n" +
                "- Trong trường hợp có tranh chấp, quyết định của BTC là quyết định cuối cùng.\n" +
                "    Với tất cả những giải thưởng tuyệt vời trên, nếu bạn bỏ lỡ " + GameManager.config.moneyName.toUpperCase()+ "PRO 5 thì thật sự quá đáng tiếc! Nào\n" +
                "hãy cùng tham gia vào hành trình đến Thám hiểm Vương Quốc " + GameManager.config.moneyName+ " Huyền Bí để nhận được những\n" +
                "giải thưởng tuyệt vời\n" +
                "Chúc toàn bộ game thủ "+GameManager.webViewLink.productName+" nhiều may mắn!";

            var nd_pink_text = "\n" +
                "                                                           "+GameManager.webViewLink.productName+"\n" +
                "\n" +
                "\n" +
                "\n" +
                ""+GameManager.webViewLink.productName+"                             " + GameManager.config.moneyName.toUpperCase()+ "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                ""+GameManager.webViewLink.productName+"\n" +
                "\n" +
                "\n" +
                "\n" +
                GameManager.webViewLink.productName +"\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                ""+GameManager.webViewLink.productName+"\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                ""+GameManager.webViewLink.productName+"\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                ""+GameManager.webViewLink.productName+"";

            // var listviewLayout = this.addLayoutStructure(pn_noidung, "listviewLayout", cc.p(24.55, 393.93), "", cc.size(0, 439.00), true, {anchorY: 1});
            // var textOptions = {
            //     anchorY: 0,
            //     anchorX: 0,
            //     __size: cc.size(923.00, 439.00)
            // };

            var sc_event = this.addListViewStructure(layout, "sc_event", cc.p(640.29, 536.57), cc.size(765.00, 433.00), {
                anchorY: 1,
                anchorX: 0.5
            });

            var pn_noidung = this.addLayoutStructure(this.sc_event, "pn_noidung", cc.p(0, 0), "", cc.size(765.00, 3420), true, {
                anchorX: 0,
                anchorY: 1
            });

            var textOptions = {
                anchorY: 0,
                anchorX: 0,
                __size: cc.size(765.00, 3420)
            };

            // GuiUtil.setBackGroundColor(pn_noidung, "#000000", 255);
            // return;


            // var listviewLayout = this.addLayoutStructure(sc_event, "pn_noidung", cc.p(0, 0), "", cc.size(744.5, 3394), true, {anchorX : 0, anchorY: 1});

            // this.addTextStructure(pn_noidung, "titile", cc.p(400.00, 408.61), "CHÙM SỰ KIỆN " + GameManager.config.moneyName.toUpperCase()+ "PRO 5", RobotoRegular.fontName, "20", "#F1C72F", {__size: cc.size(300.00, 23.00)});

            var nd_gold = this.addTextStructure(pn_noidung, "nd_gold", cc.p(0, 0), nd_gold_text, fontRobotoBold.fontName, "16", "#F1C72F", textOptions);
            nd_gold.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            nd_gold.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);

            var nd_white = this.addTextStructure(pn_noidung, "nd_white", cc.p(0, 0), nd_white_text, fontRobotoBold.fontName, "16", "#F7EBC6", textOptions);
            nd_white.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            nd_white.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);

            var nd_pink = this.addTextStructure(pn_noidung, "nd_pink", cc.p(0, 0), nd_pink_text, fontRobotoBold.fontName, "16", "#FF00F6", textOptions);
            nd_pink.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            nd_pink.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);

        },


        otherCustorm: function () {
            this.pn_end_event.setVisible(false);
            this.avatar_top.setScale(0.6);
            this.avatar_me.setScale(0.6);
            var fadein_top = cc.fadeIn(0);
            this.notice_top.runAction(fadein_top);
            this.notice_top.setVisible(false);
            this.notice_me.setVisible(false);

            var fadein_moc = cc.fadeIn(0);
            this.position_me.runAction(fadein_moc);
            this.position_me.setVisible(false);

            GuiUtil.changeSprite(this.sp_vitri1, "res/Minigame/ImageChung/Vong1.png");
            GuiUtil.changeSprite(this.sp_vitri2, "res/Minigame/ImageChung/Vong2.png");
            GuiUtil.changeSprite(this.sp_vitri2, "res/Minigame/ImageChung/Vong3.png");

            this.sp_vitri1.setVisible(false);
            this.sp_vitri2.setVisible(false);
            this.sp_vitri3.setVisible(false);

            this.btn_moc_1.setName("ev_0");
            this.btn_moc_2.setName("ev_1");
            this.btn_moc_3.setName("ev_2");
            this.btn_moc_4.setName("ev_3");
            this.btn_moc_5.setName("ev_4");
            this.btn_moc_6.setName("ev_5");
            this.btn_moc_7.setName("ev_6");
            this.btn_moc_8.setName("ev_7");
            this.btn_moc_9.setName("ev_8");
            this.btn_moc_10.setName("ev_9");
            this.btn_moc_11.setName("ev_10");
            this.btn_moc_12.setName("ev_11");
            this.btn_moc_13.setName("ev_12");
            this.btn_moc_14.setName("ev_13");
            this.btn_moc_15.setName("ev_14");
            this.btn_moc_16.setName("ev_15");

            for (var i = 0; i < 16; i++) {
                if (this.pn_moc_point.getChildByName("ev_" + i) != null) {
                    this.array_btn_moc.push(this.pn_moc_point.getChildByName("ev_" + i));
                }
            }

            this.pn_event_Vip.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.show_event_vip, this)));

            // this.pn_bangxephang_vp.setVisible(false);
            // this.pn_bangxephang_vp.setScale(0);
            // this.pn_kiencuong.setVisible(false);
            //
            // this.lv_kiencuong = this.getControl("lv_kiencuong", this.pn_kiencuong);
            // this.lv_kiencuong.setTouchEnabled(true);
            // this.lv_kiencuong.setClippingEnabled(true);
            // this.lv_kiencuong.setScrollBarEnabled(false);
            //
            // this.btn_vinhdanh_vp = this.customButton("btn_vinhdanh_vp", code_event_Vippoint.BTN_OPEN_BANG_XH, this.pn_event_Vip);
            // this.btn_thele_vp = this.customButton("btn_thele_vp", code_event_Vippoint.BTN_THE_LE, this.pn_event_Vip);
            // if (cc.sys.isNative) {
            //     if (lobby.open_payment_ios == false) {
            //         this.btn_thele_vp.setEnabled(false);
            //     } else {
            //         this.btn_thele_vp.setEnabled(true);
            //     }
            // }

            // this.pn_button_Page = this.pn_bangxephang_vp.getChildByName("pn_button_Page");
            // this.btn_back_page = this.customButton("btn_back_page", code_event_Vippoint.BTN_BACK_PAGE, this.pn_button_Page);
            // this.btn_backall_page = this.customButton("btn_backall_page", code_event_Vippoint.BTN_BACKALL_PAGE, this.pn_button_Page);
            // this.btn_next_page = this.customButton("btn_next_page", code_event_Vippoint.BTN_NEXT_PAGE, this.pn_button_Page);
            // this.btn_nextall_page = this.customButton("btn_nextall_page", code_event_Vippoint.BTN_NEXTALL_PAGE, this.pn_button_Page);
            // this.txt_page = this.getControl("txt_page", this.pn_button_Page);

            // this.event_run = this.pn_event_Vip.getChildByName("event_run");
            // this.event_run.runAction(cc.fadeOut(0));
            // this.event_run.setVisible(false);

            // this.pn_thele_event = this.pn_event_Vip.getChildByName("pn_thele_event");
            // this.btn_close_thele = this.customButton("btn_close_thele", code_event_Vippoint.BTN_CLOSE_THELE_EVENT, this.pn_thele_event);
            // this.pn_thele_event.setVisible(false);
            // this.pn_thele_event.setScale(0);
            // this.sc_event = this.getControl("sc_event", this.pn_thele_event);
            // this.sc_event.setTouchEnabled(true);
            // this.sc_event.setClippingEnabled(true);
            // this.sc_event.setScrollBarEnabled(false);
        },

        onMovePoint: cc.EventListener.create(
            {
                event: cc.EventListener.MOUSE,
                onMouseMove: function (event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(event.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        if (event_Vippoint.gotoToolTip != target.getName()) {
                            var stt = target.getName().substr(3, target.getName().length);
                            event_Vippoint.gotoToolTip = target.getName();
                            if (event_Vippoint.arrrayPlaceVip[stt].nickname != null) {
                                event_Vippoint.fillDataTop(target.getName());
                                event_Vippoint.notice_top.x = target.x + 25;
                                event_Vippoint.notice_top.y = target.y - 40;
                                event_Vippoint.notice_top.setVisible(true);
                                event_Vippoint.notice_top.stopAllActions();
                                event_Vippoint.notice_top.runAction(cc.fadeIn(0.2));

                                event_Vippoint.notice_me.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                                    event_Vippoint.notice_me.setVisible(false);
                                })));

                                if (Number(stt) == 0)
                                    GuiUtil.loadTextureNormal(event_Vippoint.array_btn_moc[stt],"res/ResourceMenuTab/Vip/xuatphat_chose.png");
                                else
                                    GuiUtil.loadTextureNormal(event_Vippoint.array_btn_moc[stt],"res/ResourceMenuTab/Vip/vitri_chose.png");

                                for (var i = 0; i < event_Vippoint.array_btn_moc.length; i++) {
                                    if (i != Number(stt)) {
                                        cc.eventManager.pauseTarget(event_Vippoint.array_btn_moc[i], true);
                                    }
                                }
                            }
                            event_Vippoint.position_me.x = target.x + 3;
                            event_Vippoint.position_me.y = target.y + 10;
                            event_Vippoint.position_me.setVisible(true);
                            event_Vippoint.position_me.stopAllActions();
                            event_Vippoint.position_me.runAction(cc.fadeIn(0.2));
                            event_Vippoint.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[stt].min));
                        }
                    } else {
                        if (event_Vippoint.gotoToolTip == target.getName()) {
                            event_Vippoint.gotoToolTip = "";
                            event_Vippoint.position_me.stopAllActions();
                            event_Vippoint.position_me.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                                event_Vippoint.position_me.setVisible(false);
                            })));

                            event_Vippoint.notice_top.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                                event_Vippoint.notice_top.setVisible(false);
                            })));

                            event_Vippoint.notice_me.setVisible(true);
                            event_Vippoint.notice_me.stopAllActions();
                            event_Vippoint.notice_me.runAction(cc.fadeIn(0.2));

                            for (var i = 0; i < event_Vippoint.array_btn_moc.length; i++) {
                                cc.eventManager.resumeTarget(event_Vippoint.array_btn_moc[i], true);
                                if (i == 0) {
                                    GuiUtil.loadTextureNormal(event_Vippoint.array_btn_moc[i],"res/ResourceMenuTab/Vip/xuatphat.png");
                                } else {
                                    GuiUtil.loadTextureNormal(event_Vippoint.array_btn_moc[i],"res/ResourceMenuTab/Vip/vitri.png");
                                }
                            }
                        }
                    }
                }
            }),
        onButtonRelease: function (button, id) {
            switch (id) {
                case code_event_Vippoint.BTN_CLOSE_THELE_EVENT:
                    this.pn_thele_event.setVisible(false);
                    this.pn_thele_event.setScale(0);
                    for (var i = 0; i < event_Vippoint.array_btn_moc.length; i++) {
                        cc.eventManager.resumeTarget(event_Vippoint.array_btn_moc[i], true);
                    }
                    break;
                case code_event_Vippoint.BTN_KIEN_CUONG:
                    GuiUtil.loadTextureNormal(this.btn_muutri,"res/ResourceMenuTab/BaoMat/btn_2hang_s.png");
                    GuiUtil.loadTextureNormal(this.btn_kiencuong,"res/ResourceMenuTab/BaoMat/btn_2hang.png");
                    this.pn_muutri.setVisible(false);
                    this.pn_kiencuong.setVisible(true);
                    this.page_bxh = 1;
                    this.IntelOrStrong = true;
                    this.parserBXH_Vippoint(this.IntelOrStrong);
                    break;
                case code_event_Vippoint.BTN_MUU_TRI:
                    GuiUtil.loadTextureNormal(this.btn_muutri,"res/ResourceMenuTab/BaoMat/btn_2hang.png");
                    GuiUtil.loadTextureNormal(this.btn_kiencuong,"res/ResourceMenuTab/BaoMat/btn_2hang_s.png");
                    this.pn_kiencuong.setVisible(false);
                    this.pn_muutri.setVisible(true);
                    this.page_bxh = 1;
                    this.IntelOrStrong = false;
                    this.parserBXH_Vippoint(this.IntelOrStrong);
                    break;
                case code_event_Vippoint.BTN_CLOSE_BANG_XH:
                    this.pn_bangxephang_vp.setVisible(false);
                    this.pn_bangxephang_vp.setScale(0);
                    for (var i = 0; i < event_Vippoint.array_btn_moc.length; i++) {
                        cc.eventManager.resumeTarget(event_Vippoint.array_btn_moc[i], true);
                    }
                    break;
                case code_event_Vippoint.BTN_OPEN_BANG_XH:
                    //cc.log("vao");
                    open_event_vip_history();
                    for (var i = 0; i < event_Vippoint.array_btn_moc.length; i++) {
                        cc.eventManager.pauseTarget(event_Vippoint.array_btn_moc[i], true);
                    }
                    break;
                case code_event_Vippoint.BTN_CLOSE_EVENT_VIP:
                    closeEvent_Vip();
                    break;
                case code_event_Vippoint.BTN_UPDOWN_VP:
                    if (!this.isRun_table) {
                        this.isRun_table = true;
                        if (this.gotoUpDown == false) {
                            this.zoomBigBg_bangxh_vp(496);
                            this.gotoUpDown = true;
                        } else {
                            this.bg_bxh_che.setVisible(false);
                            this.zoomSmallBg_bangxh_vp(195);
                            this.gotoUpDown = false;
                        }
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_1:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[0].nickname != null) {
                            this.fillDataTop("ev_0");
                            this.unHideDataTop(0);
                        }
                        this.position_me.x = this.btn_moc_1.x + 3;
                        this.position_me.y = this.btn_moc_1.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[0].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_2:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[1].nickname != null) {
                            this.fillDataTop("ev_1");
                            this.unHideDataTop(1);
                        }
                        this.position_me.x = this.btn_moc_2.x + 3;
                        this.position_me.y = this.btn_moc_2.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[1].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_3:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[2].nickname != null) {
                            this.fillDataTop("ev_2");
                            this.unHideDataTop(2);
                        }
                        this.position_me.x = this.btn_moc_3.x + 3;
                        this.position_me.y = this.btn_moc_3.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[2].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_4:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[3].nickname != null) {
                            this.fillDataTop("ev_3");
                            this.unHideDataTop(3);
                        }
                        this.position_me.x = this.btn_moc_4.x + 3;
                        this.position_me.y = this.btn_moc_4.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[3].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_5:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[4].nickname != null) {
                            this.fillDataTop("ev_4");
                            this.unHideDataTop(4);
                        }
                        this.position_me.x = this.btn_moc_5.x + 3;
                        this.position_me.y = this.btn_moc_5.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[4].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_6:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[5].nickname != null) {
                            this.fillDataTop("ev_5");
                            this.unHideDataTop(5);
                        }
                        this.position_me.x = this.btn_moc_6.x + 3;
                        this.position_me.y = this.btn_moc_6.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[5].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_7:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[6].nickname != null) {
                            this.fillDataTop("ev_6");
                            this.unHideDataTop(6);
                        }
                        this.position_me.x = this.btn_moc_7.x + 3;
                        this.position_me.y = this.btn_moc_7.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[6].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_8:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[7].nickname != null) {
                            this.fillDataTop("ev_7");
                            this.unHideDataTop(7);
                        }
                        this.position_me.x = this.btn_moc_8.x + 3;
                        this.position_me.y = this.btn_moc_8.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[7].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_9:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[8].nickname != null) {
                            this.fillDataTop("ev_8");
                            this.unHideDataTop(8);
                        }
                        this.position_me.x = this.btn_moc_9.x + 3;
                        this.position_me.y = this.btn_moc_9.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[8].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_10:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[9].nickname != null) {
                            this.fillDataTop("ev_9");
                            this.unHideDataTop(9);
                        }
                        this.position_me.x = this.btn_moc_10.x + 3;
                        this.position_me.y = this.btn_moc_10.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[9].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_11:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[10].nickname != null) {
                            this.fillDataTop("ev_10");
                            this.unHideDataTop(10);
                        }
                        this.position_me.x = this.btn_moc_11.x + 3;
                        this.position_me.y = this.btn_moc_11.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[10].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_12:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[11].nickname != null) {
                            this.fillDataTop("ev_11");
                            this.unHideDataTop(11);
                        }
                        this.position_me.x = this.btn_moc_12.x + 3;
                        this.position_me.y = this.btn_moc_12.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[11].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_13:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[12].nickname != null) {
                            this.fillDataTop("ev_12");
                            this.unHideDataTop(12);
                        }
                        this.position_me.x = this.btn_moc_13.x + 3;
                        this.position_me.y = this.btn_moc_13.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[12].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_14:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[13].nickname != null) {
                            this.fillDataTop("ev_13");
                            this.unHideDataTop(13);
                        }
                        this.position_me.x = this.btn_moc_14.x + 3;
                        this.position_me.y = this.btn_moc_14.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[13].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_15:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[14].nickname != null) {
                            this.fillDataTop("ev_14");
                            this.unHideDataTop(14);
                        }
                        this.position_me.x = this.btn_moc_15.x + 3;
                        this.position_me.y = this.btn_moc_15.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[14].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_16:
                    if (cc.sys.isNative) {
                        if (event_Vippoint.arrrayPlaceVip[15].nickname != null) {
                            this.fillDataTop("ev_15");
                            this.unHideDataTop(15);
                        }
                        this.position_me.x = this.btn_moc_16.x + 3;
                        this.position_me.y = this.btn_moc_16.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, event_Vippoint.arrrayPlaceVip[15].min));
                    }
                    break;
                case code_event_Vippoint.BTN_HIDE_TOP:
                    if (cc.sys.isNative) {
                        this.hideDataTop();
                    }
                    break;
                case code_event_Vippoint.BTN_BACK_PAGE:
                    if (this.page_bxh != 1)
                        this.page_bxh = this.page_bxh - 1;
                    this.funLoadOtherPage();
                    break;
                case code_event_Vippoint.BTN_BACKALL_PAGE:
                    if (this.page_bxh != 1)
                        this.page_bxh = 1;
                    this.funLoadOtherPage();
                    break;
                case code_event_Vippoint.BTN_NEXT_PAGE:
                    if (this.page_bxh != this.maxpage)
                        this.page_bxh = this.page_bxh + 1;
                    this.funLoadOtherPage();
                    break;
                case code_event_Vippoint.BTN_NEXTALL_PAGE:
                    if (this.page_bxh != this.maxpage)
                        this.page_bxh = this.maxpage;
                    this.funLoadOtherPage();
                    break;
                case code_event_Vippoint.BTN_THE_LE:
                    // this.pn_thele_event.setVisible(true);
                    // this.pn_thele_event.runAction(cc.scaleTo(0.2, 1));
                    ConnectNative.openWebView(GameManager.webViewLink.theLeVipPoint);
                    for (var i = 0; i < event_Vippoint.array_btn_moc.length; i++) {
                        cc.eventManager.pauseTarget(event_Vippoint.array_btn_moc[i], true);
                    }
                    break;
            }
        },
        funLoadOtherPage: function () {
            if (this.IntelOrStrong = false)
                this.reload_Data_Intel(this.page_bxh);
            else
                this.reload_Data_Strong(this.page_bxh);
        },
        hideDataTop: function () {
            event_Vippoint.position_me.runAction(cc.sequence(cc.fadeIn(0.2), cc.callFunc(function () {
                event_Vippoint.position_me.setVisible(false);
            })));

            event_Vippoint.notice_top.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                event_Vippoint.notice_top.setVisible(false);
            })));
            event_Vippoint.notice_me.setVisible(true);
            event_Vippoint.notice_me.stopAllActions();
            event_Vippoint.notice_me.runAction(cc.fadeIn(0.2));
        },
        unHideDataTop: function (vitri) {
            event_Vippoint.notice_top.x = this.array_btn_moc[vitri].x + 25;
            event_Vippoint.notice_top.y = this.array_btn_moc[vitri].y - 40;
            event_Vippoint.notice_top.setVisible(true);
            event_Vippoint.notice_top.stopAllActions();
            event_Vippoint.notice_top.runAction(cc.fadeIn(0.2));

            event_Vippoint.notice_me.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                event_Vippoint.notice_me.setVisible(false);
            })));
        },
        fillDataTop: function (vitri) {
            vitri = vitri.substr(3, vitri.length);
            if (this.arrrayPlaceVip[vitri].nickname.length >= 15) {
                var nick = this.arrrayPlaceVip[vitri].nickname;
                var head = nick.substring(0, 12);
                var name = head + "...";
                this.txt_name_top.setString(name);
            } else
                this.txt_name_top.setString(this.arrrayPlaceVip[vitri].nickname);
            this.txt_vp_top.setString("Vippoint: " + formatMoney(0, 3, this.arrrayPlaceVip[vitri].vippoint));
            this.txt_destroy_top.setString("Thiệt hại: " + formatMoney(0, 3, this.arrrayPlaceVip[vitri].subVippoint));
            //this.txt_moc.setString(formatMoney(0,3,this.arrrayPlaceVip[vitri].min));
            if (this.arrrayPlaceVip[vitri].nickname == userInfo.userData.nickname)
                GuiUtil.changeSprite(event_Vippoint.avatar_top,menutab.getlinkAvatar(userInfo.userData.avatar));
            else
                GuiUtil.changeSprite(event_Vippoint.avatar_top,menutab.getlinkAvatar(this.arrrayPlaceVip[vitri].avatar));
            event_Vippoint.avatar_top.setScale(0.6);
        },
        zoomBigBg_bangxh_vp: function (value) {
            if (event_Vippoint.bg_bang_xh_vp.height < value) {
                event_Vippoint.bg_bang_xh_vp.height = event_Vippoint.bg_bang_xh_vp.height + 10;
                //event_Vippoint.btn_updown_top_vp.y = event_Vippoint.btn_updown_top_vp.y + 10;
                event_Vippoint.lv_top_xh.height = event_Vippoint.lv_top_xh.height + 9;
                event_Vippoint.runAction(cc.callFunc(function () {
                    event_Vippoint.zoomBigBg_bangxh_vp(453);
                }));
            } else {
                event_Vippoint.bg_bang_xh_vp.height = value;
                event_Vippoint.isRun_table = false;
                event_Vippoint.bg_bxh_che.setVisible(true);
                event_Vippoint.btn_updown_top_vp.setRotation(0);
                event_Vippoint.lv_top_xh.height = 360;
                event_Vippoint.lv_top_xh.refreshView();
            }
        },
        zoomSmallBg_bangxh_vp: function (value) {
            if (event_Vippoint.bg_bang_xh_vp.height > value) {
                event_Vippoint.bg_bang_xh_vp.height = event_Vippoint.bg_bang_xh_vp.height - 10;
                //event_Vippoint.btn_updown_top_vp.y = event_Vippoint.btn_updown_top_vp.y - 10;
                event_Vippoint.lv_top_xh.height = event_Vippoint.lv_top_xh.height - 10;
                event_Vippoint.runAction(cc.callFunc(function () {
                    event_Vippoint.zoomSmallBg_bangxh_vp(195);
                }));
            } else {
                event_Vippoint.bg_bang_xh_vp.height = value;
                event_Vippoint.isRun_table = false;
                event_Vippoint.btn_updown_top_vp.setRotation(180);
                event_Vippoint.lv_top_xh.height = 95;
            }
        },

        pauseMovePoint: function () {
            for (var i = 0; i < event_Vippoint.array_btn_moc.length; i++) {
                cc.eventManager.pauseTarget(event_Vippoint.array_btn_moc[i], true);
            }
        },
        resumeMovePoint: function () {
            for (var i = 0; i < event_Vippoint.array_btn_moc.length; i++) {
                cc.eventManager.resumeTarget(event_Vippoint.array_btn_moc[i], true);
            }
        },

        show_event_vip: function () {
            event_Vippoint.pn_event_Vip.setVisible(true);
            event_Vippoint.pn_event_Vip.runAction(cc.scaleTo(0.2, 1));
            if (!cc.sys.isNative) {
                this.btn_hide_top.setVisible(false);
            }
        },
        callBackError: function (response) {
        },

        parserGetConfigVippointEvent: function () {
            var url = urlGetEventVippoint(userInfo.userData.nickname);
            sendRequest(url, null, false, this.callBackDataVippointEvent, this.callBackError);
            cc.log("url vip" + url);
        },
        callBackDataVippointEvent: function (response) {
            cc.log("event vip" + response);
            var jsonData = JSON.parse(response);
            event_Vippoint.arrrayPlaceVip = jsonData["places"];
            event_Vippoint.placeMe = jsonData["vip"];
            GuiUtil.changeSprite(event_Vippoint.avatar_me,menutab.getlinkAvatar(userInfo.userData.avatar));
            event_Vippoint.avatar_me.setScale(0.6);

            var end_event = jsonData["status"];
            var des = jsonData["des"];
            if (end_event == 0) {
                event_Vippoint.pn_end_event.setVisible(true);
                event_Vippoint.txt_content_end_event.setString(des);
            } else if (end_event == 1) {
                event_Vippoint.pn_end_event.setVisible(false);
                event_Vippoint.txt_content_end_event.setString("");
            } else {
                event_Vippoint.pn_end_event.setVisible(true);
                event_Vippoint.txt_content_end_event.setString(des);
            }

            var button = new ccui.Button();
            if (jsonData["place"].place != 0) {
                button = event_Vippoint.array_btn_moc[jsonData["place"].place - 1];
                event_Vippoint.notice_me.x = button.x + 25;
                event_Vippoint.notice_me.y = button.y - 40;
                event_Vippoint.notice_me.setVisible(true);
                if (jsonData["place"].nickname.length >= 15) {
                    var nick = jsonData["place"].nickname;
                    var head = nick.substring(0, 12);
                    var name = head + "...";
                    event_Vippoint.txt_name_me.setString(name);
                } else
                    event_Vippoint.txt_name_me.setString(jsonData["place"].nickname);
                event_Vippoint.txt_vp_me.setString("Vippoint: " + formatMoney(0, 3, jsonData["place"].vippoint));
                event_Vippoint.txt_destroy_me.setString("Thiệt hại: " + formatMoney(0, 3, jsonData["place"].subVippoint));
            } else {
                event_Vippoint.notice_me.x = 368.36;
                event_Vippoint.notice_me.y = 164.17;
                event_Vippoint.notice_me.setVisible(true);
                if (jsonData["place"].nickname.length >= 15) {
                    var nick = jsonData["place"].nickname;
                    var head = nick.substring(0, 12);
                    var name = head + "...";
                    event_Vippoint.txt_name_me.setString(name);
                } else
                    event_Vippoint.txt_name_me.setString(jsonData["place"].nickname);
                event_Vippoint.txt_vp_me.setString("Vippoint: " + formatMoney(0, 3, jsonData["place"].vippoint));
                event_Vippoint.txt_destroy_me.setString("Thiệt hại: " + formatMoney(0, 3, jsonData["place"].subVippoint));
            }

            if (event_Vippoint.arrayTop != null)
                while (event_Vippoint.arrayTop.length > 0) {
                    event_Vippoint.arrayTop.pop();
                }

            var DataUser = jsonData["vips"];
            for (var i = 0; i < DataUser.length; i++) {
                var counter = DataUser[i];
                event_Vippoint.arrayTop.push(counter);

            }
            event_Vippoint.reload_Bangxephang();
            if (!cc.sys.isNative) {
                for (var i = 0; i < event_Vippoint.array_btn_moc.length; i++) {
                    cc.eventManager.addListener(event_Vippoint.onMovePoint.clone(), event_Vippoint.array_btn_moc[i]);
                }
            }
        },
        reload_Bangxephang: function () {
            this.lv_top_xh.removeAllItems();
            this.lv_top_xh.removeAllChildren();
            var cellHeight = 32;
            var positionY = 12;
            var fonts = {fontName: "Roboto-Medium", src: [{src: "res/Font/Roboto-Medium.ttf", type: "truetype"}]};
            if (this.arrayTop.length > 0) {
                for (var i = 0; i < this.arrayTop.length; i++) {
                    var cellList = new ccui.Layout();
                    cellList.height = cellHeight;
                    cellList.width = this.lv_top_xh.width;
                    cellList.setPosition(cc.p(0, 0));

                    var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(25, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbstt.setPosition(cc.p(21.18, positionY));
                    lbstt.setString(event_Vippoint.arrayTop[i].stt);

                    var lbnickname = new cc.LabelTTF('', fonts.fontName, 14, cc.size(120, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbnickname.setPosition(cc.p(93.89, positionY));
                    lbnickname.setString(event_Vippoint.arrayTop[i].nickname);

                    var lbvippoint = new cc.LabelTTF('', fonts.fontName, 14, cc.size(68, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbvippoint.setPosition(cc.p(187.71, positionY));
                    lbvippoint.setString(event_Vippoint.arrayTop[i].vippoint + " VP");

                    lbstt.setColor(GuiUtil.color("#f7ebc6"));
                    lbnickname.setColor(GuiUtil.color("#f7ebc6"));
                    lbvippoint.setColor(GuiUtil.color("#f7ebc6"));

                    if (i == 0) {
                        var vong1 = new cc.Sprite();
                        GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong1.png");
                        vong1.setPosition(cc.p(21.18, positionY + 2));
                        cellList.addChild(vong1);
                        lbstt.setColor(GuiUtil.color("#ffdf58"));
                        lbnickname.setColor(GuiUtil.color("#ffdf58"));
                        lbvippoint.setColor(GuiUtil.color("#ffdf58"));
                    } else if (i == 1) {
                        var vong1 = new cc.Sprite();
                        GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong2.png");
                        vong1.setPosition(cc.p(21.18, positionY + 2));
                        cellList.addChild(vong1);
                    } else if (i == 2) {
                        var vong1 = new cc.Sprite();
                        GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong3.png");
                        vong1.setPosition(cc.p(21.18, positionY + 2));
                        cellList.addChild(vong1);
                    } else {
                        cellList.addChild(lbstt);
                    }

                    if (event_Vippoint.arrayTop[i].nickname == userInfo.userData.nickname) {
                        this.isMeInList = true;
                        lbstt.setColor(GuiUtil.color("#ffdf58"));
                        lbnickname.setColor(GuiUtil.color("#ffdf58"));
                        lbvippoint.setColor(GuiUtil.color("#ffdf58"));
                    }

                    cellList.addChild(lbnickname);
                    cellList.addChild(lbvippoint);
                    this.lv_top_xh.pushBackCustomItem(cellList);
                }
                if (this.isMeInList == false) {
                    var cellList = new ccui.Layout();
                    cellList.height = cellHeight;
                    cellList.width = this.lv_top_xh.width;
                    cellList.setPosition(cc.p(0, 0));

                    var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(25, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbstt.setPosition(cc.p(21.18, positionY));
                    lbstt.setString(event_Vippoint.placeMe.stt);

                    var lbnickname = new cc.LabelTTF('', fonts.fontName, 14, cc.size(120, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbnickname.setPosition(cc.p(93.89, positionY));
                    lbnickname.setString(event_Vippoint.placeMe.nickname);

                    var lbvippoint = new cc.LabelTTF('', fonts.fontName, 14, cc.size(68, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbvippoint.setPosition(cc.p(187.71, positionY));
                    lbvippoint.setString(event_Vippoint.placeMe.vippoint + " VP");

                    lbstt.setColor(GuiUtil.color("#67ec8a"));
                    lbnickname.setColor(GuiUtil.color("#67ec8a"));
                    lbvippoint.setColor(GuiUtil.color("#67ec8a"));

                    cellList.addChild(lbstt);
                    cellList.addChild(lbnickname);
                    cellList.addChild(lbvippoint);
                    this.lv_top_xh.pushBackCustomItem(cellList);
                }
                /// ve 3 vitri dau tien
                // vitri 1
                for (var i = 0; i < 16; i++) {
                    if (event_Vippoint.arrayTop[0].vippoint >= event_Vippoint.arrrayPlaceVip[i].min) {
                        event_Vippoint.sp_vitri1.setVisible(true);
                        var button = new ccui.Button();
                        button = event_Vippoint.array_btn_moc[i];
                        event_Vippoint.sp_vitri1.x = button.x;
                        event_Vippoint.sp_vitri1.y = button.y;
                    }
                    //if (event_Vippoint.arrayTop[1].vippoint >= event_Vippoint.arrrayPlaceVip[i].min) {
                    //    event_Vippoint.sp_vitri2.setVisible(true);
                    //    var button = new ccui.Button();
                    //    button = event_Vippoint.array_btn_moc[i];
                    //    event_Vippoint.sp_vitri2.x = button.x;
                    //    event_Vippoint.sp_vitri2.y = button.y;
                    //}
                    //if (event_Vippoint.arrayTop[2].vippoint >= event_Vippoint.arrrayPlaceVip[i].min) {
                    //    event_Vippoint.sp_vitri3.setVisible(true);
                    //    var button = new ccui.Button();
                    //    button = event_Vippoint.array_btn_moc[i];
                    //    event_Vippoint.sp_vitri3.x = button.x;
                    //    event_Vippoint.sp_vitri3.y = button.y;
                    //}
                }
            }
        },

        parserBXH_Vippoint: function (kind) {
            if (kind == false) {
                var url = urlBXH_Intel_Vippoint(userInfo.userData.nickname);
                sendRequest(url, null, false, this.callBackData_Intel, this.callBackError);
            } else {
                var url = urlBXH_Strong_Vippoint(userInfo.userData.nickname);
                sendRequest(url, null, false, this.callBackData_Strong, this.callBackError);
            }
            //cc.log("url : " + url);
        },
        callBackData_Intel: function (response) {
            var jsonData = JSON.parse(response);
            event_Vippoint.IntelMe = jsonData["intel"];
            if (event_Vippoint.arrrayIntel != null)
                while (event_Vippoint.arrrayIntel.length > 0) {
                    event_Vippoint.arrrayIntel.pop();
                }

            var DataUser = jsonData["intels"];
            for (var i = 0; i < DataUser.length; i++) {
                var counter = DataUser[i];
                event_Vippoint.arrrayIntel.push(counter);

            }
            event_Vippoint.maxpage = (event_Vippoint.arrrayIntel.length / 10);
            event_Vippoint.reload_Data_Intel(event_Vippoint.page_bxh);
        },
        reload_Data_Intel: function (page) {
            this.lv_muutri.removeAllItems();
            this.lv_muutri.removeAllChildren();
            this.txt_page.setString(page + "/" + this.maxpage);
            var cellHeight = 30;
            var positionY = 12;
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            var end = page * 10;
            var start = end - 10;

            for (var i = 0; i < event_Vippoint.arrrayIntel.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.lv_muutri.width;

                var cellList = null;
                if (i % 2 == 0) {
                    cellList = new cc.LayerColor(GuiUtil.color(25, 23, 88, 160));
                } else {
                    cellList = new cc.LayerColor(GuiUtil.color("#39489E"));
                }
                cellList.height = cellHeight;
                cellList.width = this.lv_muutri.width;

                var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(53, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38, positionY));
                lbstt.setString(event_Vippoint.arrrayIntel[i].stt);

                var lbaccount = new cc.LabelTTF('', fonts.fontName, 14, cc.size(140, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38, positionY));
                lbaccount.setString(event_Vippoint.arrrayIntel[i].nickname);

                var lbvippoint = new cc.LabelTTF('', fonts.fontName, 14, cc.size(106, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippoint.setPosition(cc.p(250.42, positionY));
                lbvippoint.setString(formatMoney(0, 3, event_Vippoint.arrrayIntel[i].vippoint));

                var lbbonus = new cc.LabelTTF('', fonts.fontName, 14, cc.size(112, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbbonus.setPosition(cc.p(362.73, positionY));
                lbbonus.setString(event_Vippoint.arrrayIntel[i].bonus);

                var lbplace = new cc.LabelTTF('', fonts.fontName, 14, cc.size(64, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(453.31, positionY));
                lbplace.setString(event_Vippoint.arrrayIntel[i].place);

                var lbprize = new cc.LabelTTF('', fonts.fontName, 14, cc.size(260, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(615.91, positionY));
                var str = event_Vippoint.arrrayIntel[i].prize;
                if (event_Vippoint.arrrayIntel[i].prize == null || event_Vippoint.arrrayIntel[i].prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(GuiUtil.color("#f7ebc6"));
                lbaccount.setColor(GuiUtil.color("#f7ebc6"));
                lbplace.setColor(GuiUtil.color("#f7ebc6"));
                lbvippoint.setColor(GuiUtil.color("#f7ebc6"));
                lbbonus.setColor(GuiUtil.color("#f7ebc6"));
                lbprize.setColor(GuiUtil.color("#f7ebc6"));

                if (i == 0) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                    lbstt.setColor(GuiUtil.color("#ffdf58"));
                    lbaccount.setColor(GuiUtil.color("#ffdf58"));
                    lbplace.setColor(GuiUtil.color("#ffdf58"));
                    lbvippoint.setColor(GuiUtil.color("#ffdf58"));
                    lbbonus.setColor(GuiUtil.color("#ffdf58"));
                    lbprize.setColor(GuiUtil.color("#ffdf58"));
                } else if (i == 1) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong2.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                } else if (i == 2) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong3.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                } else {
                    cellList.addChild(lbstt);
                }

                if (event_Vippoint.arrrayIntel[i].nickname == userInfo.userData.nickname) {
                    this.isMeInListIntel = true;
                    lbstt.setColor(GuiUtil.color("#ffdf58"));
                    lbaccount.setColor(GuiUtil.color("#ffdf58"));
                    lbplace.setColor(GuiUtil.color("#ffdf58"));
                    lbvippoint.setColor(GuiUtil.color("#ffdf58"));
                    lbbonus.setColor(GuiUtil.color("#ffdf58"));
                    lbprize.setColor(GuiUtil.color("#ffdf58"));
                }

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite1.setScaleY(1);
                aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53, positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite2.setScaleY(1);
                aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91, positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite3.setScaleY(1);
                aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(305.81, positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite4.setScaleY(1);
                aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(419.87, positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite5.setScaleY(1);
                aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(484.59, positionY + 3));

                cellList.addChild(aSprite1);
                cellList.addChild(aSprite2);
                cellList.addChild(aSprite3);
                cellList.addChild(aSprite4);
                cellList.addChild(aSprite5);
                cellList.addChild(lbaccount);
                cellList.addChild(lbplace);
                cellList.addChild(lbvippoint);
                cellList.addChild(lbbonus);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_muutri.pushBackCustomItem(cl1);
            }
            if (this.isMeInListIntel == false) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.lv_muutri.width;

                var cellList = null;
                cellList = new cc.LayerColor(GuiUtil.color(25, 23, 88, 160));
                cellList.height = cellHeight;
                cellList.width = this.lv_muutri.width;

                var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(53, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38, positionY));
                if (parseInt(event_Vippoint.IntelMe.stt) == 0)
                    lbstt.setString("--");
                else
                    lbstt.setString(event_Vippoint.IntelMe.stt);

                var lbaccount = new cc.LabelTTF('', fonts.fontName, 14, cc.size(140, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38, positionY));
                lbaccount.setString(event_Vippoint.IntelMe.nickname);

                var lbvippoint = new cc.LabelTTF('', fonts.fontName, 14, cc.size(106, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippoint.setPosition(cc.p(250.42, positionY));
                lbvippoint.setString(formatMoney(0, 3, event_Vippoint.IntelMe.vippoint));

                var lbbonus = new cc.LabelTTF('', fonts.fontName, 14, cc.size(112, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbbonus.setPosition(cc.p(362.73, positionY));
                lbbonus.setString(event_Vippoint.IntelMe.bonus);

                var lbplace = new cc.LabelTTF('', fonts.fontName, 14, cc.size(64, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(453.31, positionY));
                lbplace.setString(event_Vippoint.IntelMe.place);

                var lbprize = new cc.LabelTTF('', fonts.fontName, 14, cc.size(260, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(615.91, positionY));
                var str = event_Vippoint.IntelMe.prize;
                if (event_Vippoint.IntelMe.prize == null || event_Vippoint.IntelMe.prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(GuiUtil.color("#67ec8a"));
                lbaccount.setColor(GuiUtil.color("#67ec8a"));
                lbplace.setColor(GuiUtil.color("#67ec8a"));
                lbvippoint.setColor(GuiUtil.color("#67ec8a"));
                lbbonus.setColor(GuiUtil.color("#67ec8a"));
                lbprize.setColor(GuiUtil.color("#67ec8a"));

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite1.setScaleY(1);
                aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53, positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite2.setScaleY(1);
                aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91, positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite3.setScaleY(1);
                aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(305.81, positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite4.setScaleY(1);
                aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(419.87, positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite5.setScaleY(1);
                aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(484.59, positionY + 3));

                cellList.addChild(aSprite1);
                cellList.addChild(aSprite2);
                cellList.addChild(aSprite3);
                cellList.addChild(aSprite4);
                cellList.addChild(aSprite5);

                cellList.addChild(lbstt);
                cellList.addChild(lbaccount);
                cellList.addChild(lbplace);
                cellList.addChild(lbvippoint);
                cellList.addChild(lbbonus);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_muutri.pushBackCustomItem(cl1);
            }
        },

        callBackData_Strong: function (response) {
            var jsonData = JSON.parse(response);
            event_Vippoint.StrongMe = jsonData["strong"];
            if (event_Vippoint.arrrayStrong != null)
                while (event_Vippoint.arrrayStrong.length > 0) {
                    event_Vippoint.arrrayStrong.pop();
                }

            var DataUser = jsonData["strongs"];
            for (var i = 0; i < DataUser.length; i++) {
                var counter = DataUser[i];
                event_Vippoint.arrrayStrong.push(counter);

            }
            event_Vippoint.maxpage = (event_Vippoint.arrrayStrong.length / 10);
            event_Vippoint.reload_Data_Strong(event_Vippoint.page_bxh);
        },
        reload_Data_Strong: function (page) {
            this.lv_kiencuong.removeAllItems();
            this.lv_kiencuong.removeAllChildren();
            this.txt_page.setString(page + "/" + this.maxpage);
            var cellHeight = 30;
            var positionY = 12;
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            var end = page * 10;
            var start = end - 10;

            for (var i = 0; i < event_Vippoint.arrrayStrong.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.lv_kiencuong.width;

                var cellList = null;
                if (i % 2 == 0) {
                    cellList = new cc.LayerColor(GuiUtil.color(25, 23, 88, 160));
                } else {
                    cellList = new cc.LayerColor(GuiUtil.color("#39489E"));
                }
                cellList.height = cellHeight;
                cellList.width = this.lv_kiencuong.width;

                var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(53, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38, positionY));
                lbstt.setString(event_Vippoint.arrrayStrong[i].stt);

                var lbaccount = new cc.LabelTTF('', fonts.fontName, 14, cc.size(140, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38, positionY));
                lbaccount.setString(event_Vippoint.arrrayStrong[i].nickname);

                var lbvippointSub = new cc.LabelTTF('', fonts.fontName, 14, cc.size(117, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippointSub.setPosition(cc.p(253.81, positionY));
                lbvippointSub.setString(formatMoney(0, 3, event_Vippoint.arrrayStrong[i].vippointSub));

                var lbdragon = new cc.LabelTTF('', fonts.fontName, 14, cc.size(122, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbdragon.setPosition(cc.p(373.42, positionY));
                lbdragon.setString(event_Vippoint.arrrayStrong[i].count);

                var lbplace = new cc.LabelTTF('', fonts.fontName, 14, cc.size(69, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(468.91, positionY));
                lbplace.setString(event_Vippoint.arrrayStrong[i].place);

                var lbprize = new cc.LabelTTF('', fonts.fontName, 14, cc.size(260, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(608.41, positionY));
                var str = event_Vippoint.arrrayStrong[i].prize;
                if (event_Vippoint.arrrayStrong[i].prize == null || event_Vippoint.arrrayStrong[i].prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(GuiUtil.color("#f7ebc6"));
                lbaccount.setColor(GuiUtil.color("#f7ebc6"));
                lbvippointSub.setColor(GuiUtil.color("#f7ebc6"));
                lbdragon.setColor(GuiUtil.color("#f7ebc6"));
                lbprize.setColor(GuiUtil.color("#f7ebc6"));

                if (i == 0) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                    lbstt.setColor(GuiUtil.color("#ffdf58"));
                    lbaccount.setColor(GuiUtil.color("#ffdf58"));
                    lbvippointSub.setColor(GuiUtil.color("#ffdf58"));
                    lbdragon.setColor(GuiUtil.color("#ffdf58"));
                    lbplace.setColor(GuiUtil.color("#ffdf58"));
                    lbprize.setColor(GuiUtil.color("#ffdf58"));
                } else if (i == 1) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong2.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                } else if (i == 2) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong3.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                } else {
                    cellList.addChild(lbstt);
                }

                if (event_Vippoint.arrrayStrong[i].nickname == userInfo.userData.nickname) {
                    this.isMeInListStrong = true;
                    lbstt.setColor(GuiUtil.color("#ffdf58"));
                    lbaccount.setColor(GuiUtil.color("#ffdf58"));
                    lbvippointSub.setColor(GuiUtil.color("#ffdf58"));
                    lbdragon.setColor(GuiUtil.color("#ffdf58"));
                    lbplace.setColor(GuiUtil.color("#ffdf58"));
                    lbprize.setColor(GuiUtil.color("#ffdf58"));
                }

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite1.setScaleY(1);
                aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53, positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite2.setScaleY(1);
                aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91, positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite3.setScaleY(1);
                aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(311.37, positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite4.setScaleY(1);
                aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(432.81, positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite5.setScaleY(1);
                aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(502.81, positionY + 3));

                cellList.addChild(aSprite1);
                cellList.addChild(aSprite2);
                cellList.addChild(aSprite3);
                cellList.addChild(aSprite4);
                cellList.addChild(aSprite5);
                cellList.addChild(lbaccount);
                cellList.addChild(lbvippointSub);
                cellList.addChild(lbdragon);
                cellList.addChild(lbplace);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_kiencuong.pushBackCustomItem(cl1);
            }
            if (this.isMeInListStrong == false) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.lv_kiencuong.width;

                var cellList = null;
                cellList = new cc.LayerColor(GuiUtil.color(25, 23, 88, 160));
                cellList.height = cellHeight;
                cellList.width = this.lv_kiencuong.width;

                var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(53, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38, positionY));
                if (parseInt(event_Vippoint.StrongMe.stt) == 0)
                    lbstt.setString("--");
                else
                    lbstt.setString(event_Vippoint.StrongMe.stt);

                var lbaccount = new cc.LabelTTF('', fonts.fontName, 14, cc.size(140, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38, positionY));
                lbaccount.setString(event_Vippoint.StrongMe.nickname);

                var lbvippointSub = new cc.LabelTTF('', fonts.fontName, 14, cc.size(106, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippointSub.setPosition(cc.p(253.81, positionY));
                lbvippointSub.setString(formatMoney(0, 3, event_Vippoint.StrongMe.vippointSub));

                var lbdragon = new cc.LabelTTF('', fonts.fontName, 14, cc.size(112, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbdragon.setPosition(cc.p(373.42, positionY));
                lbdragon.setString(event_Vippoint.StrongMe.count);

                var lbplace = new cc.LabelTTF('', fonts.fontName, 14, cc.size(69, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(468.91, positionY));
                lbplace.setString(event_Vippoint.StrongMe.place);

                var lbprize = new cc.LabelTTF('', fonts.fontName, 14, cc.size(260, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(608.41, positionY));
                var str = event_Vippoint.IntelMe.prize;
                if (event_Vippoint.IntelMe.prize == null || event_Vippoint.StrongMe.prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(GuiUtil.color("#67ec8a"));
                lbaccount.setColor(GuiUtil.color("#67ec8a"));
                lbvippointSub.setColor(GuiUtil.color("#67ec8a"));
                lbdragon.setColor(GuiUtil.color("#67ec8a"));
                lbplace.setColor(GuiUtil.color("#67ec8a"));
                lbprize.setColor(GuiUtil.color("#67ec8a"));

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite1.setScaleY(1);
                aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53, positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite2.setScaleY(1);
                aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91, positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite3.setScaleY(1);
                aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(311.37, positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite4.setScaleY(1);
                aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(432.81, positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite5.setScaleY(1);
                aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(502.81, positionY + 3));

                cellList.addChild(aSprite1);
                cellList.addChild(aSprite2);
                cellList.addChild(aSprite3);
                cellList.addChild(aSprite4);
                cellList.addChild(aSprite5);

                cellList.addChild(lbstt);
                cellList.addChild(lbaccount);
                cellList.addChild(lbvippointSub);
                cellList.addChild(lbdragon);
                cellList.addChild(lbplace);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_kiencuong.pushBackCustomItem(cl1);
            }
        },

        funDragonEvent: function () {
            event_Vippoint.number_nhay = event_Vippoint.number_nhay + 1;
            if (event_Vippoint.number_nhay <= 3) {
                event_Vippoint.event_run.setVisible(true);
                event_Vippoint.event_run.runAction(cc.sequence(cc.fadeIn(0.35), cc.delayTime(2.5), cc.fadeOut(0.35), cc.callFunc(function () {
                    event_Vippoint.event_run.setVisible(false);
                }), cc.delayTime(1.5), cc.callFunc(function () {
                    event_Vippoint.funDragonEvent();
                })));
            } else {
                event_Vippoint.event_run.stopAllActions();
                event_Vippoint.number_nhay = 0;
                event_Vippoint.event_run.setVisible(false);
                event_Vippoint.event_run.runAction(cc.fadeOut(0));
            }
        }
    }
);
code_event_Vippoint.BTN_CLOSE_EVENT_VIP = 1;
code_event_Vippoint.BTN_MOC_1 = 2;
code_event_Vippoint.BTN_MOC_2 = 3;
code_event_Vippoint.BTN_MOC_3 = 4;
code_event_Vippoint.BTN_MOC_4 = 5;
code_event_Vippoint.BTN_MOC_5 = 6;
code_event_Vippoint.BTN_MOC_6 = 7;
code_event_Vippoint.BTN_MOC_7 = 8;
code_event_Vippoint.BTN_MOC_8 = 9;
code_event_Vippoint.BTN_MOC_9 = 10;
code_event_Vippoint.BTN_MOC_10 = 11;
code_event_Vippoint.BTN_MOC_11 = 12;
code_event_Vippoint.BTN_MOC_12 = 13;
code_event_Vippoint.BTN_MOC_13 = 14;
code_event_Vippoint.BTN_MOC_14 = 15;
code_event_Vippoint.BTN_MOC_15 = 16;
code_event_Vippoint.BTN_MOC_16 = 17;

code_event_Vippoint.BTN_UPDOWN_VP = 18;

code_event_Vippoint.BTN_MUU_TRI = 19;
code_event_Vippoint.BTN_KIEN_CUONG = 20;
code_event_Vippoint.BTN_CLOSE_BANG_XH = 21;

code_event_Vippoint.BTN_OPEN_BANG_XH = 22;
code_event_Vippoint.BTN_THE_LE = 23;
code_event_Vippoint.BTN_HIDE_TOP = 24;

code_event_Vippoint.BTN_BACK_PAGE = 25;
code_event_Vippoint.BTN_BACKALL_PAGE = 26;
code_event_Vippoint.BTN_NEXT_PAGE = 27;
code_event_Vippoint.BTN_NEXTALL_PAGE = 28;
code_event_Vippoint.BTN_CLOSE_THELE_EVENT = 29;


openEvent_Vip = function () {
    // if (event_Vippoint === null) {
    //     event_Vippoint = new code_event_Vippoint();
    //     event_VippointX = event_Vippoint.getPosition().x;
    //     event_VippointY = event_Vippoint.getPosition().y;
    //     var curScene = SceneMgr.getInstance().getRunningScene();
    //     curScene.addGUI(event_Vippoint, BaseScene.INDEX_INFO_GUI, 0);
    // }
    // else {
    //     event_Vippoint.pn_event_Vip.runAction(cc.scaleTo(0.2, 1));
    //     if (!cc.sys.isNative)
    //         event_Vippoint.resumeMovePoint();
    // }


    event_Vippoint = new code_event_Vippoint();
    event_VippointX = event_Vippoint.getPosition().x;
    event_VippointY = event_Vippoint.getPosition().y;
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(event_Vippoint, BaseScene.INDEX_INFO_GUI, 0);

    event_VippointAppear = true;
    event_Vippoint.parserGetConfigVippointEvent();
    if (!cc.sys.isNative)
        lobby.pauseItemGameListen();
    if (menutab != null && !cc.sys.isNative)
        menutab.pauseHeader();
};
closeEvent_Vip = function () {
    if (event_Vippoint === null) {
        return;
    }
    if (event_VippointAppear) {
        event_Vippoint.pn_event_Vip.runAction(cc.scaleTo(0.2, 0));
        event_VippointAppear = false;
        event_Vippoint.isMeInListIntel = false;
        event_Vippoint.isMeInListStrong = false;
        event_Vippoint.isMeInList = false;
        if (!cc.sys.isNative) {
            lobby.resumeItemGameListen();
            event_Vippoint.pauseMovePoint();
        }
        event_Vippoint = null;
    }
    if (menutab != null && !cc.sys.isNative)
        menutab.resumeHeader();
};

