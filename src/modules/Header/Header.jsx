import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className="header w-full border-solid border-b border-divider">
            <div className="container mx-auto px-4 py-5 relative">
                <ul className="flex items-center justify-center flex-wrap gap-5">
                    <NavLink to="/comments">
                        Comments
                    </NavLink>
                </ul>
            </div>
        </header>
    )
}

export default Header;
