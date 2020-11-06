import axios, { AxiosError, AxiosResponse } from 'axios';
export class Sync {
  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => {
        console.log('response', res.data);
        this.set(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  static fetchAll(): void {
    axios
      .get('http://localhost:3000/users')
      .then((res) => {
        this.allUsers = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  save(): void {
    const id = this.get('id');
    try {
      axios.get(`http://localhost:3000/users/${id}`).catch((err) => {
        if (err.response.status === 404) {
          //id not exist, create new user
          console.log('have error');
          axios
            .post(`http://localhost:3000/users`, this.data)
            .catch((err: AxiosError) => console.log(err));
          return;
        }

        // id exist, update user
        axios
          .put(`http://localhost:3000/users/${id}`, this.data)
          .catch((err: AxiosError) => console.log(err));
      });
    } catch (error) {
      console.log(error);
    }
  }
}
