
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Header = () => {
  return (
    <header
      className='w-full flex px-1 py-2 min-h-[4rem] items-center border-b border-b-[#e5e7eb]'
    >
      <Menu />
      <Link
        to={'/'}
        className='flex items-center'
      >
        <img
          src={'/logo.png'}
          alt='logo'
          className='mr-3 w-16'
        />

      </Link>
      <Search show={false} />
    </header>
  )
}

export default Header