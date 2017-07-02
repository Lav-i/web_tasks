import requests
import re
import os
import urllib
from builtins import str
from bs4 import BeautifulSoup

#添加request header
#包括：
#User-Agent
#accept
#accept-encoding
#accept-language
#referer
#authorization
headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'accept':'image/webp,image/apng,image/*,*/*;q=0.8',
    'accept-encoding':'gzip, deflate, br',
    'accept-language':'zh-CN,zh;q=0.8',
    'referer':'https://www.zhihu.com/question/40273344',
    'authorization':'oauth c3cef7c66a1843f8b3a9e6a1e3160e20'
}

offset = 0#偏移量
limit = 20#每页最大显示回答数
count = 0#图片计数器

#创建图片存储路径
imgPath = r'imgs'
if not os.path.exists(imgPath):
    os.mkdir(imgPath)

while offset < 100:#测试爬取偏移量最大为100的所有回答
    #原始问题的url
    url = 'https://www.zhihu.com/api/v4/questions/40273344/answers?sort_by=default&include=data%5B%2A%5D.is_normal%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Cmark_infos%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cupvoted_followees%3Bdata%5B%2A%5D.author.follower_count%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&limit=20&offset='+str(offset)
    
    #设置session对象保存cookies以及headers
    session = requests.session()
    session.headers = headers
    response = session.get(url)
    #print(response.text)
    
    #从返回的response中的提取信息并用第三方库BeautifulSoup进行解析
    soup = BeautifulSoup(response.text, 'html.parser')
    #将所有图片的url在列表中存储下来，这里同样运用了正则表达式
    imgs = soup.find_all('img',class_=re.compile("origin_image"))
    
    for img in imgs:
        try:
            #因为url的首尾包含两个斜杠以及单引号，所以在此处删除
            urlStr = img['src']
            urlStr = urlStr[2:-2]
            res = urllib.request.urlopen(urlStr)
        except Exception as e:
            #print('未下载成功：',urlStr,e)
            continue
        
        #图片命名为编号+jpg并保存在本地
        fileName = os.path.join(imgPath,str(count)+'.jpg')
        with open(fileName,'wb') as f:
            f.write(res.read())
            print(count,'。下载成功：',urlStr)
            f.close()
            count+=1
    #偏移量加20
    offset += 20
    
print('运行结束')