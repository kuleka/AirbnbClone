import {Link, useLocation} from "react-router-dom";

export default function AccountNav() {
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined){
        subpage = 'profile';
    }
    function linkClasses(type = null) {
        let classes = 'py-2 px-6';
        if(type === subpage) {
            classes += ' bg-primary text-white rounded-full';
        }else {
            classes += ' hover:bg-gray-200 rounded-full transition duration-300'; // 添加 hover 效果
        }
        return classes;
    }

    return (
        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses('profile')} to={'/account'}>
                My Profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                My Bookings
            </Link>
            <Link className={linkClasses('places')} to={'/account/places'}>
                My Places
            </Link>
        </nav>
    )
}