/**
 * @name 数据
 */

/*成员*/

import Fs from 'fs';

const Url_Directory='./dist/data/Directory.json';
const Url_Favorite='./dist/data/Favorite.json';

/**
 * @name 初始化
 */
const initiate=function()
{
    let readDirectory=new Promise((resolve,reject)=>
    {
        Fs.readFile(Url_Directory,{encoding:'utf-8'},(er,data)=>
        {
            if(er)
                reject();

            directory=JSON.parse(data).directory;

            resolve();
        });
    });
    let readFavorite=new Promise((resolve,reject)=>
    {
        Fs.readFile(Url_Favorite,{encoding:'utf-8'},(er,data)=>
        {
            if(er)
                reject();

            favorite=JSON.parse(data).favorite;

            resolve();
        });
    });

    ready=Promise.all([readDirectory,readFavorite]).catch((er)=>
    {
        console.log(er);
    });
};
/**
 * @name 保存
 * @param {String} type 类型
 *      'Directory':    全部
 *      'Favorite':     收藏
 */ 
const save=function(type=Type_All)
{
    if(type&Type_Directory)
    {
        let directoryJson=JSON.stringify({directory});
        Fs.writeFile(Url_Directory,directoryJson,{encoding:'utf-8'},(er)=>
        {
            er && console.log(er);
        });
    }
    if(type&Type_Favorite)
    {
        let favoriteJson=JSON.stringify({favorite});
        Fs.writeFile(Url_Favorite,favoriteJson,{encoding:'utf-8'},(er)=>
        {
            er && console.log(er);
        });
    }
};
/**
 * @name 寻找
 * @param {Array} list 列表。directory或favorite
 * @param {String} content 内容
 * @return {Number} 索引
 */
const find=function(list,content)
{
    for(let i=0;i<list.length;i++)
        if(list[i].content===content)
            return i;

    return null;
};

/*接口*/

const Type_Directory=0b1;
const Type_Favorite=0b10;
const Type_All=0b11;
let directory=null;
let favorite=null;
let ready=null;

/**
 * @name 添加
 * @param {Object} 颜文字
 */
const add=function(emoticon)
{
    directory.push(emoticon);

    save(Type_Directory);
};
/**
 * @name 删除
 * @param {Object} 颜文字
 */
const remove=function(emoticon)
{
    let index=find(directory,emoticon.content);
    if(index!==null)
        directory.splice(index,1);
    index=find(favorite,emoticon.content);
    if(index!==null)
        favorite.splice(index,1);

    save(Type_All);
};
/**
 * @name 修改
 * @param {Object} emoticon 颜文字
 * @param {String} content 内容
 * @param {String} name 名称
 * @param {String} tag 标签
 */
const modify=function(emoticon,content,name,tag)
{
    let indexInDirectory=find(directory,emoticon.content);
    if(indexInDirectory)
    {
        console.log(0);

        let target=directory[indexInDirectory];

        console.log(target);

        target.content=content;
        target.name=name;
        target.tag=tag;

        save(Type_Directory);
    }

    let indexInFavorite=find(favorite,emoticon.content);
    if(indexInFavorite)
    {
        let target=favorite[indexInFavorite];
        target.content=content;
        target.name=name;
        target.tag=tag;

        save(Type_Favorite);
    }
};
/**
 * @name 添加至收藏
 * @param {Object} 颜文字
 */
const addToFavorite=function(emoticon)
{
    favorite.push(emoticon);

    save(Type_Favorite);
};
/**
 * @name 从收藏删除
 * @param {Object} 颜文字
 */
const removeFromFavorite=function(emoticon)
{
    let index=find(favorite,emoticon.content);
    if(index!==null)
        favorite.splice(index,1);

    save(Type_Favorite);
};

/*构造*/

initiate();

let component={Type_Directory,Type_Favorite,Type_All,add,remove,modify,addToFavorite,removeFromFavorite};
Object.defineProperty(component,'ready',
{
    get(){return ready;},
    enumerable:false,
    configurable:false
});
Object.defineProperty(component,'directory',
{
    get(){return directory;},
    enumerable:false,
    configurable:false
});
Object.defineProperty(component,'favorite',
{
    get(){return favorite;},
    enumerable:false,
    configurable:false
});

export default component;