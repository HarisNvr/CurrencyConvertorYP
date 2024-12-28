import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './converter.module.scss'
import { CustomSelect } from '../custom-select/custom-select.tsx'
import { useEffect, useState, useRef } from 'react'
import { schemas } from './helper.ts'

export interface MyFormValues {
	currency_from: string
	currency_to: string
	count_to: string
	count_from: string
}
type DebounceFunction<T extends (...args: any[]) => any> = (
	func: T,
	delay: number
) => (...args: Parameters<T>) => void;

export const Converter = () => {
	const currencyApi = import.meta.env.VITE_CURRENCY_API_URL
	const initialValues: MyFormValues = {
		currency_from: 'RUB',
		currency_to: 'EUR',
		count_to: '',
		count_from: '',
	}
	const [currencyFrom, setCurrencyFrom] = useState(initialValues.currency_from)
	const [currencyTo, setCurrencyTo] = useState(initialValues.currency_to)
	const [amount, setAmount] = useState('')
    const setFieldValueRef = useRef<(field: string, value: any) => void | undefined>(null);

	const handleChangeCurrency = () => {
		setCurrencyFrom(currencyTo)
		setCurrencyTo(currencyFrom)
	}

	const debounce: DebounceFunction<(...args: any[]) => void> = (func, delay) => {
		let timeoutId: number;
	
		return (...args: any[]) => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				func.apply(null, args);
			}, delay);
		};
	}
	const fetchConversion = debounce((amount: string) => {
        if (amount) {
            fetch(`${currencyApi}/convert/?from=${currencyFrom}&to=${currencyTo}&amount=${amount}`)
                .then((res) => res.json())
                .then((data) => {
                    if (setFieldValueRef.current) {
                        setFieldValueRef.current('count_to', parseFloat(data.result.toFixed(3)));
                    }
                })
                .catch((error) => console.error('Ошибка:', error));
        }
    },0); 



	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schemas}
			onSubmit={(values) => {
				console.log(values)
			}}
		>
            {(props) => {
                setFieldValueRef.current = props.setFieldValue;
                useEffect(() => {
                    fetchConversion(amount);
                }, [amount, currencyFrom, currencyTo]);

				return (
					<div className={styles.form_container}>
						<Form className={`${styles.form} ${styles.form_from}`}>
							<label htmlFor='count_from' className={styles.label}>
								У меня есть
							</label>
							<Field
								className={styles.form_input}
								type='number'
								name='count_from'
								placeholder='1'
								onKeyPress={(event: KeyboardEvent) => {
									if (!/^\d*$/.test(event.key)) {
										event.preventDefault()
									}
								}}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const value = event.target.value
									if (value.length <= 12) {
										if (value && parseFloat(value) < 0) {
											props.setFieldValue('count_from', '0')
										} else {
											props.setFieldValue('count_from', value)
											setAmount(value)
										}
									}
									if (!value) {
                                        props.setFieldValue('count_to', '');
                                    }
								}}
							/>
							<ErrorMessage
								className={`${styles.error}`}
								name='count_from'
								component='div'
							/>
							<CustomSelect
								init={currencyFrom}
								onChange={(value) => setCurrencyFrom(value)}
							/>
						</Form>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='100'
							height='100'
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
						<Form className={`${styles.form} ${styles.form_to}`}>
							<label htmlFor='count_to' className={styles.label}>
								Получу
							</label>
							<Field
								className={styles.form_input}
								type='number'
								name='count_to'
								placeholder={props.values.count_to || '1'}
								disabled
							/>
							<CustomSelect
								init={currencyTo}
								onChange={(value) => setCurrencyTo(value)}
							/>
						</Form>
					</div>
				)
			}}
		</Formik>
	)
}
