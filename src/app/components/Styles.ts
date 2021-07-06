import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
    minHeight: 600,
    padding: theme.spacing(4),
    alignItems: 'center',
    alignContent: 'center',
    margin: 'auto',
    flexDirection: 'row',
  },
  passwordInput: {
    textSecurity: 'disc',
  },
  errorDiv: {
    paddingLeft: '10px',
    width: '100%',
    color: 'red',
    minHeight: '50px',
    lineHeight: '50px',
    backgroundColor: '#FDE6E5',
  },
  errorText: {
  },
  paddingTop: {
    marginTop: '100px',
  },
  inputWithHint: {
    backgroundColor: 'red',
    display: 'flex',
  },
  inputError: {
    border: '1px solid red',
  },
  textError: {
    fontSize: '0.8rem',
    color: 'red',
  },
  privateKeyTextInput: {
    marginBottom: '10px',
  },
  doneIcon: {
    color: 'green',
    float: 'left',
  },
  badFormat: {
    color: 'red',
    float: 'left',
  },
  fileNameText: {
    textAlign: 'left',
  },
  clearIcon: {
    float: 'right',
  },
  fileContainer: {
    display: 'flex',
    padding: '10px',
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    alignContent: 'center',
    height: '50px',
    border: 'dashed thin gray',
  },
  guideStepsContainerPaper: {
    cursor: 'pointer',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: 'aliceblue',
    },
  },
  bigSquareButton: {
    minHeight: 150,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  bigSquareButtonGrid: {
    margin: 'auto',
    textAlign: 'center',
  },
  bigSquareButtonIcon: {
    width: 30,
    height: 30,
    maxWidth: 30,
    maxHeight: 30,
    margin: 'auto',
  },
  gridContainer: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  rowGridContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  guideStep: {
    marginBottom: theme.spacing(1),
  },
  guideStepText: {
    fontSize: 14,
  },
  arrowIcon: {
    float: 'right',
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    alignSelf: 'center',
    marginTop: theme.spacing(1),
  },
  paperContainer: {
    padding: 30,
  },
  tableWithBorder: {
    border: `1px solid ${theme.palette.divider}`,
  },
  Link: {
    cursor: 'pointer',
    color: `${theme.palette.text.primary}!important`,
    borderColor: `${theme.palette.text.primary}!important`,
  },
  overviewSearch: {
    '& > .MuiFormControl-root': {
      '& > .MuiInputBase-root, & > .MuiInputBase-root:hover, & > .MuiInputBase-root:focus, & > .MuiInputBase-root:active': {
        // border: '1px solid #5B6C84',
        borderBottomColor: 0,
        borderTopColor: 0,
        borderLeftColor: 0,
        borderRightColor: 0,
        '-webkit-appearance': 'none',
        borderRadius: 6,
        backgroundColor: 'white!important',
        '& > .MuiInputAdornment-root > .MuiButtonBase-root': {
          backgroundColor: '#5B6C84',
          height: 38,
          width: 38,
          marginRight: -13,
          borderBottomRightRadius: 5,
          borderTopRightRadius: 5,
        },
        '& > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label': {
          color: 'white',
        },
        '& > .MuiInputBase-input': {
          borderBottomColor: 0,
          borderTopColor: 0,
          borderLeftColor: 0,
          borderRightColor: 0,
        },
      },
    },
  },
  appBarSearch: {
    display: 'inline-flex',
    '& > .MuiFormControl-root': {
      '& > .MuiInputBase-root': {
        border: '1px solid #5B6C84',
        color: '#5B6C84',
        width: 340,
        display: 'inline-flex',
        margin: 'auto',
        marginRight: 10,
        '& > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label': {
          color: 'white',
        },
        '& > .MuiInputAdornment-root > .MuiButtonBase-root': {
          borderColor: 'white',
        },
        '& > .MuiInputBase-input': {
        },
      },
    },
  },
}));

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptopM: '960px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const mediaQueryDevices = {
  mobileS: `min-width: ${size.mobileS}`,
  mobileM: `min-width: ${size.mobileM}`,
  mobileL: `min-width: ${size.mobileL}`,
  tablet: `min-width: ${size.tablet}`,
  laptop: `min-width: ${size.laptop}`,
  laptopM: `min-width: ${size.laptopM}`,
  laptopL: `min-width: ${size.laptopL}`,
  desktop: `min-width: ${size.desktop}`,
  desktopL: `min-width: ${size.desktop}`,
};
