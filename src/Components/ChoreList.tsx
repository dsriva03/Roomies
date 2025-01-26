import React, { useState } from 'react';


function ChoreList() {

    const [isPressed, setIsPressed] = useState(false);

    const buttonStyle = {
        boxShadow: isPressed ? 
         'inset 0 2px 4px rgba(0, 0, 0, 0.2)' :
        `
        0 10px 25px -3px rgba(0, 0, 0, 0.3),
        0 4px 6px -2px rgba(0, 0, 0, 0.6),
        0 20px 25px -5px rgba(0, 0, 0, 0.2),
        inset 0 2px 2px rgba(255, 255, 255, 0.95)
        `,
        transform: isPressed ? 'translateY(2px)' : 'none',
        transition: 'all 0.3s ease-in-out'
    };

    return (
        <>
            <div className="p-2 m-4 h-fit" id="ChoreList">
                <h1 className="font-sans text-sky-900">Chore List</h1>
                <input className="font-sans text-sky-900" value="Chore..."></input>
                <button 
                style={buttonStyle}
                className="font-sans py-2 px-4  text-white shadow-2xl bg-fuchsia-300 hover:bg-fuchsia-400 border-white rounded-[50px] "
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                >Add Chore</button>
            </div>
        </>

    )
}

export default ChoreList