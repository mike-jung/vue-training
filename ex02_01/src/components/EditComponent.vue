<template>
    <div class="container-fluid">
        <h1>수정</h1>
        <form @submit.prevent="updatePost">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>제목:</label>
                        <input type="text" class="form-control" v-model="post.title">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>내용:</label>
                        <textarea class="form-control" v-model="post.body" rows="5"></textarea>
                    </div>
                </div>
            </div>
            <br>
            <div class="form-group">
                <button class="btn btn-primary">수정</button>
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
        created() {
            let url = `http://localhost:7001/post/read/${this.$route.params.id}`;
            this.axios({
                method:'get',
                url: url,
                responseType:'json'
            }).then((response) => {
                console.log('Response -> ' + JSON.stringify(response));

                if (response.data.output.length > 0) {
                    this.post = response.data.output[0];
                }
            }).catch((error) => {
                console.log('Error -> ' + JSON.stringify(error));
            });
        },
        methods: {
            updatePost() {
                let url = `http://localhost:7001/post/update/${this.$route.params.id}`;
                this.axios({
                    method:'post',
                    url: url,
                    data: this.post,
                    responseType:'json'
                }).then((response) => {
                    console.log('Response -> ' + JSON.stringify(response));

                    this.$router.push({name: 'list'});
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