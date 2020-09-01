//---------------全局过滤器封装----------------
// 日期
export function getDate(time) {
    // 格式化时间
    function formatTime(time) {
        return time > 10 ? time : "0" + time;
    }
    //日期
    var d = new Date(time);
    var dates =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        formatTime(d.getHours()) +
        ":" +
        formatTime(d.getMinutes()) +
        ":" +
        formatTime(d.getSeconds());
    return dates;
}
//教育
export function getEducation(type) {
    switch (type) {
        case "highschool":
            return "高中";
        case "college":
            return "大学";
        default:
            return type;
    }
}
//性别
export function getSex(type) {
    switch (type) {
        case "man":
            return "男";
        case "woman":
            return "女";
        default:
            return type;
    }
}
//状态
export function statusFilter(type) {
    //  - 0-默认值进件状态
    //  - 1-提交初审状态
    //  - 2-初审通过状态
    //  - 3-初审拒绝状态
    //  - 4-提交终审状态
    //  - 5-终审通过状态
    // - 6-终审拒绝状态
    // - 7-生成合同状态
    switch (type) {
        case 0:
            return "进件";
        case 1:
            return "提交初审";
        case 2:
            return "初审通过";
        case 3:
            return "初审拒绝";
        case 4:
            return "提交终审";
        case 5:
            return "终审通过";
        case 6:
            return "终审拒绝";
        case 7:
            return "生成合同";
        default:
            return type;
    }
}
//状态类型
export function statusTypeFilter(type) {
    switch (type) {
        case 0:
            return "danger";
        case 1:
            return "success";
        case 2:
            return "success";
        case 3:
            return "danger";
        case 4:
            return "success";
        case 5:
            return "success";
        case 6:
            return "danger";
        case 7:
            return "info";
        default:
            return type;
    }
}
export function statusContractFilter(type) {  //合同状态
    if (type) {
        return "已生成合同"
    } else {
        return "未生成合同"
    }
}
export function statusContractTypeFilter(type) {  //状态样式 
    if (type) {
        return "success"
    } else {
        return "primary"
    }
}
export function getRole(type) {  //角色
    switch (type) {
        case "input":
            return "销售人员";
        case "approve":
            return "初审人员";
        default:
            return type;
    }
}