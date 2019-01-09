/**
 * Created by PVC on 1/15/2018.
 */

var GAME_KEY_KHO_BAU = 50;
var GAME_KEY_NDV = 51;
var GAME_KEY_SAH = 52;
var GAME_KEY_VQV = 53;
var GAME_KEY_DCTR = 54;
var slots = {
    socketSlot: null,
};
/*
var gameListSlot =
    [
        {
            gameKey:GAME_KEY_DCTR,
            name: "dechethanhrome",
            isComingSoon:false,
            icon:"res/MenuSlots/icon/de_che_la_ma.png",
            nameSocket:"dclm",
            manifestPath:"res/DeCheThanhRome/project.manifest",
            toragePath:"update/DeCheThanhRome/res/DeCheThanhRome",
            resource:g_resources_slot_dctr,
            searchPath:"update/DeCheThanhRome"
        }
        ,
        {
            gameKey:GAME_KEY_NDV,
            name: "nudiepvien",
            isComingSoon:false,
            icon:"res/MenuSlots/icon/nu_diep_vien.png",
            nameSocket:"ndv",
            manifestPath:"res/NuDiepVien/project.manifest",
            toragePath:"update/NuDiepVien/res/NuDiepVien",
            resource:g_resources_nu_diep_vien,
            searchPath:"update/NuDiepVien"
        }
        ,
        {
            gameKey:GAME_KEY_SAH,
            name: "sieuanhhung",
            isComingSoon:false,
            icon:"res/MenuSlots/icon/sieu_anh_hung.png",
            nameSocket:"sah",
            manifestPath:"res/Avenger/project.manifest",
            toragePath:"update/Avenger/res/Avenger",
            resource:g_resources_avenger,
            searchPath:"update/Avenger"
        },
        {
            gameKey:GAME_KEY_VQV,
            name: "vuongquocvin",
            isComingSoon:false,
            icon:"res/MenuSlots/icon/vuong_quoc_vin.png",
            nameSocket:"vqv",
            openGame:null,
            manifestPath:"res/VuongQuocVin/project.manifest",
            toragePath:"update/VuongQuocVin/res/VuongQuocVin",
            resource:g_resources_slot_vqv,
            searchPath:"update/VuongQuocVin"
        }
        ,
        {
            gameKey:GAME_KEY_KHO_BAU,
            name: "khobau",
            isComingSoon:false,
            icon:"res/MenuSlots/icon/kho_bau.png",
            nameSocket:"kb",
            manifestPath:"res/SlotKhoBau/project.manifest",
            toragePath:"update/SlotKhoBau/res/SlotKhoBau",
            resource:g_resources_slots_kho_bau,
            searchPath:"update/SlotKhoBau"
        }

    ];
*/

var MenuDefine = {
    TypeGameSlot: 0,
    TypeGameMini: 1
};

var ListGame = [
    {
        type: MenuDefine.TypeGameSlot,
        icon: "res/Lobby/maingame/vuongtu.png",
    },
    {
        type: MenuDefine.TypeGameSlot,
        icon: "res/Lobby/maingame/bienxanh.png"
    },
    {
        type: MenuDefine.TypeGameSlot,
        icon: "res/Lobby/maingame/como.png",
    },
    {
        type: MenuDefine.TypeGameMini,
        icon: "res/Lobby/maingame/minislot.png",
    },
    {
        type: MenuDefine.TypeGameMini,
        icon: "res/Lobby/maingame/minitaixiu.png",
    },
    {
        type: MenuDefine.TypeGameMini,
        icon: "res/Lobby/maingame/minipoker.png",
    }
];


var GameList = function () {
};

GameList.SamSoLo = 0;
GameList.SamThuong = 1;
GameList.BaCay = 2;
GameList.MauBinh = 3;
GameList.TienLenSoLo = 4;
GameList.TienLenThuong = 5;
GameList.XiZach = 15;
GameList.SlotKhoBau = 7;
GameList.MauBinhTinhAt = 8;
GameList.NuDiepVien = 9;
GameList.Poker = 10;
GameList.Lieng = 11;
GameList.Avenger = 12;
GameList.CoCaro = 14;
GameList.BaiCao = 6;
GameList.CoTuong = 13;
GameList.CoUp = 16;
GameList.XocDia = 17;
GameList.PokerTour = 57;
GameList.BanCa = 99;

var gameListGameBai = [
    {
        gameKey: GameList.BanCa,
        name: "BanCa",
        nameSocket: "banca",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/banca.png",
        manifestPath: "res/BanCa/project.manifest",
        toragePath: "update/BanCa",
        resource: null
    },
    {
        gameKey: GameList.TienLenThuong,
        name: "TienLenThuong",
        nameSocket: "tlmn",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/tlmn.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_tienlen
    },
    {
        gameKey: GameList.SamThuong,
        name: "SamThuong",
        nameSocket: "sam",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/samloc.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_sam
    },
    {
        gameKey: GameList.Lieng,
        name: "Lieng",
        nameSocket: "lieng",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/lieng.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_lieng
    },
    {
        gameKey: GameList.BaCay,
        name: "BaCay",
        nameSocket: "bacay",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/3cay.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_bacay
    },
    {
        gameKey: GameList.Poker,
        name: "Poker",
        nameSocket: "poker",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/poker.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_poker
    },
    {
        gameKey: GameList.XiZach,
        name: "XiZach",
        nameSocket: "xidzach",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/xizach.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_xizach
    },
    {
        gameKey: GameList.XocDia,
        name: "XocDia",
        nameSocket: "xocdia",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/xocdia.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_xocdia
    },
    {
        gameKey: GameList.MauBinh,
        name: "MauBinh",
        nameSocket: "binh",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/maubinh.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_maubinh
    },
    {
        gameKey: GameList.CoCaro,
        name: "CoCaro",
        nameSocket: "caro",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/cocaro.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_caro
    },
    {
        gameKey: GameList.TienLenSoLo,
        name: "TienLenSoLo",
        nameSocket: "tlmn",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/tlmnsolo.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_tienlen
    },
    {
        gameKey: GameList.MauBinhTinhAt,
        name: "MauBinhTinhAt",
        nameSocket: "binh",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/maubinhtinhat.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_maubinh
    },
    {
        gameKey: GameList.SamSoLo,
        name: "SamSoLo",
        nameSocket: "sam",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/samsolo.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_sam
    },
    {
        gameKey: GameList.BaiCao,
        name: "BaiCao",
        nameSocket: "baicao",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/baicao.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_baicao
    },
    {
        gameKey: GameList.CoTuong,
        name: "CoTuong",
        nameSocket: "cotuong",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/cotuong.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_cotuong
    },
    {
        gameKey: GameList.CoUp,
        name: "CoUp",
        nameSocket: "coup",
        isComingSoon: false,
        icon: res_Lobby + "/IconGame/coup.png",
        manifestPath: "",
        toragePath: "",
        resource: g_resources_coup
    },


];

var listCheck = "~,`,!,@,#,$,%,^,&,*,(,),-,+,=,},{,[,],',|,\,/,<,>,?,ê,ư,ơ,ô,â,ă,đ,á,à,ả,ạ,ã,ắ,ằ,ẳ,ặ,ẵ,ấ,ầ,ẩ,ậ,ẫ,é,è,ẻ,ẹ,ẽ,ế,ề,ể,ệ,ễ,ú,ù,ủ,ụ,ũ,ứ,ừ,ử,ự,ữ,í,ì,ỉ,ị,ĩ," +
    "ó,ò,ỏ,ọ,õ,ố,ồ,ổ,ộ,ỗ,ớ,ờ,ở,ợ,ỡ,ý,ỳ,ỷ,ỵ,ỹ, ";

var listCheckVN = "~,`,!,(,),-,+,=,},{,[,],',|,\,/,<,>,?,ê,ư,ơ,ô,â,ă,đ,á,à,ả,ạ,ã,ắ,ằ,ẳ,ặ,ẵ,ấ,ầ,ẩ,ậ,ẫ,é,è,ẻ,ẹ,ẽ,ế,ề,ể,ệ,ễ,ú,ù,ủ,ụ,ũ,ứ,ừ,ử,ự,ữ,í,ì,ỉ,ị,ĩ,ó,ò,ỏ,ọ,õ,ố,ồ,ổ,ộ,ỗ,ớ,ờ,ở,ợ,ỡ,ý,ỳ,ỷ,ỵ,ỹ ";


