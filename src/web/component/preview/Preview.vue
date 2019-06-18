/**
 * @name 预览
 */

<template>
    <div class='preview' :style='{height}'>
        <div class='content' v-show='element' :title='element && element.tag'>{{element && element.content}}</div>
        <div class='control' v-show='element'>
            <i class='copy iconfont icon-copy clickable' @click='handle_copy_click' title='复制'></i>
            <i class='iconfont icon-collection-b clickable' :style='{color:inFavorite ? "#FFCA00" : "#333"}' @click='handle_favorite_click' :title='inFavorite ? "删除收藏" : "添加收藏"'></i>
            <i class='edit iconfont icon-bianji1 clickable' @click='handle_edit_click' title='编辑'></i>
            <i class='remove iconfont icon-shanchu clickable' @click='handle_remove_click' title='删除'></i>
        </div>
        <div class='name'>{{element && element.name}}</div>
    </div>
</template>

<script>
/*成员*/

    import {clipboard} from 'electron'; 
    import Constant from '@/core/Constant.js';
    import Broadcast from '@/core/Broadcast.js';
    import Data from '@/core/Data.js';

/*接口*/

    const component=
    {
        name:'Preview',
        data()
        {
            return{
                height:Constant.Height_Preview+'px',
                element:null,
                inFavorite:false
            };
        },
        watch:
        {
            element()
            {
                if(this.element===null)
                    this.inFavorite=false;
                else
                    this.inFavorite=Data.favorite.some(el=>el.content===this.element.content);      //content作为主键
            }
        },
        methods:
        {
            /**
             * @name 处理复制按钮点击
             * @param {Object} 
             */
            handle_copy_click(ev)
            {
                clipboard.writeText(this.element.content);

                let target=ev.target;
                target.classList.add('clicking');
                setTimeout(()=>{target.classList.remove('clicking');},700);
            },
            /**
             * @name 处理收藏按钮点击
             */
            handle_favorite_click()
            {
                if(this.inFavorite)
                    Data.removeFromFavorite(this.element);
                else
                    Data.addToFavorite(this.element);

                this.inFavorite=!this.inFavorite;
            },
            /**
             * @name 处理编辑按钮点击 
             */
            handle_edit_click()
            {
                Broadcast.emit(Broadcast.events.Edit,{type:'modify',emoticon:this.element});
            },
            /**
             * @name 处理删除按钮点击 
             */
            handle_remove_click()
            {
                Data.remove(this.element);
                this.element=null;
            },
            /**
             * @name 显示
             * @param {Object} 表情对象
             */
            show(data)
            {
                this.element=data;
            }
        },
        mounted()
        {
            Broadcast.on(Broadcast.events.ItemClick,(data)=>
            {
                this.show(data);
            });
        }
    }

/*构造*/

    export default component;
</script>

<style lang='less' scoped>
    .preview
    {
        display:grid;
        grid-template-rows:3fr 1.5fr;
        grid-template-columns:3fr 1fr;
        grid-template-areas:
        "box1 box2"
        "box3 box2";

        >.content
        {
            grid-area:box1;
            overflow:hidden;
            display:flex;
            justify-content:center;
            align-items:center;
            font-size:30px;
            white-space:nowrap;
            word-break:keep-all;
        }
        >.control
        {
            grid-area:box2;
            display:flex;
            flex-wrap:wrap;
            justify-content:space-around;
            align-items:center;
            padding:0 6px;
            border-left:1px solid lightgrey;
            
            >i
            {
                font-size:1.4em;
            }

            >.copy
            {
                display:inline-block;
                position:relative;

                &::after
                {
                    content:'';
                    position:absolute;
                    left:50%;
                    top:50%;
                    width:2px;
                    height:2px;
                    border:2px solid darkgreen;
                    border-radius:50%;
                    opacity:0;
                }
                &.clicking
                {
                    pointer-events:none;

                    &::after
                    {
                        animation:spread 0.7s;

                        @keyframes spread
                        {
                            from{transform:scale(1);opacity:1;}
                            to{transform:scale(10);opacity:0;}
                        }
                    }
                }
            }
        }
        >.name
        {
            grid-area:box3;
            display:flex;
            align-items:center;
            padding:0 6px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
    }
</style>