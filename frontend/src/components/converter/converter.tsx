import styles from './converter.module.scss'
import { useEffect, useState, useRef, useCallback } from 'react'
import { CurrencyForm } from '../currency-form/currency-form.tsx'

export interface MyFormValues {
	currency_from: string
	currency_to: string
	count_to: string
	count_from: string
}
type DebounceFunction<T extends (...args: any[]) => any> = (
	func: T,
	delay: number
) => (...args: Parameters<T>) => void

export const Converter = () => {
	const [currencyFrom, setCurrencyFrom] = useState('RUB')
	const [currencyTo, setCurrencyTo] = useState('EUR')
	const [amount, setAmount] = useState('')
	const [convertedAmount, setConvertedAmount] = useState('')

	const handleChangeCurrencyFrom = useCallback((newCurrency: string) => {
		setCurrencyFrom(newCurrency)
	}, [])

	const handleChangeCurrencyTo = useCallback((newCurrency: string) => {
		setCurrencyTo(newCurrency)
	}, [])

	const handleChangeCurrency = () => {
		setCurrencyFrom(currencyTo)
		setCurrencyTo(currencyFrom)
	}

	const debounce: DebounceFunction<(...args: any[]) => void> = (
		func,
		delay
	) => {
		let timeoutId: any

		return (...args: any[]) => {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
			timeoutId = setTimeout(() => {
				func.apply(null, args)
			}, delay)
		}
	}

	const fetchConversion = debounce((amount: string) => {
		if (amount) {
			fetch(
				`/api/convert/?from=${currencyFrom}&to=${currencyTo}&amount=${amount}`
			)
				.then((res) => res.json())
				.then((data) => {
					const result = data.result.toFixed(3)
					setConvertedAmount(result)
				})

				.catch((error) => console.error('Ошибка:', error))
		}
	}, 200)


	useEffect(() => {
		fetchConversion(amount)
	}, [amount, currencyFrom, currencyTo])

	return (
		<div className={styles.form_container}>
			<CurrencyForm
				label='У меня есть'
				fieldName='count_from'
				currency={currencyFrom}
				setCurrency={handleChangeCurrencyFrom}
				amount={amount}
				setAmount={setAmount}
			/>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='100px'
				height='100px'
				viewBox='0 0 100 100'
				fill='none'
				className={styles.icon}
				onClick={handleChangeCurrency}
			>
				<rect width='90' height='90' x='5' y='5' fill='#2250C4' rx='45' />
				<rect
					width='90'
					height='90'
					x='5'
					y='5'
					stroke='#E1E8F0'
					strokeWidth='10'
					rx='45'
				/>
				<path
					fill='#fff'
					d='M38 50.1c0 .533.033 1.058.1 1.575.067.517.183 1.025.35 1.525.167.567.15 1.108-.05 1.625-.2.517-.55.892-1.05 1.125-.533.267-1.058.292-1.575.075-.517-.217-.858-.608-1.025-1.175a12.73 12.73 0 0 1-.575-2.35c-.117-.8-.175-1.6-.175-2.4 0-4.467 1.55-8.267 4.65-11.4C41.75 35.567 45.533 34 50 34h.35l-1.8-1.8c-.367-.367-.55-.833-.55-1.4s.183-1.033.55-1.4c.367-.367.833-.55 1.4-.55s1.033.183 1.4.55l5.2 5.2c.4.4.6.867.6 1.4 0 .533-.2 1-.6 1.4l-5.2 5.2c-.367.367-.833.55-1.4.55s-1.033-.183-1.4-.55c-.367-.367-.55-.833-.55-1.4s.183-1.033.55-1.4l1.8-1.8H50c-3.333 0-6.167 1.175-8.5 3.525-2.333 2.35-3.5 5.208-3.5 8.575Zm24-.2c0-.533-.033-1.058-.1-1.575a8.082 8.082 0 0 0-.35-1.525c-.167-.567-.15-1.108.05-1.625.2-.517.55-.892 1.05-1.125.533-.267 1.058-.292 1.575-.075.517.217.858.608 1.025 1.175.267.767.458 1.55.575 2.35.117.8.175 1.6.175 2.4 0 4.467-1.55 8.267-4.65 11.4C58.25 64.433 54.467 66 50 66h-.35l1.8 1.8c.367.367.55.833.55 1.4s-.183 1.033-.55 1.4c-.367.367-.833.55-1.4.55s-1.033-.183-1.4-.55l-5.2-5.2c-.4-.4-.6-.867-.6-1.4 0-.533.2-1 .6-1.4l5.2-5.2c.367-.367.833-.55 1.4-.55s1.033.183 1.4.55c.367.367.55.833.55 1.4s-.183 1.033-.55 1.4l-1.8 1.8H50c3.333 0 6.167-1.175 8.5-3.525 2.333-2.35 3.5-5.208 3.5-8.575Z'
				/>
			</svg>
			<CurrencyForm
				label='Получу'
				fieldName='count_to'
				currency={currencyTo}
				setCurrency={handleChangeCurrencyTo}
				amount={amount === '' ? '' : convertedAmount}
			/>
		</div>
	)
}
