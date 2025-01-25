
function ChoreList() {

    return (
        <>
            <div className="p-2 m-4 h-fit" id="ChoreList">
                <h1 className="font-sans text-sky-900">Chore List</h1>
                <input className="font-sans text-sky-900" value="Chore..."></input>
                <button className="font-sans py-2 px-4  text-white shadow-2xl bg-fuchsia-300 hover:bg-fuchsia-400 border-white rounded-[50px]">Add Chore</button>
            </div>
        </>

    )
}

export default ChoreList