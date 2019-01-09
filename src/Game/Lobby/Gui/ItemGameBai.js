/**
 * Created by PVC on 1/16/2018.
 */
/**
 * Created by Admin on 3/10/2017.
 */
var huState = {
    DISABLE:0,
    WAITING:1,
    VISIBLE:2
}
VPItemGameBai = ccui.Button.extend({

    _spComingSoon: null,
    _size: null,
    _openGame:null,
    _isWaitingDownLoad: false,
    _am:null,
    _timeHu:0,

    _ShowDownload:null,
    _content:{
        gameKey:-1,
        name:"",
        nameSocket:"",
        isComingSoon:true,
        icon:res_Lobby + "",
        manifestPath:"",
        toragePath:"",
        resource:g_resources_sam
    },
    _layerHu:null,
    _statusHu: huState.DISABLE,

    ctor:function(content)
    {
        this._content = content;
        var fontNamePot = fontRobotoMedium.fontName;
        var fontNamePrize = fontRobotoMedium.fontName;
        var fontSize = 20;
        this._capInsetsNormal = cc.rect(0, 0, 0, 0);
        this._normalTextureSize = cc.size(0, 0);
        ccui.Button.prototype.ctor.call(this);
        this.setTouchEnabled(true);
        if(this._content.icon != "")
        {
            var textype = ccui.Widget.LOCAL_TEXTURE;
            if(cc.spriteFrameCache.getSpriteFrame(this._content.icon))
                textype = ccui.Widget.PLIST_TEXTURE;
            this.loadTextures(this._content.icon, this._content.icon,this._content.icon, textype);
        }
        if(cc.sys.isNative && this._content.manifestPath !="")
        {
            this.initLayerDownload();
            this.checkDownLoad(this._content.manifestPath,this._content.toragePath);
        }
        // this.setPressedActionEnabled(true);
    },
    checkOpenGame:function()
    {
        if (cc.sys.isNative && this.getChildByTag(999).isVisible()) {
            this.downloadGamne();
            return false;
        }else
        {
            return true
        }
    },
    initLayerDownload:function()
    {
    	 this._size = this.getContentSize();
        this.addLayout(this,"ShowDownload",cc.p(this._size.width/2,this._size.height/2),"res/Minigame/ImageChung/bg_download.png",cc.size(213,62),false);
        this["ShowDownload"].setName("ShowDownload");
        this["ShowDownload"].setTag(999);
        this["ShowDownload"].setVisible(false);
        this.addText(this["ShowDownload"],"lb_download",cc.p(106,31),"DOWNLOAD",fontRobotoBold.fontName,28);
        this["lb_download"].setName("lb_ShowDownload");
        var sprite = GuiUtil.createSprite("res/Minigame/ImageChung/loading.png");
        var uiTimer = new cc.ProgressTimer(sprite);
        uiTimer.setType(cc.ProgressTimer.TYPE_BAR);
        uiTimer.setMidpoint(cc.p(0,0));
        uiTimer.setBarChangeRate(cc.p(1,0));
        uiTimer.setPosition(106,17);
        uiTimer.setPercentage(0);
        this["ShowDownload"].addChild(uiTimer);
        //uiTimer.setScale(0.7);
        uiTimer.setTag(1000);
        uiTimer.setVisible(false);
    },
    setHuState: function(time)
    {
        var state = huState.DISABLE;
        if(time > 0)
        {
            state = huState.VISIBLE;
        }else if(time < 0)
        {
            state = huState.WAITING;
        }

        this._timeHu = time;
        if(state == huState.DISABLE)
        {
            if(this._layerHu)
            {
                this._layerHu.stopAllActions();
                this._layerHu.removeFromParent(true);
                this._layerHu = null;
            }
        }else if(state == huState.WAITING)
        {
            if(this._layerHu)
            {
                this._layerHu.stopAllActions();
            }else
            {
                this.addLayerHu();
            }
            this._layerHu.setOpacity(150);
            this.runActionTime();
        }
        else if(state == huState.VISIBLE)
        {
            if(!this._layerHu)
            {
                this.addLayerHu();
            }else
            {
                this._layerHu.stopAllActions();
            }
            this._layerHu.setOpacity(255);
            this.runActionTime();
        }
    },
    getGameKey:function () {
        return this._content.gameKey;
    },

    addLayerHu:function()
    {
        this.addLayout(this,"_layerHu",cc.p(100,150),res_Lobby + "/icon_hu_sanh.png",cc.size(110,102),false);
        this.addText(this._layerHu,"lbTime",cc.p(55,42),"0:00:00",fontRobotoRegular.fontName,14);
    },
    runActionTime:function()
    {
        this.lbTime.setText(this.formartTimeSecond(this._timeHu));
        this._layerHu.stopAllActions();
        this._layerHu.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            if(this._timeHu < 0)
                this._timeHu ++;
            else
                this._timeHu --;
            this.runActionTime();
        }.bind(this))))
    },
    checkDownLoad:function(manifestPath,toragePath)
    {
        this._am = new jsb.AssetsManager(manifestPath,jsb.fileUtils.getWritablePath()+toragePath);
        this._am.retain();
        checkUpdateManifest(this._am,this);
    },
    downloadGamne: function()
    {
        if(this._isWaitingDownLoad)
            return;
        this._isWaitingDownLoad = true;
        this.getChildByTag(999).getChildByTag(1000).setVisible(true);

        this.getChildByTag(999).getChildByName("lb_ShowDownload").setText("DOWNLOADING");
        this.getChildByTag(999).getChildByName("lb_ShowDownload").setPosition(cc.p(106,41));
        this.getChildByTag(999).getChildByName("lb_ShowDownload").setColor(cc.color.YELLOW);
        this.getChildByTag(999).getChildByName("lb_ShowDownload").setFontSize(24);
        updateManifest(this._am,this.callBackUpdate.bind(this),0);

    },
    callBackUpdate:function(isError, percent, isUpdateFinish, msg, key)
    {
        if(isError)
        {
            this.getChildByTag(1000).setVisible(false);
             gI.popUp.openPanel_Alert_Lobby("L?i : " + msg);
            this._isWaitingDownLoad = false;


            this.getChildByTag(999).getChildByTag(1000).setVisible(false);
            this.getChildByTag(999).getChildByName("lb_ShowDownload").setText("DOWNLOAD");
            this.getChildByTag(999).getChildByName("lb_ShowDownload").setPosition(cc.p(106,31));
            this.getChildByTag(999).getChildByName("lb_ShowDownload").setColor(cc.color.WHITE);
            this.getChildByTag(999).getChildByName("lb_ShowDownload").setFontSize(28);
        }
        else
        {

            if(isUpdateFinish)
            {
                this.getChildByTag(999).setVisible(false);
                this._isWaitingDownLoad = false;

            }else
            {
                this.getChildByTag(999).getChildByTag(1000).setPercentage(percent);
            }
        }

    },
    getComingSoon:function()
    {
        return this._content.isComingSoon;
    },

    addSprite:function(parent,name,position,image)
    {
        this[name] = GuiUtil.createSprite();
        this[name].setPosition(position);
        if(image)
        {
            this[name].setTexture(image);
        }

        parent.addChild(this[name]);
    },
    addLayout: function (parent, name, position, image, size, isTouch) {

        this[name] = new ccui.Layout();
        this[name].setAnchorPoint(0.5, 0.5);
        this[name].setContentSize(size);
        this[name].setTouchEnabled(isTouch);
        this[name].setCascadeOpacityEnabled(true);
        if (image != null) {
            if (cc.spriteFrameCache.getSpriteFrame(image)) {
                this[name].setBackGroundImage(image, ccui.Widget.PLIST_TEXTURE);
            } else {
                this[name].setBackGroundImage(image, ccui.Widget.LOCAL_TEXTURE);
            }
        }
        this[name].setPosition(position);

        parent.addChild(this[name]);
    },

    addText:function(parent,name,position,string,fontName,fontSize)
    {
        this[name] = new ccui.Text(string,  fontName, fontSize);
        this[name].setPosition(position);
        this[name].setAnchorPoint(0.5,0.5);
        if(cc.sys.isNative)
        {
            this[name].setFontName("res/Font/"+ this[name].getFontName()+".ttf");
        }
        parent.addChild(this[name]);
    },
    addEditBox:function(parent,name,position,string,placeHolder,fontName,fontSize,size,backGround,textAlign,maxLength)
    {
        if(backGround != null)
            this[name] =  new cc.EditBox(size, cc.Scale9Sprite.create(backGround), cc.Scale9Sprite.create(backGround));
        else
            this[name] =  new cc.EditBox(size, cc.Scale9Sprite.create(), cc.Scale9Sprite.create());
        this[name].setPosition(position);
        this[name].setPlaceHolder(placeHolder);
        this[name].setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this[name].setFontName(fontName);
        this[name].setFontSize(fontSize);
        this[name].setPlaceholderFontSize(fontSize);
        this[name].setPlaceholderFontColor(cc.color.GRAY);
        this[name].setFontColor(cc.color.WHITE);
        this[name].setDelegate(this);
        if(textAlign != null && !cc.sys.isNative)
            this[name].setTextAlign(textAlign);
        this[name].setAnchorPoint(0.5,0.5);
        this[name].setPosition(position);
        this[name].setMaxLength(maxLength);
        /*if(cc.sys.isNative)
         {
         this[name].setFontName("res/Font/"+ this[name].getFontName()+".ttf");
         }*/
        parent.addChild(this[name]);
    },
    addCheckBook:function(parent, name, position,isSelect)
    {
        this[name] = new ccui.CheckBox();
        this[name].loadTextures("res/Lobby/bg_checkbox.png","res/Lobby/bg_checkbox.png","res/Lobby/nodecheckbox.png","res/Lobby/bg_checkbox.png","res/Lobby/nodecheckbox.png",ccui.Widget.LOCAL_TEXTURE);
        this[name].setPosition(position);
        this[name].setSelected(isSelect);
        parent.addChild(this[name]);
    },
    formartTimeSecond: function (value) {
        value = Math.abs(value);
        var minute = Math.floor(value / 60);
        var second = value - minute * 60;
        var hour = Math.floor(minute / 60)
        minute = minute - hour * 60;

        var str = "";
        if (hour < 10) {
            str = "0" + hour;
        } else {
            str = hour;
        }
        if (minute < 10) {
            str = str + ":0" + minute;
        } else {
            str = str + ":" + minute;
        }
        if (second < 10) {
            str = str + ":0" + second;
        } else {
            str = str + ":" + second;
        }
        //cc.log("so gio : " + str);
        return str;
    }



})
