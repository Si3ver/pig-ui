import request from '/@/utils/request';
import {Session} from "/@/utils/storage";
import {rule} from "/@/utils/validate"
import {useUserInfo} from "/@/stores/userInfo";
import {formatAxis, parseTime} from "/@/utils/formatTime";

/**
 * 登录
 * @param data
 */
export const login = (data: any) => {
    let basicAuth = 'Basic ' + window.btoa('pig:pig')
    return request({
        url: '/admin/oauth2/token',
        method: 'post',
        params: data,
        headers: {
            isToken: false,
            'TENANT-ID': '1',
            'Authorization': basicAuth
        }
    })
}

export const loginByMobile = (mobile: any, code: any) => {
    const grant_type = 'mobile'
    const scope = 'server'
    let basicAuth = 'Basic ' + window.btoa('app:app')

    return request({
        url: '/admin/oauth2/token',
        headers: {
            isToken: false,
            'TENANT-ID': '1',
            'Authorization': basicAuth
        },
        method: 'post',
        params: {mobile: 'SMS@' + mobile, code: code, grant_type, scope}
    })
}

export const loginBySocial = (state: string, code: string) => {
    const grant_type = 'mobile'
    const scope = 'server'
    let basicAuth = 'Basic ' + window.btoa('social:social')

    return request({
        url: '/admin/oauth2/token',
        headers: {
            isToken: false,
            'TENANT-ID': '1',
            'Authorization': basicAuth
        },
        method: 'post',
        params: {mobile: state + '@' + code, code: code, grant_type, scope}
    })
}

export const sendMobileCode = (mobile: any) => {
    return request({
        url: "/admin/mobile/" + mobile,
        method: "get",
    })
}

export const refreshToken = (refresh_token: string) => {
    const grant_type = 'refresh_token'
    const scope = 'server'
    // 获取当前选中的 basic 认证信息
    let basicAuth = 'Basic ' + window.btoa('pig:pig')

    return request({
        url: '/admin/oauth2/token',
        headers: {
            'isToken': false,
            'TENANT-ID': '1',
            'Authorization': basicAuth
        },
        method: 'post',
        params: {refresh_token, grant_type, scope}
    })
}

/**
 * 校验令牌，若有效期小于半小时自动续期
 * @param refreshLock
 */
export const checkToken = (refreshTime: number, refreshLock: boolean) => {
    let basicAuth = 'Basic ' + window.btoa('pig:pig')
    request({
        url: '/admin/token/check_token',
        headers: {
            isToken: false,
            Authorization: basicAuth
        },
        method: 'get',
        params: {token: Session.get("token")}
    })
        .then((response) => {
            if (rule.validatenull(response) || response.code === 1) {
                clearInterval(refreshTime)
                return
            }
            const expire = Date.parse(response.data.expiresAt)
            if (expire) {
                const expiredPeriod = expire - new Date().getTime()
                //小于半小时自动续约
                if (expiredPeriod <= 10 * 30 * 1000) {
                    if (!refreshLock) {
                        refreshLock = true
                        useUserInfo().refreshToken().catch(() => {
                            clearInterval(refreshTime)
                        })
                        refreshLock = false
                    }
                }
            }
        }).catch(() => {
        // 发生异常关闭定时器
        clearInterval(refreshTime)
    })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return request({
        url: '/admin/user/info',
        method: 'get'
    })
}
