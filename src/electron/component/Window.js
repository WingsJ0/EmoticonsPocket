/**
 * @name 窗口
 */

/*成员*/

const {app,BrowserWindow,Menu}=require('electron');
const Path=require('path');

let window=null;

/*接口*/

/**
 * @name 初始化
 */
const initiate=function(env='development')
{
    window=new BrowserWindow(
    {
        width:env==='development' ? 800: 272,
        height:env==='development' ? 600 : 480,
        resizable:env==='development' ? true : false,
        skipTaskbar:true,
        alwaysOnTop:true,
        icon:'./dist/Icon.png',
        webPreferences:
        {
            nodeIntegration:true
        }
    });
    if(env==='development')
    {
        window.loadURL('http://localhost:8080');
        window.webContents.openDevTools();
    }
    else
        window.loadFile(Path.resolve(__dirname,'../../../dist/index.html'));


    Menu.setApplicationMenu(null);

    window.on('closed',()=>
    {
        window=null;        
    });
};

/*构造*/

app.on('activate',()=>
{
    if (window===null)
        initiate();
});

const component={initiate};
Object.defineProperty(component,'window',
{
    get(){return window;},
    enumerable:false,
    configurable:false
});

module.exports=component;