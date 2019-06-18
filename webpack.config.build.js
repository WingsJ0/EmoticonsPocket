const HtmlWebpackPlugin=require('html-webpack-plugin');
const VueLoaderPlugin=require('vue-loader/lib/plugin');

module.exports=
{
    mode:'production',
    target:'electron-renderer',
    entry:__dirname+'/src/web/Index.js',
    output:
    {
        path:__dirname+'/dist/',
        filename:'Index.js'
    },
    module:
    {
        rules:
        [
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.css|less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            }           
        ]
    },
    plugins:
    [
        new HtmlWebpackPlugin(
        {
            template:__dirname+'/src/web/index.html'
        }),
        new VueLoaderPlugin()
    ],
    resolve:
    {
        alias:
        {
            '@':__dirname+'/src/web'
        }
    }
};