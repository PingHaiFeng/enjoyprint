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

export function getDoc(file_id) {
    return request({
        url: `/web/doc?file_id=${file_id}`,
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
export function getFolder(folder_id) {
    return request({
        url: '/web/doc-folder?folder_id='+folder_id,
        method: 'get',
    })
}
export function addFolder(data) {
    return request({
        url: '/web/doc-folder',
        method: 'post',
        data
    })
}
export function updateFolder(data) {
    return request({
        url: '/web/doc-folder',
        method: 'put',
        data
    })
}

export function delFolder(ids) {
    return request({
        url: `/web/doc-folder?folder_ids=${ids}`,
        method: 'delete',
       
    })
}