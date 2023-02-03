import React, { useState } from 'react'

export default function GiphyList(props) {
    const {image,height,width,image_still} = props;
    const [currentImage,setCurrentImage] = useState(image);
    const handleClick = () => {
        currentImage === image ?  setCurrentImage(image_still) : setCurrentImage(image);
    }
    return (
        <div className='container my-0'>
            <div className="card" style={{ width: width,height:height}}>
                <img className="card-img-top img-fluid" src={currentImage} alt="Not found" />
                <div className="card-body">
                    <button className="btn btn-sm btn-secondary" onClick={handleClick}>{currentImage === image ? "Pause" : "Play"}</button>
                </div>
            </div>
        </div>
    )
}