import { useCallback, useState } from 'react'
import { subDays, startOfDay, endOfDay } from 'date-fns'
import { ApexOptions } from 'apexcharts'
import styles from './chart.module.scss'
import ReactApexChart from 'react-apexcharts'

const randomData = () => {
	const data = []
	const oneDay = 24 * 60 * 60 * 1000
	const firstDay = new Date('2024-01-01T00:00:00Z').getTime()
	for (let i = 0; i < 365; i++) {
		const timestamp = firstDay + i * oneDay
		const value = (Math.random() * (35 - 10) + 10).toFixed(2)
		data.push({ x: timestamp, y: parseFloat(value) })
	}
	return data
}

const generatedData = randomData()

interface DataPoint {
	x: number
	y: number
}

interface SeriesData {
	name: string
	data: DataPoint[]
	selection: string
}
export const ChartData = () => {
	const [seriesData, setSeriesData] = useState<SeriesData>({
		name: 'dollar',
		data: generatedData,
		selection: 'year',
	})

	const initializeOptions = useCallback(
		(period: string): { series: SeriesData[]; options: ApexOptions } => {
			const [startDate, endDate] = getStartAndEndTime(period)
			return {
				series: [seriesData],
				options: {
					chart: {
						id: 'area-datetime',
						fontFamily: 'Inter, Arial, sans-serif',
						defaultLocale: 'ru',
						locales: [
							{
								name: 'ru',
								options: {
									months: [
										'Январь',
										'Февраль',
										'Март',
										'Апрель',
										'Май',
										'Июнь',
										'Июль',
										'Август',
										'Сентябрь',
										'Октябрь',
										'Ноябрь',
										'Декабрь',
									],
									shortMonths: [
										'Янв',
										'Фев',
										'Мар',
										'Апр',
										'Май',
										'Июн',
										'Июл',
										'Авг',
										'Сен',
										'Окт',
										'Ноя',
										'Дек',
									],
									days: [
										'Воскресенье',
										'Понедельник',
										'Вторник',
										'Среда',
										'Четверг',
										'Пятница',
										'Суббота',
									],
									shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
								},
							},
						],
						toolbar: {
							show: true,
							offsetX: -5,
							tools: {
								customIcons: [
									{
										icon: `<svg class=${styles.icon_notification} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 44 44" width="40" height="40"><rect width="44" height="44" fill="#EDF4FC" rx="12"/><path fill="#1E1E1E" d="M31 16.666a.75.75 0 0 1-1.011-.321 8.825 8.825 0 0 0-3.137-3.46.752.752 0 0 1-.234-1.035.748.748 0 0 1 1.035-.235 10.45 10.45 0 0 1 3.667 4.04.75.75 0 0 1-.32 1.01Zm-17.653.084a.75.75 0 0 0 .666-.405 8.824 8.824 0 0 1 3.137-3.46.75.75 0 0 0-.8-1.27 10.45 10.45 0 0 0-3.668 4.04.75.75 0 0 0 .665 1.095Zm17.447 9.744A1.5 1.5 0 0 1 29.5 28.75h-3.826a3.75 3.75 0 0 1-7.35 0H14.5a1.5 1.5 0 0 1-1.292-2.256c.844-1.457 1.292-3.53 1.292-5.994a7.5 7.5 0 0 1 15 0c0 2.463.449 4.535 1.295 5.994ZM24.12 28.75H19.88a2.25 2.25 0 0 0 4.241 0Zm5.38-1.5c-.998-1.713-1.5-3.983-1.5-6.75a6 6 0 1 0-12 0c0 2.767-.505 5.038-1.5 6.75h15Z"/></svg>`,
										index: 7,
										title: 'notification 2',
										click: function (chart, options, e) {
											chart.addXaxisAnnotation({
												x: 40,
												label: {
													text: 'Lorem Ipsum',
												},
											})
										},
									},
									{
										icon: `<img  src="" />`,
										index: 6,
										title: 'empty',
										class: 'custom-icon',
										click: function (chart, options, e) {},
									},
								],
							},
						},
						zoom: {
							autoScaleYaxis: true,
						},
					},
					dataLabels: {
						enabled: false,
					},
					grid: {
						show: true,
						borderColor: '#d9d9d9',
						strokeDashArray: 0,
						position: 'back',
						yaxis: {
							lines: {
								show: true,
							},
						},
						padding: {
							top: 50,
							right: 30,
							bottom: 10,
							left: 10,
						},
					},

					xaxis: {
						type: 'datetime',
						axisTicks: {
							show: true,
							borderType: 'solid',
							color: '#1e1e1e',
							offsetX: 0,
							offsetY: 15,
						},
						tooltip: {
							enabled: false,
						},
						labels: {
							format: getDateFormat(period),
							offsetY: 10,
							style: {
								fontSize: '16px',
							},
						},

						min: startDate,
						max: endDate,
					},
					yaxis: {
						show: true,
						opposite: true,
						min: (min) => min - min * 0.2,
						max: (max) => max + max * 0.1,
						stepSize: 5,
						forceNiceScale: true,
						floating: false,
						decimalsInFloat: 0,
						labels: {
							style: {
								fontSize: '16px',
							},
							offsetX: 0,
						},
					},

					fill: {
						type: 'solid',
						opacity: 0,
					},

					stroke: {
						show: true,
						curve: 'smooth',
						lineCap: 'butt',
						colors: ['#2250c4'],
						width: 2,
						dashArray: 0,
					},
					tooltip: {
						enabled: true,
						shared: true,
						followCursor: false,
						style: {
							fontSize: '16px',
							fontFamily: 'Inter, Arial, sans-serif',
						},
						x: {
							show: true,
							formatter: (value) => {
								const date = new Date(value)
								return date.toLocaleDateString('ru-RU', {
									weekday: 'short',
									year: 'numeric',
									month: 'short',
									day: 'numeric',
								})
							},
						},
						y: {
							formatter: undefined,
							title: {
								formatter: () => seriesData.name,
							},
						},

						marker: {
							show: true,
							fillColors: ['#2250c4'],
						},
						items: {
							display: 'flex',
						},
					},
				},
			}
		},
		[seriesData]
	)

	const getStartAndEndTime = (period: string) => {
		const now = new Date()
		const endDate = endOfDay(now).getTime()
		let startDate

		switch (period) {
			case 'day':
				startDate = startOfDay(now).getTime()
				break
			case 'week':
				startDate = startOfDay(subDays(now, 7)).getTime()
				break
			case 'month':
				startDate = startOfDay(subDays(now, 30)).getTime()
				break
			case 'year':
				startDate = startOfDay(subDays(now, 367)).getTime()
				break
			default:
				throw new Error('Unknown period: ' + period)
		}

		return [startDate, endDate]
	}
	const getDateFormat = (period: string) => {
		switch (period) {
			case 'day':
				return 'HH:mm'
			case 'week':
				return 'ddd, d'
			case 'month':
				return 'dd MMM'
			case 'year':
				return 'MMM yy'
			default:
				throw new Error('Неизвестный период: ' + period)
		}
	}

	const [option, setOptions] = useState<{
		series: SeriesData[]
		options: ApexOptions
	}>(initializeOptions('year'))

	const zoomChart = (buttonId: string) => {
		setSeriesData((prevState) => ({
			...prevState,
			selection: buttonId,
		}))
		setOptions(initializeOptions(buttonId))
	}

	const buttons = [
		{ id: 'day', name: 'день' },
		{ id: 'week', name: 'неделя' },
		{ id: 'month', name: 'месяц' },
		{ id: 'year', name: 'Год' },
	]

	return (
		<>
			<div className={styles.container_chart}>
				<div className={styles.button_container}>
					{buttons.map((item) => (
						<button
							key={item.id}
							id={item.id}
							className={`${styles.button} ${seriesData.selection === item.id ? styles.active : ''}`}
							onClick={() => zoomChart(item.id)}
						>
							{item.name}
						</button>
					))}
					<div className={styles.info_block}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='20'
							fill='none'
							className={styles.icon}
						>
							<path
								fill='#858585'
								d='M10 15c.283 0 .52-.096.713-.287A.968.968 0 0 0 11 14v-4a.967.967 0 0 0-.287-.713A.968.968 0 0 0 10 9a.968.968 0 0 0-.713.287A.968.968 0 0 0 9 10v4c0 .283.096.52.287.713.192.191.43.287.713.287Zm0-8c.283 0 .52-.096.713-.287A.967.967 0 0 0 11 6a.967.967 0 0 0-.287-.713A.968.968 0 0 0 10 5a.968.968 0 0 0-.713.287A.968.968 0 0 0 9 6c0 .283.096.52.287.713.192.191.43.287.713.287Zm0 13a9.738 9.738 0 0 1-3.9-.788 10.099 10.099 0 0 1-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.738 9.738 0 0 1 0 10c0-1.383.263-2.683.787-3.9a10.099 10.099 0 0 1 2.138-3.175c.9-.9 1.958-1.612 3.175-2.137A9.738 9.738 0 0 1 10 0c1.383 0 2.683.263 3.9.787a10.098 10.098 0 0 1 3.175 2.138c.9.9 1.613 1.958 2.137 3.175A9.738 9.738 0 0 1 20 10a9.738 9.738 0 0 1-.788 3.9 10.098 10.098 0 0 1-2.137 3.175c-.9.9-1.958 1.613-3.175 2.137A9.738 9.738 0 0 1 10 20Zm0-2c2.233 0 4.125-.775 5.675-2.325C17.225 14.125 18 12.233 18 10c0-2.233-.775-4.125-2.325-5.675C14.125 2.775 12.233 2 10 2c-2.233 0-4.125.775-5.675 2.325C2.775 5.875 2 7.767 2 10c0 2.233.775 4.125 2.325 5.675C5.875 17.225 7.767 18 10 18Z'
							/>
						</svg>
						<p className={styles.text}>
							Динамика курса выбранной <br /> валюты относительно целевой
						</p>
					</div>
				</div>

				<ReactApexChart
					options={option.options}
					series={option.series}
					height={340}
					width={1100}
					type='area'
					className={styles.apexcharts_toolbar}
				/>
			</div>
		</>
	)
}
