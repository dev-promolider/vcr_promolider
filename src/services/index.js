import attribute from '../store/attribute';

this.axios.get("dashboard/getattributes").then((result) => {
    const r = result.data.data;

}).catch((err) => {
    
});