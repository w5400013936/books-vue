<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container-fluid container">
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
                        <li class="active"><a href="#">Home <span class="sr-only">(current)</span></a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#">登录</a></li>
                        <li><a href="javascript:;" @click="goAdmin">管理员后台</a></li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        
        <div class="container">
            <div class="input-group searchbar">
                <input type="text" v-model="searchName" class="form-control searchbar-input" placeholder="搜索"  aria-describedby="searchBook">
                <span class="input-group-addon glyphicon glyphicon-search"  id="searchBook" @click="searchBook"></span>
            </div>
            <div>{{number}}</div>
            <div>
                <button @click='$store.commit("minus")'>-</button>
                <button @click='$store.commit("plus")'>+</button>
            </div>
            <div v-for="(item,index) in bookList" :key="index" class="book-box">
                <img :src="item.img" alt="#">
                <p>{{item.title}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            bookList:'',
            searchName:'',
            activeIndex: '1',
        }
    },
    methods:{
        searchBook(){
            var self = this;
            self.axios.get('/api/books/title?title='+self.searchName)
                .then(res=>{
                    self.bookList = res.data.data;
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        goAdmin(){
            this.$router.push({name:'books'});
        }
    },
    created(){  
        this.axios.get('/api/books')
            .then(res=>{
                this.bookList = res.data.data.bookList;
            })
            .catch(err=>{
                console.log(err);
            })
    },
    computed:{
        ...mapState({
            number:state=>state.number
        })
    }
}
</script>
<style>
body {
  padding: 0;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

a {
  color: #00B7FF;
}
.searchbar{
  width: 300px;
}

.book-box{
  display: inline-block;
  margin: 20px 30px 0 0;
  border: 1px solid #ddd;
  padding: 5px;
  width: 300px;
  height: 240px;
  box-sizing: border-box;
  text-align: center;
}
.book-box img{
  width: 200px;
  height: 200px;;
}
.book-box p{
  width: 100%;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
