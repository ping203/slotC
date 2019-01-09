/**
 * Created by Admin on 4/6/2017.
 */
DeCheThanhRome.Content = {
    arrLineSelect:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    isAutoRotate:false,
    currentRoom:0,
    betValue:100
};
var deCheThanhRome = null;
var deCheThanhRomeAppear = false;
var DeCheThanhRomeLayer = BaseLayer.extend(
{
    ctor: function() {
        this.removeSpines = [];
        this._super("deCheThanhRome");
        this.waitingKhoBau = false;
        this.waitingBanCung = false;
        this.particalLua = null;
        this.particalLua2 = null;
        this.free = 0;
        this.totalMoneyChoiThu = 10000000;
        this.isChoiThu = false;
        this.isBackToLobby = false;
        this.totalItemColum = 20;
        this.lineSelected = 1;
        this.betValue = DeCheThanhRomeLayer.BET_VALUE_ROOM1;
        this.currentRoom = DeCheThanhRomeLayer.ROOM1;
        this.sumBet = 100;
        this.soLuotChuaMo  = 10;
        this.soLanMo = 0;
        this.giaTriNhan = 1;
        this.isShowMayMan = false;
        this.isChangeRoom = false;
        this.valueHuSlot1 = 0;
        this.valueHuSlot2 = 0;
        this.valueHuSlot3 = 0;
        this.x21 = 0;
        this.x22 = 0;
        this.isStart = true;
        this.arrItemMatrix = [];
        this.arrIndexLine = [9,3,7,10,4,1,5,8,2,6,20,11,15,18,17,13,14,19,12,16];
        this.mapBinh = [
            {
                position:cc.p(428,435),
                scale:0.73},
            {
                position:cc.p(540,435),
                scale:0.73},
            {
                position:cc.p(651,435),
                scale:0.73},
            {
                position:cc.p(760,435),
                scale:0.73},
            {
                position:cc.p(871,435),
                scale:0.73},


            {
                position:cc.p(148,389),
                scale:0.8},
            {
                position:cc.p(260,389),
                scale:0.8},
            {
                position:cc.p(372,389),
                scale:0.8},
            {
                position:cc.p(485,389),
                scale:0.8},
            {
                position:cc.p(597,389),
                scale:0.8},
            {
                position:cc.p(709,389),
                scale:0.8},
            {
                position:cc.p(821,389),
                scale:0.8},
            {
                position:cc.p(934,389),
                scale:0.8},
            {
                position:cc.p(1046,389),
                scale:0.8},
            {
                position:cc.p(1159,389),
                scale:0.8},

            {
                position:cc.p(183,338),
                scale:0.9},
            {
                position:cc.p(317,338),
                scale:0.9},
            {
                position:cc.p(450,338),
                scale:0.9},
            {
                position:cc.p(583,338),
                scale:0.9},
            {
                position:cc.p(717,338),
                scale:0.9},
            {
                position:cc.p(850,338),
                scale:0.9},
            {
                position:cc.p(984,338),
                scale:0.9},
            {
                position:cc.p(1117,338),
                scale:0.9},
            {
                position:cc.p(251,286),
                scale:1},
            {
                position:cc.p(384,286),
                scale:1},
            {
                position:cc.p(518,286),
                scale:1},
            {
                position:cc.p(651,286),
                scale:1},
            {
                position:cc.p(785,286),
                scale:1},
            {
                position:cc.p(918,286),
                scale:1},
            {
                position:cc.p(1052,286),
                scale:1},

        ];
        this.mapPositionLine = [
            cc.p(19,19),
            cc.p(19,58),
            cc.p(19,97),
            cc.p(19,163),
            cc.p(19,202),
            cc.p(19,241),
            cc.p(19,280),
            cc.p(19,348),
            cc.p(19,387),
            cc.p(19,426),

            cc.p(1028,19),
            cc.p(1028,58),
            cc.p(1028,97),
            cc.p(1028,163),
            cc.p(1028,202),
            cc.p(1028,241),
            cc.p(1028,280),
            cc.p(1028,348),
            cc.p(1028,387),
            cc.p(1028,426),

            //cc.p(1145,181),
            //cc.p(1145,220),
            //cc.p(1145,159),
            //cc.p(1145,325),
            //cc.p(1145,364),
            //cc.p(1145,403),
            //cc.p(1145,442),
            //cc.p(1145,510),
            //cc.p(1145,549),
            //cc.p(1028,588),

        ];
        this.mapLine = [
            [ 5, 6, 7, 8, 9],//1
            [ 0, 1, 2, 3, 4],//2
            [10,11,12,13,14],//3
            [ 5, 6, 2, 8, 9],//4
            [ 5, 6,12, 8, 9],//5
            [ 0, 1, 7, 3, 4],//6
            [10,11, 7,13,14],//7
            [ 0,11, 2,13, 4],//8
            [10, 1,12, 3,14],//9
            [ 5, 1,12, 3, 9],//10
            [10, 6, 2, 8,14],//11
            [ 0, 6,12, 8, 4],//12
            [ 5,11, 7, 3, 9],//13
            [ 5, 1, 7,13, 9],//14
            [10, 6, 7, 8,14],//15
            [ 0, 6, 7, 8, 4],//16
            [ 5, 1, 2, 3, 9],//17
            [ 5,11,12,13, 9],//18
            [10,11, 7, 3, 4],//19
            [ 0, 1, 7,13,14]//20

        ];
        this.resultHaiSao = 0;

        this.arrLsgd = [];
        this.arrTopUser = [];
        this.arrVinhdanh = [];
        this.objLsgd = {
            "rf":598,
            "un":"phamCanh",
            "bv":100,
            "lb":"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
            "lw":"1,10,12,14,15,16,18",
            "pz":4100,
            "ps":"300,400,300,400,300,2000,400",
            "ts":"20:51:46 28-10-2016"
        };
        this.resultSlot = {
            ref: 1618702,
            result: 0,
            matrix: "5,6,5,3,0,2,4,2,0,3,5,6,4,6,0",
            linesWin: "",
            khoBau: "",
            prize: 0,
            currentMoney: 9883889209033,
            freeSpin: 0,
            ratio: false
        };
        this.currentPageTopUser = 1;
        this.currentPageLsgd = 1;
        this.totalPage = 100;
        this.isShowTopUser = false;
        this.isShowVinhDanh = true;
        this.positionCenter = cc.p(0,0);
        this.positionCenterBG = cc.p(0,0);

        this.arrLineSelect = [];
        this.pdeCheThanhRome = null;
        this.pFrameItem = null;
        this.pShowLine = null;
        this.column1 = 1;
        this.column2 = 2;
        this.column3 = 3;
        this.column4 = 4;
        this.column5 = 5;
        this.isAutoRotate = false;
        this.isRotate = false;
        this.isWaitingRotate = false;
        this.pVinhDanh = null;
        this.lv_vinh_danh = null;
        this.pItem = null;
        this.pColum1 = null;
        this.pColum2 = null;
        this.pColum3 = null;
        this.pColum4 = null;
        this.pColum5 = null;


        this.sp_num1 = null;
        this.sp_num2 = null;
        this.sp_num3 = null;
        this.sp_num4 = null;
        this.sp_num5 = null;
        this.sp_num6 = null;
        this.sp_num7 = null;
        this.sp_num8 = null;
        this.sp_num9 = null;
        this.sp_num10 = null;
        this.sp_num11 = null;
        this.sp_num12 = null;
        this.sp_num13 = null;
        this.sp_num14 = null;
        this.sp_num15 = null;
        this.sp_num16 = null;
        this.sp_num17 = null;
        this.sp_num18 = null;
        this.sp_num19 = null;
        this.sp_num20 = null;
        
        this.isPlayMinigame = false;

        this.btn_choi_thu = null;
        this.btn_back_lobby = null;
        this.sp_girl = null;

        this.pMenu = null;
        this.lb_nick_name = null;
        //this.sp_avatar = null;
        this.lb_prize_show = null;
        this.lb_prize = null;
        this.lb_total_money = null;
        this.lb_so_dong = null;
        this.btn_tu_quay = null;
        this.btn_quay = null;
        //this.btn_dung_quay = null;
        this.lb_tong_dat = null;
        this.lb_muc_dat = null;
        this.btn_x2_quy_thuong = null;
        this.lb_date_x2 = null;
        this.sp_quy_thuong = null;

        this.btn_bang_thuong = null;
        this.btn_dong = null;
        this.btn_muc_cuoc = null;
        //this.btn_huong_dan = null;
        this.btn_top_no_hu = null;
        this.btn_lich_su = null;
        this.lb_hu = null;
        this.btn_close_chon_dong = null;


        this.pChonDong= null;
        this.btn_dong_chan = null;
        this.btn_dong_le = null;
        this.btn_chon_het = null;
        this.btn_chon_lai = null;

        // this.pThongKe = null;
        this.btn_lsgd = null;
        this.btn_ls_trung_hu = null;
        this.btn_vinh_danh = null;
        this.img_ls_giao_dich = null;
        this.img_ls_trung_hu = null;
        this.btn_back_all = null;
        this.btn_back = null;
        this.btn_next_all = null;
        this.btn_next = null;
        this.lb_page = null;
        this.lv_lich_su_giao_dich = null;
        this.lv_lich_su_trung_hu = null;
        this.pControl = null;


        this.lv_vinh_danh = null;

        this.pHu = null;
        this.lb_hu_room1 = null;
        this.lb_hu_room2 = null;
        this.lb_hu_room3 = null;

        this.pNoHu = null;
        this.sp_bg_sang_vang = null;
        this.sp_duong_vang = null;
        this.lb_prize_no_hu = null;

        this.pThangLon = null;
        this.sp_bg_sang_xanh = null;
        this.sp_tui_tien = null;
        this.lb_prize_thang_lon = null;

        this.pBanDoKhoBau = null;
        this.pStartBanDo = null;

        this.btn_ban_do = null;
        this.pPlayBanDo = null;
        this.lb_lan_con_lai = null;
        this.lb_diem_tich_luy = null;
        this.pMayMan = null;
        this.pEndBanDo = null;
        this.lb_tong_tien_ban_do = null;
        this.btn_thoat_ban_do = null;
        this.sp_luot_mien_phi = null;
        this.lb_so_luot_mien_phi = null;
        this.waitingNoHu = false;
        this.waitingThangLon = false;
        this.isX2 = false;
        this.audioDeCheThanhRome = null;
        this.btn_an = null;
        this.btn_setting = null;
        this.pSetting = null;
        this.btn_am_thanh = null;
        this.btn_nhac_nen = null;
        this.sp_off_am_thanh = null;
        this.sp_off_nhac_nen = null;
        this.isFreeDaiLy = false;

        this.pLobby = null;
        this.btn_room1 = null;
        this.btn_room2 = null;
        this.btn_room3 = null;
        this.lb_pot_room1 = null;
        this.lb_pot_room2 = null;
        this.lb_pot_room3 = null;

        this.pThongBao = null;
        this.btn_thong_bao_co = null;
        this.btn_thong_bao_khong = null;

        this.pBangThuong = null;
        this.btn_close_bang_thuong = null;
        this.isStartMiniGame = false;
        this.sp_bg_text_luot_quay_mien_phi = null;
        this.lb_free_spin = null;

        this.pStartMienPhi = null;
        this.lb_thong_bao_free = null;

        this.pEndMienPhi = null;
        this.lb_total_free = null;
        this.lb_he_so_nhan = null;
        this.lb_sum_free = null;
        this.isFreeInGame = false;
        this.valuePot1 = 0;
        this.valuePot2 = 0;
        this.valuePot3 = 0;

        this.totalValuePot1 = 0;
        this.totalValuePot2 = 0;
        this.totalValuePot3 = 0;

        this.sizeContent = cc.size(1280,720);
    },
    customizeGUI: function () {
        this.audioDeCheThanhRome = new DeCheThanhRomeAudio(true,true);
        if(cc.sys.isNative)
        {
            this.positionCenter = cc.p(640,360);
            this.positionCenterBG = cc.p(640,360);
        }else
        {
            this.positionCenterBG = cc.p(640,270);
            this.positionCenter = cc.p(640,317);
        }
        this.setContentSize(cc.size(1280,720));
        this.addLayout(this,"pdeCheThanhRome",this.positionCenterBG,"res/DeCheThanhRome/back_ground/bg.jpg",cc.size(1920,1080),true);
        this.addLayout(this,"pBgRoom",this.positionCenterBG,"res/DeCheThanhRome/back_ground/bg_room0.png",cc.size(1920,1080),true);
        if(!cc.sys.isNative)
        this.addLayout(this,"pVinhDanh",cc.p(1431,344),"res/DeCheThanhRome/back_ground/bg_vinh_danh.png",cc.size(393,581),false);

        this.addLayout(this,"pItem",this.positionCenter,"res/DeCheThanhRome/item/khung_item.png",this.sizeContent,true);
        this.addLayout(this,"pMenu",this.positionCenter,null,this.sizeContent,true);
        if(!cc.sys.isNative)
            this.addSprite(this,"pShowLine",cc.p(640,341),"res/DeCheThanhRome/item/num_line.png",cc.size(1048,445));
        else
            this.addSprite(this,"pShowLine",cc.p(640,384),"res/DeCheThanhRome/item/num_line.png",cc.size(1048,445));
        this.addLayout(this,"pNoHu",this.positionCenterBG,null,cc.size(1920,1080),true);
        this.addLayout(this,"pThangLon",this.positionCenterBG,null,cc.size(1920,1080),true);
        this.addLayout(this,"pBanDoKhoBau",this.positionCenter,"res/DeCheThanhRome/mini_game/bg.jpg",this.sizeContent,true);
        this.addLayout(this,"pStartMienPhi",this.positionCenter,"res/DeCheThanhRome/back_ground/bg_thong_bao.png",this.sizeContent,true);
        this.addLayout(this,"pEndMienPhi",this.positionCenter,"res/DeCheThanhRome/back_ground/bg_thong_bao.png",this.sizeContent,true);

        this.addLayout(this,"pChonDong",this.positionCenter,"res/DeCheThanhRome/back_ground/bg_bang.png",this.sizeContent,true);

        this.addLayout(this,"pLobby",this.positionCenter,"res/DeCheThanhRome/back_ground/bg_bang.png",this.sizeContent,true);
        this.addLayout(this,"pSetting",cc.p(1092,543),"res/DeCheThanhRome/bg_music.png",cc.size(167,141),false);
        this.addLayout(this,"pThongBao",this.positionCenter,"res/DeCheThanhRome/back_ground/bg_thong_bao.png",this.sizeContent,true);
        this.addLayout(this,"pBangThuong",this.positionCenter,"res/DeCheThanhRome/back_ground/bg_bang.png",this.sizeContent,true);
        if(!cc.sys.isNative)
            this.initPVinhDanh();
        this.initPItem();
        this.initPMenu();
        this.initPShowLine();
        this.initMouseIndexLine();
        this.initPThangLon();
        this.initPNoHu();
        this.initPMiniGame();
        this.initPStartMienPhi();
        this.initPEndMienPhi();
        this.initPChonDong();
        this.initPSetting();
        this.initPLobby();
        this.initPThongBao();
        this.initPBangThuong();

        this.updateUserInfo();
        this.parserDataTopUser();
        this.loadContent();
    },
    onButtonRelease: function(button,id) {
        cc.log("BTN " + id);
        this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.button);
        if(this.pSetting.isVisible() && id != DeCheThanhRomeLayer.BTN_AM_THANH && id != DeCheThanhRomeLayer.BTN_NHAC_NEN && id != DeCheThanhRomeLayer.BTN_SETTING)
        {
            this.pSetting.setVisible(false);
        }
        switch (id) {
            case DeCheThanhRomeLayer.BTN_TU_QUAY:
                if(this.isChoiThu)
                {
                    this.toastSlot("Chơi thử không dùng được chế độ tự quay",3);
                }else
                if(this.isFreeDaiLy)
                {
                    this.toastSlot("Lượt quay hằng ngày không dùng được chế độ tự quay",3);
                }
                else
                {
                    if(this.waitingKhoBau == false)
                    {
                        if(this.isAutoRotate == false)
                        {
                            if(this.isChangeRoom)
                            {
                                this.toastSlot("Bạn đang chuyển room, vui lòng chờ",3);
                            }else
                            if(this.isRotate)
                            {
                                this.toastSlot("Bạn đang quay, vui lòng chờ quay xong",3);
                            }else
                            if(this.isWaitingRotate)
                            {
                                this.toastSlot("Hệ thống đang xử lý, vui lòng chờ",3);
                            }else
                            {
                                this.isWaitingRotate = true;
                                this.isAutoRotate = true;
                                this.autoPlay(this.getArrayLineSelected());
                                this.btn_quay.setBright(false);
                                this.btn_tu_quay.setBright(false);
                                this.btn_tu_quay.loadTextures("res/DeCheThanhRome/dung_quay.png","res/DeCheThanhRome/dung_quay.png","res/DeCheThanhRome/dung_quay.png");
                            }

                        }else{
                            this.isAutoRotate = false;
                            this.stopAutoPlay();
                            this.btn_tu_quay.loadTextures("res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png");
                        }

                    }


                }
                break;
            case DeCheThanhRomeLayer.BTN_QUAY:
                if(this.checkDonePlay())
                {
                    this.isRotate = true;
                    if(this.isChoiThu)
                    {
                        this.responseChoiThu();
                    }else
                    {
                        this.play(this.betValue,this.getArrayLineSelected());
                    }
                }

                break;
            case DeCheThanhRomeLayer.BTN_CHOI_THU:
                if(this.resultSlot.freeSpin > 0)
                {
                    this.toastSlot("Bạn còn lượt quay miễn phí");
                }else
                if(this.checkDonePlay())
                {
                    if(!this.isChoiThu)
                    {
                        this.loadChoiThu()

                    }else
                    {
                        this.loadChoiThat();
                    }
                }
                break;
            case DeCheThanhRomeLayer.BTN_BACK_LOBBY:
                this.isBackToLobby = true;
                deCheThanhRomeUnsubscribe(this.currentRoom);
                closeDeCheThanhRome();
                break;
            case DeCheThanhRomeLayer.BTN_AN:
                this.minimize(this.currentRoom);
                closeDeCheThanhRome();
                break;
            case DeCheThanhRomeLayer.BTN_BANG_THUONG:
                this.pBangThuong.setVisible(true);
                break;
            case DeCheThanhRomeLayer.BTN_TOP_NO_HU:
                openDeCheThanhRomeTopUser();
                break;
            case DeCheThanhRomeLayer.BTN_LICH_SU:
                openDeCheThanhRomeLSGD();
                break;
            case DeCheThanhRomeLayer.BTN_DONG:
                if(this.isChoiThu)
                {
                    this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                }else if(this.resultSlot.freeSpin > 0)
                {
                    this.toastSlot("Bạn còn lượt quay miễn phí",3);
                }
                else if(this.checkDonePlay())
                {
                    this.pChonDong.setVisible(true);
                }
                break;
            case DeCheThanhRomeLayer.BTN_CLOSE_CHON_DONG:
                this.pChonDong.setVisible(false);
                break;
            case DeCheThanhRomeLayer.BTN_CLOSE_BANG_THUONG:
                this.pBangThuong.setVisible(false);
                break;
            case DeCheThanhRomeLayer.BTN_DONG_CHAN:
                this.selectLineChan();
                break;
            case DeCheThanhRomeLayer.BTN_DONG_LE:
                this.selectLineLe();
                break;
            case DeCheThanhRomeLayer.BTN_CHON_HET:
                this.selectLineAll();
                break;
            case DeCheThanhRomeLayer.BTN_CHON_LAI:
                this.chonLai();
                break;
            case DeCheThanhRomeLayer.BTN_MUC_CUOC:
                if(this.resultSlot.freeSpin > 0)
                {
                    this.toastSlot("Bạn còn lượt quay miễn phí",3);
                }else
                if(this.isAutoRotate)
                {
                    this.pThongBao.setVisible(true);
                }else
                {
                    this.showPlobby();
                }

                break;
            case DeCheThanhRomeLayer.BTN_ROOM1:
                this.loadSelectRoom(DeCheThanhRomeLayer.ROOM1);
                break;
            case DeCheThanhRomeLayer.BTN_ROOM2:
                this.loadSelectRoom(DeCheThanhRomeLayer.ROOM2);
                break;
            case DeCheThanhRomeLayer.BTN_ROOM3:
                this.loadSelectRoom(DeCheThanhRomeLayer.ROOM3);
                break;
            case DeCheThanhRomeLayer.BTN_THONG_BAO_CO:
                this.isAutoRotate = false;
                this.stopAutoPlay();
                this.btn_tu_quay.loadTextures("res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png");
                this.pThongBao.setVisible(false);
                this.showPlobby();
                break;
            case DeCheThanhRomeLayer.BTN_THONG_BAO_KHONG:
                this.pThongBao.setVisible(false);
                break;
            case DeCheThanhRomeLayer.BTN_SETTING:
                if(this.pSetting.isVisible())
                {
                    this.pSetting.setVisible(false);
                }else
                {
                    this.pSetting.setVisible(true);
                }
                break;
            case DeCheThanhRomeLayer.BTN_AM_THANH:

                if(!this.sp_off_am_thanh.isVisible())
                {
                    this.audioDeCheThanhRome.offSoundEffect();
                    this.sp_off_am_thanh.setVisible(true);
                }else
                {
                    this.audioDeCheThanhRome.onSoundEffect();
                    this.sp_off_am_thanh.setVisible(false);
                }
                break;
            case DeCheThanhRomeLayer.BTN_NHAC_NEN:
                if(!this.sp_off_nhac_nen.isVisible())
                {
                    this.audioDeCheThanhRome.offSoundBackGround();
                    this.sp_off_nhac_nen.setVisible(true);
                }else
                {
                    this.audioDeCheThanhRome.onSoundBackGround();
                    this.sp_off_nhac_nen.setVisible(false);
                }
                break;
            case DeCheThanhRomeLayer.BTN_THOAT_BAN_DO:
                this.endBanDoKhoBau();
                break;
            case DeCheThanhRomeLayer.BTN_X2_QUY_THUONG:
                openDeCheThanhRomeTheLeX2();
                break;

        }
    },
    initMouseIndexLine: function()
    {
        if ('mouse' in cc.sys.capabilities) {
            this.mouseLis = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                },
                onMouseMove: function (event) {
                    var pos = event.getLocation();
                    target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(event.getLocation());
                    // cc.log("onMouseMove at: " + pos.x + " " + pos.y );
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    if (!cc.rectContainsPoint(rect, locationInNode)) {
                        // Minigame.hideToolTip();

                        deCheThanhRome.hideShowLineShow(-1);

                    } else {

                        for(var i = 0; i < deCheThanhRome.mapPositionLine.length; i++)
                        {
                            if(cc.rectContainsPoint(cc.rect(deCheThanhRome.mapPositionLine[i].x-19, deCheThanhRome.mapPositionLine[i].y-19, 39, 38),locationInNode))
                            {
                                deCheThanhRome.hideShowLineShow(i);

                                break;
                            }else
                            {
                                //nuDiepVien.hideShowLineShow(0);
                            }
                        }


                    }

                },
                onMouseUp: function (event) {
                    var pos = event.getLocation();
                    target = event.getCurrentTarget();

                    cc.log("onMouseUp at: " + pos.x + " " + pos.y);
                }
            });

        } else {
            cc.log("MOUSE Not supported");
        }
        if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener(this.mouseLis, this.pShowLine);

        }
    },
    hideShowLineShow:function(index)
    {
        for(var i = 0; i<20; i++)
        {
            if(i  == index)
            {
                this["spShowLine" + this.arrIndexLine[index].toString()].setVisible(true);
            }else
            {
                this["spShowLine" + this.arrIndexLine[i].toString()].setVisible(false);
            }
        }
    },
    initPVinhDanh:function()
    {
        this.lv_vinh_danh = new ccui.ListView();
        this.lv_vinh_danh.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.lv_vinh_danh.setTouchEnabled(true);
        this.lv_vinh_danh.setBounceEnabled(true);
        this.lv_vinh_danh.setClippingEnabled(true);
        this.lv_vinh_danh.setContentSize(cc.size(282, 367));
        this.lv_vinh_danh.setAnchorPoint(cc.p(0.5,0.5));
        this.lv_vinh_danh.setPosition(cc.p(200,260));
        this.pVinhDanh.addChild(this.lv_vinh_danh);
    },
    initPItem:function()
    {
        var xStart = 98;
        var yStart = 255;
        var khongCach = 186;
        this.addLayout(this.pItem,"pFrameItem",cc.p(640,384),null,cc.size(940,510),false);
        this.pFrameItem.setClippingEnabled(true);
        for(var i = 1; i<=5; i++)
        {
            this.addLayout(this.pFrameItem,"pColum"+i,cc.p(xStart+(i-1)*khongCach,yStart),null,cc.size(188,510),false);
        }
        this.initItem();

        this.addSprite(this.pFrameItem,"lTienTangLon",cc.p(0,-230),"res/DeCheThanhRome/hieu_ung/thang_lon.png");
        this.addSprite(this.pFrameItem,"rTienTangLon",cc.p(885,-230),"res/DeCheThanhRome/hieu_ung/thang_lon.png");
        //this.lTienTangLon.runAction(cc.repeatForever(cc.rotateBy(1,180)));
        //this.rTienTangLon.runAction(cc.repeatForever(cc.rotateBy(1,-180)));
        this.lTienTangLon.setVisible(false);
        this.rTienTangLon.setVisible(false);
        this.addSprite(this.pFrameItem,"lTienNoHu",cc.p(0,-200),"res/DeCheThanhRome/hieu_ung/jackpot.png");
        this.addSprite(this.pFrameItem,"rTienNoHu",cc.p(885,-200),"res/DeCheThanhRome/hieu_ung/jackpot.png");
        //this.lTienNoHu.runAction(cc.repeatForever(cc.rotateBy(1,180)));
        //this.rTienNoHu.runAction(cc.repeatForever(cc.rotateBy(1,-180)))
        this.lTienNoHu.setVisible(false);
        this.rTienNoHu.setVisible(false)
    },
    initItem:function()
    {
        var khoangCach = 170;
        var viTriDauY = 85;
        var viTriDauX = 94;
        for(var j = this.totalItemColum ; j >= -1 ; j--)
        {
            for(var i=1;i<6;i++)
            {
                this["pColum"+ i.toString()].indexColumn = i;
                this["spItem"+ i.toString() + j.toString()] = new cc.Sprite();
                this["spItem"+ i.toString() + j.toString()].initWithFile("res/DeCheThanhRome/item/item"+getRandomInt(0,6)+".png",cc.rect(0,0,161,161));
                this["spItem"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX,viTriDauY + khoangCach*j));
                this["pColum"+ i.toString()].addChild(this["spItem"+ i.toString() + j.toString()]);
            }

        }
        var arrMatrix = this.resultSlot.matrix.split(",");
        for(var j= 2; j >= 0; j--)
        {
            for(var i= 1; i< 6; i++)
            {
                this["spItem" + i.toString() + j.toString()].setTexture("res/DeCheThanhRome/item/item"+arrMatrix[(i-1) + ((2-j)*5)]+".png");

                this.addSprite(this.pFrameItem,"spNenItem"+ i.toString() + j.toString(),cc.p(this["pColum"+ i.toString()].getPosition().x,(this["pColum"+ i.toString()].getPosition().y - khoangCach) + khoangCach*j),"res/DeCheThanhRome/hieu_ung/khung1.png");
                //this.addSprite(this["spNenItem"+ i.toString() + j.toString()],"sp_hieu_ung_caster"+ i.toString() + j.toString(),cc.p(100,100),"res/DeCheThanhRome/hieu_ung/caster1.png");
                //this.addSprite(this["spNenItem"+ i.toString() + j.toString()],"sp_hieu_ung_bonus"+ i.toString() + j.toString(),cc.p(118,137),"res/DeCheThanhRome/hieu_ung/item_bonus/bonus_flare.png");
                //this.addSprite(this["spNenItem"+ i.toString() + j.toString()],"sp_hieu_ung_jackpot"+ i.toString() + j.toString(),cc.p(100,100),"res/DeCheThanhRome/hieu_ung/jackpot1.png");

                //this["sp_hieu_ung_jackpot"+ i.toString() + j.toString()].setTag(0);
                //this["sp_hieu_ung_bonus" + i.toString() + j.toString() ].setTag(1);
                //this["sp_hieu_ung_caster"+ i.toString() + j.toString()].setTag(2);
                this["spNenItem"+ i.toString() + j.toString()].setVisible(false);
                //this["sp_hieu_ung_jackpot"+ i.toString() + j.toString()].setVisible(false);
                //this["sp_hieu_ung_bonus"+ i.toString() + j.toString()].setVisible(false);
                //this["sp_hieu_ung_caster"+ i.toString() + j.toString()].setVisible(false);
                this.arrItemMatrix.push(this["spNenItem"+ i.toString() + j.toString()]);

            }
        }

    },
    initLuaRoom3:function () {
        this.particalLua = vqv.ParticleLua.create();
        this.particalLua.initWithTotalParticles(50);
        this.particalLua.setPosition(cc.p(55,332));
        this.particalLua.setScale(0.5);
        this.particalLua.texture = cc.textureCache.addImage("res/DeCheThanhRome/particle_texture.png");
        this.pMenu.addChild(this.particalLua);

        this.particalLua2 = vqv.ParticleLua.create();
        this.particalLua2.initWithTotalParticles(50);
        this.particalLua2.setPosition(cc.p(1224,332));
        this.particalLua2.setScale(0.5);
        this.particalLua2.texture = cc.textureCache.addImage("res/DeCheThanhRome/particle_texture.png");
        this.pMenu.addChild(this.particalLua2);
    },
    removeLuaRoom3:function () {
        if(this.particalLua != null)
        {
            this.particalLua.removeFromParent(true);
            this.particalLua = null;
        }

        if(this.particalLua2 != null)
        {
            this.particalLua2.removeFromParent(true);
            this.particalLua2 = null;
        }
    },
    initPMenu:function()
    {
        //var spHoaLa = null;
        //this.addSprite(this.pMenu,"spHoaLa",cc.p(1200,124),"res/DeCheThanhRome/back_ground/hoa_la.png");
        //this.addSprite(this.pMenu,"spDenLua",cc.p(57,177),"res/DeCheThanhRome/back_ground/den_lua.png");
        //
        //


        this.addSprite(this.pMenu,"spBgTabDuoi",cc.p(640,90),"res/DeCheThanhRome/back_ground/tab_duoi.png");
        this.addSprite(this.pMenu,"spBgHu",cc.p(640,689),"res/DeCheThanhRome/back_ground/bg_hu.png");
        this.addSprite(this.pMenu,"sp_quy_thuong",cc.p(640,657),"res/DeCheThanhRome/menu/quy_thuong.png");
        this.addSprite(this.pMenu,"spBgUser",cc.p(917,678),"res/DeCheThanhRome/bg_user.png");
        this.addSprite(this.spBgUser,"spIconMoney",cc.p(32,32),"res/Minigame/ImageChung/choivin.png");

        this.addText(this.pMenu,"lb_nick_name",cc.p(943,690),"test123456789",fontRobotoBlack.fontName,20);
        this.addText(this.pMenu,"lb_total_money",cc.p(942,668),"5.000.000",fontRobotoBlack.fontName,24);
        this.lb_total_money.setColor(colorMoneyVin);

        this.addImage(this.pMenu,"sp_luot_mien_phi",cc.p(50,500),"res/Minigame/ImageChung/luot_quay_mien_phi.png",cc.size(165,99));
        this.addText(this.sp_luot_mien_phi,"lb_so_luot_mien_phi",cc.p(82,50),"0",fontRobotoBlack.fontName,36);
        this.lb_so_luot_mien_phi.setColor(cc.color.YELLOW);


        this.addText(this.pMenu,"lb_hu",cc.p(640,693),"500.000",UTMBitsumishi.fontName,46);

        this.lb_hu.ignoreContentAdaptWithSize(false);
        this.lb_hu.setContentSize(cc.size(289,57));
        this.lb_hu.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_hu.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER) ;
        this.addButton("btn_bang_thuong",DeCheThanhRomeLayer.BTN_BANG_THUONG,this.pMenu,cc.p(119,63),true,"res/DeCheThanhRome/help.png","res/DeCheThanhRome/help.png");
        this.addButton("btn_back_lobby",DeCheThanhRomeLayer.BTN_BACK_LOBBY,this.pMenu,cc.p(133,680),true,"res/DeCheThanhRome/back.png","res/DeCheThanhRome/back.png");
        this.addButton("btn_top_no_hu",DeCheThanhRomeLayer.BTN_TOP_NO_HU,this.pMenu,cc.p(347,680),true,"res/DeCheThanhRome/top_user.png","res/DeCheThanhRome/top_user.png");
        this.addButton("btn_lich_su",DeCheThanhRomeLayer.BTN_LICH_SU,this.pMenu,cc.p(418,680),true,"res/DeCheThanhRome/lsgd.png","res/DeCheThanhRome/lsgd.png");
        this.addButton("btn_an",DeCheThanhRomeLayer.BTN_AN,this.pMenu,cc.p(1072,680),true,"res/DeCheThanhRome/btn_an.png","res/DeCheThanhRome/btn_an.png");
        this.addButton("btn_setting",DeCheThanhRomeLayer.BTN_SETTING,this.pMenu,cc.p(1143,680),true,"res/DeCheThanhRome/setting.png","res/DeCheThanhRome/setting.png");
        this.addButton("btn_dong",DeCheThanhRomeLayer.BTN_DONG,this.pMenu,cc.p(254,63),true,"res/DeCheThanhRome/dong.png",null);
        this.addButton("btn_muc_cuoc",DeCheThanhRomeLayer.BTN_MUC_CUOC,this.pMenu,cc.p(405,63),true,"res/DeCheThanhRome/muc_dat.png",null);
        this.addButton("btn_tu_quay",DeCheThanhRomeLayer.BTN_TU_QUAY,this.pMenu,cc.p(919,63),true,"res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png");
        //this.addSprite(this.pMenu,"sp_xoay",cc.p(1185,96),"res/DeCheThanhRome/hoa_van_xoay.png");
        this.addButton("btn_quay",DeCheThanhRomeLayer.BTN_QUAY,this.pMenu,cc.p(1122,77),true,"res/DeCheThanhRome/btn_quay.png","res/DeCheThanhRome/btn_quay.png");
        this.addButton("btn_choi_thu",DeCheThanhRomeLayer.BTN_CHOI_THU,this.pMenu,cc.p(240,680),true,"res/DeCheThanhRome/choi_thu.png",null);
        //this.addButton("btn_x2_quy_thuong",DeCheThanhRomeLayer.BTN_X2_QUY_THUONG,this.pMenu,cc.p(52,537),true,"res/Minigame/ImageChung/gio_vang_x2.png",null);

        //this.addText(this.btn_x2_quy_thuong,"lb_date_x2",cc.p(46,26),"22/12/2017",fontRobotoBlack.fontName,16);

        this.addText(this.pMenu,"lb_so_dong",cc.p(252,48),"20",fontRobotoBold.fontName,32);
        this.addText(this.pMenu,"lb_muc_dat",cc.p(404,48),"100",fontRobotoBold.fontName,32);
        //this.lb_so_dong.setColor(cc.color(178,227,255));
        //this.lb_muc_dat.setColor(cc.color(178,227,255));
        this.addText(this.pMenu,"lb_prize",cc.p(691,86),"20",fontRobotoBold.fontName,30);
        this.lb_prize.ignoreContentAdaptWithSize(false);
        this.lb_prize.setContentSize(cc.size(187,33));
        this.lb_prize.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_prize.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER) ;
        this.addText(this.pMenu,"lb_tong_dat",cc.p(690,47),"20",fontRobotoBold.fontName,30);
        //this.addSprite(this.pMenu,"sp_txt_quay",cc.p(1203,26),"res/DeCheThanhRome/txt_quay.png");

    },
    initPShowLine:function()
    {
        for(var i = 1; i <= 20; i++)
        {
            this.addSprite(this.pShowLine,"spShowLine"+i,cc.p(524,222.5),"res/DeCheThanhRome/line/line"+i+".png");
        }
        var xStart1 = 137;
        var xStart2 = 1143;
        var yStart = 209;
        var khoangCach = 39.5;

        for(var i= 0; i<this.arrIndexLine.length;i++)
        {
            //if(parseInt(i/10) == 0)
            //{
            //    var posi = cc.p(xStart1,yStart + i*khoangCach);
            //
            //    this.mapPositionLine.push(posi);
            //}else
            //{
            //    var posi = cc.p(xStart2,yStart + i%10*khoangCach);
            //    this.mapPositionLine.push(posi);
            //}
            var posi = this.mapPositionLine[i];
            this.addSprite(this.pShowLine,"sp_num"+this.arrIndexLine[i],posi,"res/DeCheThanhRome/line/"+this.arrIndexLine[i]+"_1.png");

        }
        this.addText(this.pShowLine,"lb_prize_show",cc.p(530,240),"0",fontRobotoBold.fontName,120);
        this.lb_prize_show.setColor(cc.color(255,255,0));
        this.lb_prize_show.enableOutline(cc.color.RED, 2);
        this.lb_prize_show.setVisible(false);

        this.addSprite(this.pShowLine,"sp_bg_text_luot_quay_dai_ly",cc.p(640,260),"res/Minigame/ImageChung/bg_thong_bao.png");
        this.addText(this.sp_bg_text_luot_quay_dai_ly,"lb_free_dai_ly",cc.p(275, 33),"",fontRobotoBlack.fontName,36);
        this.lb_free_dai_ly.setColor(cc.color.YELLOW);
        this.sp_bg_text_luot_quay_dai_ly.setVisible(false);

        this.addSprite(this.pShowLine,"sp_bg_text_luot_quay_mien_phi",cc.p(640,150),"res/Minigame/ImageChung/bg_thong_bao.png");
        this.addText(this.sp_bg_text_luot_quay_mien_phi,"lb_free_spin",cc.p(275, 33),"",fontRobotoBlack.fontName,36);
        this.sp_bg_text_luot_quay_mien_phi.setVisible(false);
    },
    initPNoHu:function()
    {
        //this.addSprite(this.pNoHu,"sp_bg_sang_vang" ,cc.p(960,600),"res/DeCheThanhRome/no_hu/grow_duoi.png");
        //this.addSprite(this.pNoHu,"sp_bg_sang_vang_tren" ,cc.p(960,708),"res/DeCheThanhRome/no_hu/grow_tren.png");
        //this.addSprite(this.pNoHu,"sp_duong_vang" ,cc.p(960,691),"res/DeCheThanhRome/no_hu/bg.png");
        this.addText(this.pNoHu,"lb_prize_no_hu",cc.p(960,470),"0",fontRobotoBlack.fontName,100);
        this.lb_prize_no_hu.setColor(cc.color.YELLOW);
        this.lb_prize_no_hu.enableOutline(cc.color(165,42,42),2);
        this.lb_prize_no_hu.setLocalZOrder(10);
        this.pNoHu.addTouchEventListener(function(sender,type){
            switch (type){
                case ccui.Widget.TOUCH_ENDED:
                    if(!this.waitingNoHu)
                    {
                        this.hideNohu();
                    }
                    break;
            }

        },this);
        this.pNoHu.setVisible(false);

        //this.showNoHu();
    },
    showNoHu:function()
    {
       /* for(var i = 0; i< 3; i++)
        {
            if(this.pNoHu.getChildByName("particleMoneyNoHu" + i)!= null)
            {
                this.pNoHu.removeChildByName("particleMoneyNoHu" + i,true);
            }
        }
        this.waitingNoHu = true;
        this.lb_prize_no_hu.setString(formatMoney(0,3,this.resultSlot.prize));
        this.pNoHu.runAction(cc.sequence(cc.delayTime(5),cc.callFunc(function(){
            this.waitingNoHu = false;
        }.bind(this))));
        this.pNoHu.setVisible(true);
        this.pNoHu.setScale(0);
        this.sp_bg_sang_vang.stopAllActions();
        this.sp_bg_sang_vang.runAction(cc.repeatForever(cc.rotateBy(5,360)));
        this.sp_duong_vang.stopAllActions();
        this.sp_duong_vang.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,0.9),cc.scaleTo(0.3,1))));
        this.pNoHu.runAction(cc.sequence(cc.scaleTo(0.5,1),cc.callFunc(function(){


        }.bind(this))));
        this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.noHu);
        for(var i = 0; i < 3; i++)
        {
            var particleMoneyNoHu = new vqv.ParticleBigWin.create();
            particleMoneyNoHu.initWithTotalParticles(100);
            particleMoneyNoHu.setPosition(cc.p(960,1180));
            particleMoneyNoHu.setName("particleMoneyNoHu" + i);
            particleMoneyNoHu.texture = cc.textureCache.addImage("res/DeCheThanhRome/vin gold_"+i+".png");
            this.pNoHu.addChild(particleMoneyNoHu);
        }*/
        this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.noHu);
        this.pNoHu.setVisible(true);
        this.pNoHu.runAction(cc.sequence(cc.delayTime(5),cc.callFunc(function(){
            this.waitingNoHu = false;
        }.bind(this))));
        this.lb_prize_no_hu.setString(formatMoney(0,3,this.resultSlot.prize));
        this.spineNoHu = new sp.SkeletonAnimation('res/DeCheThanhRome/spine/jackpot/Jackpot.json', 'res/DeCheThanhRome/spine/jackpot/Jackpot.atlas');
        this.spineNoHu.setMix("animation1","animation2_loop",1);
        this.spineNoHu.setAnimation(0, 'animation1', false);
        this.spineNoHu.setPosition(cc.p(960,390));
        this.spineNoHu.setLocalZOrder(1);
        this.pNoHu.addChild(this.spineNoHu);
        this.spineNoHu.addAnimation(0,"animation2_loop",true);
        this.lTienNoHu.runAction(cc.repeatForever(cc.rotateBy(1,180)));
        this.rTienNoHu.runAction(cc.repeatForever(cc.rotateBy(1,-180)));
        this.lTienNoHu.setVisible(true);
        this.rTienNoHu.setVisible(true);

    },
    hideNohu:function()
    {
        this.pNoHu.stopAllActions();
        this.pNoHu.setVisible(false);
        this.lb_prize_no_hu.setString("");
        //this.sp_bg_sang_vang.stopAllActions();
        //this.sp_duong_vang.stopAllActions();
        this.waitingNoHu = false;
        this.spineNoHu.removeFromParent(true);
        //for(var i = 0; i< 3; i++)
        //{
        //    if(this.pNoHu.getChildByName("particleMoneyNoHu" + i)!= null)
        //    {
        //        this.pNoHu.getChildByName("particleMoneyNoHu" + i).removeFromParent();
        //    }
        //}
        this.lTienNoHu.stopAllActions();
        this.rTienNoHu.stopAllActions();
        this.lTienNoHu.setVisible(false);
        this.rTienNoHu.setVisible(false);
    },

    showGiaiThuong:function()
    {
        this.lb_prize_show.setPosition(cc.p(530,240));
        this.lb_prize_show.setScale(1);
        this.lb_prize_show.setVisible(true);
        this.lb_prize_show.stopAllActions();

        /*if(this.pMenu.getChildByName("particleMoneyThuong")!= null)
        {
            this.pMenu.getChildByName("particleMoneyThuong").removeFromParent();
        }
        var particleMoneyThuong = new vqv.ParticleWinNol.create();
        particleMoneyThuong.initWithTotalParticles(100);
        particleMoneyThuong.setPosition(cc.p(640,145));
        particleMoneyThuong.setName("particleMoneyThuong");
        particleMoneyThuong.texture = cc.textureCache.addImage("res/DeCheThanhRome/vin_gold_0.png");
        this.pMenu.addChild(particleMoneyThuong);*/

        var prz = this.resultSlot.prize;

        effectRunMoneyPlus(this.lb_prize_show,0,this.resultSlot.prize,parseInt(this.resultSlot.prize/20),true);

        this.lb_prize_show.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            var runPrize = cc.spawn(cc.moveTo(1,cc.p(600,-50)),cc.scaleTo(1,0));
            this.lb_prize_show.runAction(cc.sequence(runPrize,cc.callFunc(function(){
                this.lb_prize.setString(formatMoney(0,3,prz));
                this.lb_prize.setString(formatMoney(0,3,prz));
            }.bind(this))));
        }.bind(this))));
    },

    initPThangLon:function()
    {

        //this.addSprite(this.pThangLon,"sp_bg_sang_xanh" ,cc.p(960,600),"res/DeCheThanhRome/no_hu/grow_duoi.png");
        //this.addSprite(this.pThangLon,"sp_bg_sang_xanh_tren" ,cc.p(960,708),"res/DeCheThanhRome/no_hu/grow_tren.png");
        //this.addSprite(this.pThangLon,"sp_tui_tien" ,cc.p(960,586),"res/DeCheThanhRome/thang_lon/bg_thang_lon.png");
        this.addText(this.pThangLon,"lb_prize_thang_lon",cc.p(960,500),"0",fontRobotoBlack.fontName,100);
        this.lb_prize_thang_lon.setColor(cc.color.YELLOW);
        this.lb_prize_thang_lon.enableOutline(cc.color(165,42,42),2);
        this.lb_prize_thang_lon.setLocalZOrder(10);

        this.pThangLon.addTouchEventListener(function(sender,type){
            switch (type){
                case ccui.Widget.TOUCH_ENDED:
                    if(!this.waitingThangLon)
                    {
                        this.hideThangLon();
                    }
                    break;
            }

        },this);

        this.pThangLon.setVisible(false);
    },

    showThangLon:function()
    {
        /*for(var i = 0; i< 3; i++)
        {
            if(this.pThangLon.getChildByName("particleMoneyThangLon" + i)!= null)
            {
                this.pThangLon.getChildByName("particleMoneyThangLon" + i).removeFromParent();
            }
        }
        this.waitingThangLon = true;
        this.pThangLon.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            this.waitingThangLon = false;
        }.bind(this))));
        if(this.resultSlot.ratio>0)
            this.lb_prize_thang_lon.setString(formatMoney(0,3,this.resultSlot.prize*this.resultSlot.ratio));

        else
            this.lb_prize_thang_lon.setString(formatMoney(0,3,this.resultSlot.prize));

        this.pThangLon.setVisible(true);
        this.pThangLon.setScale(0);
        this.sp_bg_sang_xanh.stopAllActions();
        this.sp_bg_sang_xanh.runAction(cc.repeatForever(cc.rotateBy(5,360)));
        this.sp_tui_tien.stopAllActions();
        this.sp_tui_tien.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,0.9),cc.scaleTo(0.3,1))));
        this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.resultBigWin);
        this.pThangLon.runAction(cc.sequence(cc.scaleTo(0.5,1),cc.callFunc(function(){


        }.bind(this))));
        for(var i = 0; i < 3; i++)
        {
            var particleMoneyThangLon = new vqv.ParticleBigWin.create();
            particleMoneyThangLon.initWithTotalParticles(100);
            particleMoneyThangLon.setPosition(cc.p(960,1180));
            particleMoneyThangLon.setName("particleMoneyThangLon" + i);
            particleMoneyThangLon.texture = cc.textureCache.addImage("res/DeCheThanhRome/vin gold_"+i+".png");
            this.pThangLon.addChild(particleMoneyThangLon);
        }*/
        this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.resultBigWin);
        this.pThangLon.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            this.waitingThangLon = false;
        }.bind(this))));
        this.pThangLon.setVisible(true);
        this.pThangLon.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            this.waitingThangLon = false;
        }.bind(this))));
        if(this.resultSlot.ratio>0)
            this.lb_prize_thang_lon.setString(formatMoney(0,3,this.resultSlot.prize*this.resultSlot.ratio));

        else
            this.lb_prize_thang_lon.setString(formatMoney(0,3,this.resultSlot.prize));
        this.spineThangLon = new sp.SkeletonAnimation('res/DeCheThanhRome/spine/bigwin/Bigwin.json', 'res/DeCheThanhRome/spine/bigwin/Bigwin.atlas');
        this.spineThangLon.setAnimation(0, 'animation', true);
        this.spineThangLon.setPosition(cc.p(960,390));
        this.spineThangLon.setLocalZOrder(1);
        this.pThangLon.addChild(this.spineThangLon);


        this.spineThangLon.setStartListener(function(trackIndex){
            var entry =  skeletonWill.getState().getCurrent(trackIndex);
            if(entry){
                var animationName = entry.animation ? entry.animation.name : "";
                cc.log("%d start: %s", trackIndex, animationName);
            }
        }.bind(this));
        this.spineThangLon.setEndListener(function(traceIndex){
            cc.log("%d end.", traceIndex);
            //skeletonWill.removeFromParent(true);
        }.bind(this));
        this.spineThangLon.setCompleteListener(function(traceIndex, loopCount){
            cc.log("%d complete: %d", traceIndex, loopCount);
        }.bind(this));
        this.spineThangLon.setEventListener(function(traceIndex, event){
            cc.log( traceIndex + " event: %s, %d, %f, %s",event.data.name, event.intValue, event.floatValue, event.stringValue);
        }.bind(this));

        this.lTienTangLon.runAction(cc.repeatForever(cc.rotateBy(1,180)));
        this.rTienTangLon.runAction(cc.repeatForever(cc.rotateBy(1,-180)));
        this.lTienTangLon.setVisible(true);
        this.rTienTangLon.setVisible(true);

    },

    hideThangLon:function()
    {
        this.pThangLon.stopAllActions();
        this.pThangLon.setVisible(false);
        this.lb_prize_thang_lon.setString("");
        this.waitingThangLon = false;
        this.spineThangLon.removeFromParent(true);
        //for(var i = 0; i< 3; i++)
        //{
        //    if(this.pThangLon.getChildByName("particleMoneyThangLon" + i)!= null)
        //    {
        //        this.pThangLon.getChildByName("particleMoneyThangLon" + i).removeFromParent();
        //    }
        //}

        this.lTienTangLon.stopAllActions();
        this.rTienTangLon.stopAllActions();
        this.lTienTangLon.setVisible(false);
        this.rTienTangLon.setVisible(false);
    },


    initPMiniGame:function()
    {
        this.pBanDoKhoBau.setClippingEnabled(true);

        for(var i = 0; i<this.mapBinh.length; i++)
        {
            this.addLayout(this.pBanDoKhoBau,"pBinh" + i,this.mapBinh[i].position,"",cc.size(0,0),false);
            this["btnSelectPlay" + i] = new ccui.Button();
            this["btnSelectPlay" + i].loadTextures("res/DeCheThanhRome/mini_game/binh.png","res/DeCheThanhRome/mini_game/binh.png","res/DeCheThanhRome/mini_game/binh.png");
            this["btnSelectPlay" + i].setPosition(cc.p(0,0));
            this["btnSelectPlay" + i].setTag(i);
            this["btnSelectPlay" + i].setScale(this.mapBinh[i].scale);

            this["pBinh"+i].addChild(this["btnSelectPlay" + i]);

            this["btnSelectPlay" + i].addTouchEventListener(function(sender,type){
                switch (type){
                    case ccui.Widget.TOUCH_ENDED:
                        if(!this.isShowMayMan)
                        {

                            //this["sp_hat_vo"+sender.getTag()].runAction(this.actionBtnMiniGame());

                            this.selectPlayBanDo(sender);
                            if(this.isStartMiniGame)
                            {
                                this.isStartMiniGame = false;
                                //this.lb_thong_bao.setVisible(false);
                                if(this.waitingKhoBau)
                                {
                                    this.pBanDoKhoBau.stopAllActions();
                                    this.stopAutoPlay();
                                    //this.isAutoRotate = false;
                                    //this.btn_tu_quay.loadTextures("res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png");
                                    if(!this.isRotate)
                                    {
                                        this.btn_quay.setBright(true);
                                        this.btn_tu_quay.setBright(true);
                                    }
                                }
                            }
                        }
                        break;
                }

            },this);


        }

        this.spineCungTen = new sp.SkeletonAnimation('res/DeCheThanhRome/spine/minigame/Banten_V3/banten.json', 'res/DeCheThanhRome/spine/minigame/Banten_V3/banten.atlas');
        //this.spineCungTen.setAnimation(0, 'dungyen', false);
        this.spineCungTen.setPosition(cc.p(640,0));
        this.pBanDoKhoBau.addChild(this.spineCungTen);
        this.spineCungTen.setAnimation(0,"Keodaycung",false);
        // this.spineNoHu.addAnimation(0,"animation2_loop",true);

        this.addSprite(this.pBanDoKhoBau,"sp_bg_lan_con_lai",cc.p(241,72),"res/DeCheThanhRome/mini_game/bg_diem.png");
        this.addSprite(this.pBanDoKhoBau,"sp_bg_diem_tich_luy",cc.p(1045,72),"res/DeCheThanhRome/mini_game/bg_diem.png");

        this.addText(this.sp_bg_lan_con_lai,"lb_lan_con_lai",cc.p(354,36),"0",fontRobotoBold.fontName,43);
        this.lb_lan_con_lai.setColor(cc.color.YELLOW);
        this.lb_lan_con_lai.enableOutline(cc.color.BLACK,2);
        this.addText(this.sp_bg_diem_tich_luy,"lb_diem_tich_luy",cc.p(354,36),"0",fontRobotoBold.fontName,43);
        this.lb_diem_tich_luy.setColor(cc.color.YELLOW);
        this.lb_diem_tich_luy.enableOutline(cc.color.BLACK,2);

        this.addText(this.sp_bg_lan_con_lai,"txt_lb_lan_con_lai",cc.p(175,36),"Số lần còn lại",fontRobotoBold.fontName,43);
        this.lb_lan_con_lai.setColor(cc.color.YELLOW);
        this.lb_lan_con_lai.enableOutline(cc.color.BLACK,2);

        this.addText(this.sp_bg_diem_tich_luy,"txt_lb_diem_tich_luy",cc.p(175,36),"Điểm tích lũy",fontRobotoBold.fontName,43);
        this.lb_diem_tich_luy.setColor(cc.color.YELLOW);
        this.lb_diem_tich_luy.enableOutline(cc.color.BLACK,2);

        //this.addSprite(this.pBanDoKhoBau,"text_mini_game",cc.p(640,360),"res/DeCheThanhRome/mini_game/text_mini_game.png");
        this.addSprite(this.pBanDoKhoBau,"sp_tam_ban",cc.p(640,360),"res/DeCheThanhRome/mini_game/tam_ban.png");
        this.sp_tam_ban.setVisible(false);

        //this.addSprite(this.pBanDoKhoBau,"sp_mn_shadow",cc.p(640,360),"res/DeCheThanhRome/mini_game/shadow.png");
        this.addSprite(this.pBanDoKhoBau,"sp_start_minigame",cc.p(640,360),"res/DeCheThanhRome/mini_game/bg_start.jpg");

        this.addText(this.pBanDoKhoBau,"lb_prize_minigame",cc.p(640,360,36),"",fontRobotoBold.fontName,22);
        this["lb_prize_minigame"].setTextColor(cc.color(0,128,0));

        var khoangCachY = 155;
        var khoangCachX = 125;
        var startPositionPlay = cc.p(78,585);
        var StartX = 78;
        var StartY = 585;



        this.addLayout(this.pBanDoKhoBau,"pMayMan",cc.p(640,360),"res/DeCheThanhRome/mini_game/bg_thong_bao.png",cc.size(1280,720),true);
        this.pMayMan.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pMayMan.setBackGroundColor(cc.color.BLACK);
        this.pMayMan.setBackGroundColorOpacity(200);

        this.addLayout(this.pBanDoKhoBau,"pEndBanDo",cc.p(640,360),"res/DeCheThanhRome/mini_game/bg_thong_bao.png",cc.size(1280,720),true);
        this.pEndBanDo.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pEndBanDo.setBackGroundColor(cc.color.BLACK);
        this.pEndBanDo.setBackGroundColorOpacity(200);

        this.initGiaMayMan();
        this.initEndBanDo();
        this.pBanDoKhoBau.setVisible(false);

    },
    initGiaMayMan:function()
    {

        this.addText(this.pMayMan,"lb_title_duong_vang",cc.p(640,500),"LỌ NƯỚC THẦN",UTMAlexander.fontName,36);
        this.lb_title_duong_vang.setColor(cc.color.YELLOW);
        this.lb_title_duong_vang.enableOutline(cc.color.BLACK,2);
        var startX= 449;
        var startY = 382;
        var kcX= 191;
        var kcY = 151;
        var kcText = 55;
        for(var i = 0; i < 5; i++)
        {
            this["btnSelectMayMan" + i] = new ccui.Button();
            this["btnSelectMayMan" + i].loadTextures("res/DeCheThanhRome/mini_game/btn_may_man.png","res/DeCheThanhRome/mini_game/btn_may_man.png","res/DeCheThanhRome/mini_game/btn_may_man.png");

            //this["lbSelectMayMan" + i] =  new cc.LabelTTF('',  RobotoRegular.fontName, 20, cc.size(94,23), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this["btnSelectMayMan" + i].setTag(i);
            if(i < 3)
            {
                this["btnSelectMayMan" + i].setPosition(cc.p(startX + (i%3)*kcX,startY - parseInt(i/3)*kcY));
                this.pMayMan.addChild(this["btnSelectMayMan" + i]);
                this.addText(this.pMayMan,"lbSelectMayMan" + i,cc.p(startX + (i%3)*kcX+10,startY - parseInt(i/3)*kcY - kcText),"",UTMAlexander.fontName,24);
                this.addSprite(this.pMayMan,"spIconVin"+i,cc.p(startX + (i%3)*kcX-55,startY - parseInt(i/3)*kcY - kcText),"res/Minigame/ImageChung/choivin.png");
                this["spIconVin"+i].setScale(0.5);

            }else
            {

                this["btnSelectMayMan" + i].setPosition(cc.p(startX + (i%3)*kcX + kcX/2,startY - parseInt(i/3)*kcY));
                this.pMayMan.addChild(this["btnSelectMayMan" + i]);
                this.addText(this.pMayMan,"lbSelectMayMan" + i,cc.p(startX + (i%3)*kcX + kcX/2 + 10,startY - parseInt(i/3)*kcY - kcText),"",UTMAlexander.fontName,24);
                this.addSprite(this.pMayMan,"spIconVin"+i,cc.p(startX + (i%3)*kcX + kcX/2 - 55,startY - parseInt(i/3)*kcY - kcText),"res/Minigame/ImageChung/choivin.png");
                this["spIconVin"+i].setScale(0.5);
                //this["lbSelectMayMan" + i].setPosition(cc.p(startX + (i%3)*kcX + kcX/2 + 10,startY - parseInt(i/3)*kcY - kcText));

            }
            this["lbSelectMayMan" + i].setColor(cc.color.YELLOW);
            this["lbSelectMayMan" + i].enableOutline(cc.color.RED,2);

        }
        this.pMayMan.setVisible(false);
    },
    initEndBanDo:function()
    {
        this.addButton("btn_thoat_ban_do",DeCheThanhRomeLayer.BTN_THOAT_BAN_DO,this.pEndBanDo,cc.p(640,360),false,"res/DeCheThanhRome/mini_game/bg_thong_bao.png","res/DeCheThanhRome/mini_game/bg_thong_bao.png");
        this.addText(this.pEndBanDo,"lb_title_end",cc.p(640,500),"ĐIỂM THẮNG",UTMAlexander.fontName,36);
        this.lb_title_end.setColor(cc.color.YELLOW);
        this.lb_title_end.enableOutline(cc.color.BLACK,2);
        this.addText(this.pEndBanDo,"lb_tong_tien_ban_do1",cc.p(640,434),"Chúc mừng bạn đã thắng",fontRobotoBold.fontName,40);
        this.lb_tong_tien_ban_do1.setColor("#ff0000");
        this.lb_tong_tien_ban_do1.enableOutline(cc.color.GRAY,2);

        this.addText(this.pEndBanDo,"lb_tong_tien_ban_do",cc.p(640,360),"2.570.000",UTMAlexander.fontName,80);
        this.lb_tong_tien_ban_do.setColor(cc.color.YELLOW);
        this.lb_tong_tien_ban_do.enableOutline(cc.color.GRAY,2);

        this.addText(this.pEndBanDo,"lb_tong_tien_ban_do2",cc.p(640,240),"GEM",fontRobotoBold.fontName,100);
        this.lb_tong_tien_ban_do2.setColor(cc.color.YELLOW);
        this.lb_tong_tien_ban_do2.enableOutline(cc.color.GRAY,2);
        this.pEndBanDo.setVisible(false);
    },

    showPlayBanDo:function()
    {
        this.audioDeCheThanhRome.stopMusicBackGround();
        this.stopAllActions();
        this.audioDeCheThanhRome.playSoundBackGroundLoop(this.audioDeCheThanhRome.nhacNenMiniGame);
        this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.resultMiniGame);
        this.isStartMiniGame = true;
        this.resultHaiSao = 0;
        this.giaTriNhan = parseInt(this.resultSlot.khoBau.split(",")[0]);
        this.soLuotChuaMo = 10;
        this.lb_lan_con_lai.setString("10");
        this.lb_diem_tich_luy.setString("X"+this.giaTriNhan);
        this.soLanMo = 0;
        //this.sp_mn_tab_duoi.stopAllActions();
        //this.sp_mn_tab_tren.stopAllActions();
        //this.text_mini_game.stopAllActions();
        this.pBanDoKhoBau.setVisible(true);
        //this.text_mini_game.setScale(0);
        //this.text_mini_game.setOpacity(255);
        this.pMayMan.setVisible(false);
        this.pEndBanDo.setVisible(false);
        this.lb_diem_tich_luy.setString("X"+this.resultSlot.khoBau.split(",")[0]);
        var khoangCachY = 155;
        var khoangCachX = 125;
        var startPositionPlay = cc.p(78,585);

        for(var i = 0; i < 30 ; i++)
        {
            //this["btnSelectPlay" + i].loadTextures("res/DeCheThanhRome/mini_game/btn_mat_truoc.png","res/DeCheThanhRome/mini_game/btn_mat_truoc.png","res/DeCheThanhRome/mini_game/btn_mat_truoc.png");
            //this["btnSelectPlay" + i].setPosition(cc.p(startPositionPlay.x + (i%10)*khoangCachX,(startPositionPlay.y - 700) - parseInt(i/10)*khoangCachY));
            //this["lbSelectPlay" + i].setString("");
            this["btnSelectPlay" + i].setEnabled(true);
            this["btnSelectPlay" + i].setVisible(true);
        }
        while (this.removeSpines.length > 0) {
            this.removeSpines[this.removeSpines.length - 1].removeFromParent(true);
            this.removeSpines.pop();
        }
        this.sp_start_minigame.setOpacity(255);
        //this.sp_mn_shadow.setScale(0);
        this.sp_start_minigame.runAction(cc.sequence(cc.delayTime(1),cc.fadeOut(1)));

    },
    runActionCungTen:function (sender, keyGiai) {
        var index = sender.getTag();

        this.spineCungTen.setEndListener(function(trackEntry){
            cc.log("%d end.", trackEntry.animation.name);

        });
        this.spineCungTen.runAction(cc.sequence(cc.moveBy(0.5,cc.p(this.mapBinh[index].position.x - this.spineCungTen.getPosition().x,0)),cc.callFunc(function () {
            this.sp_tam_ban.setPosition(this.mapBinh[index].position);
            this.sp_tam_ban.setVisible(true);
            this.spineCungTen.setAnimation(0,"Banten",false);
            this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.banTen);

        }.bind(this))));
        this.spineCungTen.setCompleteListener(function(trackEntry){
            var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
            cc.log("%d complete: %d", trackEntry.trackIndex, loopCount);


            if(trackEntry.animation.name == "Keodaycung")
            {

            }else
            if(trackEntry.animation.name == "Banten")
            {
                this.showEndBanCung(sender,keyGiai);
                this.initSpineChumVo(index);
                this.spineCungTen.setAnimation(0,"Keodaycung",false);
            }

        }.bind(this));


    },

    initSpineChumVo:function (index) {
        this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.binhVo);
        var spineBinhVo = new sp.SkeletonAnimation('res/DeCheThanhRome/spine/minigame/Binh_vo/Binh_vo.json', 'res/DeCheThanhRome/spine/minigame/Binh_vo/Binh_vo.atlas');
        spineBinhVo.setAnimation(0, 'manh_vo_roi', false);
        spineBinhVo.setPosition(cc.p(0,0));
        spineBinhVo.setScale(this.mapBinh[index].scale);
        spineBinhVo.setTag(index);
        this["pBinh"+index].addChild(spineBinhVo);

        var spineBinhVoRoi = new sp.SkeletonAnimation('res/DeCheThanhRome/spine/minigame/Manh_vo_roi/manh_vo_roi.json', 'res/DeCheThanhRome/spine/minigame/Manh_vo_roi/manh_vo_roi.atlas');
        spineBinhVoRoi.setAnimation(0, 'manh_vo_roi', false);

        spineBinhVoRoi.setScale(this.mapBinh[index].scale);
        spineBinhVoRoi.setTag(index);
        this["pBinh"+index].addChild(spineBinhVoRoi);
        var positionBinhRoi = cc.p(0,0);
        if(this.mapBinh[index].scale == 0.73)
        {
            positionBinhRoi = cc.p(positionBinhRoi.x,positionBinhRoi.y);
        }else if(this.mapBinh[index].scale == 0.8)
        {
            positionBinhRoi = cc.p(positionBinhRoi.x,positionBinhRoi.y+10);
        }else if(this.mapBinh[index].scale == 0.9)
        {
            positionBinhRoi = cc.p(positionBinhRoi.x,positionBinhRoi.y +20);
        }else if(this.mapBinh[index].scale == 1)
        {
            positionBinhRoi = cc.p(positionBinhRoi.x,positionBinhRoi.y +30);
        }
        spineBinhVoRoi.setLocalZOrder(index);
        spineBinhVoRoi.setPosition(positionBinhRoi);
        this.removeSpines.push(spineBinhVo);
        this.removeSpines.push(spineBinhVoRoi);
    },

    showEndBanCung:function(sender, keyGiai)
    {
        sender.setVisible(false);
        this.waitingBanCung = false;
        this.sp_tam_ban.setVisible(false);
        this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.baoKetQua);
        switch (keyGiai)
        {
            case 1:

                //sender.loadTextures("res/DeCheThanhRome/mini_game/btn_mat_sau_n.png","res/DeCheThanhRome/mini_game/btn_mat_sau_n.png","res/DeCheThanhRome/mini_game/btn_mat_sau_n.png");
                //this["lbSelectPlay" + sender.getTag()].setString(formatMoney(0,3,this.betValue * 4 * this.giaTriNhan));
                this["lb_prize_minigame"].setPosition(sender.getParent().getPosition());
                this["lb_prize_minigame"].setString("+ "+formatMoney(0,3,this.betValue * 4 * this.giaTriNhan));
                this["lb_prize_minigame"].setVisible(true);
                this["lb_prize_minigame"].runAction(cc.sequence(cc.moveBy(1,cc.p(0,100)),cc.callFunc(function(){
                    this["lb_prize_minigame"].setVisible(false);
                }.bind(this))));
                this.resultHaiSao = this.resultHaiSao + this.giaTriNhan * 4 * this.betValue ;
                //this.soLuotChuaMo--;
                if(this.soLanMo >= this.resultSlot.khoBau.split(",").length-2)
                {
                    sender.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                        //this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.showResultMiniGame);
                        //show end ban do kho bau
                        this.pEndBanDo.setVisible(true);
                        this.lb_tong_tien_ban_do.setString(formatMoney(0,3,this.resultHaiSao));
                    }.bind(this))));
                }
                break;
            case 0:
                //this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.resultBonusMiniGame);
                //sender.loadTextures("res/DeCheThanhRome/mini_game/btn_mat_sau_that_bai.png","res/DeCheThanhRome/mini_game/btn_mat_sau_that_bai.png","res/DeCheThanhRome/mini_game/btn_mat_sau_that_bai.png");
                if(this.soLanMo >= this.resultSlot.khoBau.split(",").length-2)
                {
                    sender.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                        //this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.showResultMiniGame);
                        //show end ban do kho bau
                        this.pEndBanDo.setVisible(true);
                        this.lb_tong_tien_ban_do.setString(formatMoney(0,3,this.resultHaiSao));
                    }.bind(this))));
                }
                //this.giaTriNhan ++;
                break;
            case 2:
            case 3:
            case 4:
                //this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.showResultMiniGame);
                this.showBanDoMayMan(sender,keyGiai);
                break;

        }
    },

    selectPlayBanDo:function(sender)
    {
        if(this.waitingBanCung)
        {
            return;
        }else
        {
            sender.setEnabled(false);
            this.waitingBanCung = true;
        }
        if(this.soLanMo < this.resultSlot.khoBau.split(",").length - 1)
        {


            var keyGiai = parseInt(this.resultSlot.khoBau.split(",")[this.soLanMo + 1]);
            this.runActionCungTen(sender,keyGiai);

            this.soLuotChuaMo--;
            this.soLanMo ++;
            this.lb_lan_con_lai.setString(this.soLuotChuaMo);
            //this.lb_diem_tich_luy.setString("X"+this.giaTriNhan);
        }

    },

    showBanDoMayMan:function(sender1,keyGiai)
    {
        this.isShowMayMan = true;

        //sender1.loadTextures("res/DeCheThanhRome/mini_game/btn_mat_sau_may_man.png","res/DeCheThanhRome/mini_game/btn_mat_sau_may_man.png","res/DeCheThanhRome/mini_game/btn_mat_sau_may_man.png");
        this.pMayMan.setVisible(true);
        for(var i= 0; i< 5; i++)
        {
            this["btnSelectMayMan" + i].addTouchEventListener(function(sender,type){
                switch (type){
                    case ccui.Widget.TOUCH_ENDED:
                        this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.clickResultKhoBau);
                        for(var i = 0; i< 5; i ++)
                        {
                            deCheThanhRome["btnSelectMayMan" + i].setEnabled(false);
                            if(deCheThanhRome["btnSelectMayMan" + i] == sender)
                            {
                                this["btnSelectMayMan" + i].loadTextures("res/DeCheThanhRome/mini_game/btn_may_man_s.png","res/DeCheThanhRome/mini_game/btn_may_man_s.png","res/DeCheThanhRome/mini_game/btn_may_man_s.png");
                                deCheThanhRome["lbSelectMayMan" + sender.getTag()].setString(formatMoney(0,3,deCheThanhRome.genValueFromKey(keyGiai)*deCheThanhRome.betValue* deCheThanhRome.giaTriNhan));
                                deCheThanhRome.resultHaiSao = deCheThanhRome.resultHaiSao + deCheThanhRome.genValueFromKey(keyGiai)*deCheThanhRome.betValue * deCheThanhRome.giaTriNhan;

                            }else
                            {
                                var randomKey = getRandomInt(2,4);
                                deCheThanhRome["lbSelectMayMan" + deCheThanhRome["btnSelectMayMan" + i].getTag()].setString(formatMoney(0,3,deCheThanhRome.genValueFromKey(randomKey)*deCheThanhRome.betValue* deCheThanhRome.giaTriNhan));

                            }
                        }

                        sender.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){

                            for(var i = 0; i< 5; i ++) {
                                deCheThanhRome["btnSelectMayMan" + i].setEnabled(true);
                            }
                            deCheThanhRome.hideBanDoMayMan();
                            //deCheThanhRome["lbSelectPlay" + sender1.getTag()].setString(formatMoney(0,3,deCheThanhRome.genValueFromKey(keyGiai)*deCheThanhRome.betValue* deCheThanhRome.giaTriNhan));
                            if(deCheThanhRome.soLanMo == deCheThanhRome.resultSlot.khoBau.split(",").length - 1)
                            {
                                sender.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                                    //deCheThanhRome.audioDeCheThanhRome.soundEffectKhoBau(deCheThanhRome.audioDeCheThanhRome.showResultMiniGame);
                                    //show end ban do kho bau
                                    deCheThanhRome.pEndBanDo.setVisible(true);
                                    deCheThanhRome.lb_tong_tien_ban_do.setString(formatMoney(0,3,deCheThanhRome.resultHaiSao));

                                })));
                            }
                        })));

                        break;
                }

            },this);
        }
    },
    hideBanDoMayMan: function()
    {
        this.isShowMayMan = false;
        this.pMayMan.setVisible(false);
        for(var i=0; i< 5; i++)
        {
            this["btnSelectMayMan" + i].loadTextures("res/DeCheThanhRome/mini_game/btn_may_man.png","res/DeCheThanhRome/mini_game/btn_may_man.png","res/DeCheThanhRome/mini_game/btn_may_man.png");
            this["lbSelectMayMan" + i].setString("");
        }
    },
    endBanDoKhoBau:function()
    {
        this.isPlayMinigame = false;
        this.pEndBanDo.setVisible(false);
        this.pBanDoKhoBau.setVisible(false);
        //this.audioDeCheThanhRome.stopMusicBackGround();
        //this.audioDeCheThanhRome.playSoundBackGround(this.audioDeCheThanhRome.nhacNen1);
        this.playMusicBackground();
        this.lb_prize.setString(formatMoney(0,3,this.resultSlot.prize));

        this.updateCurrentMoney();
        if(this.waitingKhoBau == true)
        {
            this.waitingKhoBau = false;
            this.btn_quay.setBright(false);
            this.btn_tu_quay.setBright(false);
            this.runAction(cc.sequence(cc.delayTime(2),cc.callFunc(function(){
                if(this.isAutoRotate == true)
                {
                    this.isAutoRotate = true;
                    this.autoPlay(this.getArrayLineSelected());

                    this.btn_quay.setBright(false);
                    this.btn_tu_quay.setBright(false);
                    this.btn_tu_quay.loadTextures("res/DeCheThanhRome/dung_quay.png","res/DeCheThanhRome/dung_quay.png","res/DeCheThanhRome/dung_quay.png");
                }

            }.bind(this))));
        }


    },
    actionTiaSangMiniGame:function()
    {
        var animFrames = [];
        var str = "";

        for (var i = 1; i < 5; i++) {
            str = "deCheThanhRome/mini_game/tia_sang/tia_sang"+i+".png";
            var spriteFrame = GuiUtil.createFrame(str);
            animFrames.push(spriteFrame);
        }
        var animation = cc.Animation.create(animFrames, 0.04,1);
        var animate   = cc.Animate.create(animation);
        return animate;
    },
    actionBtnMiniGame:function()
    {
        var animFrames = [];
        var str = "";

        for (var i = 1; i < 18; i++) {
            str = "deCheThanhRome/mini_game/hat_vo/hat_vo"+i+".png";

            var spriteFrame = GuiUtil.createFrame(str);
            animFrames.push(spriteFrame);
        }
        var animation = cc.Animation.create(animFrames, 0.04,1);
        var animate   = cc.Animate.create(animation);
        return animate;
    },
    initPChonDong:function()
    {
        this.pChonDong.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pChonDong.setBackGroundColor(cc.color.BLACK);
        this.pChonDong.setBackGroundColorOpacity(200);
        var startBtnDuoiX = 291;
        var startBtnDuoiY = 103;
        var khoangCanhDuoiX = 232.5;
        this.addSprite(this.pChonDong,"spLopMo",cc.p(640,360),"res/DeCheThanhRome/chon_dong/lop_mo.png");
        this.addButton("btn_dong_chan",DeCheThanhRomeLayer.BTN_DONG_CHAN,this.pChonDong,cc.p(startBtnDuoiX,startBtnDuoiY),false,"res/DeCheThanhRome/chon_dong/btn_chon_dong.png","res/DeCheThanhRome/chon_dong/btn_chon_dong_s.png");
        this.btn_dong_chan.setTitleText("DÒNG CHẴN");
        startBtnDuoiX = startBtnDuoiX + khoangCanhDuoiX;
        this.addButton("btn_dong_le",DeCheThanhRomeLayer.BTN_DONG_LE,this.pChonDong,cc.p(startBtnDuoiX,startBtnDuoiY),false,"res/DeCheThanhRome/chon_dong/btn_chon_dong.png","res/DeCheThanhRome/chon_dong/btn_chon_dong_s.png");
        this.btn_dong_le.setTitleText("DÒNG LẺ");
        startBtnDuoiX = startBtnDuoiX + khoangCanhDuoiX;
        this.addButton("btn_chon_het",DeCheThanhRomeLayer.BTN_CHON_HET,this.pChonDong,cc.p(startBtnDuoiX,startBtnDuoiY),false,"res/DeCheThanhRome/chon_dong/btn_chon_dong.png","res/DeCheThanhRome/chon_dong/btn_chon_dong_s.png");
        this.btn_chon_het.setTitleText("TẤT CẢ");
        startBtnDuoiX = startBtnDuoiX + khoangCanhDuoiX;
        this.addButton("btn_chon_lai",DeCheThanhRomeLayer.BTN_CHON_LAI,this.pChonDong,cc.p(startBtnDuoiX,startBtnDuoiY),false,"res/DeCheThanhRome/chon_dong/btn_chon_dong.png","res/DeCheThanhRome/chon_dong/btn_chon_dong_s.png");
        this.btn_chon_lai.setTitleText("CHỌN LẠI");
        this.addButton("btn_close_chon_dong",DeCheThanhRomeLayer.BTN_CLOSE_CHON_DONG,this.pChonDong,cc.p(1087,618),false,"res/DeCheThanhRome/btn_close_game.png","res/DeCheThanhRome/btn_close_game.png");
        this.addText(this.pChonDong,"lb_title_chon_dong",cc.p(640,603),"CHỌN DÒNG",fontRobotoBold.fontName,60);
        this.lb_title_chon_dong.setColor(cc.color.YELLOW);
        this.lb_title_chon_dong.enableOutline(cc.color.BLACK,3);
        //var starSlectLineX =

        var startX = 277.5;
        var startY = 490;
        var btnRect = cc.rect(112,96);
        var khoangCachX = 181;
        var khoangCachY = 100;

        for(var i = 1; i <= 20; i++)
        {

            this["btnLine"+i] = new ccui.Button();
            this["btnLine"+i].loadTextures("res/DeCheThanhRome/chon_dong/"+i+".png","res/DeCheThanhRome/chon_dong/"+i+".png","res/DeCheThanhRome/chon_dong/"+i+".png");
            this["btnLine"+i].setPosition(cc.p(startX + ((i-1)%5)*khoangCachX,startY - Math.floor((i-1)/5)*khoangCachY));
            this["btnLine"+i].setTag(i);
            this["btnLine"+i].isSelectLine = false;
            this.pChonDong.addChild(this["btnLine"+i]);
            if(i == 1)
            {
                this["btnLine"+i].loadTextureNormal("res/DeCheThanhRome/chon_dong/"+i+"_1.png");
                this["btnLine"+i].isSelectLine = true;
            }
            this["btnLine"+i].addTouchEventListener(function(sender,type){
                switch (type){
                    case ccui.Widget.TOUCH_ENDED:
                        if(this.checkDonePlay())
                        {
                            if(this.isChoiThu)
                            {
                                this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                            }else
                            {
                                this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.button);
                                this.selectLine(sender.getTag());
                                this.changeLineSelected();
                            }

                        }

                        break;
                }

            },this);
        }
        this.selectLineAll();
        this.pChonDong.setVisible(false);


    },
    initPSetting:function()
    {
        this.addButton("btn_am_thanh",DeCheThanhRomeLayer.BTN_AM_THANH,this.pSetting,cc.p(133,96),false,"res/DeCheThanhRome/am_thanh.png",null);
        this.addButton("btn_nhac_nen",DeCheThanhRomeLayer.BTN_NHAC_NEN,this.pSetting,cc.p(133,32),false,"res/DeCheThanhRome/nhac_nen.png",null);
        this.addText(this.pSetting,"lb_am_thanh",cc.p(54,100),"Âm Thanh",UTMAlexander.fontName,22);
        this.addText(this.pSetting,"lb_nhac_nen",cc.p(54,38),"Nhạc Nền",UTMAlexander.fontName,22);

        this.addSprite(this.pSetting,"sp_off_am_thanh",cc.p(144,86),"res/DeCheThanhRome/off_am_thanh.png");
        this.addSprite(this.pSetting,"sp_off_nhac_nen",cc.p(144,22),"res/DeCheThanhRome/off_am_thanh.png");
        this.sp_off_am_thanh.setVisible(false);
        this.sp_off_nhac_nen.setVisible(false);
        this.pSetting.setVisible(false);
    },
    initPLobby:function()
    {
        this.pLobby.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pLobby.setBackGroundColor(cc.color.BLACK);
        this.pLobby.setBackGroundColorOpacity(200);
        //this.addSprite(this.pLobby,"spBgTabDuoi",cc.p(640,366),"res/DeCheThanhRome/lobby/bg.png");

        this.addText(this.pLobby,"lb_title_lobby",cc.p(640,602),"CHỌN PHÒNG",fontRobotoBold.fontName,50);
        this.lb_title_lobby.setColor(cc.color.YELLOW);
        this.lb_title_lobby.enableOutline(cc.color.BLACK,2);
        this.addButton("btn_room1",DeCheThanhRomeLayer.BTN_ROOM1,this.pLobby,cc.p(369,327),false,"res/DeCheThanhRome/lobby/phong1.png",null);
        this.addButton("btn_room2",DeCheThanhRomeLayer.BTN_ROOM2,this.pLobby,cc.p(640,327),false,"res/DeCheThanhRome/lobby/phong2.png",null);
        this.addButton("btn_room3",DeCheThanhRomeLayer.BTN_ROOM3,this.pLobby,cc.p(912,327),false,"res/DeCheThanhRome/lobby/phong3.png",null);
        this.addText(this.pLobby,"lb_pot_room1",cc.p(369,125),"500.000",fontRobotoBold.fontName,36);
        this.lb_pot_room1.setColor(cc.color(255,216,59));
        this.addText(this.pLobby,"lb_pot_room2",cc.p(640,125),"5.000.000",fontRobotoBold.fontName,36);
        this.lb_pot_room2.setColor(cc.color(255,216,59));
        this.addText(this.pLobby,"lb_pot_room3",cc.p(912,125),"50.000.000",fontRobotoBold.fontName,36);
        this.lb_pot_room3.setColor(cc.color(255,216,59));
        this.showPlobby();
    },
    hidePlobby:function()
    {
        this.pLobby.setVisible(false);
        //this.audioDeCheThanhRome.stopMusicBackGround();
        //this.audioDeCheThanhRome.playSoundBackGround(this.audioDeCheThanhRome.nhacNen1);
        this.playMusicBackground();
    },
    showPlobby:function()
    {
        this.pLobby.setVisible(true);
        this.stopAllActions();
        this.audioDeCheThanhRome.stopMusicBackGround();
        this.audioDeCheThanhRome.playSoundBackGroundLoop(this.audioDeCheThanhRome.nhacNenLobby);
    },
    initPBangThuong:function()
    {
        this.pBangThuong.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pBangThuong.setBackGroundColor(cc.color.BLACK);
        this.pBangThuong.setBackGroundColorOpacity(200);

        this.addButton("btn_close_bang_thuong",DeCheThanhRomeLayer.BTN_CLOSE_BANG_THUONG,this.pBangThuong,cc.p(1087,618),false,"res/DeCheThanhRome/btn_close_game.png","res/DeCheThanhRome/btn_close_game.png");
        this.addSprite(this.pBangThuong,"spBgBangThuong",cc.p(640,357),"res/DeCheThanhRome/bang_thuong/bang_thuong.png");
        this.pBangThuong.setVisible(false);

    },
    initPStartMienPhi:function()
    {
        this.pStartMienPhi.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pStartMienPhi.setBackGroundColor(cc.color.BLACK);
        this.pStartMienPhi.setBackGroundColorOpacity(200);

        this.addText(this.pStartMienPhi,"lb_title_start_mien_phi",cc.p(640,526),"THÔNG BÁO",UTMAlexander.fontName,50);
        this.lb_title_start_mien_phi.setColor(cc.color(227,204,11));
        this.lb_title_start_mien_phi.enableOutline(cc.color.BLACK,2);

        this.addText(this.pStartMienPhi,"lb_thong_bao_free",cc.p(640,360),"Bạn nhận được 18 lượt quay miễn phí",UTMAlexander.fontName,48);
        this.lb_thong_bao_free.ignoreContentAdaptWithSize(false);
        this.lb_thong_bao_free.setContentSize(cc.size(558,134));
        this.lb_thong_bao_free.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_thong_bao_free.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER) ;
        this.lb_thong_bao_free.setColor(cc.color(227,204,11));
        this.lb_thong_bao_free.enableShadow(cc.color.BLACK,3,3);
        this.pStartMienPhi.setVisible(false);
    },
    initPEndMienPhi:function()
    {
        this.pEndMienPhi.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pEndMienPhi.setBackGroundColor(cc.color.BLACK);
        this.pEndMienPhi.setBackGroundColorOpacity(200);

        this.addText(this.pEndMienPhi,"lb_title_end_mien_phi",cc.p(640,526),"THÔNG BÁO",UTMAlexander.fontName,50);
        this.lb_title_end_mien_phi.setColor(cc.color(227,204,11));
        this.lb_title_end_mien_phi.enableOutline(cc.color.BLACK,2);

        this.addText(this.pEndMienPhi,"lb_mien_phi1",cc.p(640,438),"Bạn quay xong lượt quay miễn phí",UTMAlexander.fontName,30);
        this.lb_mien_phi1.setColor(cc.color.WHITE);
        this.lb_mien_phi1.enableOutline(cc.color.RED,1);

        this.addText(this.pEndMienPhi,"lb_total_free",cc.p(502,377),"0",fontRobotoBlack.fontName,30);
        this.lb_total_free.setColor(cc.color.YELLOW);
        this.lb_total_free.enableOutline(cc.color.RED,1);

        this.addText(this.pEndMienPhi,"lb_mien_phi2",cc.p(640,377),"X",fontRobotoBlack.fontName,30);
        this.lb_mien_phi2.setColor(cc.color.WHITE);
        this.lb_mien_phi2.enableOutline(cc.color.RED,1);

        this.addText(this.pEndMienPhi,"lb_he_so_nhan",cc.p(777,377),"0",fontRobotoBlack.fontName,30);
        this.lb_he_so_nhan.setColor(cc.color.YELLOW);
        this.lb_he_so_nhan.enableOutline(cc.color.RED,1);

        this.addText(this.pEndMienPhi,"lb_sum_free",cc.p(640,323),"0",fontRobotoBlack.fontName,60);
        this.lb_sum_free.setColor(cc.color.YELLOW);
        this.lb_sum_free.enableOutline(cc.color.RED,2);

        this.addText(this.pEndMienPhi,"lb_mien_phi3",cc.p(640,240),"GEM",fontRobotoBlack.fontName,86);
        this.lb_mien_phi3.setColor(cc.color.YELLOW);
        this.lb_mien_phi3.enableOutline(cc.color.RED,2);


        this.pEndMienPhi.setVisible(false);
    },
    initPThongBao:function()
    {
        this.pThongBao.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pThongBao.setBackGroundColor(cc.color.BLACK);
        this.pThongBao.setBackGroundColorOpacity(200);

        this.addText(this.pThongBao,"lb_title_thong_bao",cc.p(640,506),"CHỌN MỨC",UTMAlexander.fontName,40);
        this.lb_title_thong_bao.setColor(cc.color(227,204,11));
        this.lb_title_thong_bao.enableOutline(cc.color.BLACK,2);

        this.addText(this.pThongBao,"lb_thong_bao_free1",cc.p(640,375),"BẠN CÓ MUỐN THAY ĐỔI MỨC ĐẶT PHÒNG CHƠI?",UTMAlexander.fontName,36);
        this.lb_thong_bao_free1.ignoreContentAdaptWithSize(false);
        this.lb_thong_bao_free1.setContentSize(cc.size(558,134));
        this.lb_thong_bao_free1.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_thong_bao_free1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER) ;
        this.lb_thong_bao_free1.setColor(cc.color(227,204,11));
        this.lb_thong_bao_free1.enableShadow(cc.color.BLACK,3,3);

        this.addButton("btn_thong_bao_co",DeCheThanhRomeLayer.BTN_THONG_BAO_CO,this.pThongBao,cc.p(513,250),false,"res/DeCheThanhRome/chon_dong/btn_chon_dong.png","res/DeCheThanhRome/chon_dong/btn_chon_dong_s.png");
        this.btn_thong_bao_co.setTitleText("CÓ");
        this.addButton("btn_thong_bao_khong",DeCheThanhRomeLayer.BTN_THONG_BAO_KHONG,this.pThongBao,cc.p(767,250),false,"res/DeCheThanhRome/chon_dong/btn_chon_dong.png","res/DeCheThanhRome/chon_dong/btn_chon_dong_s.png");
        this.btn_thong_bao_khong.setTitleText("KHÔNG");
        this.pThongBao.setVisible(false);
    },
    updateUserInfo:function()
    {
        this.lb_total_money.setString(formatMoney(0,3,userInfo.userData.vinTotal));
        this.lb_nick_name.setString(userInfo.userData.nickname);
        var that = this;
        this.customlistener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "updateMoney",
            callback: function(event){

                if(that!=null && !that.isChoiThu && !that.isPlayMinigame)
                    that.updateMoney(event);
            }
        });
        cc.eventManager.addListener(this.customlistener, 1);
    },
    updateMoney: function(event){
        if(this.lb_total_money === null || this.isChoiThu){
            return;
        }
        if(event.moneyType == MONEY_VIN)
        {
            this.lb_total_money.setString(formatMoney(0,3,event.currentMoney));
        }

    },
    updateCurrentMoney:function()
    {
        if(!this.isChoiThu)
        {
            lobby.updateMoney(this.resultSlot.currentMoney,MONEY_VIN);
        }else
        {
            this.totalMoneyChoiThu = this.totalMoneyChoiThu + this.resultSlot.prize;
            this.lb_total_money.setString(formatMoney(0,3,this.totalMoneyChoiThu));
        }
    },
    checkDonePlay:function()
    {
        if(this.isChangeRoom)
        {
            this.toastSlot("Bạn đang chuyển room, vui lòng chờ",3);
            return false;
        }
        if(this.isAutoRotate)
        {
            this.toastSlot("Bạn đang quay tự động",3);
            return false;
        }
        if(this.isRotate)
        {
            this.toastSlot("Bạn đang quay, vui lòng chờ quay xong",3);
            return false;
        }
        return true;

    },
    loadSelectRoom:function(roomId){
        if(roomId == this.currentRoom)
        {

        }else
        {
            this.isChangeRoom = true;
            this.showLoading(this);

            this.changeRoom(this.currentRoom,roomId);

        }
        this.hidePlobby();
    },
    loadContent:function()
    {
        for(var i = 1; i<=20; i++)
        {
            this.btnSelectLine(i,false);
        }
        for(var i = 0; i<DeCheThanhRome.Content.arrLineSelect.length; i++)
        {
            this.btnSelectLine(DeCheThanhRome.Content.arrLineSelect[i],true);
        }
        this.currentRoom = DeCheThanhRome.Content.currentRoom;
        this.betValue = DeCheThanhRome.Content.betValue;
        this.isAutoRotate = DeCheThanhRome.Content.isAutoRotate;
        if(this.isAutoRotate)
        {
            this.btn_quay.setBright(false);
            this.btn_tu_quay.setBright(false);
            this.btn_tu_quay.loadTextures("res/DeCheThanhRome/dung_quay.png","res/DeCheThanhRome/dung_quay.png","res/DeCheThanhRome/dung_quay.png");
            this.hidePlobby();
            //this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");
        }
        else{
            this.showPlobby();
        }


        this.changeLineSelected();
        this.setTextChangeLine();

    },
    loadFromContent:function()
    {
        var arrSelectLine = [];
        for(var i = 1; i <= 20; i++)
        {
            if(this["btnLine"+i].isSelectLine)
            {
                arrSelectLine.push(i);
            }
        }
        DeCheThanhRome.Content.arrLineSelect = arrSelectLine;
        DeCheThanhRome.Content.currentRoom = this.currentRoom;
        DeCheThanhRome.Content.isAutoRotate = this.isAutoRotate;
        DeCheThanhRome.Content.betValue = this.betValue;

    },
    loadChoiThu:function()
    {
        this.isChoiThu = true;
        this.btn_choi_thu.loadTextures("res/DeCheThanhRome/choi_that.png","res/DeCheThanhRome/choi_that.png","res/DeCheThanhRome/choi_that.png");

        this.lb_muc_dat.setString(formatMoney(0,3,this.betValue));
        this.lb_tong_dat.setString(formatMoney(0,3,this.sumBet));
        this.lb_so_dong.setString(this.lineSelected);
        this.selectLineAll();
        this.totalMoneyChoiThu = 10000000;
        this.lb_total_money.setString("10.000.000");
        this.lb_prize.setString("0");

    },
    loadChoiThat:function()
    {
        this.isChoiThu = false;
        this.btn_choi_thu.loadTextures("res/DeCheThanhRome/choi_thu.png","res/DeCheThanhRome/choi_thu.png","res/DeCheThanhRome/choi_thu.png");
        this.lb_muc_dat.setString(formatMoney(0,3,this.betValue));
        this.lb_tong_dat.setString(formatMoney(0,3,this.sumBet));
        this.lb_so_dong.setString(this.lineSelected);
        this.lb_total_money.setString(formatMoney(0,3,userInfo.userData.vinTotal));
        this.totalMoneyChoiThu = 10000000;
        this.lb_prize.setString("0");
        //for(var i = 1; i<= 20; i++)
        //{
        //    if(this["btnLine"+i].isSelectLine)
        //    {
        //        this["btnLine"+i].loadTextures("res/DeCheThanhRome/number/"+i+".png","res/DeCheThanhRome/number/"+i+".png","res/DeCheThanhRome/number/"+i+".png");
        //    }else
        //    {
        //        this["btnLine"+i].loadTextures("res/DeCheThanhRome/number/"+i+"_1.png","res/DeCheThanhRome/number/"+i+"_1.png","res/DeCheThanhRome/number/"+i+"_1.png");
        //    }
        //
        //}
    },
    getArrayLineSelected:function()
    {
        var lineSelected = "";
        for(var i= 1; i <= 20; i++)
        {
            if(this["btnLine"+i].isSelectLine)
            {
                if(lineSelected == "")
                {
                    lineSelected = i.toString();
                }else
                {
                    lineSelected = lineSelected+","+i.toString();
                }
            }
        }
        return lineSelected;
    },
    selectLine:function(index)
    {
        if(this["btnLine"+index].isSelectLine == true)
        {
            this.btnSelectLine(index,false);
        }
        else
        {
            this.btnSelectLine(index,true);
        }

    },
    btnSelectLine:function(index,selected)
    {
        if(selected == true)
        {
            this["btnLine"+index].isSelectLine = true;
            this["btnLine"+index].loadTextureNormal("res/DeCheThanhRome/chon_dong/"+index+"_1.png");
            this["sp_num" + index].setVisible(true);
            //this["spShowLine"+index].setVisible(true);
        }else
        {
            this["btnLine"+index].isSelectLine = false;
            this["btnLine"+index].loadTextureNormal("res/DeCheThanhRome/chon_dong/"+index+".png");
            this["sp_num" + index].setVisible(false);
        }
    },
    setTextChangeLine:function()
    {
        this.sumBet = this.lineSelected * this.betValue;
        this.lb_muc_dat.setString(formatMoney(0,3,this.betValue));
        this.lb_tong_dat.setString(formatMoney(0,3,this.sumBet));
        this.lb_so_dong.setString(this.lineSelected);
    },
    changeLineSelected:function()
    {
        var countLineSelect = 0;
        for(var i = 1; i <= 20; i++)
        {
            if(this["btnLine"+i].isSelectLine == true)
            {
                countLineSelect ++;
            }
        }

        this.lineSelected = countLineSelect;
        this.setTextChangeLine();

    },
    selectLineChan:function()
    {
        for(var i = 1; i<=20; i++)
        {
            if(i%2 == 0)
            {
                this.btnSelectLine(i,true);
            }else
            {
                this.btnSelectLine(i,false);
            }
        }
        this.changeLineSelected();
    },
    selectLineLe:function()
    {
        for(var i = 1; i<=20; i++)
        {
            if(i%2 == 0)
            {
                this.btnSelectLine(i,false);
            }else
            {
                this.btnSelectLine(i,true);
            }
        }
        this.changeLineSelected();
    }
    ,
    selectLineAll:function()
    {
        for(var i = 1; i<=20; i++)
        {
            this.btnSelectLine(i,true);
        }
        this.changeLineSelected();
    }
    ,
    chonLai:function()
    {
        for(var i = 1; i<=20; i++)
        {
            this.btnSelectLine(i,false);
        }
        this.changeLineSelected();
    },
    showAndHideLineSelect: function()
    {
        for(var i = 1; i<=20; i++)
        {
            if(this["btnLine"+i].isSelectLine == true)
            {
                this["spShowLine"+ i.toString()].setVisible(true);
            }else
            {
                this["spShowLine"+ i.toString()].setVisible(false);
            }
        }
    },
    inVisibleAllLine:function()
    {
        for(var i = 1; i<=20; i++)
        {
            this["spShowLine"+ i.toString()].setVisible(false);
        }
    },
    visibleLine:function(arrLine)
    {
        for(var i = 0; i< arrLine.length; i++)
        {
            this["spShowLine"+ arrLine[i]].setVisible(true);
        }
    },
    responseChoiThu:function()
    {
        var randomResult = getRandomInt(0,DeCheThanhRome.resultChoiThu.length-1);


        var testChoiThu = {
            ref: 14087,
            result: 5,
            matrix: "0,2,1,6,3,1,1,2,0,5,0,0,2,6,6",
            linesWin: "4",
            khoBau: "1,1,1,1,2,2,1,1,1,1,0",
            prize: 4800,
            currentMoney: 4373606017,
            freeSpin: 0,
            ratio: 0,
        };

        var resultChoiThu = DeCheThanhRome.resultChoiThu[randomResult];
        // var resultChoiThu = DeCheThanhRome.resultChoiThu[0];

        testChoiThu.ref = resultChoiThu.ref;
        testChoiThu.result = resultChoiThu.result;
        testChoiThu.matrix = resultChoiThu.matrix;
        testChoiThu.linesWin = resultChoiThu.linesWin;
        testChoiThu.khoBau = resultChoiThu.khoBau;
        testChoiThu.prize = resultChoiThu.prize * (this.betValue/100);
        testChoiThu.currentMoney = resultChoiThu.currentMoney;
        testChoiThu.freeSpin = resultChoiThu.freeSpin;
        testChoiThu.ratio = resultChoiThu.ratio;

        // var resultChoiThu = deCheThanhRome.resultChoiThu[0];

        // resultChoiThu.prize = resultChoiThu.prize*(this.betValue/100);

        this.updateResult(testChoiThu.ref,testChoiThu.result,testChoiThu.matrix,testChoiThu.linesWin,testChoiThu.khoBau,testChoiThu.prize,0,testChoiThu.freeSpin,testChoiThu.ratio);

    },
    updateResult:function(ref,result,matrix,linesWin,khoBau,prize,currentMoney,freeSpin,ratio)
    {
        this.lb_prize.setString("0");
        cc.log("{\nref: " + ref + ",\n" +"result: " + result + ",\n" + "matrix: \"" + matrix + "\",\n" + "linesWin: \"" + linesWin + "\",\n" + "khoBau: \"" + khoBau + "\",\n" + "prize: " + prize + ",\n" + "currentMoney: " + currentMoney + ",\n" + "freeSpin: " + freeSpin + ",\n" + "ratio: " + ratio + ",\n }");

        if(this.resultSlot.result == 5)
        {
            this.waitingKhoBau = false;
            this.isPlayMinigame = false;
            this.resultHaiSao = 0;
            this.giaTriNhan = 1;
            this.soLuotChuaMo = 10;
            this.soLanMo = 0;
            this.pBanDoKhoBau.setVisible(false);
            this.playMusicBackground();
        }
        if(this.resultSlot.result == 3 || this.resultSlot.result == 4)
        {
            this.hideNohu();
        }
        if(this.resultSlot.result == 2)
        {
            this.hideThangLon();
        }

        this.resultSlot.ref = ref;
        this.resultSlot.result = result;
        this.resultSlot.matrix = matrix;
        this.resultSlot.linesWin = linesWin;
        this.resultSlot.khoBau = khoBau;
        this.resultSlot.prize = prize;
        this.resultSlot.currentMoney = currentMoney;
        this.resultSlot.freeSpin = freeSpin;
        this.resultSlot.ratio = ratio;
        this.isWaitingRotate = false;
        this.pItem.stopAllActions();
        this.inVisibleAllLine();
        if(this.resultSlot.result == 5)
        {
            this.pBanDoKhoBau.setVisible(false);
        }
        if(result == 5)
        {
            this.waitingKhoBau = true;
        }
        if(this.checkErrSpin(result))
        {
            this.isRotate = true;
            this.btn_quay.setBright(false);
            this.btn_tu_quay.setBright(false);
            this.isRotate = true;
            this.startSpin();
            this.showLuotQuayMienPhi();
            //if(!this.isChoiThu)
            //{
            //    this.updateLsgd();
            //}else
            //{
            //    this.resultSlot.prize = this.resultSlot.prize * (this.betValue/100);
            //}
        }else
        {
            this.isRotate = false;
        }
        this.updateMoneyClient();

    },
    checkErrSpin:function(result)
    {
        switch (result)
        {
            case 100:
                this.toastSlot("Quay không thành công",3);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png");
                return false;
            case 101:
                this.toastSlot("Đặt cược không hợp lệ",3);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png");
                return false;
            case 102:
                this.toastSlot("Bạn không đủ tiền",3);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png");
                return false;
            case 103:
                this.toastSlot("Lượt quay không hợp lệ",3);
                this.isFreeDaiLy = false;
                this.sp_bg_text_luot_quay_dai_ly.setVisible(false);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png");
                return false;
                break;
        }
        return true;
    },
    setItemEndSpin:function()
    {
        var arrMatrix = this.resultSlot.matrix.split(",");
        for(var i= 2; i >= 0; i--)
        {
            for(var j= 1; j< 6; j++)
            {
                this["spItem" + j.toString() + i.toString()].setScale(1);
                this["spItem" + j.toString() + i.toString()].setTexture("res/DeCheThanhRome/item/item"+arrMatrix[(j-1) + ((2-i)*5)]+".png");
            }
        }
    },
    setItemStartSpin:function()
    {
        var arrMatrix = this.resultSlot.matrix.split(",");
        for(var i = (this.totalItemColum-1); i >= this.totalItemColum-3; i--)
        {
            for(var j= 1; j< 6; j++)
            {
                this["spItem" + j.toString() + i.toString()].setScale(1);
                this["spItem" + j.toString() + i.toString()].setTexture("res/DeCheThanhRome/item/item"+ arrMatrix[(j-1) + (((this.totalItemColum-1)-i)*5)] +".png");
            }
        }
    },
    xoayBgQuay:function()
    {
        var rotateA = cc.rotateBy(3.5,180);
        var move_ease_out = rotateA.easing(cc.easeQuinticActionInOut());
        this.sp_xoay.runAction(move_ease_out);
    },
    startSpin:function()
    {
        var khoangCach = 170;
        var move = cc.moveBy(2, cc.p(0, - khoangCach*(this.totalItemColum-3)));
        var move_ease_inout3 = move.easing(cc.easeElasticInOut(1.5));
        var delayColum = 0.0;
        for(var i = 1; i < 6; i++)
        {
            this["pColum"+ i.toString()].stopAllActions();
            this["pColum"+ i.toString()].y = 255;
        }
        this.setItemStartSpin();
        //this.xoayBgQuay();
        for(var i= 1; i< 6; i++)
        {
            var seq = null;
            switch (i)
            {
                case 1:
                    seq = cc.sequence(cc.callFunc(function(){
                        this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.runItem);
                    }.bind(this)),cc.delayTime(delayColum),move_ease_inout3);
                    break;
                case 2:
                case 3:
                case 4:
                    seq = cc.sequence(cc.delayTime(delayColum + (i - 1)* 0.3),move_ease_inout3.clone());
                    break;
                case 5:
                    seq = cc.sequence(cc.delayTime(delayColum + (i - 1)* 0.3),move_ease_inout3.clone(),cc.callFunc(function(){
                        this.endSpin();
                    }.bind(this)));
                    break;
            }
            this["pColum"+ i.toString()].runAction(seq);
        }
    },
    endSpin:function()
    {
        if(this.resultSlot.freeSpin > 0 && this.isFreeInGame == false)
        {
            this.showStartFree(this.resultSlot.freeSpin);

        }
        if(this.resultSlot.freeSpin == 0 && this.isFreeInGame == true)
        {
            this.showEndFree();
            this.resultSlot.isFree = false;
        }
        this.setItemEndSpin();
        if(this.resultSlot.linesWin!="")
            this.visibleLine(this.resultSlot.linesWin.split(","));
        this.pItem.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){


            if(!this.isAutoRotate)
            {
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
            }
            this.isRotate = false;
            this.showEffectDone();
            if(!this.isAutoRotate)
            {
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
            }

            if(this.resultSlot.linesWin!="")
                this.runEffectLineWin(0);

        }.bind(this))));

    },
    showLuotQuayMienPhi:function()
    {
        //if(this.isFreeInGame == false && this.resultSlot.freeSpin > 0)
        //{
        //    this.isFreeInGame = true;
        //    this.sp_bg_text_luot_quay_mien_phi.setVisible(true);
        //    this.lb_free_spin.setVisible(true);
        //    this.lb_free_spin.setString("Bạn còn " + this.resultSlot.freeSpin + " lượt quay miễn phí");
        //
        //}else if(this.isFreeInGame == true && this.resultSlot.freeSpin == 0)
        //{
        //    this.isFreeInGame = false;
        //    this.sp_bg_text_luot_quay_mien_phi.setVisible(false);
        //    this.lb_free_spin.setVisible(false);
        //
        //}else
        //if(this.resultSlot.freeSpin > 0)
        //{
        //    this.lb_free_spin.setString("Bạn còn " + this.resultSlot.freeSpin + " lượt quay miễn phí");
        //}else
        if(this.resultSlot.freeSpin == 0)
        {
            if(this.sp_bg_text_luot_quay_mien_phi.isVisible())
            {
                this.sp_bg_text_luot_quay_mien_phi.setVisible(false);
                //this.lb_free_spin.setVisible(false);

            }
        }
    },

    showStartFree:function(soLuot)
    {
        this.isFreeInGame = true;
        this.pStartMienPhi.setVisible(true);
        if(soLuot == 8)
        {
            this.audioDeCheThanhRome.soundEffect(this.audioDeCheThanhRome.mienPhi);
        }
        this.lb_thong_bao_free. setString("Bạn nhận được "+ soLuot +" lượt quay miễn phí X" + this.resultSlot.ratio);
        this.pStartMienPhi.runAction(cc.sequence(cc.delayTime(2),cc.callFunc(function(){
            if(this.pStartMienPhi.isVisible())
                this.pStartMienPhi.setVisible(false);
            this.sp_bg_text_luot_quay_mien_phi.setVisible(true);
            this.lb_free_spin.setVisible(true);
            this.lb_free_spin.setString("Bạn có " + this.resultSlot.freeSpin + " lượt quay miễn phí X" + this.resultSlot.ratio);
        }.bind(this))));

    },
    hideStartFree:function()
    {
        if(this.pStartMienPhi.isVisible())
            this.pStartMienPhi.setVisible(false);
    },
    showEndFree:function()
    {
        this.pEndMienPhi.setVisible(true);
        this.lb_total_free.setString(formatMoney(0,3,this.resultSlot.prize));
        this.lb_he_so_nhan.setString(this.resultSlot.ratio);
        var sumPrize = this.resultSlot.prize*this.resultSlot.ratio;
        this.isFreeInGame = false;
        this.lb_sum_free.setString(formatMoney(0,3,sumPrize));
        this.pEndMienPhi.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
            if(this.pEndMienPhi.isVisible())
            {
                this.pEndMienPhi.setVisible(false);
            }
        }.bind(this))));
    },
    hideEndFree:function()
    {
        if(this.pEndMienPhi.isVisible())
        {
            this.pEndMienPhi.setVisible(false);
        }
    },

    showEffectDone:function()
    {

        if(this.resultSlot.result == 1 && this.resultSlot.prize > 0)
        {
            this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.resultGiaiThuong)
             this.showGiaiThuong();
             this.updateCurrentMoney();

        }
        if(this.resultSlot.result == 2)
        {
            this.showThangLon();
            this.updateCurrentMoney();
            effectRunMoney(this.lb_prize,0,this.resultSlot.prize,parseInt(this.resultSlot.prize/20),true);
        }else
        if(this.resultSlot.result == 3 || this.resultSlot.result == 4)
        {
            this.showNoHu();
            this.updateCurrentMoney();
            effectRunMoney(this.lb_prize,0,this.resultSlot.prize,parseInt(this.resultSlot.prize/20),true);
        }else
        if(this.resultSlot.result == 5)
        {
            this.showPlayBanDo();
            this.isPlayMinigame = true;
            this.pBanDoKhoBau.runAction(cc.sequence(cc.delayTime(10),cc.callFunc(function(){
                if(this.waitingKhoBau == true)
                {
                    this.waitingKhoBau = false;
                    this.pEndBanDo.setVisible(false);
                    this.isPlayMinigame = false;
                    this.pBanDoKhoBau.setVisible(false);
                    this.lb_prize.setString(formatMoney(0,3,this.resultSlot.prize));
                    this.resultHaiSao = 0;
                    this.giaTriNhan = 1;
                    this.soLuotChuaMo = 10;
                    this.soLanMo = 0;
                    this.updateCurrentMoney();

                }
            }.bind(this))));
        }else{
            this.updateCurrentMoney();
        }
    },
    runEffectLineWin : function (index){
        var arrLineWin = this.resultSlot.linesWin.split(",");
        var indexInLine = 1;
        if(index < arrLineWin.length-1)
        {
            for(var i = index +1; i< arrLineWin.length; i++)
            {
                if(arrLineWin[index] == arrLineWin[i])
                {
                    indexInLine++;
                }
            }
        }else
        {
            indexInLine = 1;
        }
        this.inVisibleAllLine();

        if(index >= arrLineWin.length){

        }else{
            if(this.resultSlot.result != 2 && this.resultSlot.result != 3&& this.resultSlot.result != 5)
            {
                this.audioDeCheThanhRome.soundEffectKhoBau(this.audioDeCheThanhRome.lineThang);
            }

            this["spShowLine"+ arrLineWin[index]].setVisible(true);
            this.runEffectItemInLine(arrLineWin[index] -1,indexInLine);
            this.pItem.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                this.runEffectLineWin(index + 1);
            }.bind(this))));
        }
    },

    runEffectItemInLine: function(line,indexInLine)
    {
        var arrMatrix = this.resultSlot.matrix.split(",");
        var countLine = 0;
        var arrLine = [];
        var arrItem = [];
        for(var i = 0; i< 5; i++)
        {
            //if(arrMatrix[this.mapLine[line][i]] == 1)
            //{
            //    continue;
            //}else
            //{
                arrLine.push(this.mapLine[line][i]);
                var daCo = false;
                for(var n = 0; n < arrItem.length; n++)
                {
                    if(arrMatrix[this.mapLine[line][i]] == arrItem[n])
                    {
                        daCo = true;
                    }
                }
                if(daCo)
                {
                    continue;
                }else
                    for(var j = 0; j < 5; j++)
                    {
                        if(i == j)
                        {
                        }
                        else
                        {
                            if(arrMatrix[this.mapLine[line][i]] == arrMatrix[this.mapLine[line][j]])
                                arrLine.push(this.mapLine[line][j]);
                        }
                    }
                if(arrLine.length >= 3 )
                {
                    countLine++;
                    if(countLine == indexInLine)
                    {
                        //cc.log(arrLine.toString() + "  item "+ arrMatrix[this.mapLine[line][i]]);
                        break;
                    }else
                    {
                        arrItem.push(arrMatrix[this.mapLine[line][i]]);
                        arrLine = [];
                    }

                }
                else
                {
                    arrLine = [];
                }
            //}

        }
        for(var i = 0; i<arrLine.length; i++)
        {
            this.effectItemWin(this.arrItemMatrix[arrLine[i]],parseInt(arrMatrix[arrLine[i]]));
        }

    },
    effectItemWin:function(view,item)
    {
        cc.spriteFrameCache.addSpriteFrames("res/DeCheThanhRome/hieu_ung/khung.plist","res/DeCheThanhRome/hieu_ung/khung.png");
        view.setVisible(true);

        var animFrames = [];
        var str = "";

        for (var i = 1; i < 16; i++) {
            str = "DeCheThanhRome/hieu_ung/khung/khung"+i+".png";
            var spriteFrame = GuiUtil.createFrame(str);
            animFrames.push(spriteFrame);
            //animFrame.clean();
        }
        var animation = cc.Animation.create(animFrames, 0.05, 1);
        var animate   = cc.Animate.create(animation);
        //view. animate;

        //view.setScale(1);
        view.stopAllActions();
        view.runAction(cc.sequence(animate,cc.callFunc(function(){
            view.setVisible(false);
        }.bind(this))));

    },

    forceStopAuto:function()
    {
        this.isAutoRotate = false;
        this.btn_quay.setBright(true);
        this.btn_tu_quay.setBright(true);
        this.btn_tu_quay.loadTextures("res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png","res/DeCheThanhRome/tu_quay.png");
        DeCheThanhRome.Content.isAutoRotate = false;

    },
    updatePot:function(pot1,pot2,pot3,x21,x22)
    {
        cc.log(" pot1 = " + pot1 + ", pot2 = " + pot2 +", pot3 = " + pot3 + ", x21 = " + x21 +", x22 = " + x22);
        if(this.pLobby.isVisible())
        {
            this.updatePots(pot1,pot2,pot3,x21,x22);
        }

        //if(this.isChangeRoom)
        //{
        //    this.isChangeRoom = false;
        //    this.lb_prize.setString("0");
        //    this.hideLoading(this);
        //}
        var breakValue1 = parseInt((pot1 - this.valueHuSlot1)/50) +1;
        //effectRunMoney(this.lb_hu_room1,this.valueHuSlot1, pot1, breakValue1,true);

        var breakValue2 = parseInt((pot2 - this.valueHuSlot2)/50) + 1;
        //effectRunMoney(this.lb_hu_room2,this.valueHuSlot2, pot2, breakValue2,true);

        var breakValue3 = parseInt((pot3 - this.valueHuSlot3)/50) + 1;
        //effectRunMoney(this.lb_hu_room3,this.valueHuSlot3, pot3, breakValue3,true);

        if(this.currentRoom == DeCheThanhRomeLayer.ROOM1)
        {
            effectRunMoney(this.lb_hu,this.valueHuSlot1, pot1, breakValue1,true);
            this.sp_quy_thuong.stopAllActions();
            this.sp_quy_thuong.setScale(1);
            if(x21 == 0)
            {
                this.sp_quy_thuong.setTexture("res/DeCheThanhRome/menu/quy_thuong.png");
            }else
            {
                this.sp_quy_thuong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,1.1),cc.scaleTo(0.3,1))));
                this.sp_quy_thuong.setTexture("res/DeCheThanhRome/menu/x2_quy_thuong.png");
            }
        }else
        if(this.currentRoom == DeCheThanhRomeLayer.ROOM2)
        {
            effectRunMoney(this.lb_hu,this.valueHuSlot2, pot2, breakValue2,true);
            this.sp_quy_thuong.stopAllActions();
            this.sp_quy_thuong.setScale(1);
            if(x22 == 0)
            {
                this.sp_quy_thuong.setTexture("res/DeCheThanhRome/menu/quy_thuong.png");
            }else
            {
                this.sp_quy_thuong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,1.1),cc.scaleTo(0.3,1))));
                this.sp_quy_thuong.setTexture("res/DeCheThanhRome/menu/x2_quy_thuong.png");
            }
        }else
        if(this.currentRoom == DeCheThanhRomeLayer.ROOM3)
        {
            effectRunMoney(this.lb_hu,this.valueHuSlot3, pot3, breakValue3,true);
            this.sp_quy_thuong.stopAllActions();
            this.sp_quy_thuong.setScale(1);
            this.sp_quy_thuong.setTexture("res/DeCheThanhRome/menu/quy_thuong.png");
        }

        this.valueHuSlot1 = pot1;
        this.valueHuSlot2 = pot2;
        this.valueHuSlot3 = pot3;
        this.x21 = x21;
        this.x22 = x22;
    },
    updateLsgd:function()
    {

        var date = new Date();

        var strDate = date.getHours()+":"+date.getMinutes() + ":" +date.getSeconds()+ " "+ date.getDate() +"-"+date.getMonth()+"-"+date.getFullYear();
        this.resultSlot.time = strDate;
        var objLS = {};
        if(this.resultSlot.ref!=0)
        {
            objLS.rf = this.resultSlot.ref;
            objLS.un = "user name";
            objLS.bv = this.betValue;

            objLS.lb = this.getArrayLineSelected();
            if(this.free > 0)
            {
                objLS.bv = 100;
                objLS.lb = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20";
            }
            objLS.lw = this.resultSlot.linesWin;
            objLS.pz = this.resultSlot.prize;
            objLS.ps = "";
            objLS.ts = strDate;
        }

        var temLsgd = [];
        //this.arrLsgd.splice(0,0,this.objLsgd);
        temLsgd.push(objLS);
        for (var i = 0; i < this.arrLsgd.length; i++)
        {
            if(i<4)
                temLsgd.push(this.arrLsgd[i]);
        }
        if(this.arrLsgd!=null)
            while(this.arrLsgd.length > 0) {
                this.arrLsgd.pop();
            }
        for (var i = 0; i < temLsgd.length; i++)
        {
            this.arrLsgd.push(temLsgd[i]);
        }
        this.arrLsgd = temLsgd;
    },
    updateMoneyClient:function()
    {
        if(this.isChoiThu)
        {
            var moneyUpdate = 0;

            this.totalMoneyChoiThu = this.totalMoneyChoiThu - this.betValue*20;
            if(this.totalMoneyChoiThu >= 0)
            {
                this.lb_total_money.setString(formatMoney(0,3,this.totalMoneyChoiThu));
            }
        }else
        {
            if(this.free > 0 || this.isFreeDaiLy == true)
            {

            }else
            {
                var moneyUpdate = 0;

                moneyUpdate = userInfo.userData.vinTotal - (this.lineSelected * this.betValue);
                if(moneyUpdate>=0)
                {
                    lobby.updateMoney(moneyUpdate,MONEY_VIN);
                }
            }

        }
    },
    updateBigWin:function(username,type,betValue,totalPrizes,timestampt)
    {
        if(cc.sys.isNative)
            return;
        var obj = {};
        obj.nn = username;
        obj.type = type;
        obj.bv = betValue;
        obj.pz = totalPrizes;
        obj.ts = timestampt;

        this.pushListVinhDanh(obj,0);
        obj = null;
        delete obj;
        if(this.lv_vinh_danh.getChildrenCount()>=50)
        {
            this.lv_vinh_danh.removeLastItem();
        }

    },
    setDateX2:function(date)
    {
        cc.log("date: " + date);
        //this.lb_date_x2.setString(date);

    },
    updateFree:function(currentFree,currentMoney)
    {
        this.free = currentFree;
        this.lb_so_luot_mien_phi.setString(currentFree);

    },
    showFreeDaiLy:function(remain)
    {
        if(remain > 0)
        {
            this.isFreeDaiLy = true;
            this.lb_free_dai_ly.setString("Bạn còn " + remain + " lượt quay hằng ngày");
            this.sp_bg_text_luot_quay_dai_ly.setVisible(true);
        }else
        {
            if(this.sp_bg_text_luot_quay_dai_ly.isVisible())
            {
                this.sp_bg_text_luot_quay_dai_ly.setVisible(false);
            }
            this.isFreeDaiLy = false;
        }
    },
    checkFreeIngame:function(free,soDong,curent_room)
    {

        cc.log("So lan mien phi : = " + free + " CurentRoom = " + curent_room);
        this.resultSlot.freeSpin = free;

        if(free > 0 && this.isFreeDaiLy == false)
        {

            this.sp_bg_text_luot_quay_mien_phi.setVisible(true);
            //this.lb_free_spin.setVisible(true);
            this.lb_free_spin.setString("Bạn còn " + this.resultSlot.freeSpin + " lượt quay miễn phí");
            this.resultSlot.isFree = true;
            this.isFreeInGame = true;
            var arrSoDong = soDong.split(",");
            for(var i = 1; i<=this.soDong; i++)
            {
                this.btnSelectLine(i,false);
            }

            for(var i = 0; i < arrSoDong.length; i++)
            {
                this.btnSelectLine(parseInt(arrSoDong[i]),true);
            }
            this.changeLineSelected();

        }else
        {
            this.isFreeInGame = false;
            this.sp_bg_text_luot_quay_mien_phi.setVisible(false);
            //this.lb_free_spin.setVisible(false);
        }
        if(this.isChangeRoom)
        {
            this.isChangeRoom = false;
            this.hideLoading(this);
        }
        this.lb_prize.setString("0");
        this.pBgRoom.setBackGroundImage("res/DeCheThanhRome/back_ground/bg_room"+curent_room+".png");

        this.currentRoom = curent_room;
        if(this.currentRoom == DeCheThanhRomeLayer.ROOM3)
        {
            this.initLuaRoom3();
        }else
        {
            this.removeLuaRoom3();
        }
        if(curent_room == DeCheThanhRomeLayer.ROOM1)
        {
            this.betValue = DeCheThanhRomeLayer.BET_VALUE_ROOM1;
        }

        else if(curent_room == DeCheThanhRomeLayer.ROOM2)
        {
            this.betValue = DeCheThanhRomeLayer.BET_VALUE_ROOM2;
        }

        else
        {
            this.betValue = DeCheThanhRomeLayer.BET_VALUE_ROOM3;
        }
        this.setTextChangeLine();

        var pot1 = this.valueHuSlot1;
        var pot2 = this.valueHuSlot2;
        var pot3 = this.valueHuSlot3;

        var x21 = this.x21;
        var x22 = this.x22;

        var breakValue1 = parseInt((pot1 - this.valueHuSlot1)/50) +1;
        //effectRunMoney(this.lb_hu_room1,this.valueHuSlot1, pot1, breakValue1,true);

        var breakValue2 = parseInt((pot2 - this.valueHuSlot2)/50) + 1;
        //effectRunMoney(this.lb_hu_room2,this.valueHuSlot2, pot2, breakValue2,true);

        var breakValue3 = parseInt((pot3 - this.valueHuSlot3)/50) + 1;
        //effectRunMoney(this.lb_hu_room3,this.valueHuSlot3, pot3, breakValue3,true);

        if(this.currentRoom == DeCheThanhRomeLayer.ROOM1)
        {
            effectRunMoney(this.lb_hu,this.valueHuSlot1, pot1, breakValue1,true);
            this.sp_quy_thuong.stopAllActions();
            this.sp_quy_thuong.setScale(1);
            if(x21 == 0)
            {
                this.sp_quy_thuong.setTexture("res/DeCheThanhRome/menu/quy_thuong.png");
            }else
            {
                this.sp_quy_thuong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,1.1),cc.scaleTo(0.3,1))));
                this.sp_quy_thuong.setTexture("res/DeCheThanhRome/menu/x2_quy_thuong.png");
            }
        }else
        if(this.currentRoom == DeCheThanhRomeLayer.ROOM2)
        {
            effectRunMoney(this.lb_hu,this.valueHuSlot2, pot2, breakValue2,true);
            this.sp_quy_thuong.stopAllActions();
            this.sp_quy_thuong.setScale(1);
            if(x22 == 0)
            {
                this.sp_quy_thuong.setTexture("res/DeCheThanhRome/menu/quy_thuong.png");
            }else
            {
                this.sp_quy_thuong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,1.1),cc.scaleTo(0.3,1))));
                this.sp_quy_thuong.setTexture("res/DeCheThanhRome/menu/x2_quy_thuong.png");
            }
        }else
        if(this.currentRoom == DeCheThanhRomeLayer.ROOM3)
        {
            effectRunMoney(this.lb_hu,this.valueHuSlot3, pot3, breakValue3,true);
            this.sp_quy_thuong.stopAllActions();
            this.sp_quy_thuong.setScale(1);
            this.sp_quy_thuong.setTexture("res/DeCheThanhRome/menu/quy_thuong.png");
        }

    },
    showLoading : function(view){
        if(view.getChildByName("loadingdatamaster") == null){
            var loading = new cc.Sprite();
            loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
            var x = view.getContentSize().width/2;
            var y = view.getContentSize().height/2;
            loading.setPosition(cc.p(x,y));
            loading.setName("loadingdatamaster");
            view.addChild(loading);

            var rotateByVT = new cc.RotateBy(1, 360);
            loading.runAction(cc.repeatForever(rotateByVT));
        }else{
            var rotateByVT = new cc.RotateBy(1, 360);
            view.getChildByName("loadingdatamaster").setVisible(true);
        }
    },

    hideLoading : function (view){
        //this.panelLichSuMiniPoker.getChildByName("loadingdata").stopAllActions();
        if(view.getChildByName("loadingdatamaster") == null)
        {

        }else
        {
            view.getChildByName("loadingdatamaster").setVisible(false);
        }

    },
    toastSlot: function(message,timeShow, colorLable)
    {
        var wbg = this.getContentSize().width;
        if(this.getChildByTag(999)!=null)
        {
            this.getChildByTag(999).stopAllActions();
            this.getChildByTag(999).getChildByTag(10).stopAllActions();
            this.getChildByTag(999).getChildByTag(10).setString(message);

            this.getChildByTag(999).setOpacity(90);
            this.getChildByTag(999).getChildByTag(10).setOpacity(255);
            if(colorLable!=null)
            {
                this.getChildByTag(999).getChildByTag(10).color = colorLable;
            }else
            {
                this.getChildByTag(999).getChildByTag(10).color = cc.color.YELLOW;
            }
            var fadeOut = cc.fadeOut(2);
            var fadeIn = cc.fadeIn(0.5);
            var seq = cc.sequence(fadeIn,cc.delayTime(timeShow), fadeOut);
            this.getChildByTag(999).runAction(seq);
            this.getChildByTag(999).getChildByTag(10).runAction(seq.clone());

        }else
        {
            layer = new cc.Sprite();
            layer.initWithFile("res/DeCheThanhRome/bg_thong_bao.png");
            //var layer = new cc.Sprite("res/DeCheThanhRome/bg_thong_bao.png");
            layer.setOpacity(90);
            layer.setName("tostTaiXiu");
            layer.setTag(999);
            //layer.setContentSize(cc.size(924,91));
            var label1 = new cc.LabelTTF(message, "Arial", 28);
            label1.setTag(10);
            layer.addChild(label1);
            var w = layer.getContentSize().width;
            //layer.setContentSize(cc.size(w + 10,40))
            layer.setPosition(wbg/2,360);
            if(colorLable!=null)
            {
                label1.color = colorLable;
            }else
            {
                label1.color = cc.color.YELLOW;
            }
            //label1.color = cc.color(241, 224, 99);
            label1.x = w/2;
            label1.y = 45;
            //label1.opacity = 0;
            var fadeOut = cc.fadeOut(2);
            var fadeIn = cc.fadeIn(0.5);
            var seq = cc.sequence(fadeIn,cc.delayTime(timeShow), fadeOut);

            this.addChild(layer, 999);
            //var forever = seq.repeatForever();
            layer.runAction(seq);
            label1.runAction(seq.clone());
        }
        //var layer = new cc.LayerColor(cc.color(245, 170, 8));
    },
    genValueFromKey:function(key)
    {
        if(key == 2)
        {
            return 10;
        }
        if(key == 3)
        {
            return 15;
        }
        if(key == 4)
        {
            return 20;
        }
    },
    addSprite:function(parent,name,position,image)
    {
        this[name] = new cc.Sprite();
        this[name].setPosition(position);
        if(image)
        {
            this[name].setTexture(image);
        }

        parent.addChild(this[name]);
    },
    addLayout:function(parent,name,position,image,size,isTouch)
    {
        this[name] = new ccui.Layout();
        this[name].setAnchorPoint(0.5,0.5);
        this[name].setContentSize(size);
        this[name].setTouchEnabled(isTouch);
        if(image != null)
            this[name].setBackGroundImage(image);
        this[name].setPosition(position);

        parent.addChild(this[name]);
    },
    addButton:function(name, tag, parent,position,action,imageNol,imageS)
    {
        if(action === undefined)
            action = true;
        if(tag){
            tag = parseInt(tag);
        }

        this[name] = new ccui.Button();
        if(imageS != null)
        {
            this[name].loadTextures(imageNol,imageS,imageS);
        }
        else{
            this[name].loadTextures(imageNol,imageNol,imageNol);
        }
        this[name].setPressedActionEnabled(action);

        this[name].setTag(tag);
        this[name].addTouchEventListener(this.onTouchEvents, this);
        this[name].setPosition(position);
        this[name].setTitleFontName(GuiUtil.getFontNameButton(UTMAlexander.fontName));
        this[name].setTitleFontSize(30);
        this[name].setTitleColor(cc.color.WHITE);
        parent.addChild(this[name]);
    },
    onTouchEvents: function(sender,type){
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                this.onButtonTouched(sender,sender.getTag());
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.onButtonRelease(sender,sender.getTag());
                break;
        }
    },
    addText:function(parent,name,position,string,fontName,fontSize)
    {
        this[name] = new ccui.Text(string,  fontName, fontSize);
        this[name].setPosition(position);
        this[name].setAnchorPoint(0.5,0.5);
        parent.addChild(this[name]);
    },
    changeRoom:function(currentRoom,joindRoom)
    {
        var sendPkm = new ThanhRomeCmdSendChangeRoom();
        sendPkm.putCmd(currentRoom,joindRoom);
        Slots.socketSlot.send(sendPkm);
        sendPkm.clean();
    },
    play:function(betValue,lines)
    {
        var sendPkm = new ThanhRomeCmdSendPlay();
        sendPkm.putCmd(betValue,lines);
        Slots.socketSlot.send(sendPkm);
        sendPkm.clean();
    },
    autoPlay:function(lines)
    {
        var sendPkm = new ThanhRomeCmdSendAutoPlay();
        sendPkm.putCmd(lines);
        Slots.socketSlot.send(sendPkm);
        sendPkm.clean();
    },
    stopAutoPlay:function()
    {
        var sendPkm = new ThanhRomeCmdSendStopAutoPlay();
        sendPkm.putCmd();
        Slots.socketSlot.send(sendPkm);
        sendPkm.clean();
    },
    minimize:function(roomId)
    {
        var sendKb = new ThanhRomeCmdSendMinimize();
        sendKb.putCmd(roomId);
        Slots.socketSlot.send(sendKb);
        sendKb.clean();
    },
    parserDataTopUser: function()
    {
        var url = urlGetTopDeCheThanhRome(1);
        sendRequest(url,null,false,this.callBackTopUser,this.callBackError);
    },
    callBackTopUser:function(response)
    {
        // cc.log(response);
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];

        if(success)
        {

            var results = jsonData["results"];

            for (var i = 0; i < results.length; i++) {
                var counter = results[i];
                counter.type = 3;
                deCheThanhRome.arrVinhdanh.push(counter);


            }
            deCheThanhRome.reloadBangVinhDanh();
        }
        //nuDiepVien.hideLoading();

    },
    reloadBangVinhDanh:function()
    {
        this.lv_vinh_danh.removeAllItems();


        for(var i = 0; i<this.arrVinhdanh.length; i++)
        {
            this.pushListVinhDanh(this.arrVinhdanh[i],i);


        }
    },
    pushListVinhDanh:function(objData,index)
    {
        var cellHeight = 50;
        var positionY = 35;
        var  fonts = RobotoRegular;
        var fontSize = 15;
        positionY = 35;
        var countCell = 0;
        var cellList = new ccui.Layout();
        //cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //cellList.setBackGroundColor(colorBgCell1);
        cellList.height = cellHeight;
        cellList.width =  this.lv_vinh_danh.width;

        var positionX = 0;

        var lbTaiKhoan = new cc.LabelTTF();
        lbTaiKhoan.fontName = fonts.fontName;
        lbTaiKhoan.string = objData.nn;
        lbTaiKhoan.fontSize = fontSize;

        positionX = positionX + lbTaiKhoan.getContentSize().width/2 +2;
        lbTaiKhoan.setPosition(cc.p(positionX,positionY));
        lbTaiKhoan.setColor(cc.color(124,252,142));
        // lbTime.setTextColor(cc.color.WHITE);
        var strType = "";
        if(objData.type == 3 || objData.type == 4)
        {
            strType = "Nổ hũ ";
        }
        else
        {
            strType = "Thắng ";
        }


        // var lbResult =  new cc.LabelTTF(strType + formatMoney(0,3,nuDiepVien.arrVinhdanh[i].pz) +" VIN",  fonts.fontName, fontSize, cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        var lbResult = new cc.LabelTTF();
        lbResult.fontName = fonts.fontName;
        lbResult.string = strType + formatMoney(0,3,objData.pz) +" "+GameManager.config.moneyNameUpper;
        lbResult.fontSize = fontSize;

        positionX = positionX + lbTaiKhoan.getContentSize().width/2 + lbResult.getContentSize().width/2+2;
        lbResult.setPosition(cc.p(positionX,positionY));


        //var lbRoom =  new cc.LabelTTF("Phòng "+ formatMoney(0,3,nuDiepVien.arrVinhdanh[i].bv),  fonts.fontName, fontSize, cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        var lbRoom = new cc.LabelTTF();
        lbRoom.fontName = fonts.fontName;
        lbRoom.string = "Phòng "+ formatMoney(0,3,objData.bv);
        lbRoom.fontSize = fontSize;
        //lbRoom.setColor(colorCell1);
        if( positionX + lbResult.getContentSize().width/2 + lbRoom.getContentSize().width +2 > cellList.width)
        {
            positionY = 15;
            positionX = lbRoom.getContentSize().width/2 +2;
        }else
        {
            positionX = positionX + lbResult.getContentSize().width/2 + lbRoom.getContentSize().width/2 +2;
        }

        lbRoom.setPosition(cc.p(positionX,positionY));
        // lbRoom.setColor(colorMoneyVin);

        //var lbTime =  new cc.LabelTTF("Lúc "+nuDiepVien.arrVinhdanh[i].ts,  fonts.fontName, fontSize, cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        var lbTime = new cc.LabelTTF();
        lbTime.fontName = fonts.fontName;
        lbTime.string = "Lúc "+objData.ts;
        lbTime.fontSize = fontSize;
        lbTime.setAnchorPoint(0.5,0.5);
        if(positionX + lbRoom.getContentSize().width/2 + 2 + lbTime.getContentSize().width > cellList.width)
        {
            positionY = 15;
            positionX = lbTime.getContentSize().width/2 +2;
        }else
        {
            positionX = positionX + lbRoom.getContentSize().width/2 + 2 + lbTime.getContentSize().width/2;
        }
        lbTime.setPosition(cc.p(positionX,positionY));

        //lbResult.setColor(colorMoneyVin);
        cellList.addChild(lbTime);
        cellList.addChild(lbRoom);
        cellList.addChild(lbTaiKhoan);
        cellList.addChild(lbResult);
        this.lv_vinh_danh.insertCustomItem(cellList, index);

    },
    playMusicBackground:function()
    {
        this.audioDeCheThanhRome.stopMusicBackGround();
        this.stopAllActions();
        //this.audioDeCheThanhRome.stopMusicBackGround();
        this.audioDeCheThanhRome.playSoundBackGroundLoop(this.audioDeCheThanhRome.nhacNen1);
    },
    updatePots:function(pots1,pots2,pots3, x21, x22)
    {
        if(!this.lb_pot_room1)
        {
            cc.log("loi o game " + this.getGameName());
        }
        this.lb_pot_room1.unscheduleAllCallbacks();
        this.lb_pot_room2.unscheduleAllCallbacks();
        this.lb_pot_room3.unscheduleAllCallbacks();
        this.lb_pot_room1.setString(formatMoney(0,3,this.totalValuePot1));
        this.lb_pot_room2.setString(formatMoney(0,3,this.totalValuePot2));
        this.lb_pot_room3.setString(formatMoney(0,3,this.totalValuePot3));
        this.valuePot1 = this.totalValuePot1;
        this.valuePot2 = this.totalValuePot2;
        this.valuePot3 = this.totalValuePot3;

        var pot1 = pots1;
        var pot2 = pots2;
        var pot3 = pots3;
        var x2Pot1 = x21;
        var x2Pot2 = x22;
        var x2Pot3 = null;


        this.totalValuePot1 = pot1;
        this.totalValuePot2 = pot2;
        this.totalValuePot3 = pot3;
        if(this.valuePot1 == 0)
        {
            if(pot1 != -1)
            {
                this.lb_pot_room1.setString(formatMoney(0,3,pot1));
                this.valuePot1 = pot1;
            }
            if(pot2 != -1)
            {
                this.lb_pot_room2.setString(formatMoney(0,3,pot2));
                this.valuePot2 = pot2;
            }

            if(pot3 != -1)
            {
                this.lb_pot_room3.setString(formatMoney(0,3,pot3));
                this.valuePot3 = pot3;
            }

            return;
        }
        if(pot1 <= this.valuePot1 && pot1 != -1)
        {
            this.lb_pot_room1.setString(formatMoney(0,3,pot1));
        }
        else
        {
            var delayT = 1*2/60;
            if(this.totalValuePot1 - this.valuePot1 > 240/2)
            {
                delayT = 1*2/60;
            }else{
                delayT = 4*2/(this.totalValuePot1 - this.valuePot1);
            }
            this.lb_pot_room1.schedule(this.runPot1.bind(this),delayT);
            //effectRunMoneyMenu(this.lb_pot_room1,this.valuePot1,pot1,0,true);
        }

        if(pot2 <= this.valuePot2 && pot2 != -1)
        {
            this.lb_pot_room2.setString(formatMoney(0,3,pot2));
        }
        else
        {
            var delayT = 1*2/60;
            if(this.totalValuePot2 - this.valuePot2 > 240/2)
            {
                delayT = 1*2/60;
            }else{
                delayT = 4*2/(this.totalValuePot2 - this.valuePot2);
            }
            this.lb_pot_room2.schedule(this.runPot2.bind(this),delayT);
        }
        //effectRunMoneyMenu(this.lb_pot_room2,this.valuePot2,pot2,0,true);
        if(pot3 <= this.valuePot3 && pot3 != -1)
        {
            this.lb_pot_room3.setString(formatMoney(0,3,pot3));
        }
        else
        {
            var delayT = 1*2/60;
            if(this.totalValuePot3 - this.valuePot3 > 240/2)
            {
                delayT = 1*2/60;
            }else{
                delayT = 4*2/(this.totalValuePot3 - this.valuePot3);
            }
            this.lb_pot_room3.schedule(this.runPot3.bind(this),delayT);
        }

    },

    runPot1:function(dt)
    {
        if(this.valuePot1 >= this.totalValuePot1)
        {
            this.lb_pot_room1.setString(formatMoney(0,3,this.valuePot1));
            this.lb_pot_room1.unscheduleAllCallbacks();
        }else
        {
            this.valuePot1 ++;
            this.lb_pot_room1.setString(formatMoney(0,3,this.valuePot1));
        }

    },

    runPot2:function(dt)
    {
        if(this.valuePot2 >= this.totalValuePot2)
        {
            this.lb_pot_room2.setString(formatMoney(0,3,this.valuePot1));
            this.lb_pot_room2.unscheduleAllCallbacks();
        }else
        {
            this.valuePot2 ++;
            this.lb_pot_room2.setString(formatMoney(0,3,this.valuePot2));
        }

    },

    runPot3:function(dt)
    {
        if(this.valuePot3 >= this.totalValuePot3)
        {
            this.lb_pot_room3.setString(formatMoney(0,3,this.valuePot3));
            this.lb_pot_room3.unscheduleAllCallbacks();
        }else
        {
            this.valuePot3 ++;
            this.lb_pot_room3.setString(formatMoney(0,3,this.valuePot3));
        }

    },
    stopRunAllPot:function()
    {

        this.lb_pot_room1.unscheduleAllCallbacks();
        this.lb_pot_room2.unscheduleAllCallbacks();
        this.lb_pot_room3.unscheduleAllCallbacks();
        this.lb_pot_room1.setString(formatMoney(0,3,this.totalValuePot1));
        this.lb_pot_room2.setString(formatMoney(0,3,this.totalValuePot2));
        this.lb_pot_room3.setString(formatMoney(0,3,this.totalValuePot3));
        this.valuePot1 = this.totalValuePot1;
        this.valuePot2 = this.totalValuePot2;
        this.valuePot3 = this.totalValuePot3;
    }


    
});


openDCTRLoaded = function () {
    if (deCheThanhRome === null) {
        // //cc.log("----> Create mini game layer first time");
        deCheThanhRome = new DeCheThanhRomeLayer();
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(deCheThanhRome, BaseScene.INDEX_GAME_GUI, 10);
        deCheThanhRomeSubcribe(DeCheThanhRome.Content.currentRoom);
    }else
    {
        deCheThanhRome.setVisible(true);
    }
    if(menutab)
        menutab.hideAllInfo();
    deCheThanhRomeAppear = true;


};

openThanhRome = function () {
    loadResoureGame(g_resources_slot_dctr, deCheThanhRome, function () {
        if (!deCheThanhRomeAppear) {
            if (cc.sys.isNative) {
                gI.popUp.showLoading();
                openDCTRLoaded();
                gI.popUp.closeLoading();
            } else {
                openDCTRLoaded();
            }

        }
    });
};

closeDeCheThanhRome = function () {
    if (deCheThanhRome === null) {
        return;
    }
    if(deCheThanhRomeAppear) {
        deCheThanhRomeAppear = false;
        deCheThanhRome.audioDeCheThanhRome.stopAllSound();
        menutab.showAllInfoSlots();
        Slots.socketSlot.sendSubScribe(SUBSCRIBE_HALL,null);
        cc.eventManager.removeListener(deCheThanhRome.customlistener);
        deCheThanhRome.loadFromContent();
        deCheThanhRome.removeAllChildren(true);
        deCheThanhRome.cleanup();
        deCheThanhRome.removeFromParent(true);
        deCheThanhRome = null;
        cc.spriteFrameCache.removeSpriteFramesFromFile("res/DeCheThanhRome/hieu_ung/khung.plist");
        for(var i = 0; i < g_resources_slot_dctr.length ; i++)
        {
            if(g_resources_slot_dctr[i].indexOf(".png") != -1)
            {
                cc.textureCache.removeTextureForKey(g_resources_slot_dctr[i]);
            }
        }
    }

};
deCheThanhRomeSubcribe = function(roomId)
{
    var sendPkm = new ThanhRomeCmdSendSubcribe();
    sendPkm.putCmd(roomId);
    Slots.socketSlot.send(sendPkm);
    sendPkm.clean();

}
deCheThanhRomeUnsubscribe = function(roomId)
{
    var sendKb = new ThanhRomeCmdSendUnsubcribe();
    sendKb.putCmd(roomId);
    Slots.socketSlot.send(sendKb);
    sendKb.clean();
    if(deCheThanhRome!= null)
        deCheThanhRome.isAutoRotate = false;
    DeCheThanhRome.Content.isAutoRotate = false;
    //nuDiepVien.btn_tu_quay.loadTextures("res/NuDiepVien/btn_tuquay.png","res/NuDiepVien/btn_tuquay_s.png","res/NuDiepVien/btn_tuquay_s.png");
},
DeCheThanhRomeLayer.BTN_TU_QUAY = 1;
DeCheThanhRomeLayer.BTN_QUAY = 2;
DeCheThanhRomeLayer.BTN_DUNG_QUAY = 3;


DeCheThanhRomeLayer.BTN_BACK_MUC_DAT = 4;
DeCheThanhRomeLayer.BTN_NEXT_MUC_DAT = 5;

DeCheThanhRomeLayer.BTN_DONG_CHAN = 6;
DeCheThanhRomeLayer.BTN_DONG_LE = 7;
DeCheThanhRomeLayer.BTN_CHON_HET = 8;
DeCheThanhRomeLayer.BTN_CHON_LAI = 9;

DeCheThanhRomeLayer.BTN_LSGD = 10;
DeCheThanhRomeLayer.BTN_LS_TRUNG_HU = 11;
DeCheThanhRomeLayer.BTN_VINH_DANH = 20;
DeCheThanhRomeLayer.BTN_BACK_ALL = 12;
DeCheThanhRomeLayer.BTN_BACK = 13;
DeCheThanhRomeLayer.BTN_NEXT_ALL = 14;
DeCheThanhRomeLayer.BTN_NEXT = 15;

DeCheThanhRomeLayer.BTN_BAN_DO = 16;
DeCheThanhRomeLayer.BTN_THOAT_BAN_DO = 17;
DeCheThanhRomeLayer.BTN_CHOI_THU = 18;
DeCheThanhRomeLayer.BTN_BACK_LOBBY = 19;

DeCheThanhRomeLayer.BTN_BANG_THUONG = 21;
DeCheThanhRomeLayer.BTN_DONG = 22;
DeCheThanhRomeLayer.BTN_MUC_CUOC = 23;
//DeCheThanhRomeLayer.BTN_HUONG_DAN = 24;
DeCheThanhRomeLayer.BTN_TOP_NO_HU = 25;
DeCheThanhRomeLayer.BTN_LICH_SU = 26;
DeCheThanhRomeLayer.BTN_CLOSE_BANG_THUONG = 27;
DeCheThanhRomeLayer.BTN_CLOSE_CHON_DONG = 28;
DeCheThanhRomeLayer.BTN_X2_QUY_THUONG = 29;
DeCheThanhRomeLayer.BTN_SETTING = 30;
DeCheThanhRomeLayer.BTN_AM_THANH = 31;
DeCheThanhRomeLayer.BTN_NHAC_NEN = 32;
DeCheThanhRomeLayer.BTN_AN = 33;
DeCheThanhRomeLayer.BTN_ROOM1 = 34;
DeCheThanhRomeLayer.BTN_ROOM2 = 35;
DeCheThanhRomeLayer.BTN_ROOM3 = 36;
DeCheThanhRomeLayer.BTN_THONG_BAO_CO = 37;
DeCheThanhRomeLayer.BTN_THONG_BAO_KHONG = 38;



DeCheThanhRomeLayer.BET_VALUE_ROOM1 = 100;
DeCheThanhRomeLayer.BET_VALUE_ROOM2 = 1000;
DeCheThanhRomeLayer.BET_VALUE_ROOM3 = 10000;

DeCheThanhRomeLayer.ROOM1 = 0;
DeCheThanhRomeLayer.ROOM2 = 1;
DeCheThanhRomeLayer.ROOM3 = 2;