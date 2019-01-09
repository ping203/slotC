var CmdSendCheckNickName = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(CHECK_NICK_NAME);

        },
        putCheckNickName:function(nickname){
            this.packHeader();
            this.putString(nickname);
            this.updateSize();
        }
    }
);

var CmdReceivedCheckNickName = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.type = this.getByte();
            this.fee = this.getByte();
        }
    }
);

var CmdSendGiftCode = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(GIFTCODE);
        },
        putGiftCode:function(giftCode){
            this.packHeader();
            this.putString(giftCode);
            this.updateSize();
        }
    }
);

var CmdReceivedGiftCode = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.currentMoneyVin = this.getLong();
            this.currentMoneyXu = this.getLong();
            this.moneyGiftCodeVin = this.getLong();
            this.moneyGiftCodeXu = this.getLong();
        }
    }
);

var CmdSendRechargeXu = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(RECHARGE_XU);

        },
        putRechargeXu:function(vinToXu){
            this.packHeader();
            this.putLong(vinToXu);
            this.updateSize();
        }
    }
);

var CmdReceivedRechargeXu = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdSendOTP = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(SEND_OTP);

        },
        putSendOTP:function(otp, type){
            this.packHeader();
            this.putString(otp);
            this.putByte(type);
            this.updateSize();
        }
    }
);

var CmdReceivedSendOTP  = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdReceivedResultRechargeXu = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.currentMoneyVin = this.getLong();
            this.currentMoneyXu = this.getLong();
        }
    }
);

var CmdSendRechargeVin = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(RECHARGE_VIN);

        },
        putRechargeVin:function(provider,serial,pin, captcha, captchaId){
            this.packHeader();
            this.putByte(provider);
            this.putString(serial);
            this.putString(pin);
            this.putString(captcha);
            this.putString(captchaId);
            this.updateSize();
        }
    }
);

var CmdReceivedRechargeVin = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.currentMoney = this.getLong();
            this.timeFail = this.getLong();
            this.numFail = this.getInt();
        }
    }
);

var CmdReceivedBroadcastmessage = CmdReceivedCommon.extend({

        readData: function(){
            this.message = this.getString();
        }
    }
);

var CmdSendChangePassword = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(CHANGEPASS);

        },
        putChangePassword:function(oldPass,newPass){
            this.packHeader();
            this.putString(oldPass);
            this.putString(newPass);
            this.updateSize();
        }
    }
);

var CmdReceivedChangePassword = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdReceivedResultChangePassword = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdSendExchangeVippont = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(EXCHANGE_VIPPOINT);

        },
        putExchangeVippint:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

var CmdReceivedExchangeVippint = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdReceivedResultExchangeVippint = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.currentMoney = this.getLong();
            this.moneyAdd = this.getLong();
        }
    }
);

var CmdSendUpdateUserInfo = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(UPDATE_USER_INFO);

        },
        putUpdateUserInfo:function(cmt, email, phone){
            this.packHeader();
            this.putString(cmt);
            this.putString(email);
            this.putString(phone);
            this.updateSize();
        }
    }
);

var CmdReceivedUpdateUserInfo = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdSendUpdateEmail = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(UPDATE_EMAIL_USER);

        },
        putUpdateEmail:function(email){
            this.packHeader();
            this.putString(email);
            this.updateSize();
        }
    }
);

var CmdReceivedUpdateEmail = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdSendUpdatePhone = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(UPDATE_PHONE_USER);

        },
        putUpdatePhone:function(phone){
            this.packHeader();
            this.putString(phone);
            this.updateSize();
        }
    }
);

var CmdReceivedUpdatePhone = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdSendActiveEmail = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(ACTIVE_EMAIL);

        },
        putActiveEmail:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

var CmdReceivedActiveEmail = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdSendActivePhone = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(ACTIVE_MOBILE);

        },
        putActivePhone:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

var CmdReceivedActivePhone = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdReceivedResultActivePhone = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdSendExchangeMobileActived = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(EXCHANGE_MOBILE_ACTIVED);

        },
        putExchangeMobileActived:function(mobile){
            this.packHeader();
            this.putString(mobile);
            this.updateSize();
        }
    }
);

var CmdReceivedExchangeMobileActived = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdReceivedResultExchangeMobileActived = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdReceivedResultActiveNewMobile = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdSendGetInformationSercurity = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(GET_INFORMATION_SERCURITY);

        },
        putGetInformationSercurity:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

var CmdReceivedGetInformationSercurity = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.username = this.getString();
            this.cmt = this.getString();
            this.email = this.getString();
            this.mobile = this.getString();
            this.mobileSecure = this.getByte();
            this.emailSecure = this.getByte();
            this.appSecure = this.getByte();
            this.loginSecure = this.getByte();
            this.moneyLoginOtp = this.getLong();
            this.moneyUse = this.getLong();
            this.safe = this.getLong();
            this.configGame = this.getString();
        }
    }
);

var CmdSendSercurityLogin = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(SERCURITY_LOGIN);

        },
        putSercurityLogin:function(money, type){
            this.packHeader();
            this.putLong(money);
            this.putByte(type);
            this.updateSize();
        }
    }
);

var CmdReceivedSercurityLogin = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);
var CmdSendConfigGames = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(CONFIG_GAMES);

        },
        putConfigGames:function(games){
            this.packHeader();
            this.putString(games);
            this.updateSize();
        }
    }
);

var CmdReceivedConfigGames = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);

var CmdSendSafeMoney = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(SAFE_MONEY);

        },
        putSafeMoney:function(type, moneyExchange){
            this.packHeader();
            this.putByte(type);
            this.putLong(moneyExchange);
            this.updateSize();
        }
    }
);

var CmdReceivedSafeMoney = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.moneyUse = this.getLong();
            this.safe = this.getLong();
        }
    }
);
var CmdReceivedResultSafeMoney = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.moneyUse = this.getLong();
            this.safe = this.getLong();
            this.currentMoney = this.getLong();
        }
    }
);

var CmdSendExchangeVin = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(EXCHANGE_VIN);

        },
        putExchangeVin:function(receiver, moneyExchange, description){
            this.packHeader();
            this.putString(receiver);
            this.putLong(moneyExchange);
            this.putString(description);
            this.updateSize();
        }
    }
);

var CmdReceivedExchangeVin = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.moneyUse = this.getLong();
        }
    }
);
var CmdReceivedResultExchangeVin = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.moneyUse = this.getLong();
            this.currentMoney = this.getLong();
        }
    }
);

var CmdSendGetMoneyUse = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(GET_MONEYUSE);

        },
        putGetMoneyUse:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

var CmdReceivedGetMoneyUse = CmdReceivedCommon.extend({

        readData: function(){
            this.moneyUse = this.getLong();
        }
    }
);

var CmdSendBuyCardMobile = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(BUY_CARD);

        },
        putBuyCardMobile:function(provider, amount, quantity){
            this.packHeader();
            this.putByte(provider);
            this.putByte(amount);
            this.putByte(quantity);
            this.updateSize();
        }
    }
);

var CmdReceivedBuyCardMobile = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);
var CmdReceivedResultBuyCardMobile = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.currentMoney = this.getLong();
            this.softpin = this.getString();
        }
    }
);

var CmdSendRechargeMobile = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(RECHARGE_MOBILE);

        },
        putRechargeMobile:function(mobile, amount, type){
            this.packHeader();
            this.putString(mobile);
            this.putByte(amount);
            this.putByte(type);
            this.updateSize();
        }
    }
);

var CmdReceivedRechargeMobile = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);
var CmdReceivedResultRechargeMobile = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.currentMoney = this.getLong();
        }
    }
);

var CmdReceivedUpdateJackpot = CmdReceivedCommon.extend({

        readData: function(){
            this.miniPoker100 = this.getLong();
            this.miniPoker1000 = this.getLong();
            this.miniPoker10000 = this.getLong();
            this.pokeGo100 = this.getLong();
            this.pokeGo1000 = this.getLong();
            this.pokeGo10000 = this.getLong();
            this.khoBau100 = this.getLong();
            this.khoBau1000 = this.getLong();
            this.khoBau10000 = this.getLong();
            this.NDV100 = this.getLong();
            this.NDV1000 = this.getLong();
            this.NDV10000 = this.getLong();
            this.Avengers100 = this.getLong();
            this.Avengers1000 = this.getLong();
            this.Avengers10000 = this.getLong();
            this.Vqv100 = this.getLong();
            this.Vqv1000 = this.getLong();
            this.Vqv10000 = this.getLong();
            this.DCLM100 = this.getLong();
            this.DCLM1000 = this.getLong();
            this.DCLM10000 = this.getLong();
        }
    }
);

var CmdSendRechargeBank = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(RECHARGE_BANK);

        },
        putRechargeBank:function(bank, money){
            this.packHeader();
            this.putByte(bank);
            this.putLong(money);
            this.updateSize();
        }
    }
);

var CmdReceivedRechargeBank = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.url = this.getString();
        }
    }
);

var CmdSendSubcribeJacport = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(SUBCRIBE_JACPORT);

        },
        putSubcribeJacport:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);
var CmdSendUnsubcribeJacport = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(UNSUBCRIBE_JACPORT);

        },
        putUnsubcribeJacport:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);
var CmdSendPotGameBai = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(POT_GAME_BAI);

        },
        putPotGameBai:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);
var CmdReceivedPotGameBai = CmdReceivedCommon.extend({

        readData: function(){
            this.huBaCay = this.getInt();
            this.huBaiCao = this.getInt();
            this.huBinh = this.getInt();
            this.huSam = this.getInt();
            this.huTLMN = this.getInt();
        }
    }
);

var CmdSendCheckIAP = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(CHECK_IAP);

        },
        putCheckIAP:function(sku, platform){
            this.packHeader();
            this.putByte(sku);
            this.putByte(platform);
            this.updateSize();
        }
    }
);

var CmdReceivedCheckIAP = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError()
        }
    }
);

var CmdSendResultIAP = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(RESULT_IAP);

        },
        putResultIAP:function(signedData, signature, platform){
            this.packHeader();
            this.putString(signedData);
            this.putString(signature);
            this.putByte(platform);
            this.updateSize();
        }
    }
);

var CmdReceivedResultIAP = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.sku = this.getByte();
            this.currentMoney = this.getLong();
        }
    }
);

var CmdSendEventVippoint = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(EVENT_VIPPOINT);

        },
        putEventVippoint:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

var CmdReceivedEventVippoint = CmdReceivedCommon.extend({

        readData: function(){
            this.status = this.getByte();
            this.time = this.getLong();
        }
    }
);

/// Receive Mail
var CmdReceivedNewMail = CmdReceivedCommon.extend({

        readData: function(){
        }
    }
);
// Event Dragon
var CmdReceivedEventDragon = CmdReceivedCommon.extend({

        readData: function(){
        }
    }
);
/// VQVIP
var CmdSendGetVongQuayVip = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(GET_VONGQUAY_VIP);

        },
        GetVongQuayVip:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

var CmdReceivedGetVongQuayVip = CmdReceivedCommon.extend({

        readData: function(){
            this.remainCount = this.getShort();
        }
    }
);

var CmdSendPlayVongQuayVip = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(PLAY_VONGQUAY_VIP);

        },
        PlayVongQuayVip:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

var CmdReceivedPlayVongQuayVip = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.prizeVin = this.getInt();
            this.prizeMulti = this.getShort();
            this.remainCount = this.getShort();
            this.currentMoneyVin = this.getLong();
        }
    }
);

// nap vinplay card
var CmdSendRechargeVinPlayCard = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(RECHARGE_VINPLAY_CARD);

        },
        putRechargeVinPlayCard:function(serial,pin, captcha, captchaid){
            this.packHeader();
            this.putString(serial);
            this.putString(pin);
            this.putString(captcha);
            this.putString(captchaid);
            this.updateSize();
        }
    }
);

var CmdReceivedRechargeVinPlayCard = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.currentMoney = this.getLong();
            this.timeFail = this.getLong();
            this.numFail = this.getInt();
        }
    }
);
// nap mega card
var CmdSendRechargeMegaCard = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(RECHARGE_MEGA_CARD);

        },
        putdata:function(serial,pin, captcha, captchaid){
            this.packHeader();
            this.putString(serial);
            this.putString(pin);
            this.putString(captcha);
            this.putString(captchaid);
            this.updateSize();
        }
    }
);

var CmdReceivedRechargeMegaCard = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.currentMoney = this.getLong();
            this.timeFail = this.getLong();
            this.numFail = this.getInt();
        }
    }
);

// get list mission
var CmdSendGetListMission = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(GET_LIST_MISSION);

        },
        putdata:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

var CmdReceivedGetListMission = CmdReceivedCommon.extend({

        readData: function(){
            this.str = this.getString();
        }
    }
);
// earn mission
var CmdSendEarnVinMission = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(EARN_VIN_MISSION);

        },
        putdata:function(missionName, moneyType){
            this.packHeader();
            this.putString(missionName);
            this.putByte(moneyType);
            this.updateSize();
        }
    }
);

var CmdReceivedEarnVinMission = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.prize = this.getInt();
            this.currentmoney = this.getLong();
        }
    }
);

// nap Vcoin
var CmdSendRechargeVcoin = CmdSendCommon.extend({
        ctor:function()
        {
            this._super();
            this.setCmdId(RECHARGE_VCOIN);

        },
        putdata:function(serial,pin){
            this.packHeader();
            this.putString(serial);
            this.putString(pin);
            this.updateSize();
        }
    }
);

var CmdReceivedRechargeVcoin = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
            this.currentMoney = this.getLong();
            this.timeFail = this.getLong();
            this.numFail = this.getInt();
        }
    }
);