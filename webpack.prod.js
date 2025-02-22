const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',  // نقطة البداية لملف الـ JS
    mode: 'production',  // وضع الإنتاج
    module: {
        rules: [
            {
                test: /\.js$/,  // التأكد من أن ملفات .js يتم معالجتها باستخدام Babel
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"  // استخدام Babel لتحويل الشيفرة
                }
            },
            {
                test: /\.scss$/,  // التعامل مع ملفات SCSS
                use: [
                    'style-loader',  // إضافة CSS إلى الـ DOM عبر <style> tag
                    'css-loader',    // تحويل CSS إلى JavaScript
                    'sass-loader'    // تحويل SCSS إلى CSS
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",  // المسار إلى القالب
            filename: "./index.html",  // الملف الناتج
        }),
        new WorkboxPlugin.GenerateSW()  // إضافة Workbox لتوليد الـ Service Worker
    ],
    devServer: {
        port: 3000,  // تحديد المنفذ لخادم التطوير
        allowedHosts: 'all'  // السماح بكل المضيفين
    }
,
    output: {
        path: path.resolve(__dirname, 'dist'),  // مجلد dist
        filename: 'main.js',  // اسم الملف الناتج
    },

};
