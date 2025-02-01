import React from 'react'
import styles from './header.module.scss'
import logo from '../../assets/svg/logo.svg'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
	const location = useLocation()

	return (
		<header className={styles.header}>
			<Link to='/'>
				<img src={logo} alt='логотип конвертации' className={styles.logo} />
			</Link>
			<div>
				{location.pathname === '/' && (
					<>
						<Link to='./login'>
							<button className={`${styles.button}`}> Вход</button>
						</Link>
						<Link to='/register'>
							<button
								className={`${styles.button} ${styles.button_registration}`}
							>
								Регистрация
							</button>
						</Link>{' '}
					</>
				)}
			</div>
		</header>
	)
}
