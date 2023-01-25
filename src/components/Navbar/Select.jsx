import React,{useState,useEffect} from 'react'
import Select from 'react-select'

function Autocomplete() {
//   const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]
   const [options, setOptions] = useState([])

   useEffect(() => {
    fetch('http://localhost:3000/api/v1/search_suggestions')
      .then(response => response.json())
      .then(data => {
        setOptions(data.options.map(option => {
            return {value: option.id, label: option.name}
        }))
      })
      .catch(error => {
        console.log(error)
      })
   }, [])

  return (
  <div>
    <Select options={options} />
  </div>
  )
}

export default Autocomplete 
