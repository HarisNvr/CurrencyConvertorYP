import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { initialValues, schemas } from './helper.ts'
import visibility from '../../assets/svg/visibility.svg'
import visibilityOff from '../../assets/svg/visibility_off.svg'
import styles from './login.module.scss'

export const Login = () => {
	const [type, setType] = useState('password')
	const [visibilityIcon, setVisibilityIcon] = useState(visibilityOff)

	const handleFieldTypeToggle = () => {
		if (type === 'password') {
			setVisibilityIcon(visibility)
			setType('text')
		} else {
			setVisibilityIcon(visibilityOff)
			setType('password')
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schemas}
			onSubmit={(values, actions) => {
				console.log(values)
				actions.resetForm()
			}}
		>
			{(props) => (
				<Form className={`${styles.form}`}>
					<h2 className={`${styles.h2}`}>Вход</h2>
					<button className={`${styles.button_close}`} type='button'></button>

					<fieldset className={`${styles.fieldset}`}>
						<Field
							className={`${styles.input} ${props.touched.email && props.errors.email && styles.input_error}`}
							type='email'
							name='email'
							placeholder='Email'
						/>

						<div className={`${styles.input_container}`}>
							<Field
								className={`${styles.input} ${props.touched.password && props.errors.password && styles.input_error}`}
								type={type}
								name='password'
								placeholder='Пароль'
							/>
							<button
								className={`${styles.button_visibility}`}
								type='button'
								onClick={handleFieldTypeToggle}
							>
								<img
									className={`${styles.visibility_icon}`}
									src={visibilityIcon}
								/>
							</button>
						</div>

						<ErrorMessage
							className={`${styles.error}`}
							name='email'
							component='div'
						/>
						{props.errors.email !== props.errors.password && (
							<ErrorMessage
								className={`${styles.error}`}
								name='password'
								component='div'
							/>
						)}
					</fieldset>
					<button
						className={`${styles.button_login} ${props.touched.email && props.touched.password && !props.isValid && styles.button_login_disabled}`}
						type='submit'
						disabled={
							props.touched.email && props.touched.password && !props.isValid
						}
					>
						Войти
					</button>
				</Form>
			)}
		</Formik>
	)
}
