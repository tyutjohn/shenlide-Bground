<!--
 * @Author: johnwang
 * @since: 2019-11-03 12:51:53
 * @lastTime: 2019-11-03 18:03:44
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
# shenlide-Bground
后台管理系统（前台段）

# 构建计划

# 接口需求
```
系统用户管理模块
    1、后台用户登陆接口
       字段：
          接收：
            username 姓名
            password 密码
          返回：
            token    用户登陆的token
    2、后台用户注册接口
       字段：
          接收：
            token
            username 姓名
            email    邮箱
            password 密码
            password2 确认密码
            phone    联系方式
            avatar   头像
            department 部门
            grade    等级(超级管理员，普通管理员，编辑等等)
    3、后台用户修改个人信息接口
        字段：
          接收:
            token
            userId   用户id（*关键索引)
            username 姓名
            email    邮箱
            phone    联系方式
            avatar   头像
            department 部门
            grade    等级(超级管理员，普通管理员，编辑等等)
    4、后台用户修改个人密码接口
        字段:
          接收:
            userId  用户id（*关键索引)
            token
            password 密码
            password2 确认密码
    5、后台用户删除接口
        字段：
          接收：
            userId  用户id（*关键索引)
    6、后台所有用户列表接口
        字段:
          接收：
            token
            返回：
            userId  用户id
            username 姓名
            email    邮箱
            phone    联系方式
            avatar   头像
            department 部门
            grade    等级(超级管理员，普通管理员，编辑等等)
    7、后台用户个人信息查询接口
        字段:
          接收：
            userId（*关键索引)
            token
          返回：
            username 姓名
            email    邮箱
            password 密码
            phone    联系方式
            avatar   头像
            department 部门
            grade    等级(超级管理员，普通管理员，编辑等等)
    8、token验证接口
        字段:
          接收：
            token
          返回:
            userId
            username 用户个人信息
            avatar   用户个人头像
    9、退出登陆接口
        字段：
          接收:
            userId
    10、增加部门接口
        字段:
          接收:
            department 部门
    11、获取部门信息接口
        字段:
          接收:
            token
          返回:
            departmentId    部门id
            department      部门
    12、删除部门接口
        字段:
          接收:
            departmentId    部门id
            token

功能模块(一)    电话功能
    1、全部电话号码请求接口
        字段：
          接收：
            pageSize    每页的条数
            page   选择页数
            token
          返回:
            phone   客户电话
            clientName  客户称呼
            clientId    客户id
            clientQuestion  客户疑惑
            solveResult 处理结果
            solveAdminId    处理人员id
            username  处理人员名字(和admin聚合，solveAdminId==userId，返回username)
            status  状态(是否已经联系:1、已处理 2、未处理)
    2、客户个人信息请求接口
        字段:
          接收：
            token
            clientId 客户id
          返回:
            phone   客户电话
            clientName  客户称呼
            clientQuestion  客户疑惑
            solveResult 处理结果
            solveAdminId    处理人员id
            username  处理人员名字(和admin聚合，solveAdminId==userId，返回username)
            status  状态(是否已经联系:1、已处理 2、未处理)
    3、全部已处理客户信息请求接口
        字段:
          接收:
            token
            pageSize    每页的条数
            page   选择页数
          返回：
            phone   客户电话
            clientName  客户称呼
            clientId    客户id
            clientQuestion  客户疑惑
            solveResult 处理结果
            solveAdminId    处理人员id
            username  处理人员名字(和admin聚合，solveAdminId==userId，返回username)
    4、全部未处理客户信息请求接口
        字段：
          接收：
            token
            pageSize    每页的条数
            page   选择页数
          返回:
            phone   客户电话
            clientName  客户称呼
            clientId    客户id
            clientQuestion  客户疑惑
    5、管理员处理客户信息请求接口(更改status状态)
        字段:
          接收：
            token
            clientId    客户id
            solveAdminId    处理人员id
            solveResult 处理结果
            
功能模块(二)    新闻资讯功能
    1、发布文章接口
        字段:
          接收:
            article_title 文章标题
            article_class  文章类别
            article_name  文章作者
            article_content  文章内容
    2、修改文章接口
        字段:
          接收:
            article_title 文章标题
            article_class  文章类别
            article_name  文章作者
            article_content  文章内容
    3、全部文章列表接口
        字段:
          接收:
            pageSize    每页的条数
            page   选择页数
          返回:
            article_id  文章id
            article_time  文章发布时间
            article_title 文章标题
            article_class  文章类别
            article_name  文章作者
            article_content 文章内容
    4、文章详情接口
        字段:
          接收:
            article_id  文章id
          返回:
            article_time  文章发布时间
            article_title 文章标题
            article_class  文章类别
            article_name  文章作者
            article_content  文章内容
    5、分类文章列表查询接口
        字段:
          接收:
            article_class 文章类别
            pageSize    每页的条数
            page   选择页数
          返回:
            article_id  文章id
            article_time  文章发布时间
            article_title 文章标题
            article_class  文章类别
            article_name  文章作者
            article_content 文章内容
      6、删除文章接口
        字段：
          接收:
            article_id  文章id

功能模块(三)    前台功能
    1、客户信息登记
        字段:
          接收:
            phone   客户电话
            clientName  客户称呼
            clientQuestion  客户疑惑
```
            