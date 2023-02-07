import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { FaEdit, FaTrash, FaTimes, FaComment, FaFlag } from 'react-icons/fa';
import EditPost from '../../components/Post/Form/EditPost';
import { toast } from 'react-toastify';

function delete_post(Post_URL) {
  return axios.delete(Post_URL).then((response) => response.data)
}

const Reactions = () => {
  const categories = [
    {
      id: 1,
      name: "Offensive Content",
      report_reasons: [
        { id: 1, reason: "Hate speech" },
        { id: 2, reason: "Nudity or Sexual Content" },
        { id: 3, reason: "Violence or Threats" }
      ]
    },
    {
      id: 2,
      name: "Spam or Misleading",
      report_reasons: [
        { id: 1, reason: "False information" },
        { id: 2, reason: "Scam or phishing" },
        { id: 3, reason: "Spam" }
      ]
    }
  ];
  const [post, setPost] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedReasonId, setSelectedReasonId] = useState(null);
  const [selectedReasonName, setSelectedReasonName] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  const navigate = useNavigate()  
  let { community_id, id } = useParams();
  const Post_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/`;

  const [isOpen, setIsOpen] = useState(false);
  const account = JSON.parse(localStorage.getItem('account'))

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const set_post = async (post) => {
    await axios.patch(Post_URL, { post }).then((response) => {
      if (response.status === 201) {
        toast.success("Post Closed successfully!");
        navigate(`/r/${community_id}/p` + id)
      }
    }).catch((error) => {
      console.log(error.response.data);
      toast.error("An error occured while Closing the Post");
    })
  }

  useEffect(() => {
    let mounted = true;

    return () => (mounted = false);
  }, []);

  const deletePostHandler = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            delete_post(Post_URL, post.id)
            toast.success("Post Deleted successfully!");
            navigate(`/r/${community_id}`)
          }
        },
        {
          label: 'No'
        }
      ]
    });
    console.log("Delete")
  }

  const closePostHandler = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to close delete this post.Further Changes cannot be done?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            set_post({ ...post, isclosed: true });
            toast.success("Post Closed successfully!");
          }
        },
        {
          label: 'No'
        }
      ]
    });
    console.log("Delete")
  }

  const ReportHandler = () => {
    const reportDetails = {
      report_reason_name: selectedReasonName,
      report_categories_name: selectedCategoryName,
      account_id: account.id,
      post_id: id
    };
    axios.post(Post_URL + 'reports', { report: reportDetails }).then((response) => {
      if (response.ok) {
        navigate(`/r/${community_id}/p` + id)
        toast.success("Report submitted successfully!");
      }
    })
      .catch(error => {
        console.log(error.response.data);
        toast.error("An error occured while submitting the report");
      });
    console.log("reported")
  }

  return (
    <div className='col-10'>
      <div className="border-light" key={post.id}>
        <div className="d-flex gap-2">
          <Link to={`/r/${community_id}/p/${id}/edit`} className='btn btn-light' ><FaEdit />  Edit</Link>
          <Link to='' onClick={deletePostHandler} className='btn btn-light' ><FaTrash /> Destroy</Link>
          <Link to='#' onClick={closePostHandler} className='btn btn-light'><FaTimes /> Close</Link>
          <Link to='#' className='btn btn-light' ><FaComment /> Comments</Link>
          <Link to="#" className='btn btn-light' onClick={openModal}> <FaFlag /> Report</Link>
          <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Reports</h4>
                  <button type="button" className="close" onClick={closeModal} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Following are the Reasons for Reporting</p>
                  <form>
                    {categories.map(category => (
                      <div key={category.id} className="form-group">
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            checked={selectedCategoryId === category.id}
                            onChange={() => {
                              setSelectedCategoryId(category.id);
                              setSelectedCategoryName(category.name);
                            }}
                          />
                          <label className="form-check-label">{category.name}</label>
                          <br />
                        </div>
                        {selectedCategoryId === category.id && (
                          <div className="sub-comment">
                            {category.report_reasons.map(reason => (
                              <div key={reason.id} className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  checked={selectedReasonId === reason.id}
                                  onChange={() => {
                                    setSelectedReasonId(reason.id);
                                    setSelectedReasonName(reason.reason);
                                  }}
                                />
                                <label className="form-check-label">{reason.reason}</label>
                                <br />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-danger" onClick={ReportHandler}>Report</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Reactions
