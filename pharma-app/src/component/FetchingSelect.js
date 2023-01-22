import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ResourceAPI from '../services/resource.api.service';
import ContextAPI from '../services/context.api.service';
import CountryAutocomplete from './CountryAutocomplete';

const firstContextName = 'Pharma';

export default function FetchingSelect({ id, label, type, getItems, handleSelect }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState(firstContextName);

  function handleChange(event) {
    const value = event.target.value;
    const item = items.find((elem) => Object.values(elem).includes(value));
    let content;
    item.id ? (content = item.id) : (content = item.code);
    setName(item.name);
    handleSelect(content);
  }

  useEffect(() => {
    if (type == 'getContext') {
      ContextAPI.getContext()
        .then((result) => {
          setItems(result.items);
          getItems(result.items);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      ResourceAPI.getCountry()
        .then((result) => {
          setItems(result.items);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, []);
  return type == 'getContext' ? (
    items.length > 0 && (
      <TextField
        id={id}
        name={id}
        select
        size="small"
        fullWidth
        label={label}
        defaultValue={firstContextName}
        value={name}
        onChange={handleChange}
        required
        sx={{ mb: 1, mt: 1 }}
      >
        {items.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    )
  ) : (
    <CountryAutocomplete
      id={id}
      label={label}
      country={items}
      handleChangeCountry={handleSelect}
    ></CountryAutocomplete>
  );
}
