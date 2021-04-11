import Axios from "axios";

export const http = Axios.create({
  baseURL:
    "http://newschooldonormetric-env.eba-mxmw3egz.us-east-2.elasticbeanstalk.com",
});
