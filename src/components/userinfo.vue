<template>
    <div style="width:250px">
        <el-form :label-position="labelPosition" label-width="80px" :model="userinfo">
            <el-form-item label="头像">
                <img class="user-logo" src="" v-model="userinfo.face">
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="userinfo.username"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="userinfo.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="userinfo.email"></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="userinfo.phone"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {
    userinfo_api
} from '../api/service'
export default {
    name: "userinfo",
    data() {
        return {
            labelPosition: 'right',
            userinfo: {
                username: '',
                nickname: '',
                face: '',
                phone: '',
                email: ''
            }
        }
    },
    created() {
        this.get_userinfo();
    },
    methods: {
        get_userinfo() {
            userinfo_api()
                .then((res) => {
                    //用户名
                    this.userinfo.username = res.data.data.username
                        //昵称
                    this.userinfo.nickname = res.data.data.nickname
                        //email
                    this.userinfo.email = res.data.data.email
                        //phone
                    this.userinfo.phone = res.data.data.phone
                        //face头像
                    this.userinfo.face = res.data.data.face
                    console.log(this.username, this.nickname, this.email, this.phone, this.face)

                })
        }
    }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
