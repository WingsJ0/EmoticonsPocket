/**
 * @name 系统托盘
 */

/*成员*/

const {Tray,Menu}=require('electron');
const {window}=require('./Window');

let tray=null;

/**
 * @name 处理复原按钮点击
 */
const handle_minimize_click=function()
{
    if(window.isMinimized())
        window.restore();
    else
        window.minimize();
};

/*接口*/

/**
 * @name 初始化
 * @descript App ready事件后调用
 */
const initiate=function()
{
    tray=new Tray('./dist/Icon.png');
    tray.setToolTip('颜文字口袋');

    let contextMenu=Menu.buildFromTemplate([{label:'退出',role:'quit'}]);
    
    tray.setContextMenu(contextMenu);
    tray.on('click',handle_minimize_click);
};

/*构造*/

module.exports={initiate};

