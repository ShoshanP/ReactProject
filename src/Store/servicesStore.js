import axios from "axios";
import { observable, action, makeObservable, runInAction, toJS } from 'mobx';

class servicesStore {
    data = [];
    baseURL = "http://localhost:8787";
    constructor() {
        makeObservable(this, {
            data: observable,
            addService: action,
        })
        this.getData();
    }

   
    getData() {
        axios.get(`http://localhost:8787/services`).then(res => {

            console.log("res from the server", toJS(res.data));
            runInAction(() => {
                this.data = res.data;
            })
            console.log("data after fetch", toJS(this.data));
            if (toJS(this.data.length == 0)) {
                this.addService({
                    id: '1',
                    name: 'פגישת ניהול',
                    description: 'פגישת ניהול עם צוות הנדל"ן',
                    price: 700,
                    duration: 90
                });
                this.addService({
                    id: '2',
                    name: 'פגישת שיווק',
                    description: 'פגישה עם צוות השיווק לתכנון קמפיינים נדל"ן',
                    price: 800,
                    duration: 120
                });
            }
        })
    }

    addService(service) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8787/service", service)
                .then((res) => {
                    if (res.status === 200) {
                        runInAction(() => {
                            this.data.push(service);
                        });
                    } else {
                        console.error("Meeting was not added. Unexpected status:", res.status);
                    }
                    resolve(res.status); // Resolve with the status code
                })
                .catch((error) => {
                    console.error("Error adding meeting:", error);
                    reject(error); // Reject with the error for further handling
                });
        });
    }
}
export default new servicesStore();