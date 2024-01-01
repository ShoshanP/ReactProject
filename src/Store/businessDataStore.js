import axios from "axios";
import { observable, action, makeObservable, runInAction, toJS } from 'mobx';

class businessDataStore {
    data = {


    };
    baseURL = "http://localhost:8787";
    constructor() {
        makeObservable(this, {
            data: observable,
            changeDetails: action,
           
        })
        this.initData();
    }

    initData() {
        this.getData();
        
        if (!this.data.name) {
        
            this.changeDetails({
                name: "בנייני נכסים מעולים",
                address: "רוטשילד 15 תל אביב",
                phone: "03-1234567",
                owner: "יוסי כהן",
                logo: "https://top-land.co.il/wp-content/uploads/2021/03/%D7%91%D7%99%D7%AA-%D7%90%D7%9E%D7%95%D7%AA-%D7%91%D7%99%D7%98%D7%95%D7%97-1-835x540.jpg",
                description: ` חברת "בנייני נכסים מעולים" היא חברת נדל"ן מובילה המתמחה בקניית, מכירת, והשכרת נכסים באזור.
            `

            });

        }
       
    }

    getData() {
        axios.get(`http://localhost:8787/businessData`).then(res => {
            runInAction(() => {
                this.data = res.data;
            })
            console.log("details after change", toJS(this.data));
        })
    }

    changeDetails(businessData) {
        console.log("i change details!");
        axios.post(`http://localhost:8787/businessData`, businessData)
            .then(
                runInAction(
                    () => this.data = businessData)
            )
    }
}
export default new businessDataStore();