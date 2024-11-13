import React, { useState, useEffect, useContext } from "react";
import Pager from "./Pager";
import LeadsTable from "./LeadsTable";
import SearchInput from "./SearchInput";
import LeadForm from "./LeadForm";
import Modal from "./Modal";
import Header from "./Header";

import {
  LeadsContext,
  debounce,
  fetchLeads,
  fetchLeadStatuses,
  upsertLead,
} from "../utils/utils";

export default function Home() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [defaultParams, setDefaultParams] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeLead, setActiveLead] = useState({});
  const [leadStatuses, setLeadStatuses] = useState([]);
  const [formError, setFormError] = useState(null);
  const getLeads = async (linkUrl) => {
    try {
      setLoading(true);
      const data = await fetchLeads(linkUrl);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("error fetching data:", error);
    }
  };

  const getLeadStatuses = async () => {
    const data = await fetchLeadStatuses();
    setLeadStatuses(data);
  };

  const onSearchLeads = debounce(({ query, status }) => {
    let params = new URLSearchParams();
    if (
      typeof query != "undefined" &&
      (query.length == 0 || query.length >= 3)
    ) {
      params.set("query", query);
    }

    if (!!status) {
      params.set("status", status);
    }

    const url = "/leads";
    getLeads(`${url}?${params.toString()}`);
  }, 300);

  const onPageClicked = async (linkUrl) => {
    if (!linkUrl) {
      return;
    }
    getLeads(linkUrl);
  };

  const onSaveLead = async (leadId, leadData) => {
    try{
      setFormError(null);
      console.log('leadId')
      await upsertLead(leadId, leadData);
      setShowModal(false);
      // reset to the main page so the new lead shows up in the list
      getLeads();
    }catch(error){
      console.error('error saving lead', error);
      setFormError(error.response.data.message)
    }
  };

  useEffect(() => {
    getLeads();
    getLeadStatuses();

    const params = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );
    setDefaultParams(params);
  }, []);
  return (
    <LeadsContext.Provider
      value={{
        data,
        setData,
        showModal,
        setShowModal,
        loading,
        setLoading,
        defaultParams,
        setDefaultParams,
        activeLead,
        setActiveLead,
        formError,
        setFormError,
        leadStatuses,
        onSearchLeads,
        onSaveLead,
      }}
    >
      <div>
        <Header />
        <LeadsTable />
        <Pager onClick={onPageClicked} />
      </div>
    </LeadsContext.Provider>
  );
}
