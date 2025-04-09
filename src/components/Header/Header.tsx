import logo from '../../../public/Logo.png'
import classes from './Header.module.scss'

const Header = () => {
    return (
        <div className = {classes.header}>
            <img className = {classes.img} src = {logo} alt = "" />
        </div>
    );
};

export default Header;