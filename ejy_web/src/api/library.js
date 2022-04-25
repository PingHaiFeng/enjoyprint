import request from '@/utils/request'

export function getUploadUrl() {
    return process.env.VUE_APP_BASE_API+'/web/doc-upload'
}

export function listDocFolder() {
    return request({
        url: '/web/list-doc-folder',
        method: 'get',
    })
}

export function listDoc() {
    return request({
        url: '/web/list-doc',
        method: 'get',
    })
}

export function getDoc() {
    return request({
        url: '/web/doc',
        method: 'get',
    })
}
export function addDoc(data) {
    return request({
        url: '/web/doc',
        method: 'post',
        data
    })
}
export function updateDoc(data) {
    return request({
        url: '/web/doc',
        method: 'put',
        data
    })
}

export function delDoc(ids) {
    return request({
        url: `/web/doc?ids=${ids}`,
        method: 'delete',
       
    })
}