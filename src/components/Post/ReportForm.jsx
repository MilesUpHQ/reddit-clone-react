import React, { useState } from 'react';

function ReportForm({ onSubmit }) {

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

  return (
    <form onSubmit={onSubmit}>
      {categories.map(category => (
        <div key={category.id} className="form-group">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              checked={selectedCategoryId === category.id}
              onChange={() => setSelectedCategoryId(category.id)}
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
                    onChange={() => setSelectedReasonId(reason.id)}
                  />
                  <label className="form-check-label">{reason.reason}</label>
                  <br />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </form>
  );
}

export default ReportForm 