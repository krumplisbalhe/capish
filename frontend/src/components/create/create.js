import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as Check} from '../assets/check.svg'
import './create.css'

const Create = () => {
	const [activeOption, setActiveOption] = useState('');
	return (
    <div className="create">
			<h1 className="firstQuestion">Add your question and choose from the options:</h1>
			<input className="questionInput" />
				<div
					onClick={()=>setActiveOption('1')}
					className={activeOption === '1' ? 'active img1' : 'img1'}
				>
					{activeOption === '1' &&
						<Check />
					}
					<h2>
						2 choices
					</h2>
					<h3>
						Thumbs up/down
					</h3>
				</div>
				<div
					onClick={()=>setActiveOption('2')}
					className={activeOption === '2' ? 'active img2' : 'img2'}
				>
					{activeOption === '2' &&
						<Check />
					}
					<h2>
						3 choices
					</h2>
					<h3>
						Understanding a concept
					</h3>
				</div>
				<div
					onClick={()=>setActiveOption('3')}
					className={activeOption === '3' ? 'active img3' : 'img3'}
				>
					{activeOption === '3' &&
						<Check />
					}
					<h2>
						4 choices
					</h2>
					<h3>
						Deep understanding
					</h3>
				</div>
			<Link className="createCapishButton" to="/share">
				<button>
					Capish?
				</button>
			</Link>
    </div>
  )
}

export default Create
