<template>
    <div class="h100">
        <el-container class="h100">
            <el-header>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <!-- <a class="navbar-brand" href="#">Brand</a> -->
                        </div>

                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                                <li><a href="javascript:;">欢迎，{{userName}}</a></li>
                            </ul>
                            <ul class="nav navbar-nav navbar-right">
                                <!-- <li><a href="#">登录</a></li>
                                <li><a href="javascript:;" @click="goAdmin">管理员后台</a></li> -->
                            </ul>
                        </div><!-- /.navbar-collapse -->
                    </div><!-- /.container-fluid -->
                </nav>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu
                        :default-active="itemIndex"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                        <el-menu-item index="1" @click="goBooks">
                            <i class="el-icon-document"></i>
                            <span slot="title">书籍管理</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="goBookType">
                            <i class="el-icon-menu"></i>
                            <span slot="title">书籍类型管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import {getCookie} from '@/cookie.js'
export default {
    data(){
        return{
           itemIndex:'1' ,
           userName: '未知用户'
        }
    },
    created(){
        if(getCookie('adminUserName')){
            this.userName = getCookie('adminUserName');
        }
    },
    methods:{
        goBooks(){
            this.itemIndex = '1';
            this.$router.push({name:'books'});
        },
        goBookType(){
            this.itemIndex = '2';
            this.$router.push({name:'bookType'});
        }
    }
}
</script>
<style>
.el-header, .el-footer {
/* background-color: #B3C0D1; */
color: #333;
/* text-align: center; */
/* line-height: 60px; */
height: auto !important;
padding: 0;
}

.el-aside {
background-color: #D3DCE6;
color: #333;
line-height: 200px;
}
.el-menu{
    height: 100%;
}

.h100{
    height: 100%;
}
.navbar{
    margin-bottom: 0;
}
</style>




