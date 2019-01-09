var vipPointDefine = [

    {
        name:"Đá",
        minVp:-1,
        maxVp:80
    },
    {
        name:"Đồng",
        minVp:80,
        maxVp:800
    },
    {
        name:"Bạc",
        minVp:800,
        maxVp:4500
    },
    {
        name:"Vàng",
        minVp:4500,
        maxVp:8600
    },
    {
        name:"BK 1",
        minVp:8600,
        maxVp:12000
    },
    {
        name:"BK 2",
        minVp:12000,
        maxVp:50000
    },
    {
        name:"KC 1",
        minVp:50000,
        maxVp:100000
    },
    {
        name:"KC 2",
        minVp:100000,
        maxVp:200000
    },
    {
        name:"KC 3",
        minVp:200000,
        maxVp:9999999999
    }
];


var HuGameKey = {
    vuongQuocVin:1,
    miniSlot:2,
    khoBau:3,
    nuDiepVien:4,
    sieuAnhHung:5,
    miniPoker:6,
    deCheThanhRome:7
}

var huGameDefine = [

    {
        gameKey:HuGameKey.vuongQuocVin,
        name:"Vương Quốc Gem",
        icon:"res/Lobby/IconGame/vuongquocvin.png",
        scale:0.28,
    },
    {
        gameKey:HuGameKey.miniSlot,
        name:"Kim Cương",
        icon:"res/Minigame/poke_ball.png",
        scale:0.8,
    },
    {
        gameKey:HuGameKey.khoBau,
        name:"Kho Báu",
        icon:"res/Lobby/IconGame/khobau.png",
        scale:0.28,
    },
    {
        gameKey:HuGameKey.nuDiepVien,
        name:"Nữ Điệp Viên",
        icon:"res/Lobby/IconGame/nudiepvien.png",
        scale:0.28,
    },
    {
        gameKey:HuGameKey.sieuAnhHung,
        name:"Siêu Anh Hùng",
        icon:"res/Lobby/IconGame/avenger.png",
        scale:0.28,
    },
    {
        gameKey:HuGameKey.miniPoker,
        name:"Mini Poker",
        icon:"res/Minigame/mini_poke.png",
        scale:0.8,
    },
    {
        gameKey:HuGameKey.deCheThanhRome,
        name:"Đế Chế La Mã",
        icon:"res/Lobby/IconGame/dechelama.png",
        scale:0.28,
    }
];
var  formartTimeSecond = function (value) {
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
};
var formartTimeSecondEventVip = function (value) {
    value = Math.abs(value);
    var minute = Math.floor(value / 60);
    var second = value - minute * 60;
    var hour = Math.floor(minute / 60)
    minute = minute - hour * 60;

    var str = "";
    if (hour < 10) {
        str = "0" + hour + "H\n";
    } else {
        str = hour + "H\n";
    }
    if (minute < 10) {
        str = str + "0" + minute;
    } else {
        str = str + "" + minute;
    }
    if (second < 10) {
        str = str + ":0" + second;
    } else {
        str = str + ":" + second;
    }
    //cc.log("so gio : " + str);
    return str;
};

