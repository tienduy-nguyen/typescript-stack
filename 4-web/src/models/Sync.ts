import axios, { AxiosError, AxiosPromise } from 'axios';
import { UserProps } from './User';
export class Sync {
  constructor(public rootUrl: string) {}
  fetch(id: string | number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: UserProps): AxiosPromise {
    const { id } = data;
    axios.get(`${this.rootUrl}/${id}`).catch((err) => {
      if (err.response.status === 404) {
        //id not exist, create new user
        return axios.post(`${this.rootUrl}`, data);
      }
    });
    // id exist, update user
    return axios.put(`${this.rootUrl}/${id}`, data);
  }
}
