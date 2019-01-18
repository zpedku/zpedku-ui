/**
 * 嵌套页面IFrame模块
 */
import {baseUrl} from "./global";

export function getIFramePath(url) {
  let iframeUrl = ''
  if (/^iframe:.*/.test(url)) {
    iframeUrl = url.replace('iframe:', '')
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url.replace('http://', '')
    if (iframeUrl.indexOf(":") != -1) {
      iframeUrl = iframeUrl.substring(iframeUrl.lastIndexOf(":") + 1)
    }
  }
  return iframeUrl;
}

/**
 * 嵌套页面路由路径
 */

export function getIFrameUrl(url) {
  let iframeUrl = '';
  if (/^iframe:.*/.test(url)) {
    iframeUrl = baseUrl + url.replace('iframe:', '')
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url
  }
  return iframeUrl;
}
