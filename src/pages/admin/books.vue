<template>
    <div>
        <div class="top-line">
            <div class="dib">
                <div class="input-group searchbar">
                    <input type="text" v-model="searchName" class="form-control searchbar-input" placeholder="搜索"  aria-describedby="searchBook">
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-default" id="searchBook" @click="searchBook">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                </div>
            </div>
            <el-button
            type="primary"
            size="small"
            @click="addBook()">添加</el-button>
            <el-button
            size="small"
            @click="backHome()">返回主页</el-button>
        </div>
        <el-table
            :data="bookList"
            border
            style="width: 100%">
            <el-table-column
                prop="title"
                label="书名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="img"
                label="图片"
                width="100">
                <template slot-scope="scope">
                    <img  :src="scope.row.img" alt="#" style="width: 80px;height: 80px">
                </template>
            </el-table-column>
            <el-table-column
                prop="author"
                label="作者"
                width="180">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格"
                width="180">
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型"
                width="180">
            </el-table-column>
            <el-table-column
                prop="publisher"
                label="出版社"
                width="180">
            </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="bookEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="bookDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-count="pageCount">
        </el-pagination>
    </div>
</template>
<script>
export default {
  data() {
    return {
        searchName:'',
        bookList:[],
        currentPage: 1,
        pageCount: 100
    }
  },
  created() {
      this.getBookData(this.currentPage);
  },
  methods:{
        getBookData(page){
            this.axios.get('/api/books?page='+page)
                .then(res=>{
                    this.bookList = res.data.data.bookList;
                    this.pageCount = res.data.data.pageCount;
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        bookEdit(index,row){
            this.$router.push({name:'booksDetail',query:{bookData:row}});
        },
        bookDelete(index,row){
            var self = this;
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    self.bookList.splice(index,1);
                    var param = new URLSearchParams();
                    param.append('id', row._id);
                    self.axios.post('/api/books/del',param)
                        .then(res=>{
                            console.log(res);
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })
                        .catch(err=>{
                            console.log(err);
                            self.$message({
                                type: 'success',
                                message: '删除失败!'
                            });
                        })
                })
        },
        addBook(){
            this.$router.push({name:'booksDetail'});
        },
        backHome(){
            this.$router.push({name:'home'});
        },
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
        handleCurrentChange(curPage){
            this.getBookData(curPage);
        }
  }
};
</script>
<style>
    .top-line{
        margin-bottom: 10px;
    }
    .dib{
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
    }
    .searchbar{
        width: 300px;
    }
    .pagination{
        margin-top: 20px;
    }
</style>
