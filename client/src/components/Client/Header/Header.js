import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
  let user = { isAuth: true };
  return (
    <>
      <input type='checkbox' id={styles.check} />
      <label htmlFor={styles.check}>
        <i className='fas fa-bars' id={styles.btn}></i>
        <i className='fas fa-times' id={styles.cancel}></i>
      </label>
      <nav className={styles.sidebar}>
        <header>Restaurant</header>
        <ul>
          <li>
            <Link className={styles.sidebar__links} to='/'>
              Главная
            </Link>
          </li>
          <li>
            <Link className={styles.sidebar__links} to='/about'>
              О нас
            </Link>
          </li>
          <li>
            <Link className={styles.sidebar__links} to='/menu'>
              Меню
            </Link>
          </li>
          <li>
            <Link className={styles.sidebar__links} to='/gallery'>
              Галерея
            </Link>
          </li>

          <li>
            <Link className={styles.sidebar__links} to='/contacts'>
              Контакты
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.navbar__container}>
        <p className={styles.navbar__links}>
          <Link className={styles.navbar__link} to='/book'>
            Забронировать
          </Link>
        </p>
        {user.isAuth ? (
          <>
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/profile'>
                Личный кабинет
              </Link>
            </p>
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/logout'>
                Выйти
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/login'>
                Вход
              </Link>
            </p>
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/registration'>
                Регистрация
              </Link>
            </p>
          </>
        )}

        <p className={styles.navbar__links}>
          <Link className={styles.navbar__link} to='/cart'>
            Корзина
          </Link>
        </p>
      </div>
    </>
  );
}

export default Header;
