import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { boolean } from 'zod';
import { DeptInfoDto } from '../departments/DeptContext';
import { LocationInfoDto } from '../locations/LocationContext';
import { VendorInfoDto } from '../vendors/VendorContext';

export class ImageInfoDto {
	  id='';
	  imgName='';
}

 export class AssetInchargeDto {
	  id='';
	  inchargeName='';
	  inchargePhno='';
	  employeeId='';
     }

export class AssetsDto {

	  id='';
	  assetName='';
	  make='';
	  model='';
	  isSerialized=this.Boolean;
	  serialNo='';
	  description='';
	  imageUrl='';
	  locName='';
	  geoLocation='';
	  value=0;
	  purchaseDate='';
	  warranty='';
	  isWarrantyExpired=this.Boolean;
	  isUnderWarranty=this.Boolean;
	  userDept='';
	  status='';
	  isApprovedByHOD=this.Boolean;
	  isApprovedByPrinicipal=this.Boolean;
	  incharge='';
	  qrCode=[]; 
	  employeeId='';  
	
      deptInfoDto=new DeptInfoDto();
    
      locInfoDto=new LocationInfoDto();
    
      vendorInfoDto=new VendorInfoDto();
    
      assetInchargeDto= new AssetInchargeDto();
    
      imgInfoDto= new ImageInfoDto();	
}


const AssetContext = createContext();

export const useAsset = () => {
    return useContext(AssetContext);
};

export const AssetProvider = ({ children }) => {
    const [assets,setAssets]=useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const baseURl = process.env.REACT_APP_API_KEY;


    const getAssets = async () => {
        try {
          const response = await axios.get(`${baseURl}/api/assets/getAssets`, {
          });
          setAssets(response.data.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching employees data:", error);
        }
      };
const createAsset = async (asset, navigate) => {
    try {
        const response = await axios.post(`${baseURl}/api/assets/create`, asset,{
            headers: {
                'Content-Type':'multi-part/form-data'
              },
        });
        if (response.status === 200) {
            setSnackbarMessage('Asset created successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate("/assets");
            }, 1000);
        }
    } catch (error) {
        console.error('Creation error:', error);
        setSnackbarMessage('Failed to create asset');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    }
};

const UpdateAsset = async (asset,id,navigate) => {
    console.log(asset);
    console.log(id);``
    try {
        const response = await axios.post(`${baseURl}/api/assets/update/${id}`, asset);
        if (response.status === 200) {
            setSnackbarMessage('Asset updated successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate("/assets");
            }, 1000);
        }
    } catch (error) {
        console.error('update error:', error);
        setSnackbarMessage('Failed to update asset');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    }
};

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const value = {
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        handleCloseSnackbar,
        createAsset,
        getAssets,
        UpdateAsset,
        assets
    };

    return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
};
