// ----------------接口封装--------------
import request from '@/utils/request';

// 登录
export function login(data) {
    return request({
        method: "post",
        url: "user/login",
        data
    })
}

//获取用户基础信息
export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

// 退出
export function logout() {
    return request({
        method: "post",
        url: "user/logout",
    })
}

// 贷款申请
export function loanCreate(data) {
    return request({
        method: "post",
        url: "loan/create",
        data
    })
}

// 申请管理
export function loanList(data) {  //申请管理 -查询
    return request({
        url: 'loan/list',
        method: 'get',
        params: data
    })
}

export function loanUpdate(data) {  //申请管理 -编辑
    return request({
        url: 'loan/update',
        method: 'put',
        data
    })
}

export function loanDelete(data) {  //申请管理 -删除
    return request({
        url: 'loan/delete/' + data.id,
        method: 'delete'
    })
}

export function loanSubmitToApprove(data) {  //申请管理 -提交审核
    return request({
        url: 'loan/submitToApprove',
        method: 'post',
        data
    })
}

//贷款审批-初审
export function approveFirstList(data) {  //贷款审批-初审-列表数据
    return request({
        url: 'approve/first/list',
        method: 'get',
        params: data
    })
}

export function loanQuery(data) {  //贷款审批-初审/终审-列表详情
    return request({
        url: 'loan/query',
        method: 'get',
        params: data
    })
}
export function approveFirstPass(data) {  //贷款审批-初审-通过
    return request({
        url: 'approve/first/pass',
        method: 'post',
        data
    })
}
export function approveFirstReject(data) {  //贷款审批-初审-拒绝
    return request({
        url: 'approve/first/reject',
        method: 'post',
        data
    })
}

//贷款审批-终审
export function approveEndList(data) {  //贷款审批-终审-列表数据
    return request({
        url: 'approve/end/list',
        method: 'get',
        params: data
    })
}
export function approveEndPass(data) {  //贷款审批-终审-通过
    return request({
        url: 'approve/end/pass',
        method: 'post',
        data
    })
}
export function approveEndReject(data) {  //贷款审批-终审-拒绝
    return request({
        url: 'approve/end/reject',
        method: 'post',
        data
    })
}

//标的管理
export function contractList(data) {  //标的管理-列表数据
    return request({
        url: 'contract/list',
        method: 'get',
        params: data
    })
}
export function contractCreateFile(data) {  //标的管理-生成合同
    return request({
        url: 'contract/createFile',
        method: 'post',
        data
    })
}
export function contractDownload(data) {  //标的管理-下载合同
    return request({
        url: 'contract/download',
        method: 'get',
        params: data
    })
}

//创建管理员
export function permissionCreateUser(data) {  //权限管理-创建管理员
    return request({
        url: 'permission/createUser',
        method: 'post',
        data
    })
}

export function permissionUserlist(data) {  //权限管理-列表展示
    return request({
        url: 'user/list',
        method: 'get',
        params: data
    })
}