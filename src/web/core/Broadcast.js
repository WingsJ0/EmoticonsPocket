/**
 * @name 广播
 */

/*成员*/

import Vue from 'vue';

const bus=new Vue();

/*接口*/

const events=
{
    ItemClick:'Event_ItemClick',
    Edit:'Event_Edit'
};

/**
 * @name 监听
 * @param {String} event 事件名
 * @param {Function} callback 回调函数
 */
const on=function(event,callback)
{
    bus.$on(event,callback);
};
/**
 * @name 触发
 * @param {String} event 事件名
 * @param {Any} data 数据
 */
const emit=function(event,data)
{
    bus.$emit(event,data);
};

/*构造*/

export default {on,emit,events};