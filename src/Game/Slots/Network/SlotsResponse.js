/**
 * Created by Admin on 3/14/2017.
 */
var SlotsResponseUpdatePots = CmdReceivedCommon.extend(
    {

        
        readData: function(){

            this.pots = this.getString();
        }

    }
);

var SlotsResponseUpdateResultHall = CmdReceivedCommon.extend(
    {

        
        readData: function(){

            this.result = this.getByte();
            this.prize = this.getLong();
            this.currentMoney = this.getLong();
        }

    }
);

var SlotsResponseUpdateInfoHall = CmdReceivedCommon.extend(
    {

        
        readData: function(){
            this.autoKhoBau = this.getBool();
            this.autoNDV = this.getBool();
            this.autoSieuAnhHung = this.getBool();
            this.autoVuongQuocVin = this.getBool();
            this.autoDeCheLaMa = this.getBool();

        }

    }
);