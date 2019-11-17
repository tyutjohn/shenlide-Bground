<!--
 * @Author: johnwang
 * @since: 2019-11-03 12:51:53
 * @lastTime: 2019-11-09 10:06:13
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
# shenlide-Bground
后台管理系统（前台段）

# 本地运行启动
```
cd shenlide-Bground

npm install 

npm run serve

```

# 服务器部署

* 打包前台资源
```
npm install
npm run build
```

* 部署至nginx服务器
```
mv dist/ /var/www/html/shenlideBground/
```

* nignx配置

```
vi /etc/nginx/conf.d/shenlideBground.conf
```

* shenlideBground.conf内容
```
server{
    listen 80;
        listen [::]:80;
        root /var/www/html/shenlideBground;     //nginx服务器目录
        index index.html;
        server_name 填写域名;                   //填写你的域名，如test.com
        location / {
            error_page 404 /index.html          //vue-cli3项目40
        }
        location ^~ /api/{
            proxy_pass http://127.0.0.1:3000/api/;      //后台代理地址
        }
}
```
* nginx服务器重新启动
```
nginx -s reload
service nginx restart
```

# 项目说明
* 申立德后台管理系统
* 版权归申立德所有，非测试人员使用请遵守版权说明，禁止非申立德商用

# 测试人员
johnwang

* 联系邮箱
tyutjohnwang@163.com
            