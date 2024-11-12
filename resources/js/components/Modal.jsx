import { useContext, useState } from "react";
import { LeadsContext } from "../utils/utils";

export default function Modal({ children }) {
  const context = useContext(LeadsContext);
  const { showModal, setShowModal, setActiveLead } = context;

  return (
    <dialog id="my_modal_3" className={`${showModal && "modal-open"} modal`}>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            onClick={() => {
              setShowModal(false);
              setActiveLead({});
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
}
