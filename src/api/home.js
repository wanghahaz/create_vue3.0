let gameId = 58;
import service from '@/utils/request'

import axios from 'axios'
// 获取验证码
export function getCode(data) {
    return service({
        url: '/verificationCodes',
        method: 'post',
        data
    })
}

// 登录
export function login(data) {
    return service({
        url: '/login',
        method: 'post',
        data
    })
}
// 退出登录
export function logout(data) {
    return service({
        url: '/logout',
        method: 'get',
        data
    })
}
// 提交认证信息
export function sbtAuth(data) {
    return service({
        url: '/user_auth',
        method: 'post',
        data
    })
}
// 获取会员认证信息
export function getAuth(data) {
    return service({
        url: '/user_auth/info',
        method: 'GET',
        data
    })
}
// 获取会员的信息
export function getUser(data) {
    return service({
        url: '/user',
        method: 'GET',
        data
    })
}

// 提交报名信息
export function sbtStudents(data) {
    return service({
        url: '/active_students',
        method: 'POST',
        data
    })
}
// 获取专业组别信息
export function getSelect(data) {
    return service({
        url: `/actives/${gameId}`,
        method: 'get',
        data
    })
}

// 获取当前用户当前大赛及的报名信息以及当前的阶段信息
export function getData_(data) {
    return service({
        url: `/active_students/get_current_stage/${gameId}`,
        method: 'get',
        data
    })
}
// 检测对应阶段是否已经支付

export function check_paid(id, data) {
    return service({
        url: `/active_student_stages/${id}/check_is_paid`,
        method: 'get',
        data
    })
}

// 支付
export function pay(id, data) {
    return service({
        url: `/payment/${id}/active_pay_wechat`,
        method: 'post',
        data
    })
}
// 获取七牛token
export function qnToken(data) {
    return service({
        url: '/file/qiniu_token',
        method: 'GET',
        data
    })
}
// 上传图片
export function upload(data) {
    let formData = new FormData();
    for (let i in data) {
        formData.append(i, data[i]);
    }
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token')
        }
    };
    return new Promise((resolve, reject) => {
        axios.post('https://upload-z1.qiniup.com', formData, config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })

}