import React from 'react';
import {useSelector} from 'react-redux';
import {Alert} from 'react-bootstrap'

const Alerts = () =>{
const alerts= useSelector(state=>state.alerts)
return(alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      
       <Alert key ={alert.id}variant={alert.alertType} style={{fontSize:"small",padding:"2px", textAlign:"center"}}>
       {alert.msg}
   </Alert>)

))};



export default Alerts;