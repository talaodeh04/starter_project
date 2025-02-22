const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js', // نقطة البداية لملف JS
    mode: 'development', // وضع التطوير
    devtool: 'source-map', // خرائط المصدر
    stats: 'verbose', // إظهار تفاصيل أكبر حول البناء
    module: {
        rules: [
            {
                test: /\.js$/, // التعامل مع ملفات JS
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", // تحويل JS باستخدام Babel
                }
            },
            {
                test: /\.scss$/, // التعامل مع ملفات SCSS
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
            template: "./src/client/views/index.html", // القالب الخاص بالـ HTML
            filename: "./index.html",  // الملف الناتج
        }),
        new CleanWebpackPlugin({
            dry: false, // لا نريد فقط محاكاة الحذف
            verbose: true, // عرض تفاصيل الحذف في وحدة التحكم
            cleanStaleWebpackAssets: true, // تنظيف الأصول القديمة
            protectWebpackAssets: false // حماية الأصول
        })
    ],
    devServer: {
        port: 3000, // المنفذ الذي سيعمل عليه الخادم
        allowedHosts: 'all' // السماح بجميع المضيفين
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',  // اسم الملف الناتج
    },
    
};
