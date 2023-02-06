import axios from 'axios'
import React, { useState } from 'react'

const SelectUsers = () => {
  const [options, setOptions] = useState([])

  const handleInputChange = (inputValue) => {
    if (inputValue.length < 2) {
      return setOptions([])
    }
    axios.get(`http://localhost:3000/api/v1/accounts_search?q=${inputValue}`).then((response) => {
      let options = []
      options = options.concat(response.data.options.map(option =>
        ({ value: option.id, label: `u/${option.username}` })))
      setOptions(options)
    }).catch((error) => {
      console.log(error)
    })
  }

  return { options, handleInputChange }
}

export default SelectUsers
