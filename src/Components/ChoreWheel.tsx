

function ChoreWheel() {

    const items = ["thing1","thing2","thing3","thing4","thing5","thing6"]

    return (
        <>
            <div className="p-2 m-4 h-8/10 w-2/3 border-white rounded-[50px]
             border-5"  id="ChoreWheel">
                <h1 className="text-2xl font-display font-semibold text-sky-900"
                >Chore Wheel</h1>
                <div 
                id="wheelContainer"
                className="flex justify-center m-10"
                >
                    <div id="wheel" className="flex-none">
                        <div className="relative w-120 h-120 rounded-full overflow-hidden">
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
                                </div>
                                // * insert text here?
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChoreWheel