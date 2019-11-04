# 申立德

## 一、管理员

### 1. 后台用户登陆:

​	__URL：__/api/admin/login

​	__Method：__POST

​	__字段：__

​		接收：

​			username

​			password

​		返回：token

### 2. 后台用户注册

​	__URL：__/api/admin

​	__MEthod：__POST

​	__字段：__

​		接收：

​			username

​			password

​			grade

​		返回：

​			username

### 3. 后台用户修改

​	__URL：__/api/admin/\<string:username\>

​	__Method：__PUT

​	__字段：__

​		接收：

​			password

​		返回：

​			True

### 4. 删除用户

​	__URL：__/api/admin/\<string:username\>

​	__Method：__DELETE

​	__字段：__

​		返回：

​			True

### 5. 获取用户列表

​	__URL：__/api/admin

​	__Method：__GET

​	__字段：__

​		返回：

​			`[{username, create_time}]`

### 6. Token验证

​	__URL：__/api/token/\<string:token\>

​	__Method：__GET

​	__字段：__

​		返回：

​			True

### 7. 退出登陆

​	__URL：__/api/admin/logout

​	__Method：__POST

​	__字段：__

​		返回：

​			True

## 二、客户模块

### 1. 提交电话、意向

​	__URL：__/api/customer

​	__Method：__POST

​	__字段：__

​		接收：

​			tel	电话

​			intendent	意向

​			name	名字

​		返回：

​			`{tel, intendent, name}`

### 2. 获取客户列表

​	__URL：__/api/customer

​	__Method：__GET

​	__字段：__

​		返回：

​			`[{tel, intendent, name , remark, status, createtime}]`

### 3. 获取客户信息

​	__URL：__/api/customer/\<string:customerID\>

​	__Method：__GET

​	__字段：__

​		返回：

​			`{tel, intendent, name , remark, status, create_time}`

### 4. 修改客户信息

​	__URL：__/api/customer/\<string:customerID\>

​	__Method：__PUT

​	__字段：__

​		接收：

​			tel	电话

​			intendent	意向

​			name	名字

​			remark	备注

​			status	状态

​		返回：

​			`{tel, intendent, name , remark, status, create_time}`

### 5. 删除客户信息

​	__URL：__/api/customer/\<string:customerID\>

​	__Method：__DELETE

​	__字段：__

​		返回：

​			True

## 三、新闻资讯

### 1. 发布文章

​	__URL：__/api/news

​	__Method：__POST

​	__字段：__

​		接收:

​			title	

​			class

​			name

​			content

​		返回：

​			articleID

### 2. 获取文章列表

​	__URL：__/api/news

​	__Method：__GET

​	__字段：__

​		接收：

​			size	每页条数

​			page 页数

​			class 类别

​		返回：

​			`[{id, title, class, name, content, create_time}]`

### 3. 修改文章

​	__URL：__/api/news/\<string:id\>

​	__Method：__PUT

​	__字段：__

​		接收:

​			title	

​			class

​			name

​			content

​		返回：

​			`{id, title, class, name, content, create_time}`

### 4. 获取文章详情

​	__URL：__/api/news/\<string:id\>

​	__Method：__GET

​	__字段：

​		返回：

​			`{id, title, class, name, content, create_time}`

### 5. 删除文章

​	__URL：__/api/news/\<string​:id​\>

​	__Method：__DELETE

​	__字段：

​		返回：

​			True