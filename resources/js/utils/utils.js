import axios from 'axios'
import React, { createContext, useContext } from 'react'

export const LeadsContext = createContext(null)

export const debounce = (func, delay = 500) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

export const fetchLeads = async (linkUrl) => {
    try {
        const url = linkUrl || '/leads' + window.location.search
        const response = await axios.get(url)

        if (url.includes('?')) {
            const query = url.split('?')[1]
            history.pushState({}, '', '/?' + query)
        } else {
            history.pushState({}, '', '/')
        }
        return response.data
    } catch (error) {
        console.error('error fetching data:', error)
    }
}

export const fetchLeadStatuses = async () => {
    const response = await axios.get('/lead_statuses')
    return response.data
}

export const upsertLead = async (leadId, leadData) => {
    try {
        const response = await axios({
            method: !!leadId ? 'put' : 'post',
            url: `/leads/${leadId || ''}`,
            data: leadData,
        })
    } catch (error) {
        console.error('error saving lead', error)
    }
}
