<template>
    <div class="forgetpwd">
        <h3>找回密码</h3>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="邮箱">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'forgetpwd',
    data() {
        return {
            form: {
                email: '',
                captcha: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log("login")
        }
    }
}
</script>
<style>
.forgetpwd {
    width: 28%;
    margin-top: 100px;
    text-align: right;
    height: 250px;
    margin-left: 36%;
}

.forgetpwd a {
    text-decoration: none;
}

.forgetpwd h3 {
    font-size: 22px;
    font-weight: 400;
    color: #1f2f3d;
    text-align: center;
}
</style>
