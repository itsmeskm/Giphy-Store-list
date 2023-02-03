import React from 'react'

export const Navbar = (props) => {
    return (
        <nav className={`justify-content-between navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
            <a className="navbar-brand" href="/Navbar">Home</a>
            <div className="custom-control custom-switch form-inline">
                <input type="checkbox" onClick = {props.toggle} className="custom-control-input" id="customSwitch1" />
                <label className={`custom-control-label text-${props.mode==='dark' ? 'light':'dark'}`} htmlFor="customSwitch1">Toggle</label>
            </div>
        </nav>
    )
}
