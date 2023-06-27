const app = Vue.createApp ({
    data() {
        return {
            name: '',
            confirmedName: ''
        };
    },
    methods: {
        submit(){
            alert('Submitted!')
        },
        setName(event) {
            this.name = event.target.value;
        },
        confirmInput() {
            this.confirmedName = this.name;
          }
    }
})

app.mount('#assignment')