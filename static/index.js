const vm = Vue.createApp({
    data(){
        getBaseConfig();
        return{
            BaseUrl:'http://127.0.0.1:8080/',
            UserName:'',
            Password:'',
            Token:'',
            ErrMsg:'',
            LoginOk:false,
            Apis:[],
        };
    },
    methods:{
        formatParam(msg){
            return formatJson(msg);
        }
    },
    watch:{
        BaseUrl(){
            this.$nextTick(
                login()
            )
        },
        UserName(){
            this.$nextTick(
                login()
            )
        },
        Password(){
            this.$nextTick(
                login()
            )
        },
        LoginOk(){
            if(this.LoginOk){
                ApiTest();
            }
        }
    }
}).mount('#app');

//获取基础配置信息
function getBaseConfig(){
    axios({
        method:'GET',
        url:'static/config.json',
    }).then(function(response){
        const msg = response.data;
        //console.log(msg);
        vm.BaseUrl = msg.BaseUrl;
        vm.UserName = msg.UserName;
        vm.Password = msg.Password;
        vm.Apis = msg.Apis;
    });
}

//登录
function login() {
    axios({
        method:'POST',
        baseURL:vm.BaseUrl,
        url:'login',
        params:{
            Name:vm.UserName,//用户名
            Password:MD5(vm.Password),//密码,要先进行MD5摘要
            //type:"jwt",
            nocookie:true,
            
        }
    }).then(function(response){
        const msg = response.data;
        //console.log(msg);
        if (msg.status ==='ok'){
            vm.Token = msg.data.jwt;
            vm.LoginOk = true;
        }else{
            vm.ErrMsg = msg.message;
            vm.LoginOk = false;
        }
    });
}

//循环调用待测API接口
function ApiTest(){
    for (let i = 0; i <vm.Apis.length; i++) {
        apiRequest(i);
    }
}

//调用API请求接口
function apiRequest(i){
    let api = vm.Apis[i];
    axios({
        method:api.Method,
        baseURL:vm.BaseUrl,
        url:api.Url,
        params:api.Parameters,
        headers:{//token也可以放到header中
            Authorization: 'Bearer '+ vm.Token,
        }
    }).then(function(response){
        const msg = response.data;
        //console.log(msg);
        vm.Apis[i].Result = msg;
    });
}
