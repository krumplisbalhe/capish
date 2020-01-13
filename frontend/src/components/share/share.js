import React from 'react'
import {Link} from 'react-router-dom'
import QRCode from 'qrcode.react'
import {ReactComponent as Camera} from '../assets/camera.svg'
import './share.css'

const Share = ({roomId, onClickCreateButton}) => {
  const joinLink = `https://capish.rita.wtf/room/${roomId}`
  return (
    <div className="share">
      <h1 className="shareText">
        Scan the QR code with your <Camera /> <br /> or visit <span className="linkText">capish/join</span> and use the key: <span className="capishKey">{roomId}</span>
      </h1>
      <div className="qrCode">
        <Link to={joinLink}>
          <QRCode
            value={joinLink}
            size={200}
            level="H"
            includeMargin
          />
        </Link>
      </div>
      <button type="button" className="useButton" onClick={onClickCreateButton}>Use capish</button>
    </div>
  )
}

export default Share
