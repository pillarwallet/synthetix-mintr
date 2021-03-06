import themeDark from './dark';

const fontFamilies = {
	regular: 'EuclidCircularB-Regular',
	medium: 'Archia-medium',
};

export const isDarkTheme = theme => true;
export const isLightTheme = theme => false;

const theme = themeName => {
	const themeIsDark = isDarkTheme(themeName);
	const themeIsLight = isLightTheme(themeName);
	const colorStyles = themeDark;
	const textStyles = {
		h1: {
			as: 'h1',
			fontSize: [32],
			letterSpacing: 2,
			fontFamily: fontFamilies.medium,
			color: colorStyles.heading,
			m: '30px 0px 8px 0px',
		},
		h2: {
			as: 'h2',
			fontSize: [24],
			letterSpacing: 2,
			fontFamily: fontFamilies.medium,
			color: colorStyles.heading,
			m: '30px 0px 20px 0px',
		},
		pageTitle: {
			as: 'h3',
			fontSize: [24],
			fontFamily: fontFamilies.regular,
			color: colorStyles.heading,
		},
		h4: {
			as: 'h4',
			fontSize: [22],
			fontFamily: fontFamilies.medium,
			color: colorStyles.heading,
		},
		h5: {
			as: 'h5',
			fontSize: [14, 16, 18],
			letterSpacing: 1,
			fontWeight: 500,
			fontFamily: fontFamilies.medium,
			color: colorStyles.heading,
			m: '0px 0px 24px 0px',
		},
		h6: {
			as: 'h6',
			fontSize: [16],
			letterSpacing: 0.3,
			fontWeight: 500,
			fontFamily: fontFamilies.medium,
			color: colorStyles.body,
			m: '0px 0px 20px 0px',
		},
		pMega: {
			as: 'p',
			fontSize: [20],
			lineHeight: ['28px'],
			fontFamily: fontFamilies.regular,
			color: colorStyles.body,
			m: '24px 0px 0px 0px',
		},
		pLarge: {
			as: 'p',
			fontSize: [16],
			lineHeight: ['14px', '18px', '22px'],
			fontFamily: fontFamilies.regular,
			color: colorStyles.body,
		},
		pMedium: {
			as: 'p',
			fontSize: [14],
			lineHeight: ['16px'],
			fontFamily: fontFamilies.regular,
			color: colorStyles.body,
		},
		pSmall: {
			as: 'p',
			fontSize: [12],
			fontWeight: 400,
			lineHeight: ['14px'],
			fontFamily: fontFamilies.regular,
			color: colorStyles.body,
		},
		pTiny: {
			as: 'p',
			fontSize: [10],
			fontWeight: 400,
			lineHeight: ['14px'],
			fontFamily: fontFamilies.regular,
			color: colorStyles.body,
			letterSpacing: 0.5,
		},
		subtext: {
			as: 'p',
			fontSize: [10, 12, 14],
			lineHeight: ['18px'],
			fontWeight: 400,
			fontFamily: fontFamilies.regular,
			color: colorStyles.subtext,
			letterSpacing: 0.5,
		},
		dataMega: {
			as: 'span',
			fontSize: [10, 12, 24],
			lineHeight: ['12px', '14px', '16px'],
			fontWeight: 400,
			fontFamily: fontFamilies.medium,
			color: colorStyles.heading,
			letterSpacing: 0.2,
		},
		dataLarge: {
			as: 'span',
			fontSize: [10, 12, 14],
			lineHeight: ['12px', '14px', '16px'],
			fontWeight: 400,
			fontFamily: fontFamilies.regular,
			color: colorStyles.heading,
			letterSpacing: 0.5,
		},
		dataSmall: {
			as: 'span',
			fontSize: [10, 12],
			lineHeight: ['12px', '14px', '16px'],
			fontWeight: 400,
			fontFamily: fontFamilies.regular,
			color: colorStyles.heading,
			letterSpacing: 0.5,
		},
		dataHeaderLarge: {
			as: 'span',
			fontSize: [14],
			fontFamily: fontFamilies.regular,
			color: colorStyles.body,
		},
		dataHeaderSmall: {
			as: 'span',
			fontSize: [10, 12],
			lineHeight: ['12px', '14px', '16px'],
			fontWeight: 600,
			fontFamily: fontFamilies.medium,
			color: colorStyles.body,
			letterSpacing: 1,
		},
		tableHeaderMedium: {
			as: 'span',
			fontSize: [12, 14],
			fontFamily: fontFamilies.bold,
			fontWeight: 700,
			letterSpacing: 0.5,
			color: colorStyles.tableHeading,
		},
		tableDataMedium: {
			as: 'span',
			fontSize: [12, 14],
			fontFamily: fontFamilies.regular,
			fontWeight: 400,
			color: colorStyles.tableBody,
		},
		figure: {
			as: 'span',
			fontSize: [16, 24, 32],
			lineHeight: ['16px', '24px', '32px'],
			fontWeight: 500,
			fontFamily: fontFamilies.medium,
			color: colorStyles.body,
			letterSpacing: 1,
			m: '0px 0px 8px 0px',
		},
		buttonPrimaryLabel: {
			as: 'span',
			fontSize: [20],
			fontFamily: fontFamilies.regular,
			color: colorStyles.buttonPrimaryText,
		},
		buttonPrimaryLabelMedium: {
			as: 'span',
			fontSize: [10, 12, 14],
			fontFamily: fontFamilies.regular,
			color: colorStyles.buttonPrimaryText,
			letterSpacing: 1,
		},
		buttonPrimaryLabelSmall: {
			as: 'span',
			fontSize: [10, 12, 14],
			fontFamily: fontFamilies.regular,
			color: colorStyles.buttonPrimaryText,
			letterSpacing: 1,
		},
		buttonSecondaryLabel: {
			as: 'span',
			fontSize: [12, 14, 16],
			lineHeight: ['16px', '24px', '32px'],
			fontFamily: fontFamilies.regular,
			color: colorStyles.hyperlink,
			letterSpacing: 2,
		},
		buttonTertiaryLabel: {
			as: 'span',
			fontSize: [10, 12, 14],
			lineHeight: ['12px', '14px', '16px'],
			fontFamily: fontFamilies.regular,
			color: colorStyles.buttonTertiaryText,
			letterSpacing: 0.6,
		},
		inputLabelSmall: {
			as: 'label',
			fontSize: [10, 12, 14],
			fontWeight: 400,
			fontFamily: fontFamilies.regular,
			color: colorStyles.tableBody,
			letterSpacing: 0,
		},
		hyperlinkSmall: {
			as: 'span',
			fontSize: [14],
			fontWeight: 500,
			fontFamily: fontFamilies.medium,
			color: colorStyles.hyperlink,
			letterSpacing: 0.5,
		},
	};
	return {
		textStyles,
		colorStyles,
		fontFamilies,
		name: themeName,
		isDarkTheme: themeIsDark,
		isLightTheme: themeIsLight,
	};
};

export const darkTheme = theme('dark');
export const lightTheme = theme('light');

export default theme;
