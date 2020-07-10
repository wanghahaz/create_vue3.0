export function downloadIamge(imgsrc, name) {
    var image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = imgsrc;
}
export function timestampToTime(timestamp, type) {
    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let date = null;
    if (timestamp.toString().length === 10) {
        date = new Date(timestamp * 1000);
    } else {
        date = new Date(timestamp);
    }

    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    if (type) {
        if (type === "date") {
            return Y + M + D;
        } else if (type === "dateTime") {
            return Y + M + D + h + m + s;
        } else if (type === "time") {
            return h + m + s;
        }
    } else {
        return Y + M + D
    }
}

export function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

export function diffTime(startDate, endDate) {
    var diff = endDate - startDate; //时间差的毫秒数  
    //计算出相差天数  
    var days = Math.floor(diff / (24 * 3600 * 1000));

    //计算出小时数  
    var leave1 = diff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数  
    var hours = Math.floor(leave1 / (3600 * 1000));
    hours = hours > 9 ? hours : `0${hours}`;
    //计算相差分钟数  
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数  
    var minutes = Math.floor(leave2 / (60 * 1000));
    minutes = minutes > 9 ? minutes : `0${minutes}`;
    //计算相差秒数  
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数  
    var seconds = Math.round(leave3 / 1000);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return {
        days,
        hours,
        minutes,
        seconds
    }
}
