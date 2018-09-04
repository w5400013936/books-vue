<template>
    <div>
        <div class="top-line">
            <div class="dib">
                <div class="input-group searchbar">
                    <input type="text" v-model="searchName" class="form-control searchbar-input" placeholder="搜索"  aria-describedby="searchBook">
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-default" id="searchBook" @click="searchBookType">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                </div>
            </div>
            <el-button
            type="primary"
            size="small"
            @click="addBookType()">添加</el-button>
            <el-button
            size="small"
            @click="backHome()">返回主页</el-button>
        </div>
        <el-table
            :data="bookTypeList"
            border
            style="width: 100%">
            <el-table-column
                prop="name"
                label="名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="code"
                label="编码"
                width="180">
            </el-table-column>
            <el-table-column
                prop="url"
                label="链接"
                width="180">
            </el-table-column>
            <el-table-column
                prop="page_count"
                label="总页数"
                width="180">
            </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="bookTypeEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="bookTypeDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            searchName:'',
            bookTypeList:[]
        }
    },
    created(){
        var self = this;
        this.axios.get('/api/bookType')
            .then(res=>{
                self.bookTypeList = res.data;
            })
            .catch(err=>{
                console.log(err);
            })
    },
    methods:{
        searchBookType(){
            var self = this;
            self.axios.get('/api/bookType/name?searchName=' + this.searchName)
                .then(res=>{
                    self.bookTypeList = res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        addBookType(){
            this.$router.push({name:'bookTypeDetail'});
        },
        backHome(){
            this.$router.push({name:'home'});
        },
        bookTypeEdit(index,row){
            this.$router.push({name:'bookTypeDetail',query:{bookTypeData:row}});
        },
        bookTypeDelete(index,row){
            var self = this;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                self.bookTypeList.splice(index,1);
                var param = new URLSearchParams();
                param.append('id',row._id);
                self.axios.post('/api/bookType/delete',param)
                    .then(res=>{
                        self.$message({
                            message:'删除成功!',
                            type:'success'
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        self.$message({
                            type: 'success',
                            message: '删除失败!'
                        });
                    })
            })
            
            
        }
    }
}
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
</style>
