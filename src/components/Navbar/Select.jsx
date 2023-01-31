import React,{useState,useEffect} from 'react'
import Select from 'react-select'

function Autocomplete() {
    const [options, setOptions] = useState([])
    const [searchString, setSearchString] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)

     const handleInputChange = (inputValue) => {
      setSearchString(inputValue);
        if(inputValue.length >= 2){
          fetch(`http://localhost:3000/api/v1/navbar_search?q=${inputValue}`)
            .then(response => response.json())
            .then(data => {
              let options = []
                if(data.posts){
                  options = options.concat(data.posts.options.map(option => 
                    ({ value: option.id, label: `p/${option.title}`, type: data.posts.type })))
                }
                if(data.communities){
                  options = options.concat(data.communities.options.map(option => 
                    ({ value: option.id, label: `r/${option.name}`, type: data.communities.type })))
                }
                if(data.accounts){
                  options = options.concat(data.accounts.options.map(option => 
                    ({ value: option.id, label: `u/${option.username}`, type: data.accounts.type })))
                }
                setOptions(options);
             })
            .catch(error => {
                console.log(error)
            });
        }
        else{
          setOptions([])
        }
    }

    const handleSelection = (selectedOption) => {
      setSelectedOption(selectedOption)
      window.location.assign(`http://localhost:3001/navsearch?q=${searchString}`)
  }
  
  const handleKeyDown = (event) => {
      if(event.key === 'Enter') {
          handleSelection(event.target.value)
      }
      else if(selectedOption) {
        window.location.assign(`http://localhost:3001/${selectedOption.label}`)
      }
  }

  return (
    <div>
      <Select options={options} value = {selectedOption} onInputChange={handleInputChange} onChange={setSelectedOption} onKeyDown={handleKeyDown} />
    </div>
    )
}

export default Autocomplete 
