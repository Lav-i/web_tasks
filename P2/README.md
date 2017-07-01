<html lang="en"><head>
    <meta charset="UTF-8">
    <title></title>
<style id="system" type="text/css">h1,h2,h3,h4,h5,h6,p,blockquote {    margin: 0;    padding: 0;}body {    font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", Arial, sans-serif;    font-size: 13px;    line-height: 18px;    color: #737373;    margin: 10px 13px 10px 13px;}a {    color: #0069d6;}a:hover {    color: #0050a3;    text-decoration: none;}a img {    border: none;}p {    margin-bottom: 9px;}h1,h2,h3,h4,h5,h6 {    color: #404040;    line-height: 36px;}h1 {    margin-bottom: 18px;    font-size: 30px;}h2 {    font-size: 24px;}h3 {    font-size: 18px;}h4 {    font-size: 16px;}h5 {    font-size: 14px;}h6 {    font-size: 13px;}hr {    margin: 0 0 19px;    border: 0;    border-bottom: 1px solid #ccc;}blockquote {    padding: 13px 13px 21px 15px;    margin-bottom: 18px;    font-family:georgia,serif;    font-style: italic;}blockquote:before {    content:"C";    font-size:40px;    margin-left:-10px;    font-family:georgia,serif;    color:#eee;}blockquote p {    font-size: 14px;    font-weight: 300;    line-height: 18px;    margin-bottom: 0;    font-style: italic;}code, pre {    font-family: Monaco, Andale Mono, Courier New, monospace;}code {    background-color: #fee9cc;    color: rgba(0, 0, 0, 0.75);    padding: 1px 3px;    font-size: 12px;    -webkit-border-radius: 3px;    -moz-border-radius: 3px;    border-radius: 3px;}pre {    display: block;    padding: 14px;    margin: 0 0 18px;    line-height: 16px;    font-size: 11px;    border: 1px solid #d9d9d9;    white-space: pre-wrap;    word-wrap: break-word;}pre code {    background-color: #fff;    color:#737373;    font-size: 11px;    padding: 0;}@media screen and (min-width: 768px) {    body {        width: 748px;        margin:10px auto;    }}</style><style id="custom" type="text/css"></style></head>
<body marginheight="0"><h1>知乎爬虫</h1>
<p>描述：用于爬取在某一问题 ~~钓鱼贴~~ 下所有 ~~咬钩~~ 回答者的图片。

</p>
<hr>
<h2>爬虫v1.0</h2>
<p>实现于2017年6月27日

</p>
<h3>1.目前状态：</h3>
<p>目前仅能适用于静态网页的爬取

</p>
<h3>2.所用到的第三方库：</h3>
<blockquote>
<ul>
<li>urllib</li>
<li>BeautifulSoup4</li>
<li>requests</li>
</ul>
</blockquote>
<h3>3.目前需要攻克的问题：</h3>
<ul>
<li>[ ] 页面动态加载</li>
<li>[ ] ajax网页异步更新</li>
<li>[x] 静态网页下载</li>
<li>[x] 网页源码解析</li>
<li>[x] 下载保存图片
Edit By <a href="http://mahua.jser.me">MaHua</a></li>
</ul>
</body></html>