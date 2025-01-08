import styles from './custom-select.module.scss'
import * as flags from '../../assets/png/flags/index.ts'
import arrow from '../../assets/svg/keyboard_arrow_down.svg'
import { FC, memo, useEffect, useRef, useState } from 'react'

type TSelect = {
	init: string
	onChange: (item: string) => void
}
export const CustomSelect: FC<TSelect> = memo(({ init, onChange }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [value, setValue] = useState({
		label: '',
		flag: '',
		value: '',
	})
	const selectRef = useRef<HTMLDivElement>(null)
	const currencyOptions = [
		{ value: 'EUR', label: 'EUR', flag: flags.EUR },
		{ value: 'USD', label: 'USD', flag: flags.USA },
		{ value: 'RUB', label: 'RUB', flag: flags.Rus },
		{ value: 'BYN', label: 'BYN', flag: flags.Bel },
		{ value: 'CHF', label: 'CHF', flag: flags.Swi },
		{ value: 'CNY', label: 'CNY', flag: flags.Chi },
		{ value: 'INR', label: 'INR', flag: flags.Ind },
		{ value: 'GBP', label: 'GBP', flag: flags.GB },
		{ value: 'TRY', label: 'TRY', flag: flags.Tur },
		{ value: 'JPY', label: 'JPY', flag: flags.Jap },
	  ]
	
	const handleClickOutside = (event: MouseEvent) => {
		if (
			selectRef.current &&
			!selectRef.current.contains(event.target as Node)
		) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		const initialValue = currencyOptions.find((option) => option.value === init)
		if (initialValue) {
			setValue(initialValue)
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [init])

	const handleSelectChange = (item: any) => {
		setValue(item)
		if (onChange) {
			onChange(item.value)
		}
	}
	return (
		<div
			className={`${styles.select} ${isOpen ? styles.select_open : ''}`}
			ref={selectRef}
			onClick={() => setIsOpen((prev) => !prev)}
		>
			<div className={styles.select_container}>
				<div className={styles.select_container_item}>
					<img
						src={value.flag}
						className={styles.select_container_item_flag}
						alt='флаг страны'
					/>
					<span className={styles.select_container_item_label}>
						{value.label}{' '}
					</span>
				</div>
				<img src={arrow}></img>
			</div>
			<div
				className={`${styles.options} ${isOpen ? styles.options_open : ''} `}
			>
				{currencyOptions.map((item) => (
					<div
						className={styles.select_container_item}
						key={item.value}
						onClick={() => handleSelectChange(item)}
					>
						<img
							src={item.flag}
							className={styles.select_container_item_flag}
							alt='флаг страны'
						/>
						<span className={styles.select_container_item_label}>
							{' '}
							{item.label}
						</span>
					</div>
				))}
			</div>
		</div>
	)
})
