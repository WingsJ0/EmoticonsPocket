/**
 * @name 浏览器
 */

<template>
    <div class='browser' :style='{height}'>
        <div class='control'>
            <span class='tab clickable' :class='{selected:currentTab==="directory"}' data-type='directory' @click.exact='handle_tabs_click'>全部</span>
            <span class='tab clickable' :class='{selected:currentTab==="favorite"}' data-type='favorite' @click.exact='handle_tabs_click'>收藏</span>
            <div class='slideLine' :style='{transform:`translateX(${currentTab==="directory" ? "5px" : "calc( 7px + 3em )"})`}'></div>
        </div>
        <div class='search' :style='{height:height_search}'>
            <i class='iconfont icon-xiazai17 clickable' @click='handle_search_trigger' title='搜索'></i>
            <input class='input' type='text' v-model='searchText' @keyup.enter='handle_search_trigger'/>
            <i class='iconfont icon-x clickable' v-show='searchKeyword!==null' @click='handle_search_clear' title='清除'></i>
        </div>
        <div class='container'>
            <div class='page' v-show='currentTab==="directory"'>
                <Item v-for='(el,index) of directory' :key='el.name+index' :element='el'/>
            </div>
            <div class='page' v-show='currentTab==="favorite"'>
                <Item v-for='(el,index) of favorite' :key='el.name+index' :element='el'/>
            </div>
        </div>
    </div>
</template>

<script>
/*成员*/

    import BalancedBinaryTree from '@/lib/BalancedBinaryTree.js';
    import Constant from '@/core/Constant.js';
    import Data from '@/core/Data.js';
    import Item from '@/component/browser/part/Item.vue';

/*接口*/

    const component=
    {
        name:'Browser',
        components:
        {
            Item
        },
        data()
        {
            return{
                directory:[],
                favorite:[],
                directoryTree:null,
                favoriteTree:null,
                height:Constant.Height_Browser+'px',
                height_search:Constant.Height_Browser_Search+'px',
                currentTab:'directory',
                searchText:'',      //不生效搜索输入
                searchKeyword:null      //生效的搜索输入
            };
        },
        methods:
        {
            /**
             * @name 处理tab点击
             * @param {Object} ev 事件对象
             */
            handle_tabs_click(ev)
            {
                this.currentTab=ev.target.getAttribute('data-type');
            },
            /**
             * @name 处理搜索触发
             */
            handle_search_trigger()
            {
                this.searchKeyword=this.searchText.trim() || null;

                if(this.searchKeyword!==null)
                {
                    this.directory=this.search(this.directoryTree,this.searchKeyword);
                    this.favorite=this.search(this.favoriteTree,this.searchKeyword);
                }
            },
            /**
             * @name 处理搜索清除
             */
            handle_search_clear()
            {
                this.searchKeyword=null;
                this.searchText='';

                this.directory=Data.directory;
                this.favorite=Data.favorite;
            },
            /**
             * @name 更新目录和收藏
             * @param {Array} directory 目录
             * @param {Array} favorite 收藏
             */
            initiateDirectoryAndFavorite(directory=[],favorite=[])
            {
                this.directory=directory;
                this.favorite=favorite;
                this.directoryTree=this.generateTree(directory);
                this.favoriteTree=this.generateTree(favorite);
            },
            /**
             * @name 生成树
             * @param {Array} List 列表。directory或favorite 
             */
            generateTree(list)
            {
                let tree=new BalancedBinaryTree();
                const KeyRegexp=/[^,\s]{1}/g;

                for(let i=0;i<list.length;i++)
                {
                    let chars=list[i].tag.match(KeyRegexp) || [];
                    chars.push(...list[i].name.split(''));
                    for(let j=0;j<chars.length;j++)
                        tree.insert(chars[j].charCodeAt(0),list[i]);
                }

                return tree;
            },
            /**
             * @name 搜索
             * @param {Object} tree 树
             * @param {String} keyword 关键词
             */
            search(tree,keyword)
            {
                let resultElement=[];
                for(let i=0;i<keyword.length;i++)
                {
                    let charCode=keyword[i].charCodeAt(0);
                    let node=tree.search(charCode);
                    node && resultElement.push(...node.value);
                }
                resultElement=[...new Set(resultElement)];
                
                return resultElement;
            }
        },
        created()
        {
            Data.ready.then(()=>
            {
                this.initiateDirectoryAndFavorite(Data.directory,Data.favorite);
            });
        }
    }

/*构造*/

    export default component;
</script>

<style lang='less' scoped>
    .browser
    {
        display:flex;
        flex-direction:column;

        >.control
        {
            position:relative;
            padding:4px 5px 0 5px;
            font-size:14px;

            >.tab
            {
                display:inline-block;
                width:3em;

                &.selected
                {
                    color:#008CFF;
                    font-weight:bold;
                    cursor:default;
                }
            }
            >.slideLine
            {
                position:absolute;
                top:1.7em;
                left:0;
                width:2.1em;
                border-bottom:2px solid #008CFF;
                transition:transform 0.5s;
            }
        }
        >.search
        {
            display:flex;
            align-items:center;
            padding:4px 6px;
            margin:8px 0 0 0;
            border-top:1px solid lightgrey;
            border-bottom:1px solid lightgrey;

            >i
            {
                color:grey;
            }
            >.input
            {
                flex-grow:1;
                margin:0 6px;
                border:none;
                outline:none;
            }
        }
        >.container
        {
            flex-basis:0;
            flex-grow:1;
            overflow-x:hidden;
            overflow-y:auto;
            position:relative;

            &::-webkit-scrollbar
            {
                width:8px;
            }
            &::-webkit-scrollbar-thumb
            {
                background-color:lightgrey;
            }

            >.page
            {
                display:flex;
                justify-content:space-around;
                flex-wrap:wrap;
                position:absolute;
                left:0;
                top:0;
                box-sizing:border-box;
                width:100%;
                padding:8px;
            }
        }
    }
</style>


