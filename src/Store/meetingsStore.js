import axios from 'axios'
import { observable, action, makeObservable, runInAction } from 'mobx';

class meetingsStore {
    data = [];
    baseURL = "http://localhost:8787";
    constructor(){
        makeObservable(this,{
            data: observable,
            addMeeting: action
        })
        this.initialData();
    }

    initialData(){
        axios.get(`http://localhost:8787/appointments`).then(res=>
            runInAction(()=>this.data=res.data))
            
    }

    addMeeting(meeting) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8787/appointment", meeting)
                .then((res) => {
                    if (res.status === 200) {
                        runInAction(() => {
                            this.data.push(meeting);
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
export default new meetingsStore();