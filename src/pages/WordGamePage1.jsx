import React from "react";

import "./../css/GeneralPages.css";


import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";
import Header from "../FuncComp/Header";

import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';


export default function wordGamePage1() {
  const txtToBtn = "התחל";
  const txtToHeader = "ברוכים הבאים לאמפי תיאטרון ";

  return (
    <div className="inner-container">
      <div className="headerInst">
      <Header textToHeader={txtToHeader} />
      </div>
      <br />
      <div>
      <p><LiveHelpOutlinedIcon/>הידעתם- האמפי תיאטרון בקיסריה ידוע באקוסטיקה האיכותית שלו!</p>

      <p className="pWithoutmargin">בתחנה זו עליכם לחלק את המשפחה לשתי קבוצות שוות-</p>
      <p className="pWithoutmargin">מקריאים: נשארים על הבמה.</p>
      <p>שומעים: עולים במדרגות עד למעלה.</p>
      <h5>איך משחקים?</h5>
      <p>
        נציג מהמקריאים אומר בקול את המילה הכתובה על המסך (שימו לב- המטרה שהמנחשים ישמעו את המילה גם בלי
        שתצעקו!). קבוצת השומעים תשלח נציג לבמה שיאמר את המילה ששמעו. בכל שלב החליפו נציגים.
      </p>
      <p>*טיפ למקריאים- נסו להקשות על קבוצת השומעים בכך שבכל שלב החלישו את הקול.</p>
    </div>
      <div><MainButton textToBtn={txtToBtn} /></div>
      <div><FooterGraphic /></div>
    </div>
  );
}
