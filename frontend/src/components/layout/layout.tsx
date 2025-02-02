import React, { FC, memo, ReactNode } from 'react'
import { Header } from '../header'
import styles from './layout.module.scss'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				{' '}
				<Outlet />
			</main>
		</div>
	)
}
