<template>
    <div class="container-fluid">
        <h1>게시물 추가하기</h1>
        <form @submit.prevent="addPost">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>제목: </label>
                        <input type="text" class="form-control" v-model="post.title">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>내용: </label>
                        <textarea class="form-control" v-model="post.body" rows="5"></textarea>
                    </div>
                </div>
            </div>
            <br>
            <div class="form-group">
                <button class="btn btn-primary">추가</button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                post: {}
            }
        },
        methods: {
            addPost() {
                console.log('게시물 : ' + JSON.stringify(this.post));
            }
        }
    }
</script>
<style>
    .container {
        background-color:bisque;
    }
</style>