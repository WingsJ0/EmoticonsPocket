/**
 * @name 项目
 */

<template>
    <span  class='item' :title='element.name' @click='handle_click'>{{element.content}}</span>
</template>

<script>
/*成员*/

    import {clipboard} from 'electron';
    import Broadcast from '@/core/Broadcast.js';

    const component=
    {
        name:'Item',
        props:
        {
            element:
            {
                type:Object,
                required:true
            }
        },
        methods:
        {
            handle_click()
            {
                clipboard.writeText(this.element.content);
                Broadcast.emit(Broadcast.events.ItemClick,this.element);
            }
        }
    };

/*构造*/

    export default component;
</script>

<style lang='less' scoped>
    .item
    {
        display:inline-block;
        padding:4px 8px;
        border:1px solid lightgrey;
        margin:4px;
        border-radius:8px;
        cursor:pointer;

        &:hover
        {
            border:1px solid black;
        }
    }
</style>
