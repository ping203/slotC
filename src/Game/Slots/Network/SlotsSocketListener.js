/**
 * Created by Admin on 3/14/2017.
 */
SlotsSocketListener = cc.Class.extend(
    {
        ctor:function(webSocket){
            // this.gameWsState = CLIENT_STATE.NOT_CONNECTED;
        },
        onFinishConnect:function(isSuccess){
            if(isSuccess) {
                cc.log("Slots onFinishConnect succeed");
                Slots.socketSlot.gameWsState = CLIENT_STATE.CONNECTED;
                Slots.socketSlot.isConnected = true;
                Slots.socketSlot.sendLogin();
                cc.log("Slots.socketSlot.isConnected: " + Slots.socketSlot.isConnected);
                lobby.isClickMenuSlot = false;
            }
            else{
                cc.log("card game onFinsishConect failed");
                waitingJoinGame = false;
                Slots.socketSlot.gameWsState = CLIENT_STATE.NOT_CONNECTED;
                Slots.socketSlot.isConnected = false;
                gI.popUp.closeLoading();
            }
        },

        onDisconnected:function(){
            waitingJoinGame = false;
            cc.log("Listener onDisconnected");
            gI.popUp.closeLoading();

            Slots.socketSlot.isConnected = false;
            if(lobby.menuLayer.isClickMenuSlot && menutab && menutab.Islogout == false)
            {
                lobby.menuLayer.isClickMenuSlot = false;
                 gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            }

            lobby.menuLayer.setMenuSlot(false);


            for(var i = 0; i < lobby.menuLayer.arrItemSlots.length; i ++)
            {
                if(lobby.menuLayer.arrItemSlots[i].getStatusPlay())
                {
                    if(lobby.menuLayer.arrItemSlots[i].getSlotsGame()!= null)
                    {
                        lobby.menuLayer.arrItemSlots[i].getSlotsGame().isAutoRotate = false;
                        if(lobby.menuLayer.arrItemSlots[i].getSlotsGame() == slotKhoBau)
                        {
                            if(cc.sys.isNative == false)
                            {
                                slotKhoBau.btn_tu_quay.setBright(true);
                                slotKhoBau.btn_quay.setBright(true);
                            }else
                            {
                                slotKhoBau.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");
                            }
                        }else if(lobby.menuLayer.arrItemSlots[i].getSlotsGame() == nuDiepVien)
                        {
                            lobby.menuLayer.arrItemSlots[i].getSlotsGame().btn_tu_quay.loadTextures("res/NuDiepVien/btn_tuquay.png","res/NuDiepVien/btn_tuquay_s.png","res/NuDiepVien/btn_tuquay_s.png");
                        }else if(lobby.menuLayer.arrItemSlots[i].getSlotsGame() == avenger)
                        {
                            lobby.menuLayer.arrItemSlots[i].getSlotsGame().btn_tu_quay.loadTextures("res/Avenger/btn_tuquay.png","res/Avenger/btn_tuquay_s.png","res/Avenger/btn_tuquay_s.png");
                        }
                    }

                }

            }
            Slots.socketSlot.gameWsState = CLIENT_STATE.NOT_CONNECTED;
            closeSlotKhoBau();
            closeNuDiepVien();
            closeAvenger();
            closeVuongQuocVin();
            closeDeCheThanhRome();
            Slots.Content.isAutoRotate = false;
            Avenger.Content.isAutoRotate = false;
            NuDiepVien.Content.isAutoRotate = false;
            VuongQuocVin.Content.isAutoRotate = false;
            DeCheThanhRome.Content.isAutoRotate = false;
            //closeAvenger();
        },

        onReceived: function(cmd, pkg){
            if(cc.sys.isNative && useTCP){
                var data = new engine.InPacket();
            }
            else{
                var data = new InPacket();
            }
            data.init(pkg);
            var cmdId = data.getCmdId();
            cc.log("cmdId Slots = " + cmdId);
            switch(cmdId){

                case 1:
                {
                    cc.log("Received cmd login")

                    EventHandlerManager.getInstance().removeHandler("login");
                    var cmd = new CARD_GAME.CmdReceiveLogin(pkg);
                    var failError = cmd.getError();
                    cc.log("Eror: " + failError);
                    gI.popUp.closeLoading();
                    if (failError == 0) {
                        Slots.socketSlot.sendSubScribe(SUBSCRIBE_HALL,null);

                        //lobby.lv_menu.setVisible(false);
                        //lobby.pn_chat_event.setVisible(false);
                        //openAvenger();
                    }
                    else{
                        switch (failError){
                            case 1:
                                s = "LOGIN_ERROR";
                                 gI.popUp.open_panel_message_OK("Thông Báo", "Phiên làm việc bạn đã hết hạn, vui lòng đăng nhập lại", "Ok", menutab.logout);
                                break;
                            case 2:
                                s = "Bạn đã chặn không chơi game này.";
                                 gI.popUp.openPanel_Alert_Lobby(s);
                                break;
                            case 3:
                                s = "Hệ thống bảo trì";
                                 gI.popUp.openPanel_Alert_Lobby(s);
                                break;
                        }
                        GameManager.getInstance().disconnect();

                    }
                    cmd.clean();
                    break;
                }
                case UPDATE_JACK_POTS:
                    var cmd = new SlotsResponseUpdatePots(pkg)
                    lobby.menuLayer.updatePotSlots(cmd.pots);
                    cmd.clean();
                    break;

               /* case TDK_UPDATE_RESULT:
                    var cmd = new TayDuKyResponseUpdateResult(pkg);
                    cc.log("updateResult");
                    tayDuKy.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney,cmd.freeSpin,cmd.isFree,cmd.itemsWild,cmd.ratio);
                    cmd.clean();
                    break;
                case TDK_UPDATE_POT:
                    var cmd = new TayDuKyResponseUpdatePot(pkg);
                    tayDuKy.updatePot(cmd.valueRoom1,cmd.x2);
                    //cc.log("value = " + cmd.valueRoom1 );
                    cmd.clean();
                    break;
                case TDK_FORCE_STOP_AUTO:
                    var cmd = new TayDuKyResponseForceStopAuto(pkg);
                    tayDuKy.forceStopAuto();
                    cmd.clean();
                    break;
                case TDK_BIG_WIN:
                    var cmd = new TayDuKyResponseBigWin(pkg);
                    tayDuKy.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                    cmd.clean();
                    break;
                case TDK_FREE:
                    var cmd = new TayDuKyResponseFree(pkg);
                    tayDuKy.updateEndFree(cmd.prize,cmd.ratio);
                    //avenger.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case TDK_DATE_X2:
                    var cmd = new TayDuKyResponseDateX2(pkg);
                    //tayDuKy.setDateX2(cmd.dateX2);
                    //tayDuKy.updateFree(cmd.remain,cmd.current_money);
                    //tayDuKy.checkFreeIngame(cmd.freeSpin,cmd.lines);
                    cmd.clean();
                    break;
                case TDK_FREE_DAI_LY:
                    var cmd = new TayDuKyResponseFreeDaiLy(pkg);
                    //tayDuKy.showFreeDaiLy(cmd.remain);
                    cmd.clean();
                    break;*/

                case AVENGER_UPDATE_RESULT:
                    var cmd = new AvengerResponseUpdateResult(pkg);
                    cc.log("updateResult");
                    avenger.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney,cmd.freeSpin,cmd.isFree,cmd.itemsWild,cmd.ratio);
                    cmd.clean();
                    break;
                case AVENGER_UPDATE_POT:
                    var cmd = new AvengerResponseUpdatePot(pkg);
                    avenger.updatePot(cmd.valueRoom1,cmd.x2);
                    //cc.log("value = " + cmd.valueRoom1 );
                    cmd.clean();
                    break;
                case AVENGER_FORCE_STOP_AUTO:
                    var cmd = new AvengerResponseForceStopAuto(pkg);
                    avenger.forceStopAuto();
                    cmd.clean();
                    break;
                case AVENGER_BIG_WIN:
                    var cmd = new AvengerResponseBigWin(pkg);
                    avenger.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                    cmd.clean();
                    break;
                case AVENGER_FREE:
                    var cmd = new AvengerResponseFree(pkg);
                    avenger.updateEndFree(cmd.prize,cmd.ratio);
                    //avenger.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case AVENGER_DATE_X2:
                    var cmd = new AvengerResponseDateX2(pkg);
                    avenger.setDateX2(cmd.dateX2);
                    avenger.updateFree(cmd.remain,cmd.current_money);
                    avenger.checkFreeIngame(cmd.freeSpin,cmd.lines);
                    cmd.clean();
                    break;
                case AVENGER_FREE_DAI_LY:
                    var cmd = new AvengerResponseFreeDaiLy(pkg);
                    avenger.showFreeDaiLy(cmd.remain);
                    cmd.clean();
                    break;

                case NDV_UPDATE_RESULT:
                    var cmd = new NuDiepVienResponseUpdateResult(pkg);
                    nuDiepVien.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney);
                    cmd.clean();
                    break;
                case NDV_UPDATE_POT:
                    var cmd = new NuDiepVienResponseUpdatePot(pkg);
                    nuDiepVien.updatePot(cmd.valueRoom1,cmd.x2);
                    cmd.clean();
                    break;
                case NDV_FORCE_STOP_AUTO:
                    var cmd = new NuDiepVienResponseForceStopAuto(pkg);
                    nuDiepVien.forceStopAuto();
                    cmd.clean();
                    break;
                case NDV_BIG_WIN:
                    var cmd = new NuDiepVienResponseBigWin(pkg);
                    nuDiepVien.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                    cmd.clean();
                    break;
                case NDV_FREE:
                    var cmd = new NuDiepVienResponseFree(pkg);
                    nuDiepVien.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case NDV_DATE_X2:
                    var cmd = new NuDiepVienResponseDateX2(pkg);
                    nuDiepVien.setDateX2(cmd.dateX2);
                    nuDiepVien.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case NDV_FREE_DAI_LY:
                    var cmd = new NuDiepVienResponseFreeDaiLy(pkg);
                    nuDiepVien.showFreeDaiLy(cmd.remain);
                    //
                    cmd.clean();
                    break;

                case DCTR_UPDATE_RESULT:
                    var cmd = new ThanhRomeResponseUpdateResult(pkg);
                    deCheThanhRome.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney,cmd.isFreeSpin,cmd.ratio);
                    cmd.clean();
                    break;
                case DCTR_UPDATE_POT:
                    var cmd = new ThanhRomeResponseUpdatePot(pkg);
                    deCheThanhRome.updatePot(cmd.valueRoom1,cmd.valueRoom2,cmd.valueRoom3,cmd.x21,cmd.x22);
                    cmd.clean();
                    break;
                case DCTR_FORCE_STOP_AUTO:
                    var cmd = new ThanhRomeResponseForceStopAuto(pkg);
                    deCheThanhRome.forceStopAuto();
                    cmd.clean();
                    break;
                case DCTR_BIG_WIN:
                    var cmd = new ThanhRomeResponseBigWin(pkg);
                    deCheThanhRome.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                    cmd.clean();
                    break;
                case DCTR_FREE:
                    var cmd = new ThanhRomeResponseFree(pkg);
                    deCheThanhRome.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case DCTR_DATE_X2:
                    var cmd = new ThanhRomeResponseDateX2(pkg);
                    deCheThanhRome.setDateX2(cmd.dateX2);
                    deCheThanhRome.updateFree(cmd.remain);
                    deCheThanhRome.checkFreeIngame(cmd.freeSpin,cmd.lines, cmd.current_room);
                    cmd.clean();
                    break;
                case DCTR_FREE_DAI_LY:
                    var cmd = new ThanhRomeResponseFreeDaiLy(pkg);
                    deCheThanhRome.showFreeDaiLy(cmd.remain);
                    //
                    cmd.clean();
                    break;



                case VQV_UPDATE_RESULT:
                    var cmd = new VuongQuocVinResponseUpdateResult(pkg);
                    vuongQuocVin.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney,cmd.isFreeSpin,cmd.ratio);
                    cmd.clean();
                    break;
                case VQV_UPDATE_POT:
                    var cmd = new VuongQuocVinResponseUpdatePot(pkg);
                    vuongQuocVin.updatePot(cmd.valueRoom1,cmd.valueRoom2,cmd.valueRoom3,cmd.x21,cmd.x22);
                    cmd.clean();
                    break;
                case VQV_FORCE_STOP_AUTO:
                    var cmd = new VuongQuocVinResponseForceStopAuto(pkg);
                    vuongQuocVin.forceStopAuto();
                    cmd.clean();
                    break;
                case VQV_BIG_WIN:
                    var cmd = new VuongQuocVinResponseBigWin(pkg);
                    vuongQuocVin.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                    cmd.clean();
                    break;
                case VQV_FREE:
                    var cmd = new VuongQuocVinResponseFree(pkg);
                    vuongQuocVin.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case VQV_DATE_X2:
                    var cmd = new VuongQuocVinResponseDateX2(pkg);
                    vuongQuocVin.setDateX2(cmd.dateX2);
                    vuongQuocVin.updateFree(cmd.remain);
                    vuongQuocVin.checkFreeIngame(cmd.freeSpin,cmd.lines, cmd.current_room);
                    cmd.clean();
                    break;
                case VQV_FREE_DAI_LY:
                    var cmd = new VuongQuocVinResponseFreeDaiLy(pkg);
                    vuongQuocVin.showFreeDaiLy(cmd.remain);
                    //
                    cmd.clean();
                    break;



                case KHOBAU_UPDATE_RESULT:
                    var cmd = new KhoBauResponseUpdateResult(pkg);
                    slotKhoBau.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney);
                    cmd.clean();
                    break;
                case KHOBAU_UPDATE_POT:
                    var cmd = new KhoBauResponseUpdatePot(pkg);
                    slotKhoBau.updatePot(cmd.valueRoom1,cmd.valueRoom2,cmd.valueRoom3,cmd.x21,cmd.x22);
                    cmd.clean();
                    break;
                case KHOBAU_FORCE_STOP_AUTO:
                    var cmd = new KhoBauResponseForceStopAuto(pkg);
                    slotKhoBau.forceStopAuto();
                    cmd.clean();
                    break;
                case KHOBAU_BIG_WIN:
                    var cmd = new KhoBauResponseBigWin(pkg);
                    slotKhoBau.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                    cmd.clean();
                    break;
                case KHOBAU_FREE:
                    var cmd = new KhoBauResponseFree(pkg)
                    slotKhoBau.updateFree(cmd.remain);
                    slotKhoBau.setDateX2(cmd.ngayX2);
                    cmd.clean();
                    break;
                case KHOBAU_FREE_DAI_LY:
                    var cmd = new KhoBauResponseFreeDaiLy(pkg);
                    slotKhoBau.showFreeDaiLy(cmd.remain);
                    cmd.clean();
                    break;
                case UPDATE_KHO_BAU_MINIMIZE:
                    var cmd = new SlotsResponseUpdateResultHall(pkg);
                    lobby.menuLayer.updateResultHall(cmd.result,cmd.prize,cmd.currentMoney,GAME_KEY_KHO_BAU);
                    cmd.clean();
                    break;
                case UPDATE_VQV_MINIMIZE:
                    var cmd = new SlotsResponseUpdateResultHall(pkg);
                    lobby.menuLayer.updateResultHall(cmd.result,cmd.prize,cmd.currentMoney,GAME_KEY_VQV);
                    cmd.clean();
                    break;
                case UPDATE_NDV_MINIMIZE:
                    var cmd = new SlotsResponseUpdateResultHall(pkg);
                    lobby.menuLayer.updateResultHall(cmd.result,cmd.prize,cmd.currentMoney,GAME_KEY_NDV);
                    cmd.clean();
                    break;
                case UPDATE_SAH_MINIMIZE:
                    var cmd = new SlotsResponseUpdateResultHall(pkg);
                    lobby.menuLayer.updateResultHall(cmd.result,cmd.prize,cmd.currentMoney,GAME_KEY_SAH);
                    cmd.clean();
                    break;
                case UPDATE_DCTR_MINIMIZE:
                    var cmd = new SlotsResponseUpdateResultHall(pkg);
                    lobby.menuLayer.updateResultHall(cmd.result,cmd.prize,cmd.currentMoney,GAME_KEY_DCTR);
                    cmd.clean();
                    break;
                case UPDATE_INFO_HALL:
                    var cmd = new SlotsResponseUpdateInfoHall(pkg);
                    lobby.menuLayer.updateAuto(cmd.autoKhoBau,cmd.autoNDV,cmd.autoSieuAnhHung,cmd.autoVuongQuocVin,cmd.autoDeCheLaMa);
                    if(Slots.socketSlot.openGame == null)
                    {

                    }
                    else{
                        lobby.menuLayer.openGame(Slots.socketSlot.openGame);
                        Slots.socketSlot.openGame = null;
                    }
                    break;

            };
        }
    }
);