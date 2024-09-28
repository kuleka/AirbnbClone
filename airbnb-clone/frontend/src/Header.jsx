import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';

export default function Header() {
  const { user } = useContext(UserContext);
  
  return (
    <header className='flex justify-between'>
      {/* logo */}
      <Link to={'/'} className='flex items-center gap-1'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 -rotate-90">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
        <span className='bold text-xl'>airbnb</span>
      </Link>

      {/* search widget */}
      <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow'>
        <div>Anywhere</div>
        <div className='border-l border-gray-300'></div>
        <div>Any week</div>
        <div className='border-l border-gray-300'></div>
        <div>Add guests</div>
        <button className='bg-primary text-white p-1 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>

      {/* user widget */}
      <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <Link to={user?'/account':'/login'} className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}
