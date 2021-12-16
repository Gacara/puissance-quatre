import React from "react"
import Cell from './cell'

export default function Row ({ row, play }){
    return (
      <tr>
        {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} play={play} />)}
      </tr>
    );
  };