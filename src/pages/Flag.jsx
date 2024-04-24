import React from "react";
import flag from "../images/flag.png";
import "./../css/Flag.css";
import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";

//--------------------------------------------------------------------
// לא משתמש בקומפוננטה הזאת במידת הצורך נמחק אותה בסיום העבודה
//--------------------------------------------------------------------

export default function Flag({ familyImg }) {
  const txtToBtn = "שמור דגל";

  return (
    <>
      <div>
        <div className="flag-container">
          <img src={flag} alt="Flag" className="flag-image" />
          <img src={familyImg} alt="familyPhoto" className="family-image" />
        </div>
        <MainButton textToBtn={txtToBtn} />
        <FooterGraphic />
      </div>
    </>
  );
}
