/**
 * @name 控制
 */

<template>
    <div class='control' :style='{height}'>
        <i class='new iconfont icon-jia clickable' @click='handle_new_click'></i>
    </div>
</template>

<script>
/*成员*/

    import Broadcast from '@/core/Broadcast.js';
    import Constant from '@/core/Constant.js';

/*接口*/

    const component=
    {
        name:'Control',
        data()
        {
            return{
                height:Constant.Height_Control+'px'
            };
        },
        methods:
        {
            /**
             * @name 处理添加按钮点击
             */
            handle_new_click()
            {
                Broadcast.emit(Broadcast.events.Edit,{type:'add'});
            }
        }
    }

/*构造*/

    export default component;
</script>

<style lang='less' scoped>
    .control
    {
        padding:0 6px;
    }
</style>