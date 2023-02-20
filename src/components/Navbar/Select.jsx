import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { BiSearch } from "react-icons/bi"

function Autocomplete() {
  const [options, setOptions] = useState([])
  const [searchString, setSearchString] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const handleInputChange = (inputValue) => {
    setSearchString(inputValue);
    if (inputValue.length < 2) {
      setOptions([]);
      return;
    }
    const types = ['posts', 'communities', 'accounts', 'comments'];
    Promise.all(types.map(type => {
      return fetch(`http://localhost:3000/api/v1/navbar_search?q=${inputValue}&type=${type}`)
        .then(response => response.json())
        .then(data => {
          if (!data[type]) {
            return [];
          }
          return data[type].options.map(option => {
            return {
              value: option.id,
              label: `${type === 'accounts' ? 'u/' : type === 'comments' ? 'c/' : 'p/'}${option.title || option.name || option.username || option.message}`,
              type: data[type].type,
            };
          });
        });
    }))
      .then(results => {
        const options = results.flat();
        setOptions(options);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSelection = (selectedOption) => {
    setSelectedOption(selectedOption)
    window.location.assign(`http://localhost:3001/navsearch?q=${searchString}`)
  }

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter') {
      if (!selectedOption) {
        return;
      }
      const prefix = selectedOption.label.slice(0, 2);
      const suffix = selectedOption.label.slice(2);
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const handleResponse = (data) => {
        const options = data[`${prefix}s`].options;
        const result = options.find((option) => option[`${prefix.slice(0, -1)}Name`] === suffix);
        if (result) {
          window.location.assign(`http://localhost:3001/r/${result.community_id}/p/${result.post_id || result.id}`);
        }
      };
      if (prefix === 'r/') {
        fetch('http://localhost:3000/api/v1/navbar_search', fetchOptions)
          .then((response) => response.json())
          .then(handleResponse);
      } else if (prefix === 'u/') {
        window.location.assign(`http://localhost:3001/profile`);
      } else if (prefix === 'p/') {
        fetch('http://localhost:3000/api/v1/navbar_search', fetchOptions)
          .then((response) => response.json())
          .then(handleResponse);
      } else if (prefix === 'c/') {
        fetch('http://localhost:3000/api/v1/navbar_search', fetchOptions)
          .then((response) => response.json())
          .then(handleResponse);
      }
    } else {
      handleSelection(event.target.value);
    }
  };

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onInputChange={handleInputChange}
        onChange={setSelectedOption}
        onKeyDown={handleKeyDown}
        placeholder={<span><BiSearch /> Search Reddit</span>}
        styles={{
          control: (base, state) => ({
            ...base,
            width: "390px",
            height: "45px",
            marginTop: "3px",
            backgroundColor: "#edeff1",
            borderRadius: "20px",
            borderColor: state.isFocused ? "#3f51b5" : "#ccc",
            "&:hover": {
              borderColor: "#3f51b5",
            },
          }),
        }}
      />
    </div>
  )
}

export default Autocomplete 
