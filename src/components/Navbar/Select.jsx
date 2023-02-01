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
                if(data.comments){
                  options = options.concat(data.comments.options.map(option => 
                    ({ value: option.id, label: `c/${option.message}`, type: data.comments.type })))
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
    if (event.key === 'Enter') {
      handleSelection(event.target.value);
    } else if (selectedOption) {
      const prefix = selectedOption.label.slice(0, 2);
      const suffix = selectedOption.label.slice(2);
      if (prefix === 'r/') {
        fetch('http://localhost:3000/api/v1/navbar_search')
          .then((response) => response.json())
          .then((data) => {
            const community = data.communities.options.find(
              (option) => option.name === suffix
            );
            if (community) {
              window.location.assign(
                `http://localhost:3001/r/${community.id}`
              );
            }
          });
      }
      else if (prefix === 'u/') {
        window.location.assign(`http://localhost:3001/profile`);
      }
      else if(prefix === 'p/' ){
        fetch('http://localhost:3000/api/v1/navbar_search')
        .then((response) => response.json())
        .then((data) => {
          const post = data.posts.options.find(
            (option) => option.title === suffix
          );
          if (post) {
            window.location.assign(
              `http://localhost:3001/r/${post.community_id}/p/${post.id}`
            );
          }
        });
      }
      else if(prefix === 'c/' ){
        fetch('http://localhost:3000/api/v1/navbar_search')
        .then((response) => response.json())
        .then((data) => {
          const comment = data.comments.options.find(
            (option) => option.message === suffix
          );
          if (comment) {
            window.location.assign(
              `http://localhost:3001/r/${comment.community_id}/p/${comment.post_id}`
            );
          }
        });
      }
    }
  };
  
  
  

  return (
    <div>
      <Select options={options} value = {selectedOption} onInputChange={handleInputChange} onChange={setSelectedOption} onKeyDown={handleKeyDown} />
    </div>
    )
}

export default Autocomplete 
