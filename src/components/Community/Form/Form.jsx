import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';

const CATEGORIES = ['SPORTS', 'TV', 'EDUCATONAL'];

const Form = ({ community, onChange, onSubmit }) => {

  const formik = useFormik({
    initialValues: community,
    // enableReinitialze: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Must be at least 2 characters long')
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      url: Yup.string()
        .url('Invalid url address')
        .required('Required'),
      rules: Yup.string()
        .min(2, 'Must be at least 6 characters long')
        .required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <div className="card rounded mb-3">
        <form action="" onSubmit={formik.handleSubmit}>
          {/* {errors} */}
          <div className="row">
            <div className="col-sm-12">
              <div className="create-post m-3">
                <div className="form-group">
                  <label htmlFor="profile_picture"> Profile Picture </label>
                  <input type="file" name="profile_image" onChange={onChange} className='form-control' />
                  {/* {community.errors.profile_image && <p className="text-danger">{community.errors.profile_image}</p>} */}
                </div>
              </div>
              <div className="create-post m-3">
                <div className="form-group">
                  <label htmlFor="cover_picture"> Cover Picture </label>
                  <input type="file" name="cover_image" onChange={onChange} className='form-control' />
                  {/* {community.errors.cover_image && <p className="text-danger">{community.errors.cover_image}</p>} */}
                </div>
              </div>
              <div className="create-post m-3">
                <div className="form-group">
                  <label htmlFor="name"> Name </label>
                  <input type="text" name="name" onChange={formik.handleChange} className='form-control' maxLength="16" minLength="3" defaultValue={community.name} />
                  {formik.touched.name && formik.errors.name ? (
                    <div className='text-danger'>{formik.errors.name}</div>
                    ) : null}
                  {/* {errors.name && <p className="text-danger">{errors.name}</p>} */}
                </div>
              </div>
              <div className="create-post m-3">
                <div className="form-group">
                  <label htmlFor="url"> Url </label>
                  <input type="text" name="url" onChange={formik.handleChange} className='form-control' defaultValue={community.url} />
                  {formik.touched.url && formik.errors.url ? (
                    <div className='text-danger'>{formik.errors.url}</div>
                    ) : null}
                  {/* {errors.url && <p className="text-danger">{errors.url}</p>} */}
                </div>
              </div>
              <div className="create-post m-3">
                <div className="form-group">
                  <label htmlFor="summary"> Summary </label>
                  <input type="text" name="summary" onChange={onChange} className='form-control' minLength="3" defaultValue={community.summary} />
                  {/* {errors.summary && <p className="text-danger">{errors.summary}</p>} */}
                </div>
              </div>
              <div className="create-post m-3">
                <div className="form-group">
                  <label htmlFor="category"> Category </label>
                  <select name="category" className='form-control' defaultValue={community.category}>
                    <option defaultValue="" disabled>Select Category</option>
                    {CATEGORIES.map((category, index) => <option key={index} defaultValue={category}>{category}</option>)}
                  </select>
                  {/* {errors.category && <p className="text-danger">{errors.category}</p>} */}
                </div>
              </div>
              <div className="create-post m-3">
                <div className="form-group">
                  <label htmlFor="rules"> Rules </label>
                  <textarea name="rules" onChange={formik.handleChange} className='form-control' defaultValue={community.rules} />
                  {formik.touched.rules && formik.errors.rules ? (
                    <div className='text-danger'>{formik.errors.rules}</div>
                    ) : null}
                  {/* {errors.rules && <p className="text-danger">{errors.rules}</p>} */}
                </div>
              </div>
            </div>
          </div>
          <div className="create-post m-3">
            <div className="join-btn create-post-btn mb-3 float-right">
              <input type="submit" className='text-white' value="Submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
