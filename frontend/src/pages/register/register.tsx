import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { initialValues, schemas } from './helper.ts'
import visibility from '../../assets/svg/visibility.svg'
import visibilityOff from '../../assets/svg/visibility_off.svg'
import styles from './register.module.scss'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
	const navigate = useNavigate();
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
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={schemas}
				onSubmit={(values, actions) => {
					console.log(values)
					actions.resetForm()
					setVisibilityIcon(visibility)
					setType('password')
				}}
			>
				{(props) => (
					<Form className={`${styles.form}`}>
						<h2 className={`${styles.h2}`}>Регистрация</h2>
						<button className={`${styles.button_close}`} type='button' onClick={()=> navigate('/')}></button>
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

							<div className={`${styles.input_container}`}>
								<Field
									className={`${styles.input} ${props.touched.repeat_password && props.errors.repeat_password && styles.input_error}`}
									type={type}
									name='repeat_password'
									placeholder='Повторите пароль'
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
							{props.errors.email !== props.errors.repeat_password &&
								props.errors.password !== props.errors.repeat_password && (
									<ErrorMessage
										className={`${styles.error}`}
										name='repeat_password'
										component='div'
									/>
								)}
						</fieldset>
						<button
							className={`${styles.button_register} ${props.touched.email && props.touched.password && props.touched.repeat_password && !props.isValid && styles.button_register_disabled}`}
							type='submit'
							disabled={
								props.touched.email &&
								props.touched.password &&
								props.touched.repeat_password &&
								!props.isValid
							}
						>
							Зарегистрироваться
						</button>
					</Form>
				)}
			</Formik>
		</>
	)
}
