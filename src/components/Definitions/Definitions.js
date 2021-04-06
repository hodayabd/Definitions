import './Definitions.css';
import React, { useState } from "react";
import { Switch } from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';

function Definitions() {
    function onChange(checked) {
        console.log(`switch to ${checked}`);
      
      }
      const[updateMessege,setUpdateMessege]=useState(false);
      function onSwich1(cheked) {
        setUpdateMessege(true);
        console.log ("message");
      }
      const[updateMail,setUpdateMail]=useState(false);
      function onSwich2(cheked) {
        setUpdateMail(true);
        console.log ("mail");
         
      }

return(
    <div className="definition_wrap">
        <h1> הגדרות </h1>
        <div className=" definitionMessage">
<Switch defaultChecked onChange={onSwich1} />
<span>   אני רוצה לקבל עידכונים ודיווחים בהודעה מהחל"פ</span>
</div>


<div className="definitionsMail">
<Switch defaultChecked onChange={onSwich2} />
<span>   אני רוצה לקבל עידכונים ודיווחים במייל מהחל"פ</span>
</div>


<button className="exit" > יציאה מהמערכת <PoweroffOutlined /></button>
</div>
)
}

    


export default Definitions;