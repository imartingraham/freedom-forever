import { useContext } from "react";
import { LeadsContext } from "../utils/utils";

export default function Pager({ onClick }) {
  const context = useContext(LeadsContext);

  const {
    current_page,
    first_page_url,
    from,
    last_page,
    last_page_url,
    links,
    per_page,
    prev_page_url,
    next_page_url,
    to,
    total,
  } = context.data;

  if (!links) {
    return <div></div>;
  }
  return (
    <div className="mt-10">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">{from}</span>
            to
            <span className="font-medium">{to}</span>
            of
            <span className="font-medium">{total}</span>
            results
          </p>
        </div>
        <div>
          <div className="join">
            {links.map((link, idx) => {
              if (link.label == "...") {
                return (
                  <button key={idx} className="join-item btn btn-disabled">
                    ...
                  </button>
                );
              }
              const active = link.active ? "btn-active" : "";
              return (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    onClick(link.url);
                  }}
                  className={`${active} join-item btn`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
