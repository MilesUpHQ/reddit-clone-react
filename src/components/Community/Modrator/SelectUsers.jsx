import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const SelectUsers = () => {
  const [options, setOptions] = useState([])
  const { id } = useParams()

  const handleInputChange = (inputValue) => {
    if (inputValue.length < 2) {
      return setOptions([])
    }
    axios.get(`http://localhost:3000/api/v1/communities/${id}/accounts_search?q=${inputValue}`).then((response) => {
      let options = []
      options = options.concat(response.data.map(option =>
        ({ value: option.id, label: `u/${option.username}` })))
      setOptions(options)
    }).catch((error) => {
      console.log(error)
    })
  }

  return { options, handleInputChange }
}

export default SelectUsers
