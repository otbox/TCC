import axios from "axios";
const address = "https://otbox.serv00.net/Estufa/public_html/Connect.php";

//Sistema de comunicação com o site do 000webhost, utilizando do post para a definição dos eventos

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
