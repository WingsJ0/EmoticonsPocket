/**
 * @name Main
 */

/*成员*/

const {app}=require('electron');

/*构造*/

app.on('ready',()=>
{
    require('./component/Window.js').initiate('production');
    require('./component/Tray.js').initiate();
});
app.on('window-all-closed',()=>
{
    if(process.platform!=='darwin')
      app.quit();
});

