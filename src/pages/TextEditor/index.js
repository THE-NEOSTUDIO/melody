import React, {useState, useEffect} from "react";
import './index.scss';
import {row, wishes} from "../../common/constants/wishes";

let rowIndex = 1;
const getWishes = () => {
  if (rowIndex >= row) {
    rowIndex = 0;
  }
  return wishes[rowIndex++];
};

let rowNEXT = undefined;
let columnNEXT = undefined;

export default function ({setStep}) {

  const [hookWishes, setWishes] = useState([]);
  const [columnState, setColumn] = useState(undefined);
  const [rowState, setRow] = useState(undefined);

  useEffect(() => {
    setWishes(wishes[0]);
  }, []);

  const go = () => {
    if (columnState === undefined || rowState === undefined) {
      return;
    }
    window.sentence_results = JSON.stringify({column: rowNEXT, row: columnNEXT});
    setStep(3);
  };

  return (
    <div className={'text-editor'}>
      <div className="card-container">
        <div className="title-container">
          <div className="title">{/*霓虹制造局*/}</div>
          <div className="subtitle">
            <div className="tip">{/*选择你的新年祝福*/}</div>
          </div>
        </div>
        <div className="main-container">
          {
            hookWishes.map((wish, index) => (
                <div
                  key={index}
                  onTouchStart={() => {
                    rowNEXT = rowIndex;
                    columnNEXT = index;
                    setColumn(index);
                    setRow(rowIndex)
                  }}
                  className={`wish-card ${index === columnState && rowIndex === rowState ? 'wish-card-selected' : 'wish-card-unselected'}`}>
                  <div
                    className="wish-card-inner">
                    {
                      wish.split('\n').map((row, i) => (<p key={`${i}row`} className="sentence">{row}</p>))
                    }
                  </div>
                </div>
              )
            )
          }
        </div>
        <div className="tool-container">
          <div onTouchStart={() => setWishes(getWishes())} className="change-btn">{/*换一换*/}</div>
          <div onTouchStart={() => go()} className="next-step">{/*保存*/}</div>
        </div>
      </div>
    </div>
  )
}
