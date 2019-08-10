<template>
    <div class="container-fluid">
        <h1>리스트</h1>
        <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
                <router-link :to="{ name: 'create' }" class="btn btn-primary">추가</router-link>
            </div>
        </div>
        <br>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>제목</th>
                    <th>내용</th>
                    <th>기능</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td>{{ post.title }}</td>
                    <td>{{ post.body }}</td>
                    <td>
                        <router-link :to="{name: 'edit', params: { id: post.id }}" class="btn btn-primary">수정</router-link>
                        <button style="margin-left:1em;" class="btn btn-danger" @click.prevent="deletePost(post.id)">삭제</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                posts: []
            }
        },
        created() {
            this.listPost();
        },
        methods: {
            deletePost(id) {
                let url = `http://localhost:7001/post/delete/${id}`;
                this.axios({
                    method:'delete',
                    url: url,
                    responseType:'json'
                }).then((response) => {
                    console.log('Response -> ' + JSON.stringify(response));

                    this.listPost();
                }).catch((error) => {
                    console.log('Error -> ' + JSON.stringify(error));
                });
            },
            listPost() {
                const url = 'http://localhost:7001/post/'
                this.axios({
                    method:'get',
                    url: url,
                    responseType:'json'
                }).then((response) => {
                    console.log('Response -> ' + JSON.stringify(response));

                    this.posts = response.data.output;
                }).catch((error) => {
                    console.log('Error -> ' + JSON.stringify(error));
                });
            }
        }
    }
</script>
<style>
    .container {
        background-color:bisque;
    }
</style>