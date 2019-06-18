/**
 * @name Index脚本
 */

/*成员*/

import Vue from 'vue';
import Root from '@/component/Root.vue';

/*构造*/

import '@/Index.css';
import '@/stylesheet/Iconfont.css';

new Vue(
{
    el:'#root',
    render:h=>h(Root)
});