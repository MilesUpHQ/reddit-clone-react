import React, { useEffect } from 'react';
import '../../../css/Community.css';
import Form from './Form';
import CommunityApi from '../CommunityApi';

const EditCommunity = () => {

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

  const onChange = (event) => {
    setCommunity({ ...community, [event.target.name]: event.target.value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    edit_community(community)
  }

  return (
    <div className="community_post pb-10">
      <div className="row">
        <div className="col-10">
          <div className="row new_post_head pb-1">
            <div className="col-10 p-0">
              <h5 className="">Edit Community</h5>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 p-0">
              <Form community={community} onChange={onChange} onSubmit={onSubmit} errorJson={errorJson} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCommunity
