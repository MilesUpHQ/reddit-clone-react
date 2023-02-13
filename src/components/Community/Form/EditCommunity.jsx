import React, { useEffect } from 'react';
import '../../../css/Community.css';
import Form from './Form';
import CommunityApi from '../CommunityApi';
import {useNavigate} from "react-router-dom"

const EditCommunity = () => {

  const navigate = useNavigate()

  const { get_community, edit_community, community ,setCommunity, errorJson } = CommunityApi();

  useEffect(() => {
    let mounted = true;
    get_community().then((items) => {
      if(mounted) {
        setCommunity(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const onCancel = () => {
    console.log("cancel")
    navigate('/')
  };


  const onChange = (event) => {
    setCommunity({
      ...community,
      [event.target.name]: event.target.files ? event.target.files[0] : event.target.value
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    edit_community(community)
  }

  return (
    <div className="community_post pb-5">
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-12 col-md-8">
        <div className="card text-dark rounded">
          <div className="card-body p-5">
            <div className="text-left">
              <h5 className="fw-bold mb-2 text-center">Edit Community</h5>
              <Form community={community} onCancel={onCancel} onChange={onChange} onSubmit={onSubmit} errorJson={errorJson} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCommunity
