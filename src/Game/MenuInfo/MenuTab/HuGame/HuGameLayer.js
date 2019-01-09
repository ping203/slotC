
var HuGameLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();
            this.btnRoom100 = null;
            this.btnRoom1000 = null;
            this.btnRoom10000 = null;
            this.lvHuGame = null;
            this.spHuGame = null;
            this.spStarHu3 = null;
            this.spStarHu2 = null;
            this.spStarHu1 = null;
            this.pContent = null;

            this.arrHuGame = [];
            this.currentRoom = HuGameLayer.ROOM100;

            this.arrPotGet = [];
            this.itemPotGet = {
                gameKey:1,
                potRoom100:500000,
                potRoom1000:5000000,
                potRoom10000:50000000,
            };
            this.isShowListHu = false;
            this.countPotRun = 0;

            return true;
        },

        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/PlistMiniGame.plist");

            // this.addImage(this, "spHuGame", cc.p(152, 593), res_ResourceMenuTab + "/img_listhu.png", cc.size(92, 91));
            this.addSprite(this, "spHuGame", cc.p(640, 563), res_ResourceMenuTab + "/img_listhu.png");
            this.addSprite(this.spHuGame, "spStarHu3", cc.p(20, 53), res_ResourceMenuTab + "/star_allhu.png");
            this.addSprite(this.spHuGame, "spStarHu2", cc.p(39, 78.5), res_ResourceMenuTab + "/star_allhu.png");
            this.addSprite(this.spHuGame, "spStarHu1", cc.p(70, 38.5), res_ResourceMenuTab + "/star_allhu.png");

            this.addLayout(this.spHuGame,"pContent",cc.p(46,0),res_ResourceMenuTab + "/bg_listhu.png",cc.size(252,435),true);
            this.btnRoom100 = new ccui.Button();
            this.btnRoom100.setContentSize(cc.size(187,33));
            this.btnRoom100.setTitleText("100");
            this.btnRoom100.addTouchEventListener(this.onTouchBtnTab, this);
            this.btnRoom100.tag = HuGameLayer.BTN_ROOM1;
            this.btnRoom100.setPosition(cc.p(60,394));
            this.btnRoom100.setAnchorPoint(0.5,0.5);
            this.btnRoom100.setTitleFontSize(22);
            this.btnRoom100.getTitleRenderer().setColor(GuiUtil.color("#FFB600"));

            this.btnRoom1000 = new ccui.Button();
            this.btnRoom1000.setContentSize(cc.size(187,33));
            this.btnRoom1000.setTitleText("1K");
            this.btnRoom1000.addTouchEventListener(this.onTouchBtnTab, this);
            this.btnRoom1000.tag = HuGameLayer.BTN_ROOM2;
            this.btnRoom1000.setPosition(cc.p(126,394));
            this.btnRoom1000.setAnchorPoint(0.5,0.5);
            this.btnRoom1000.setTitleFontSize(22);

            this.btnRoom10000 = new ccui.Button();
            this.btnRoom10000.setContentSize(cc.size(187,33));
            this.btnRoom10000.setTitleText("10K");
            this.btnRoom10000.addTouchEventListener(this.onTouchBtnTab, this);

            this.btnRoom10000.tag = HuGameLayer.BTN_ROOM3;
            this.btnRoom10000.setPosition(cc.p(192,394));
            this.btnRoom10000.setAnchorPoint(0.5,0.5);
            this.btnRoom10000.setTitleFontSize(22);

            this.pContent.addChild(this.btnRoom100);
            this.pContent.addChild(this.btnRoom1000);
            this.pContent.addChild(this.btnRoom10000);


            this.pContent.setAnchorPoint(0.5,1);
            this.lvHuGame = new ccui.ListView();
            this.lvHuGame.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this.lvHuGame.setTouchEnabled(true);
            this.lvHuGame.setBounceEnabled(true);
            this.lvHuGame.setClippingEnabled(true);
            this.lvHuGame.setContentSize(cc.size(205, 350));
            this.lvHuGame.setPosition(cc.p(24, 24));
            this.pContent.addChild(this.lvHuGame);

            for(var i = 0; i < huGameDefine.length; i ++)
            {
                var itemHu = new ItemHuGame(huGameDefine[i]);
                itemHu.addTouchEventListener(this.onTouchHuGameItem, this);
                this.lvHuGame.pushBackCustomItem(itemHu);
                this.arrHuGame.push(itemHu);
            }
            this.effectAllHu();
            this.eventMov();
            this.pContent.setScale(1,0);
            cc.log("customizeGUI gdfgd");
        },
        addTextAsBtn:function (parent, name, position, string, fontName, fontSize, size, tag) {
            this.addText(parent, name, position, string, fontName, fontSize);
            this[name].ignoreContentAdaptWithSize(false);
            this[name].setContentSize(size);
            this[name].setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this[name].setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this[name].tag = tag;
            this[name].setTouchEnabled(true);
            this[name].addTouchEventListener(this.onTouchBtnTab, this);
        },
        addButtonText:function () {

        },
        countRunPotDone:function () {
            this.countPotRun++;
            if(this.countPotRun == this.arrHuGame.length)
            {
                this.pContent.stopAllActions();
                this.countPotRun = 0;
            }
        },
        eventMov:function () {
            var that = this;
            var listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                startX: 0,
                startY: 0,
                deltaMove: 10,
                onTouchBegan: function (touch, event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        this.startX = touch.getLocation().x;
                        this.startY = touch.getLocation().y;
                        return true;
                    }
                    return false;
                },
                //Trigger when moving touch
                onTouchMoved: function (touch, event) {
                    //Move the position of current button sprite
                    var target = event.getCurrentTarget();
                    var delta = touch.getDelta();
                    target.x += delta.x;
                    target.y += delta.y;

                },
                //Process the touch end event
                onTouchEnded: function (touch, event) {
                    var curX = touch.getLocation().x;
                    var curY = touch.getLocation().y;
                    var dxy = Math.abs(this.startX - curX) + Math.abs(this.startY - curY);
                    if (dxy <= this.deltaMove) {
                        that.onTouchHuGame();
                    }
                    if (curX < 0) {
                        touch.x = 0;
                    }
                    if (curX > 1920) {
                        touch.x = 1920;
                    }
                    if (curY < 0) {
                        touch.y = 0;
                    }
                    if (curY > 1080) {
                        touch.x = 1080;
                    }

                }
            });

            cc.eventManager.addListener(listener,  this.spHuGame);
        },
        onTouchHuGame:function () {
            if(this.isShowListHu)
            {
                this.isShowListHu = false;
                this.hideListHuGame();
            }else
            {
                this.isShowListHu = true;
                this.showListHuGame();
            }
        },
        showListHuGame:function () {
            this.pContent.stopAllActions();
            this.subcribleJacport();
            this.showListView();
            this.pContent.runAction(cc.sequence(cc.scaleTo(0.2, 1, 1),cc.callFunc(function () {
            }.bind(this))));
        },
        hideListHuGame:function () {
            this.unsubcribleJacport();
            this.pContent.stopAllActions();
            this.closeListView();
            this.pContent.runAction(cc.sequence(cc.scaleTo(0.2, 1, 0),cc.callFunc(function () {

            }.bind(this))));
        },

        showListView:function () {
            this.lvHuGame.setTouchEnabled(true);
            for(var i = 0; i< this.arrHuGame.length; i++)
            {
                this.arrHuGame[i].setTouchEnabled(true);
            }
        },

        closeListView:function () {
            this.lvHuGame.setTouchEnabled(false);
            for(var i = 0; i< this.arrHuGame.length; i++)
            {
                this.arrHuGame[i].setTouchEnabled(false);
            }
        },

        onTouchBtnTab: function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    switch (sender.getTag())
                    {
                        case HuGameLayer.BTN_ROOM1:
                            this.setSelectRoom(HuGameLayer.ROOM100);
                            break;
                        case HuGameLayer.BTN_ROOM2:
                            this.setSelectRoom(HuGameLayer.ROOM1000);
                            break;
                        case HuGameLayer.BTN_ROOM3:
                            this.setSelectRoom(HuGameLayer.ROOM10000);
                            break;
                    }
                    break;
            }
        },
        onTouchHuGameItem: function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    switch (sender.getGameKey())
                    {

                        case HuGameKey.miniSlot:
                            gI.magicDoor.openMiniGame(uc.MagicDoor.BTN_MINI_SLOT);
                            break;
                        case HuGameKey.miniPoker:
                            gI.magicDoor.openMiniGame(uc.MagicDoor.BTN_POKER);
                            break;
                        case HuGameKey.vuongQuocVin:
                            lobby.menuLayer.openSlotByKeys(GAME_KEY_VQV);
                            break;
                        case HuGameKey.khoBau:
                            lobby.menuLayer.openSlotByKeys(GAME_KEY_KHO_BAU);
                            break;
                        case HuGameKey.nuDiepVien:
                            lobby.menuLayer.openSlotByKeys(GAME_KEY_NDV);
                            break;
                        case HuGameKey.sieuAnhHung:
                            lobby.menuLayer.openSlotByKeys(GAME_KEY_SAH);
                            break;
                        case HuGameKey.deCheThanhRome:
                            lobby.menuLayer.openSlotByKeys(GAME_KEY_DCTR);
                    }
                    break;
            }
        },
        effectAllHu: function () {
            var fadeInStar = new cc.FadeIn(1.2);
            var fadeOutStar = new cc.FadeOut(1.2);
            var spawnIn = cc.spawn(fadeOutStar, cc.scaleTo(1.2, 0));
            var spawnOut = cc.spawn(fadeInStar, cc.scaleTo(1.2, 1));
            var sequence = cc.sequence(spawnIn, cc.delayTime(0.3), spawnOut);
            this.spStarHu1.runAction(cc.repeatForever(sequence));

            var fadeInStar2 = new cc.FadeIn(1);
            var fadeOutStar2 = new cc.FadeOut(1);
            var spawnIn2 = cc.spawn(fadeOutStar2, cc.scaleTo(1, 0));
            var spawnOut2 = cc.spawn(fadeInStar2, cc.scaleTo(1, 0.8));
            var sequence2 = cc.sequence(spawnOut2, cc.delayTime(0.5), spawnIn2);
            this.spStarHu2.runAction(cc.repeatForever(sequence2));

            var fadeInStar3 = new cc.FadeIn(0.7);
            var fadeOutStar3 = new cc.FadeOut(0.7);
            var spawnIn3 = cc.spawn(fadeOutStar3, cc.scaleTo(0.7, 0));
            var spawnOut3 = cc.spawn(fadeInStar3, cc.scaleTo(0.7, 0.4));
            var sequence3 = cc.sequence(spawnIn3, cc.delayTime(0), spawnOut3);
            this.spStarHu3.runAction(cc.repeatForever(sequence3));
        },

        onEnter: function () {
            cc.log("onEnter gdfgd");
            this._super();

        },

        onButtonRelease: function (button, id) {

            switch (id)
            {

                case HuGameLayer.BTN_ROOM1:
                    this.setSelectRoom(HuGameLayer.ROOM100);
                    break;
                case HuGameLayer.BTN_ROOM2:
                    this.setSelectRoom(HuGameLayer.ROOM1000);
                    break;
                case HuGameLayer.BTN_ROOM3:
                    this.setSelectRoom(HuGameLayer.ROOM10000);
                    break;
            }

        },
        setSelectRoom:function (room) {
            if(this.currentRoom != room)
            {
                this.currentRoom = room;
                this.btnRoom100.getTitleRenderer().setColor(GuiUtil.color("#FFFFFF"));
                this.btnRoom1000.getTitleRenderer().setColor(GuiUtil.color("#FFFFFF"));
                this.btnRoom10000.getTitleRenderer().setColor(GuiUtil.color("#FFFFFF"));
                this["btnRoom" + room].getTitleRenderer().setColor(GuiUtil.color("#FFB600"));
                for(var i = 0; i < this.arrHuGame.length; i++)
                {
                    this.arrHuGame[i].setCurrentRoom(room);
                }

            }
        },
        responseUpdateJackpot: function (miniPoker100, miniPoker1000, miniPoker10000,
                                         pokeGo100, pokeGo1000, pokeGo10000,
                                         khoBau100, khoBau1000, khoBau10000,
                                         NDV100, NDV1000, NDV10000,
                                         Avengers100, Avengers1000, Avengers10000,
                                         VQV100, VQV1000, VQV10000,
                                         DCLM100, DCLM1000, DCLM10000) {
            /*cc.log("miniPoker100 : " + miniPoker100 + " miniPoker1000 : " + miniPoker1000 + " miniPoker10000 : " + miniPoker10000 +
               "\n pokeGo100 : " + pokeGo100 + " pokeGo1000 :" + pokeGo1000 + " pokeGo10000 :" + pokeGo10000 +
               "\n khoBau100 : " + khoBau100 + " khoBau1000 :" + khoBau1000 + " khoBau10000 : " + khoBau10000+
            "\n NDV 100: " + NDV100 + " NDV 1000: " + NDV1000 + " NDV 10000: " + NDV10000 +
            "\n Avenger 100: " + Avengers100 + " Avenger 1000: " + Avengers1000 + " Avenger 10000: " + Avengers10000);*/
            if (this.arrPotGet != null)
                while (this.arrPotGet.length > 0) {
                    this.arrPotGet.pop();
                }
            var itemPotMiniPoker = {};
            itemPotMiniPoker.gameKey = HuGameKey.miniPoker;
            itemPotMiniPoker.potRoom100 = miniPoker100;
            itemPotMiniPoker.potRoom1000 = miniPoker1000;
            itemPotMiniPoker.potRoom10000 = miniPoker10000;

            var itemPotPokeGo = {};
            itemPotPokeGo.gameKey = HuGameKey.miniSlot;
            itemPotPokeGo.potRoom100 = pokeGo100;
            itemPotPokeGo.potRoom1000 = pokeGo1000;
            itemPotPokeGo.potRoom10000 = pokeGo10000;

            var itemPotKhoBau = {};
            itemPotKhoBau.gameKey = HuGameKey.khoBau;
            itemPotKhoBau.potRoom100 = khoBau100;
            itemPotKhoBau.potRoom1000 = khoBau1000;
            itemPotKhoBau.potRoom10000 = khoBau10000;

            var itemPotNDV = {};
            itemPotNDV.gameKey = HuGameKey.nuDiepVien;
            itemPotNDV.potRoom100 = NDV100;
            itemPotNDV.potRoom1000 = NDV1000;
            itemPotNDV.potRoom10000 = NDV10000;

            var itemPotAvenger = {};
            itemPotAvenger.gameKey = HuGameKey.sieuAnhHung;
            itemPotAvenger.potRoom100 = Avengers100;
            itemPotAvenger.potRoom1000 = Avengers1000;
            itemPotAvenger.potRoom10000 = Avengers10000;

            var itemPotVQV = {};
            itemPotVQV.gameKey = HuGameKey.vuongQuocVin;
            itemPotVQV.potRoom100 = VQV100;
            itemPotVQV.potRoom1000 = VQV1000;
            itemPotVQV.potRoom10000 = VQV10000;

            var itemPotDCLM = {};
            itemPotDCLM.gameKey = HuGameKey.deCheThanhRome;
            itemPotDCLM.potRoom100 = DCLM100;
            itemPotDCLM.potRoom1000 = DCLM1000;
            itemPotDCLM.potRoom10000 = DCLM10000;

            this.arrPotGet.push(itemPotMiniPoker);
            this.arrPotGet.push(itemPotPokeGo);
            this.arrPotGet.push(itemPotKhoBau);
            this.arrPotGet.push(itemPotNDV);
            this.arrPotGet.push(itemPotAvenger);
            this.arrPotGet.push(itemPotVQV);
            this.arrPotGet.push(itemPotDCLM);
            this.pContent.stopAllActions();
            for(var i = 0 ; i< this.arrHuGame.length; i++)
            {
                for(var j = 0; j < this.arrPotGet.length; j++)
                {
                    if(this.arrHuGame[i].getGameKey() == this.arrPotGet[j].gameKey)
                    {
                        this.arrHuGame[i].setValuePot(this.arrPotGet[j]);
                    }
                }
            }
            this.runPots();
            
        },
        runPots:function () {
            this.countPotRun = 0;
            var delay = 0.05;
            this.pContent.stopAllActions();
            this.pContent.runAction(cc.repeatForever(cc.sequence(cc.delayTime(delay),cc.callFunc(function () {

                for(var i = 0; i< this.arrHuGame.length; i++)
                {
                    this.arrHuGame[i].runPot();
                }
            }.bind(this)))));
        },
        subcribleJacport: function () {
            var jacport = new CmdSendSubcribeJacport();
            jacport.putSubcribeJacport();
            gI.mainSocket.send(jacport);
            jacport.clean();
        },

        unsubcribleJacport: function () {
            var jacport = new CmdSendUnsubcribeJacport();
            jacport.putUnsubcribeJacport();
            gI.mainSocket.send(jacport);
            jacport.clean();
        },
    });

HuGameLayer.BTN_ROOM1 = 50;
HuGameLayer.BTN_ROOM2 = 150;
HuGameLayer.BTN_ROOM3 = 200;

HuGameLayer.ROOM100 = 100;
HuGameLayer.ROOM1000 = 1000;
HuGameLayer.ROOM10000 = 10000;
