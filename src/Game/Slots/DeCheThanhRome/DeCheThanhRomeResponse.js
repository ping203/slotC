/**
 * Created by Admin on 10/21/6016.
 */

var DCTR_SUBCRIBE = 6003;
var DCTR_UNSUBCRIBE = 6004;
var DCTR_CHANGE_ROOM = 6005;
var DCTR_PLAY = 6001;
var DCTR_UPDATE_RESULT = 6001;
var DCTR_UPDATE_POT = 6002;
var DCTR_AUTO = 6006;
var DCTR_STOP_AUTO = 6006;
var DCTR_FORCE_STOP_AUTO = 6008;
var DCTR_DATE_X2 = 6009;
var DCTR_BIG_WIN = 6010;
var DCTR_FREE = 6011;
var DCTR_FREE_DAI_LY = 6012;
var DCTR_MINIMIZE = 6013;
//var DCTR_TIME_X2 =

var ThanhRomeCmdSendSubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(DCTR_SUBCRIBE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);
var ThanhRomeCmdSendUnsubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(DCTR_UNSUBCRIBE);
        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);
var ThanhRomeCmdSendMinimize = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(DCTR_MINIMIZE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);

var ThanhRomeCmdSendChangeRoom = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(DCTR_CHANGE_ROOM);
        },
        putCmd:function(roomLeavedId,roomJoinedId){
            this.packHeader();
            this.putByte(roomLeavedId);
            this.putByte(roomJoinedId);
            this.updateSize();
        }
    }
);

var ThanhRomeCmdSendPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(DCTR_PLAY);

        },
        putCmd:function(betValue,lines){
            this.packHeader();
            //this.putInt(betValue);
            this.putString(lines);
            this.updateSize();
        }
    }
);

var ThanhRomeCmdSendAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(DCTR_AUTO);

        },
        putCmd:function(lines){
            this.packHeader();
            this.putByte(1);
            this.putString(lines);
            this.updateSize();
        }
    }
);
var ThanhRomeCmdSendStopAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(DCTR_STOP_AUTO);

        },
        putCmd:function(){
            this.packHeader();
            this.putByte(0);
            this.putString("");
            this.updateSize();
        }
    }
);

var ThanhRomeResponseUpdateResult = CmdReceivedCommon.extend(
    {


        readData: function(){
            this.ref = this.getLong();
            this.result = this.getByte();
            this.matrix = this.getString();
            this.linesWin = this.getString();
            this.haiSao = this.getString();
            this.prize = this.getLong();
            this.currentMoney = this.getLong();
            this.isFreeSpin = this.getByte();
            this.ratio = this.getByte();
        }

    }
);

var ThanhRomeResponseUpdatePot = CmdReceivedCommon.extend(
    {


        readData: function(){

            this.valueRoom1 = this.getLong();
            this.valueRoom2 = this.getLong();
            this.valueRoom3 = this.getLong();
            this.x21 = this.getByte();
            this.x22 = this.getByte();
        }

    }
);

var ThanhRomeResponseDateX2 = CmdReceivedCommon.extend(
    {

        readData: function(){
            this.dateX2 = this.getString();
            this.remain = this.getByte();
            this.current_money = this.getLong();
            this.freeSpin = this.getByte();
            this.lines = this.getString();
            this.current_room = this.getByte();
        }

    }
);


var ThanhRomeResponseForceStopAuto = CmdReceivedCommon.extend(
    {

        readData: function(){
        }

    }
);

var ThanhRomeResponseFree = CmdReceivedCommon.extend(
    {

        readData: function(){
            this.remain = this.getByte();
            this.current_money = this.getLong();
        }

    }
);
var ThanhRomeResponseFreeDaiLy = CmdReceivedCommon.extend(
    {

        readData: function(){
            this.remain = this.getByte();
        }

    }
);

var ThanhRomeResponseBigWin = CmdReceivedCommon.extend(
    {

        readData: function(){
            this.username = this.getString();
            this.type = this. getByte();
            this.betValue = this.getShort();
            this.totalPrizes = this.getLong();
            this.timestampt = this.getString();
        }

    }
);