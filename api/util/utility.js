import moment from "moment";

export const dateFormat = () =>{
  return moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
};