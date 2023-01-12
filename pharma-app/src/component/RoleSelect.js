import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { enumReqType } from '../helpers/EnumReqType';
import useFetchReducer from '../hooks/FetchReducer';

export default function RoleSelect() {
  const { isSuccsessReq, reqData } = useFetchReducer(
    { content: 'start', body: {} },
    enumReqType.getContext
  );
  return (
    <TextField
      id="context"
      name="context"
      select
      size="small"
      fullWidth
      label="PHARMACOM Company Context"
      defaultValue=""
      required
      sx={{ mb: 2 }}
    >
      {isSuccsessReq &&
        reqData.items.map((option) => (
          <MenuItem key={option.id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
    </TextField>
  );
}
