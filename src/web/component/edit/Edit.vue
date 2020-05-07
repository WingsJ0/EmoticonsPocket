/**
 * @name 编辑
 */

<template>
    <div class='edit' :class='{visible}'>
        <div class='title'>{{type==='add' ? '添加' : '编辑'}}表情</div>
        <label>表情：</label>
        <input class='content' :class='{warning:contentEmptyWarning}' type='text' v-model='content'/>
        <label>名称:</label>
        <input class='name' type='text' v-model='name'/>
        <label>标签（英文逗号分隔）:</label>
        <textarea class='tag' v-model='tag'/>
        <div class='flexDummy'></div>
        <div class='control'>
            <i class='iconfont icon-queding clickable' @click='handle_confirm_click'></i>
            <i class='iconfont icon-quxiao clickable' @click='handle_cancel_click'></i>
        </div>
    </div>
</template>

<script>
/*成员*/

    import Data from '@/core/Data.js';
    import Broadcast from '@/core/Broadcast.js';

/*接口*/

    const component=
    {
        name:'Edit',
        data()
        {
            return {
                visible:false,
                type:'add',     //type可选值：'add'或'modify',
                contentEmptyWarning:false,
                content:'',
                name:'',
                tag:'',
                target:null
            };
        },
        methods:
        {
            /**
             * @name 处理确定按钮点击
             */
            handle_confirm_click()
            {
                if((this.type==='add' && this.add())||(this.type==='modify' && this.modify()))
                {
                    this.hide();
                    this.reset();
                }
                else
                    this.warnContentEmpty();
            },
            /**
             * @name 处理取消按钮点击
             */
            handle_cancel_click()
            {
                this.hide();
                this.reset();
            },
            /**
             * @name 显示
             */
            show()
            {
                this.visible=true;
            },
            /**
             * @name 隐藏
             */
            hide()
            {
                this.visible=false;
            },
            /**
             * @name 重置
             */
            reset()
            {
                this.content='';
                this.name='';
                this.tag='';
                this.contentEmptyWarning=false;
                this.target=null;
                this.type='add';
            },
            /**
             * @name 添加
             * @return {Boolean} 是否成功
             */
            add()
            {
                let content=this.content.trim();
                if(content)
                {
                    let emoticon=
                    {
                        content:this.content,
                        name:this.name,
                        tag:this.tag
                    }
                    Data.add(emoticon);

                    return true;
                }
                else
                    return false;
            },
            /**
             * @name 修改
             */
            modify()
            {
                let content=this.content.trim();
                if(content)
                {
                    Data.modify(this.target,this.content,this.name,this.tag);

                    return true;
                }
                else
                    return false;
            },
            /**
             * @name 警告内容为空
             */
            warnContentEmpty()
            {
                this.contentEmptyWarning=true;
            }    
        },
        mounted()
        {
            Broadcast.on(Broadcast.events.Edit,({type,emoticon})=>       
            {
                this.type=type;

                if(type==='modify')
                {
                    this.target=emoticon;
                    this.content=emoticon.content;
                    this.name=emoticon.name;
                    this.tag=emoticon.tag;
                }

                this.show();
            });
        }
    };

/*构造*/

    export default component;
</script>

<style lang='less' scoped>
    .edit
    {
        display:flex;
        flex-direction:column;
        position:absolute;
        left:0;
        top:-100%;
        box-sizing:border-box;
        width:100%;
        height:100%;
        padding:8px;
        background:white;
        transition:top 0.5s;

        &.visible
        {
            top:0;
        }

        >*
        {
            display:block;
        }
        >label
        {
            font-size:1.2em;
        }
        >input,>textarea
        {
            outline:none;
            width:calc( 100% - 8px );
            margin-top:10px;
            margin-bottom:20px;
            font-family:'Microsoft JhengHei','Microsoft YaHei',sans-serif;
            font-size:16px;
            color:#333;
        }

        >.title
        {
            border-bottom:1px solid lightgrey;
            margin-bottom:1em;
        }
        >.content
        {
            font-size:2.5em;

            &.warning
            {
                outline:red solid 1px;
            }
        }
        >.tag
        {
            resize:none;
            height:4em;
        }
        >.control
        {
            display:flex;
            justify-content:space-between;

            >.iconfont
            {
                font-size:1.5em;
            }
        }
    }
</style>
