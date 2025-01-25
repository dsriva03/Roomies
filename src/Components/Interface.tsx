
import Household from './Household.tsx';
import ChoreList from './ChoreList.tsx';

function Interface() {

    return (
        <>
            <div className="p-2 m-4 h-8/10 w-1/3 border-white rounded-[50px]
             border-5" id="Interface">
            <h1 className='font-sans text-sky-900'>Interface</h1>
               <Household />
               <ChoreList />
            </div>
        </>
    )
}

export default Interface