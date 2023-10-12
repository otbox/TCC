import axios from "axios";
//PEsquisar sobre como funciona o metodo de apgat depois de vir o resultado, trazendo assim a noss o resultado e apgando depois.
const address = "https://otboxserver.000webhostapp.com/Connect.php";

interface ApiProps {
  Operation: string;
  Content: object;
}

const PostToPHP = ({ Operation, Content }: ApiProps): Promise<object> => {
  return new Promise<object>((resolve, reject) => {
    axios
      .post(
        address,
        {
          Operation,
          Content,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((e) => {
        e.data != 0 ? resolve(e.data) : reject(-1);
      })
      .catch((err) => {
        console.log(err);
        reject(-2);
      });
  });
};

export { PostToPHP };
