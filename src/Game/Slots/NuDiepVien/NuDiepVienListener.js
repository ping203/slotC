/**
 * Created by Admin on 10/21/2016.
 */
//
NuDiepVien.GameListener = cc.Class.extend(
    {
        ctor:function(){

        },

        //onFinishConnect:function(isSuccess){
        //    if(isSuccess) {
        //        cc.log("Slots game onFinishConnect succeed");
        //        gameWsClient.sendLogin();
        //        gameWsState = GameManager.OPEN;
        //    }
        //    else{
        //        cc.log("Slots game onFinsishConect failed");
        //        waitingJoinGame = false;
        //        gI.popUp.closeLoading();
        //        cc.log("close waiting join game");
        //    }
        //},
        onFinishConnect:function(isSuccess){
            if(isSuccess) {
                cc.log("card game onFinishConnect succeed");
                gameWsState = CLIENT_STATE.CONNECTED;
                gameWsClient.sendLogin();
                cc.log("gameWsState: " + gameWsState);
            }
            else{
                cc.log("card game onFinsishConect failed");
                waitingJoinGame = false;
                gameWsState = CLIENT_STATE.NOT_CONNECTED;
                gI.popUp.closeLoading();
            }
        },

        onDisconnected:function(){
            waitingJoinGame = false;
            cc.log("Listener onDisconnected");
            gI.popUp.closeLoading();

            gameWsState = CLIENT_STATE.NOT_CONNECTED;
            //gameWsState = GameManager.CLOSED;
            gameWsClient = null;

            userGameData.setItem("currentGame", "-1");

            GameManager.getInstance.currentGame = -1;
           // window.location = HOST;
            //if(GameManager.getInstance().inGame){
            //    GameManager.getInstance().backToLobby();
            //}
            if(nuDiepVien != null && !nuDiepVien.isBackToLobby)
                 gI.popUp.open_panel_message_OK("Thông báo","Kết nối mạng không ổn định, vui lòng thử lại sau!","Ok",function(){window.location = HOST;});
            else
            {
                window.location = HOST;
            }
           // closeNuDiepVien();

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
                        nuDiepVienSubcribe(0);
                        loadResoureGame(g_resources_mn, Minigame, function () {
                            openMiniGame();
                            //openMenuTab();
                        });
                        //lobby.lv_menu.setVisible(false);
                        //lobby.pn_chat_event.setVisible(false);
                        //openNuDiepVien();
                    }
                    else{
                        switch (failError){
                            case 1:
                                s = "LOGIN_ERROR";
                                 gI.popUp.open_panel_message_OK("Thông Báo", "Phiên làm việc bạn đã hết hạn, vui lòng đăng nhập lại", "Ok", function(){window.location = HOST;});
                                break;
                            case 2:
                                s = "Bạn đã chặn không chơi game này.";
                                 gI.popUp.open_panel_message_OK("Thông Báo", s, "Ok", function(){window.location = HOST;});
                                // gI.popUp.openPanel_Alert_Lobby(s);
                                break;
                            case 3:
                                s = "Hệ thống bảo trì";
                               //  gI.popUp.openPanel_Alert_Lobby(s)
                                 gI.popUp.open_panel_message_OK("Thông Báo", s, "Ok", function(){window.location = HOST;});
                                break;
                        }
                       // GameManager.getInstance().disconnect();

                    }

                    break;
                }
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
                    nuDiepVien.updateFree(cmd.remain,cmd.current_money);

                    cmd.clean();
                    break;
                case NDV_FREE_DAI_LY:
                    var cmd = new NuDiepVienResponseFreeDaiLy(pkg);
                    nuDiepVien.showFreeDaiLy(cmd.remain);
                    //
                    cmd.clean();
                    break;

            };
        }
    }
);
