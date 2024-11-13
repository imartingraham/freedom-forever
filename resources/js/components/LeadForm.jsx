import React, { useContext, useState, useEffect, useMemo } from "react";
import { LeadsContext } from "../utils/utils";

const initialState = {
  id: null,
  name: "",
  email: "",
  phone: "",
  lead_status_id: null,
};

export default function LeadForm({ onSave }) {
  const context = useContext(LeadsContext);
  const { activeLead, leadStatuses, formError, setFormError } = context;

  const lead = useMemo(() => ({ ...initialState, ...activeLead }), [activeLead]);
  const [formData, setFormData] = useState(lead);

  useEffect(() => {
    setFormData(activeLead);
  }, [activeLead]);

  const setInputData = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData(formData);
  };

  const defaultStatus = formData.lead_status_id || (leadStatuses[0] && leadStatuses[0].id)
  return (
    <div>
      <h3 className="mb-5">Create Lead</h3>
      {!!formError && (
        <div role="alert" className="alert alert-error mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{formError}</span>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('lead', lead)
          onSave(lead.id, formData);
          e.target.reset();
        }}
        validate="true"
      >
        <div className="flex flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
              type="text"
              defaultValue={formData.name || ""}
              className="grow"
              name="name"
              required
              onChange={setInputData}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input
              type="email"
              defaultValue={formData.email || ""}
              className="grow"
              name="email"
              required
              onChange={setInputData}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Phone Number
            <input
              type="tel"
              defaultValue={formData.phone || ""}
              className="grow"
              name="phone"
              required
              onChange={setInputData}
            />
          </label>
          <select
            className="select select-bordered w-full"
            name="lead_status_id"
            onChange={setInputData}
          >
            {leadStatuses.map((status, idx) => (
              <option selected={status.id == defaultStatus && 'selected'} key={idx} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
          <div>
            <button className="btn btn-primary w-full" type="submit">
              Create Lead
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
