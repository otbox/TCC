import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PostToPHP } from "../components/Api";

export default function UserManagement() {
  const [users, setUsers] = useState<string[][] | undefined>();
  const [ativo, setAtivo] = useState();
  useEffect(() => {
    PostToPHP({ Operation: "selectUsers", Content: { user: "null" } }).then(
      (result) => {
        console.log(result);
        setUsers(result);
        result.map((value) => {
          console.log("valor" + value[3]);
        });
      }
    );
  }, []);

  let options = [];
  if (users) {
    options = users.map((value) => {
      return {
        firstLetter: value[3].substring(0, 1).toUpperCase(),
        name: value[3],
      };
    });
  }
  var a;
  return (
    <>
      <FormControl
        fullWidth
        sx={{
          marginTop: 10,
        }}
      >
        <Autocomplete
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          renderInput={(params) => <TextField {...params} label="Usuários" />}
        />
      </FormControl>

      <FormControl
        sx={{
          width: 120,
        }}
      >
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={a}
          label="Age"
          onChange={() => {}}
        >
          <MenuItem value={0}>Sim</MenuItem>
          <MenuItem value={1}>Não</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained"> Criar</Button>
      <Button variant="contained"> Remover</Button>
      <Button variant="contained"> Alterar</Button>
    </>
  );
}
