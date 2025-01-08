import * as Yup from 'yup'

const regex = {
	email: /^[a-zA-Z0-9_/.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/,
}

export const schemas = Yup.object().shape({
	email: Yup.string()
		.matches(regex.email, '* Введите адрес почты вида Ivan@mail.ru')
		.required('* Некоторые поля остались незаполненными'),

	password: Yup.string().required('* Некоторые поля остались незаполненными'),
})

export interface MyFormValues {
	email: string
	password: string
}

export const initialValues: MyFormValues = {
	email: '',
	password: '',
}
