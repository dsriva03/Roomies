import Household from './Household.tsx';
import ChoreList from './ChoreList.tsx';

function Interface() {
  return (
    <>
      <div
        className='p-2 m-4 h-8/10 w-1/2 border-[#aa9e97] rounded-[50px] border-4 bg-[#f8ecd1]'
        id='Interface'
      >
        <h1 className='text-2xl font-display font-semibold text-sky-900'>
          Interface
        </h1>
        <Household />
        <ChoreList />
      </div>
    </>
  );
}

export default Interface;

// ; UNDERSTANDING INTERFACE UTILITY CLASS (TAILWIND)
/// p-2: p reffers to padding and 2 on the space scale calculates to -> 1 = 0.25 rem = 4px -> 2 = 0.5rem = 8px
/// m-4: m reffers to margin and 4 calculates to -> 4 = 1rem = 16px
/// h-8/10: h reffers to height and 8/10 -> 80% of parent container height
/// w-1/2: w reffers to width and 1/2 -> 50% of parent container
/// border-white is self explanatory
/// rounded-[50px]: rounded reffers to border radius. [50px] can also be written in % like [8%]
/// border-4: border width is 4 px. options: 0,2,4,8 all represented in px

// ; INTERFACE HEADER STYLING
/// text-2xl: text represents font size. Options: -sm(0.875rem/14px), -base(1rem/16px), -lg(1.125rem/18px), -xl(1.25rem/20px), -2xl(1.5rem/24px), -3xl(1.875rem/30px)
/// font-display: reffers to font family configured in tailwind.config to use Fredoka, serif
/// font-semibold: reffers to font weight: Options: thin, extralight, light, normal, semibold, bold, extrabold, black
/// text-sky-900: sets the text color. Options: text-sky-100/300/500/700/900
