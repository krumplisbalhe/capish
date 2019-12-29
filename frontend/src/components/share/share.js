import React from 'react'
import {Link, useParams} from 'react-router-dom'
import QRCode from 'qrcode.react'
import {ReactComponent as Camera} from '../assets/camera.svg'
import './share.css'

const Share = ({joinLink = "https://www.npmjs.com/package/qrcode.react", capishKey="lba6k"}) => {
	const {id} = useParams()
	return (
    <div className="share">
			<h1 className="shareText">
				Scan the QR code with your <Camera /> <br/> or visit <span className="linkText">capish/join</span> and use the key: <span className="capishKey">{capishKey}</span>
				{id}
			</h1>
			<div class="qrCode">
				<Link to={joinLink}>
					<QRCode
						value={joinLink}
						size={200}
						level={"H"}
						includeMargin={true}
					/>
				</Link>
			</div>
			<button class="useButton">Use capish</button>
    </div>
  )
}

export default Share
