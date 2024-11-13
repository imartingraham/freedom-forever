import { useContext } from "react";
import { LeadsContext } from "../utils/utils";
import SearchInput from "./SearchInput";
import LeadForm from "./LeadForm";
import Modal from "./Modal";

export default function Header() {
  const context = useContext(LeadsContext);
  const {
    setShowModal,
    onSearchLeads,
    onSaveLead,
    defaultParams,
    leadStatuses,
  } = context;
  return (
    <div>
      <h2>Leads</h2>
      <SearchInput
        defaultValue={defaultParams.query}
        onSearchLeads={(val) => {
          onSearchLeads({ query: val });
        }}
      />
      <div className="flex justify-between">
        <div>
          <a
            href="#"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            New Lead
          </a>
        </div>
        <div>
          Filter
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => {
              onSearchLeads({ status: e.target.value });
            }}
          >
            <option value="">
              All Statuses
            </option>
            {leadStatuses.map((status, idx) => (
              <option key={idx} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Modal>
        <LeadForm onSave={onSaveLead} />
      </Modal>
    </div>
  );
}
