import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaPlus, FaRegFlag } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostReport = () => {
  const [toggleOneModal, setToggleOneModal] = useState(false);
  const [toggleTwoModal, setToggleTwoModal] = useState(false);

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

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedReasonId, setSelectedReasonId] = useState(null);
  const [selectedReasonName, setSelectedReasonName] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  const [activeReason, setActiveReason] = useState(false)

  const selectReason = (category) => {
    console.log(category)
    setSelectedCategoryId(category.id);
    setSelectedCategoryName(category.name);
  }


  const navigate = useNavigate()
  let { community_id, id } = useParams();
  const account = JSON.parse(localStorage.getItem('account'))
  const Post_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/`;

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
    <>
      <Link to='' onClick={() => setToggleOneModal(!toggleOneModal)} className="list-post-tab">
        <FaRegFlag /> Report
      </Link>

      <MDBModal
        show={toggleOneModal}
        setShow={setToggleOneModal}
        tabIndex='-1'
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <p className='text-muted m-0 p-0 report-header'>Submit a Reports</p>
              </MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={() => setToggleOneModal(!toggleOneModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>Thanks for looking out for yourself and
                your fellow redditors by reporting things that break the rules.
                Let us know what's happening, and we'll look into it.
              </p>
              <div className="form-group d-flex gap-2">
                {categories.map(category => (
                  <label key={category.id} className={`report-reason-btn ${selectedCategoryId === category.id && activeReason && 'active'}`}>
                    <input
                      type="radio"
                      className="d-none form-check-input"
                      checked={selectedCategoryId === category.id}
                      onChange={() => {
                        setSelectedCategoryId(category.id);
                        setSelectedCategoryName(category.name);
                        setActiveReason(true)
                      }}
                    />
                    {category.name}</label>
                ))}
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <Button className='join-btn create-post-btn text-white' onClick={() => {
                setToggleOneModal(!toggleOneModal);
                setTimeout(() => {
                  setToggleTwoModal(!toggleTwoModal);
                }, 400);
              }}>Next</Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={toggleTwoModal} setShow={setToggleTwoModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <div className="d-flex gap-2">
                  <Link to='' className='m-0 p-0 text-muted'
                    onClick={() => {
                      setToggleTwoModal(!toggleTwoModal);
                      setTimeout(() => {
                        setToggleOneModal(!toggleOneModal);
                      }, 400);
                    }}
                  >
                    <IoMdArrowBack />
                  </Link>
                  <p className='text-muted m-0 mt-2 p-0 report-header'>Submit a Reports</p>
                </div>
              </MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={() => setToggleTwoModal(!toggleTwoModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <>
                {categories.map(category => (
                  selectedCategoryId === category.id && (
                    <div className="">
                      <h6 className="fw-bold">
                        {category.name}
                        <hr />
                      </h6>
                      {category.report_reasons.map(reason => (
                        <div key={reason.id} className="mb-3">
                          <label className="report-reason d-flex justify-content-between">
                            <p className='text-muted m-0'>{reason.reason}</p>
                            <input
                              type="radio"
                              className="form-check-input me-2"
                              checked={selectedReasonId === reason.id}
                              onChange={() => {
                                setSelectedReasonId(reason.id);
                                setSelectedReasonName(reason.reason);
                              }}
                            />
                          </label>
                          <hr />
                        </div>
                      ))}
                    </div>
                  )
                ))}
              </>
            </MDBModalBody>
            <MDBModalFooter>
              <Link to='' className='join-btn create-post-btn text-white' onClick={ReportHandler}>Submit</Link>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default PostReport
