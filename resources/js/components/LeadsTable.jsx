import { useContext } from "react";
import { LeadsContext } from "../utils/utils";

export default function LeadsTable({ onLeadEdit }) {
  const context = useContext(LeadsContext);

  const { data, loading, setShowModal, setActiveLead } = context;
  const leads = data && data.data;

  if (!leads) {
    return <p>No leads Found</p>;
  }

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="flex items-center px-4 py-2">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Created</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leads &&
              leads.map((lead, idx) => (
                <tr key={idx}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.lead_status}</td>
                  <td>{lead.created_at}</td>
                  <td>{lead.updated_at}</td>
                  <td>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                        setActiveLead(lead);
                      }}
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
