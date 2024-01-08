import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data(){
        return {
            url : `https://vue3-course-api.hexschool.io/v2`,
            api_path :`peggy123`,
            products:[],
            tempProduct:{}
        }
    },
    methods: {
        checkAdmin(){
            axios.post(`${this.url}/api/user/check`)
            .then(res=>{
                this.getData()
            })
            .catch(error=>{
                alert('身份錯誤，請重新登入');
                window.location = `login.html`
            })
        },
        getData(){
            axios.get(`${this.url}/api/${this.api_path}/admin/products/all`)
            .then(res=>{
                this.products = res.data.products
                console.log(res.data.products);
            })
            .catch(error=>{
                alert(error.data.message)
            })
        },
        openProduct(item){
            this.tempProduct = item
        }
    },
    mounted() {
        //取得 Token（Token 僅需要設定一次）
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");
        //token自動夾帶進去headers
        axios.defaults.headers.common['Authorization'] = token;

        this.checkAdmin();
    },
}).mount('#app')