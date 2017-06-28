# coding:utf-8
import requests
from bs4 import BeautifulSoup
import urllib
import os


#quesNumStr = str(input("请输入问题数字："))

url = 'https://www.zhihu.com/question/40273344'

headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36 Core/1.47.933.400 QQBrowser/9.4.8699.400',
}

response = requests.get(url, headers=headers)
#print(response.text)
soup = BeautifulSoup(response.text, 'html.parser')
title = soup.title.get_text()
imgs = soup.find_all('img')
count = 0
imgPath=r'C:\imgs'
if not os.path.isdir(imgPath):
    os.mkdir(imgPath)
for img in imgs:
    try:
        res=urllib.request.urlopen(img['src'])

        if str(res.status)!='200':
            print('未下载成功：',img['src'])
            continue
    except Exception as e:
        print('未下载成功：',img['src'])
        continue
    filename=os.path.join(imgPath,str(count)+'.jpg')
    with open(filename,'wb') as f:
        f.write(res.read())
        print('下载完成\n')
        count+=1
print('done')

