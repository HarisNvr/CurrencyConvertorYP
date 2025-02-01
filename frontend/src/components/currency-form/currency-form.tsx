import React from 'react'
import { CustomSelect } from '../custom-select'
import styles from './currency-form.module.scss'
import { schemas } from './helper'

interface CurrencyFormProps {
	label: string
	fieldName: string
	currency: string
	setCurrency: (value: string) => void
	amount: string
	setAmount?: (value: string) => void
}

export const CurrencyForm: React.FC<CurrencyFormProps> = React.memo(
	({ label, fieldName, currency, setCurrency, amount, setAmount }) => {
		const [error, setError] = React.useState<string | null>(null)
		const validateAmount = (value: string) => {
			schemas
				.validate({ count_from: value })
				.then(() => setError(null))
				.catch((err) => setError(err.message))
		}
		return (
			<div
				className={`${styles.form} ${fieldName === 'count_from' ? styles.form_from : styles.form_to}`}
			>
				<label htmlFor={fieldName} className={styles.label}>
					{label}
				</label>
				<input
					className={styles.form_input}
					type='number'
					name={fieldName}
					placeholder='1'
					value={amount}
					onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
						if (
							!/^\d$/.test(event.key) &&
							event.key !== 'Backspace' &&
							event.key !== 'Delete' &&
							event.key !== 'ArrowLeft' &&
							event.key !== 'ArrowRight' &&
							event.key !== 'Tab'
						) {
							event.preventDefault()
						}
					}}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						const value = event.target.value
						if (value.length <= 12) {
							if (value && parseFloat(value) < 0) {
								setAmount?.('0')
							} else {
								setAmount?.(value)
							}
							validateAmount(value)
						}
					}}
				/>
				{error && <div className={styles.error}>{error}</div>}
				<CustomSelect init={currency} onChange={setCurrency} />
			</div>
		)
	}
)
