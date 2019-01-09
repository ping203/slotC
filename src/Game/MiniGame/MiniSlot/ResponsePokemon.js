/**
 * Created by Admin on 10/6/2016.
 */
var PKMCmdSendSubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(PKM_SUBCRIBE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);
var PKMCmdSendUnsubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(PKM_UNSUBCRIBE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);

var PKMCmdSendChangeRoom = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(PKM_CHANGE_ROOM);

        },
        putCmd:function(roomLeavedId,roomJoinedId){
            this.packHeader();
            this.putByte(roomLeavedId);
            this.putByte(roomJoinedId);
            this.updateSize();
        }
    }
);

var PKMCmdSendPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(PKM_PLAY);

        },
        putCmd:function(betValue,lines){
            this.packHeader();
            this.putInt(betValue);
            this.putString(lines);
            this.updateSize();
        }
    }
);

var PKMCmdSendAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(PKM_AUTO);

        },
        putCmd:function(lines){
            this.packHeader();
            this.putByte(1);
            this.putString(lines);
            this.updateSize();
        }
    }
);
var PKMCmdSendStopAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(PKM_STOP_AUTO);
        },
        putCmd:function(){
            this.packHeader();
            this.putByte(0);
            this.putString("");
            this.updateSize();
        }
    }
);

var PKMResponseUpdateResult = CmdReceivedCommon.extend(
    {
        readData: function(){
            this.result = this.getByte();
            this.matrix = this.getString();
            this.linesWin = this.getString();
            this.prize = this.getLong();
            this.currentMoney = this.getLong();
        }

    }
);

var PKMResponseUpdatePot = CmdReceivedCommon.extend(
    {
        readData: function(){

            this.value = this.getLong();
            this.x2 = this.getByte();
        }

    }
);


var PKMResponseForceStopAuto = CmdReceivedCommon.extend(
    {
        readData: function(){
        }

    }
);

var PKMResponseDateX2 = CmdReceivedCommon.extend(
    {
        readData: function(){
            this.date = this.getString();
        }

    }
);



