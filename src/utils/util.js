import router from '@/router'

function readImg(file) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const reader = new FileReader()
        reader.onload = function(e) {
            img.src = e.target.result
        }
        reader.onerror = function(e) {
            reject(e)
        }
        reader.readAsDataURL(file)
        img.onload = function() {
            resolve(img)
        }
        img.onerror = function(e) {
            reject(e)
        }
    })
}

export default {
    install(Vue, options) {
        Vue.prototype.$util = {
            // 获取连接参数值
            getUrlParams(name) {
                return router.history.current.query[name]
            },
            // 判断安卓或者ios终端
            getSystemType() {
                const u = navigator.userAgent
                const isAndroid =
                    u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
                const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
                if (isAndroid) {
                    return 'android'
                } else if (isiOS) {
                    return 'ios'
                } else {
                    return 'pc'
                }
            },
            // 校验元素是否为空
            isEmpty(v) {
                switch (typeof v) {
                    case 'undefined':
                        return true
                    case 'string':
                        if (
                            v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '')
                                .length == 0
                        ) {
                            return true
                        }
                        break
                    case 'boolean':
                        if (!v) return true
                        break
                    case 'number':
                        if (v === 0 || isNaN(v)) return true
                        break
                    case 'object':
                        if (v === null || v.length === 0) return true
                        for (const i in v) {
                            return false
                        }
                        return true
                }
                return false
            },
            // 校验手机号码
            isPhoneNum(val) {
                const phoneRule = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
                return phoneRule.test(val)
            },
            // 检验身份证号码
            isIdCardNum(val) {
                // 校验规则
                const idCardRule = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
                return idCardRule.test(val)
            },
            // 校验社会统一信用代码
            isSocialCode(val) {
                const socialCodeRule = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
                return socialCodeRule.test(val)
            },
            // 时间格式化
            formatTime(date, format) {
                if (!date) return
                if (!format) format = 'yyyy-MM-dd'
                switch (typeof date) {
                    case 'string':
                        date = new Date(date.replace(/-/, '/'))
                        break
                    case 'number':
                        date = new Date(date)
                        break
                }
                if (!(date instanceof Date)) return
                const dict = {
                    yyyy: date.getFullYear(),
                    M: date.getMonth() + 1,
                    d: date.getDate(),
                    H: date.getHours(),
                    m: date.getMinutes(),
                    s: date.getSeconds(),
                    MM: ('' + (date.getMonth() + 101)).substr(1),
                    dd: ('' + (date.getDate() + 100)).substr(1),
                    HH: ('' + (date.getHours() + 100)).substr(1),
                    mm: ('' + (date.getMinutes() + 100)).substr(1),
                    ss: ('' + (date.getSeconds() + 100)).substr(1)
                }
                return format.replace(
                    /(yyyy|MM?|dd?|HH?|ss?|mm?)/g,
                    function() {
                        return dict[arguments[0]]
                    }
                )
            },
            // 压缩图片
            async compressImg(file, type) {
                const img = await readImg(file)
                return new Promise((resolve, reject) => {
                    const canvas = document.createElement('canvas')
                    const context = canvas.getContext('2d')
                    const { width: originWidth, height: originHeight } = img
                    // 图片尺寸
                    const targetWidth = originWidth
                    const targetHeight = originHeight
                    canvas.width = targetWidth
                    canvas.height = targetHeight
                    context.clearRect(0, 0, targetWidth, targetHeight)
                    // 图片绘制
                    context.drawImage(img, 0, 0, targetWidth, targetHeight)
                    // 转二进制格式 toBlob 转Base64 toDataURL
                    canvas.toBlob(
                        function(blob) {
                            resolve(blob)
                        },
                        type || 'image/png',
                        0.92
                    )
                })
            },
            findKey(obj, value, compare = (a, b) => a === b) {
                return Object.keys(obj).find((k) => compare(obj[k], value))
            },
            // 判断是否为生产环境
            isProduction() {
                return process.env.NODE_ENV === 'production'
            },
            copyObj(to, from) {
                Object.keys(from).forEach((k) => {
                    if (Object.prototype.hasOwnProperty.call(to, k)) {
                        to[k] = from[k]
                    }
                })
                return to
            },
            chunk(arr, size) {
                const objArr = []
                let index = 0
                const objArrLen = arr.length / size
                for (let i = 0; i < objArrLen; i++) {
                    const arrTemp = []
                    for (let j = 0; j < size; j++) {
                        arrTemp[j] = arr[index++]
                        if (index === arr.length) {
                            break
                        }
                    }
                    objArr[i] = arrTemp
                }
                return objArr
            },
            isDef(val) {
                return val !== undefined && val !== null
            },
            objectToFormData(object) {
                const formData = new FormData()
                Object.keys(object).forEach((key) => {
                    const value = object[key]
                    if (Array.isArray(value)) {
                        value.forEach((subValue, i) =>
                            formData.append(key + `[${i}]`, subValue)
                        )
                    } else {
                        formData.append(key, object[key])
                    }
                })
                return formData
            },
            generateID(len = 3) {
                return Number(
                    Math.random()
                        .toString()
                        .substring(3, 20) + Date.now()
                )
                    .toString(36)
                    .slice(0, len)
            },
            getUrlByFileType(type, url) {
                if (type.indexOf('pdf') !== -1) {
                    return './source/img/pdf.png'
                } else if (type.indexOf('video') !== -1) {
                    return './source/img/video.png'
                } else {
                    return url
                }
            },
            download(url, name) {
                const link = document.createElement('a')
                link.download = name
                link.style.display = 'none'
                link.href = url
                link.target = '_blank'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        }
    }
}
