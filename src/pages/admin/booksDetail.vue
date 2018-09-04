<template>
    <div class="container">
        <el-form :model="book" :rules="rules" ref="bookData" label-width="100px" class="bookForm" :label-position="labelPosition">
            <el-form-item label="书名" prop="title">
                <el-input v-model="book.title"></el-input>
            </el-form-item>
            <el-form-item label="图片地址" prop="img">
                <el-input v-model="book.img"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="book.author"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input type="age" v-model.number="book.price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-select v-model="book.type" placeholder="请选择">
                    <el-option v-for="(item,index) in bookTypeList" :key="index" :value="item.code" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出版社" prop="publisher">
                <el-input v-model="book.publisher"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitBook">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
    <script>
export default {
    data(){
        return{
            labelPosition:'right',
            bookTypeList: [],
            book:{
                title:'',
                img:'',
                author:'',
                price:'',
                type:'',
                publisher:''
            },
            rules:{
                title:[{required: true, message: '书名不能为空',trigger: 'blur'}],
                img: [{required: true, message: '图片地址不能为空',trigger: 'blur'}],
                author:[{required: true, message: '作者不能为空',trigger: 'blur'}],
                price:[
                    { required: true, message: '价格不能为空',trigger: 'blur'},
                    { type: 'number', message: '价格必须为数字值',trigger: 'blur'}
                ],
                publisher: [{required: true, message: '出版社不能为空',trigger: 'blur'}],
            }
        }
    },
    created(){
        console.log(this.$route.query)
        if(this.$route.query.bookData){
            this.book = this.$route.query.bookData;
        }

        this.axios.get('/api/bookType')
            .then(res=>{
                this.bookTypeList = res.data;
            })
            .catch(err=>{
                console.log(err);
            })
    },
    methods:{
        submitBook:function(){
            var self = this;
            self.$refs['bookData'].validate(valid=>{
                if(valid){
                    console.log('验证成功');
                    var param = new URLSearchParams();
                    param.append('title',self.book.title);
                    param.append('img',self.book.img);
                    param.append('author',self.book.author);
                    param.append('price',self.book.price);
                    param.append('type',self.book.type);
                    param.append('publisher',self.book.publisher);
                    if(self.book._id){    
                        param.append('id',self.book._id);
                        self.axios.post('/api/books/update',param)
                            .then(res=>{
                                console.log(res);
                                self.$message({
                                    message:'修改成功',
                                    type:'success'
                                })
                                self.$router.push({name:'books'});
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                    }
                    else{
                        self.axios.post('/api/books/save',param)
                            .then(res=>{
                                self.$message({
                                    message:'添加成功',
                                    type:'success'
                                })
                                self.$router.push({name:'books'});
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                    }
                    
                }
                else{
                    this.$message.error('表单填写错误，提交失败！');
                }
            })
        }
    }
}
</script>

