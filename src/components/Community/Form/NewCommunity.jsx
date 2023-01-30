import React from 'react';
import '../../../css/Community.css';
import Form from './Form';
import CommunityApi from '../CommunityApi';

const NewCommunity = () => {

  const { set_new_community, community ,setCommunity } = CommunityApi();

  // const handleErrors = (error) => {
  //   const { name, value } = error.target;
  //   setErrors({
  //     ...errors,
  //     [name]: value
  //   });
  //   console.log(errors)
  // }

  const onChange = (event) => {
    setCommunity({ ...community, [event.target.name]: event.target.value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    set_new_community(community)
  }

  return (
    <div className="community_post pb-10">
      <div className="row">
        <div className="col-10">
          <div className="row new_post_head pb-1">
            <div className="col-10 p-0">
              <h5 className="">Create Community</h5>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 p-0">
              <Form community={community} onChange={onChange} onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCommunity
