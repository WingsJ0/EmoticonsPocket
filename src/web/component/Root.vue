/**
 * @name 根
 */

<template>
    <div class='root'>
        <Browser/>
        <hr class='separator'/>
        <Preview/>
        <hr class='separator'/>
        <Control/>
        <Edit/>
    </div>        
</template>

<script>
/*成员*/

    import Browser from '@/component/browser/Browser.vue';
    import Preview from '@/component/preview/Preview.vue';
    import Control from '@/component/control/Control.vue';
    import Edit from '@/component/edit/Edit.vue';

/*接口*/

    const component=
    {
        name:'Root',
        components:
        {
            Browser,
            Preview,
            Control,
            Edit
        }
    };

/*构造*/

    export default component;
</script>

<style lang='less'>    
    .root
    {
        overflow:hidden;
        position:relative;
        width:270px;
        user-select:none;
        // border:1px solid grey;

        >.separator
        {
            margin:0;
            height:1px;
        }
    }

    .flexDummy
    {
        flex:1;
    }

    .clickable
    {
        cursor:pointer;
    }
</style>
