import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const BulkApprovalContext = createContext();

export const BulkApprovalProvider = ({ children }) => {
    const baseURl = process.env.REACT_APP_API_KEY;
    const [HodbulkApprovalCount, setHodBulkApprovalCount] = useState(0);
    const [PrincipalbulkApprovalCount, setPrincipalBulkApprovalCount] = useState(0);
    const [Hodassets,setHodassets]=useState([]);
    const [Principalassets,setPrincipalassets]=useState([]);
    const getAssetsforHod = async () => {
        try {
            const response = await axios.get(`${baseURl}/api/assets/unapprovedByHOD`);
            setHodassets(response.data.data || []); 
            const  count = response.data.data;
            console.log('length',count.length)
            setHodBulkApprovalCount(count.length);

        } catch (error) {
            console.error("Error fetching employees data:", error);
            setHodassets([]);
        }
    };

    const getAssetsforPrincipal = async () => {
        try {
            const response = await axios.get(`${baseURl}/api/assets/unapprovedByPrinicipal`);
            setPrincipalassets(response.data.data || []); 
            const  count = response.data.data;
            console.log('length',count.length)
            setPrincipalBulkApprovalCount(count.length);

        } catch (error) {
            console.error("Error fetching assets data:", error);
            setPrincipalassets([]);
        }
    };

    return (
        <BulkApprovalContext.Provider value={{ HodbulkApprovalCount, setHodBulkApprovalCount,getAssetsforHod,getAssetsforPrincipal,PrincipalbulkApprovalCount,Hodassets,Principalassets}}>
            {children}
        </BulkApprovalContext.Provider>
    );
};

export const useBulkApprovalContext = () => useContext(BulkApprovalContext);
