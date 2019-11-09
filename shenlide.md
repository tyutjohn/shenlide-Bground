<!--
 * @Author: WangHao
 * @Date: 2019-11-05 16:00:39
 * @LastEditors: WangHao
 * @LastEditTime: 2019-11-06 17:39:57
 * @Description: None
 -->
# API Doc

> 登陆采用 `Token` 放在请求头中，类型为 `Bearer`。  
> 目前 `Token` 过期时间为 12 小时，中途不能失效。

> `PUT` 方法采用 `POST` 方式传参。

## 一、管理员

资源 | URL | 方法 | 描述 | 可选参数 | 返回值
---|---|---|---|---|---  
管理员 | /api/admin/login | POST | 登陆 | @usernanme<br>@password | `{admin_dict, token}`
 . | /api/admin/logout | POST | 退出 | - | `true`
 . | /api/admin/\<username\> | GET | 获取指定管理员信息 | - | `{admin_dict}`
 . | /api/admin/\<username\> | PUT | 修改指定管理员信息 | @password<br>@nickname | `{admin_dict}`
  . | /api/admin/\<username\> | DELETE | 删除管理员 | - | `bool`
 . | /api/admin | GET | 获取用户列表 | - | `[{admin_dict}]`
 . | /api/admin | POST | 添加用户 | @username<br>@password | `{admin_dict}`

## 二、客户

资源 | URL | 方法 | 描述 | 可选参数 | 返回值
---|---|---|---|---|---  
客户 | /api/customer | GET | 获取客户信息列表 | @page<br>@size | `{'count': 数量, 'customers': [{customer_dict}]}`
 . | /api/customer | POST | 添加客户信息 | @intention<br>@tel<br>_PS:必填_ | `{customer_dict}`
 . | /api/customer/\<id\> | GET | 获取指定客户信息 | - | `{customer_dict}`
 . | /api/customer/\<id\> | PUT | 修改客户信息 | @tel<br>@name<br>@intendent<br>@remark<br>@status | `{customer_dict}`
 . | /api/customer/\<id\> | DELETE | 删除客户信息 | - | `true`

## 三、文章

资源 | URL | 方法 | 描述 | 可选参数 | 返回值
---|---|---|---|---|---  
文章 | /api/news | GET | 获取文章列表 | @page<br>@size | `{'count': 数量, 'news':[{news_dict}]}`<br>PS：没有文章内容字段
 . | /api/news | POST | 发布文章 | @title<br>@author<br>@content<br>@category<br>_PS:必填_ | `{news_dict}`
 . | /api/news/\<id\> | GET | 获取指定文章信息 | - | `{news_dict}`
 . | /api/news/\<id\> | PUT | 修改文章 | @title<br>@author<br>@content<br>@category | `{news_dict}`
 . | /api/news/\<id\> | DELETE | 删除文章 | - | `true`


## 四、字段内容

### 1. admin_dict
```
{
    'username': 用户名、登陆名,
    'nickname': 昵称,
    'create_time': 创建时间
}
```

### 2. customer_dict
```
{
    'id': 客户信息ID,
    'name': 名字,
    'tel': 电话,
    'intention': 意向,
    'remark': 备注,
    'status': 状态,
    'create_time': 提交时间,
}
```

### 3. news_dict
```
{
    'id': 文章ID,
    'title': 文章标题,
    'author': 作者,
    'category': 类别,
    'content': 内容（获取文章列表时没有该字段）,
    'create_time': 发布时间
}
```
