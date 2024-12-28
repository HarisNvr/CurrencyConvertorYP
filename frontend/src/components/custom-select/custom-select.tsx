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
		{ value: 'AMD', label: 'AMD', flag: flags.Arm },
		{ value: 'AUD', label: 'AUD', flag: flags.Aus },
		{ value: 'AZN', label: 'AZN', flag: flags.Aze },
		{ value: 'BYN', label: 'BYN', flag: flags.Bel },
		{ value: 'BRL', label: 'BRL', flag: flags.Bra },
		{ value: 'BGN', label: 'BGN', flag: flags.Bul },
		{ value: 'CAD', label: 'CAD', flag: flags.Can },
		{ value: 'CNY', label: 'CNY', flag: flags.Chi },
		{ value: 'CZK', label: 'CZK', flag: flags.Cze },
		{ value: 'DKK', label: 'DKK', flag: flags.Den },
		{ value: 'EUR', label: 'EUR', flag: flags.EUR },
		{ value: 'GEL', label: 'GEL', flag: flags.Geo },
		{ value: 'GBP', label: 'GBP', flag: flags.GB },
		{ value: 'HKD', label: 'HKD', flag: flags.HK },
		{ value: 'HUF', label: 'HUF', flag: flags.Hun },
		{ value: 'INR', label: 'INR', flag: flags.Ind },
		{ value: 'JPY', label: 'JPY', flag: flags.Jap },
		{ value: 'KRW', label: 'KRW', flag: flags.Kor },
		{ value: 'KGS', label: 'KGS', flag: flags.Kyr },
		{ value: 'LAT', label: 'EUR', flag: flags.Lat },
		{ value: 'LIT', label: 'EUR', flag: flags.Lit },
		{ value: 'MDL', label: 'MDL', flag: flags.Mol },
		{ value: 'NOK', label: 'NOK', flag: flags.Nor },
		{ value: 'PLN', label: 'PLN', flag: flags.Pol },
		{ value: 'ZAR', label: 'ZAR', flag: flags.RSA },
		{ value: 'RON', label: 'RON', flag: flags.Rom },
		{ value: 'RUB', label: 'RUB', flag: flags.Rus },
		{ value: 'SGD', label: 'SGD', flag: flags.Sin },
		{ value: 'SEK', label: 'SEK', flag: flags.Swe },
		{ value: 'CHF', label: 'CHF', flag: flags.Swi },
		{ value: 'TJS', label: 'TJS', flag: flags.Tad },
		{ value: 'THB', label: 'THB', flag: flags.Tha },
		{ value: 'TRY', label: 'TRY', flag: flags.Tur },
		{ value: 'TMT', label: 'TMT', flag: flags.Turk },
		{ value: 'AED', label: 'AED', flag: flags.UAE },
		{ value: 'USD', label: 'USD', flag: flags.USA },
		{ value: 'UAH', label: 'UAH', flag: flags.UK },
		{ value: 'UZS', label: 'UZS', flag: flags.Uzb },
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
