import { useEffect, useRef, useState } from "react";

function ChoreWheel() {

    const containerRef = useRef(null);
    const [rotation, setRotation] = useState(0);
  
    useEffect(() => {
        let startTime;
        const duration = 1000; // 5 seconds

        const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        if (elapsed < duration) {
            const newRotation = (elapsed / duration) * 360; // Gradually rotate from 0 to 360 degrees
            setRotation(newRotation);
            requestAnimationFrame(animate);
        } else {
            setRotation(360); // Ensure it stops at a full rotation
        }
        };

        requestAnimationFrame(animate);
    }, []);



    const items = ["josh sweep","Austin wash dog","Aditi Wash the Dishes","Jeremy take out trash",  ]
    const choreWheelContainerStyle = {
        boxShadow: `
        10px 10px 25px -3px rgba(0, 0, 0, 0.3),
        10px 4px 6px -2px rgba(0, 0, 0, 0.3),
        10px 20px 25px -5px rgba(0, 0, 0, 0.2),
        inset 0 2px 2px rgba(255, 255, 255, 0.95)
        `,
    }
    const choreWheelStyle = {
        
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0s linear"
    }

    return (
        <>
            <div className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px]
             border-5"  id="ChoreWheel">
                <h1 className="text-2xl font-display font-semibold text-sky-900"
                >Chore Wheel</h1>
                <div 
                id="wheelContainer"
                className="flex justify-center m-10"
                >
                    <div id="wheel" 
                    className="flex-none rounded-full"
                    style={choreWheelContainerStyle}
                    >
                        <div 
                        ref={containerRef}
                        className="relative w-120 h-120 rounded-full overflow-hidden"
                        style={choreWheelStyle}
                        >
                            {Array.from(items).map((_, i) => (
                                <div
                                key={i}
                                className="absolute w-full h-full"
                                style={{
                                    clipPath: `polygon(50% 50%, ${50 + 100 * Math.cos((i * (360/items.length) * Math.PI) / 180)}% ${
                                    50 + 100 * Math.sin((i * (360/items.length) * Math.PI) / 180)
                                    }%, ${50 + 100 * Math.cos(((i + 1) * (360/items.length) * Math.PI) / 180)}% ${
                                    50 + 100 * Math.sin(((i + 1) * (360/items.length) * Math.PI) / 180)
                                    }%)`,
                                    backgroundColor: `hsl(${i * 60}, 70%, 60%)`,
                                }}>
                                    <span
      className="absolute text-white font-bold"
      style={{
        top: `calc(50% + ${30 * Math.sin(((i + 0.5) * (360 / items.length) * Math.PI) / 180)}%)`,
        left: `calc(50% + ${30 * Math.cos(((i + 0.5) * (360 / items.length) * Math.PI) / 180)}%)`,
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: "50px",
      }}
    >
      {items[i]}
    </span>
                                </div>
                               
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChoreWheel