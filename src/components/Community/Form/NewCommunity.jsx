import React from 'react';
import '../../../css/Community.css';
import Form from './Form';
import CommunityApi from '../CommunityApi';

const NewCommunity = () => {

  const { set_new_community, community, setCommunity, errorJson } = CommunityApi();

  const onChange = (event) => {
    setCommunity({
      ...community,
      [event.target.name]: event.target.files ? event.target.files[0] : event.target.value
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    set_new_community(community)
  }

  return (
    <div className="community_post pb-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-8">
          <div className="card text-dark rounded">
            <div className="card-body p-5">
              <div className="text-left">
                <h5 className="fw-bold mb-2 text-center">Create a Community</h5>
                <Form community={community} onChange={onChange} onSubmit={onSubmit} errorJson={errorJson} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default NewCommunity
