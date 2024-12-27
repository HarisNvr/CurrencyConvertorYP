import * as Yup from 'yup'

const regex = {
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/,
}

export const schemas = Yup.object().shape({
	email: Yup.string()
		.matches(regex.email, '* Введите адрес почты вида Ivan@mail.ru')
		.required('* Некоторые поля остались незаполненными'),
	password: Yup.string()
		.required('* Некоторые поля остались незаполненными')
		.min(3, '* Пароль слишком короткий'),
	repeat_password: Yup.string()
		.required('* Некоторые поля остались незаполненными')
		.oneOf([Yup.ref('password')], '* Пароли не совпадают'),
})

export const initialValues: MyFormValues = {
	email: '',
	password: '',
	repeat_password: '',
}

export interface MyFormValues {
	email: string
	password: string
	repeat_password: string
}
