import React, { useContext, useState, useEffect, useMemo } from "react";
import { LeadsContext } from "../utils/utils";

const initialState = {
  id: null,
  name: "",
  email: "",
  phone: "",
  lead_status_id: null,
};

export default function LeadForm({ lead = {}, onSave }) {
  const context = useContext(LeadsContext);
  const { activeLead, leadStatuses } = context;

  lead = useMemo(() => ({ ...initialState, ...activeLead }), [activeLead]);
  const [formData, setFormData] = useState(lead);

  useEffect(() => {
    setFormData(activeLead);
  }, [activeLead]);

  const setInputData = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData(formData);
  };

  return (
    <div>
      <h3 className="mb-5">Create Lead</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
              <option key={idx} value={status.id}>
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
