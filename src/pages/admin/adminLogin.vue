<template>
    <div class="main">
        <div class="container">
            <!-- <h2 class="title">管理员登录</h2> -->
            <div class="signIn-box">
                <el-input class="mb10" type="text" v-model="userName" name="" placeholder="请输入账号" />
                <el-input class="mb20" type="password" v-model="password" name="" placeholder="请输入密码" />
                <el-button class="mb10 block w100" type="primary" round  @click="adminLogin">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userName:'admin',
            password:'admin'
        }
    },
    methods:{
        adminLogin(){
            var self = this;
            let param = new URLSearchParams();
            param.append("userName", this.userName);
            param.append("password", this.password);
            self.axios.post('/api/admin/login',param)
                .then(res=>{
                    console.log(res);
                    if(res.data.status == 'y'){
                        self.$message({
                            message: res.data.msg,
                            type:'success'
                        })
                        this.$router.push({name:'books'});
                    }else{
                        self.$message({
                            message: res.data.msg,
                            type:'error'
                        })
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    }
}
</script>
<style>
.main{
    height: 100%;
    background: linear-gradient(rgb(40, 130, 214),rgb(93, 150, 224));
}
.title{
    color: #fff;
    text-align: center;
    margin-top: 250px;
}
.w100{
    width: 100%;
}
.mb10{
    margin-bottom: 10px;
}
.mb20{
    margin-bottom: 20px;
}
.block{
    display: block;
}

.signIn-box{
    width: 300px;
    margin: 300px auto 0;
}
</style>
