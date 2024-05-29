import React from 'react'

function Confirm(props:any) {
  return (
    <div className="confirmation-dialog">
      <div className="confirmation-dialog-content">
        <p>{props.message}</p>
        <button onClick={props.onConfirm}>Yes</button>
        <button onClick={props.onCancel}>No</button>
      </div>
    </div>
  )
}

export default Confirm
