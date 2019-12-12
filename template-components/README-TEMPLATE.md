<!--
 * @Author: your name
 * @Date: 2019-12-12 16:18:31
 * @LastEditTime: 2019-12-12 16:35:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shenlide-Bground\template-components\README-TEMPLATE.md
 -->
# 模板配置
## Apache配置
* httpd.conf(将以下代码复制到文件最下面)
```
#检查下列模板是否开启
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_ajp_module modules/mod_proxy_ajp.so
LoadModule proxy_http_module modules/mod_proxy_http.so
#若上列模板前面有#去掉#注释
# 代理设置
Proxyrequests off
<Proxy *>
	Order deny,allow
	Allow from all
</Proxy>
	ProxyPass /api/ http://123.206.65.183:9027/api/
```

## nginx配置
template.conf
```
server{
    listen 80;
        listen [::]:80;
        root /var/www/html/shenlideTemplate;     //nginx服务器目录
        index index.html;
        server_name 填写域名;                   //填写你的域名，如test.com
        location / {
        }
        location ^~ /api/{
            proxy_pass http://127.0.0.1:9027/api/;      //后台代理地址
        }
}
```