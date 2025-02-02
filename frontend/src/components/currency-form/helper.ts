import * as Yup from 'yup'

export const schemas = Yup.object().shape({
	count_from: Yup.string().max(11, '* Достигнут максимальный лимит ввода '),
})
