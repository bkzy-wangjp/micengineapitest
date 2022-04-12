# 计算服务API测试用例

- 安装nodejs

API测试环境是HTML和JavaScript代码，要正常运行这些代码需要需要Node.js环境。安装Node环境请参阅[搭建Node环境](https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-1-0-0) .

- 安装nodejs本地静态服务器

```shell
npm install -g live-server
```

- 克隆项目

```shell
git clone https://github.com/bkzy-wangjp/micengineapitest.git
```

- 编辑配置文件

配置文件为: `static/config.json`

配置文件内容：

```json
{
    "BaseUrl":"http://127.0.0.1:8080/",
    "UserName":"abcde",
    "Password":"123456",
    "Apis":[
        {
            "Name":"接口的文字描述"
            ,"Method":"GET"
            ,"Url":"api/test"
            ,"Parameters":{
                "version":"v2"
            }
            ,"Result":{}
        }
    ]
}
```

其中：

|参数|类型|说明|
|---|----|----|
|BaseUrl|string|计算服务访问地址|
|UserName|string|用户名|
|Password|string|密码|
|Apis|object数组|待测试的接口信息,不限个数|
|Apis[x].Name|string|接口的描述信息|
|Apis[x].Method|string|接口的读取方法,`GET`、`POST`等|
|Apis[x].Url|string|接口的短URL|
|Apis[x].Parameters|object|接口的参数键值对,不限个数|
|Apis[x].Result|object|接口的返回值存储预留区,留空|

- 运行项目

方法1：

```shell
# 导航到项目所在文件夹
cd micengineapitest
# 启动本地静态服务器
live-server
```

方法2：
在Visual Studio Code中启动在线服务
![在Visual Studio Code中启动在线服务](tree/main/static/img/golive.png)

运行后的API接口测试页面如下图：
![运行后的API接口测试页面](tree/main/static/img/runtemp.png)
