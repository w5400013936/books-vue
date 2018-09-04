<template>
    <div class="container">
        <el-form :model="bookType" :rules="rules" ref="bookTypeData" label-width="100px" class="bookTypeForm" :label-position="labelPosition">
            <el-form-item label="名称" prop="name">
                <el-input v-model="bookType.name"></el-input>
            </el-form-item>
            <el-form-item label="编码" prop="code">
                <el-input v-model="bookType.code"></el-input>
            </el-form-item>
            <el-form-item label="链接" prop="url">
                <el-input v-model="bookType.url"></el-input>
            </el-form-item>
            <el-form-item label="总页数" prop="page_count">
                <el-input type="age" v-model.number="bookType.page_count" auto-complete="off"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitBookType">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            labelPosition:'right',
            bookType:{
                name:'',
                code:'',
                url:'',
                page_count:1
            },
            rules:{
                name:[{required: true, message: '名称不能为空',trigger: 'blur'}],
                code: [{required: true, message: '编码地址不能为空',trigger: 'blur'}],
                // url:[{required: true, message: '链接不能为空',trigger: 'blur'}],
                page_count:[
                    { required: true, message: '总页数不能为空',trigger: 'blur'},
                    { type: 'number', message: '总页数必须为数字值',trigger: 'blur'}
                ]
            }
        }
    },
    created(){
        console.log(this.$route.query.bookTypeData)
        if(this.$route.query.bookTypeData){
            this.bookType = this.$route.query.bookTypeData;
        }
    },
    methods:{
        submitBookType(){
            var self = this;
            self.$refs['bookTypeData'].validate(valid=>{
                if(valid){
                    var param = new URLSearchParams();
                    param.append('name',self.bookType.name);
                    param.append('code',self.bookType.code);
                    param.append('url',self.bookType.url);
                    param.append('page_count',self.bookType.page_count);
                    if(self.bookType._id){
                        param.append('id',self.bookType._id);
                        self.axios.post('/api/bookType/update',param)
                            .then(res=>{
                                self.$message({
                                    message:'修改成功',
                                    type:'success'
                                })
                                self.$router.push({name:'bookType'});
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                    }
                    else{
                        self.axios.post('/api/bookType/add',param)
                            .then(res=>{
                                self.$message({
                                    message:'添加成功',
                                    type:'success'
                                })
                                self.$router.push({name:'bookType'});
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
<style>

</style>

