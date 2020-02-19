import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import FormLabel from "@material-ui/core/FormLabel";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import Autorenew from "@material-ui/icons/Autorenew";
import Forward from "@material-ui/icons/Forward";
import AddAlert from "@material-ui/core/SvgIcon/SvgIcon";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  }
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellAmount: "",
      sellAmountState: "",
      buyAmount: "<span>Recieve Amount <small></small></span>",
      buyAmountState: "",
      address: "",
      addressState: "",
      buyCurrency: "ETH",
      sellCurrency: "BTC",
      currencies: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://ctyvahls-dev.outsystemsenterprise.com/EXCHANGE_CS/rest/Asset/GetAllAsset`
      )
      .then(res => {
        const currencies = res.data;
        this.setState({ currencies });
      });
  }

  sendState() {
    return this.state;
  }

  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  verifyNumber(value, min) {
    if (min >= value) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }

  isValidated() {
    return true;
    if (
      this.state.sellAmountState === "success" &&
      this.state.buyAmountState === "success" &&
      this.state.addressState === "success"
    ) {
      return true;
    } else {
      if (this.state.sellAmountState !== "success") {
        this.setState({ sellAmountState: "error" });
      }
      if (this.state.buyAmountState !== "success") {
        this.setState({ buyAmountState: "error" });
      }
      if (this.state.addressState !== "success") {
        this.setState({ addressState: "error" });
      }
    }
    return false;
  }

  buyCurrencyCheck(value) {
    if (this.state.sellCurrency != value) {
      this.setState({ buyCurrency: value });
    } else {
      console.log("error");
    }
  }

  sellCurrencyCheck(value) {
    if (this.state.buyCurrency != value) {
      this.setState({ sellCurrency: value });
    } else {
      console.log("error");
    }
  }

  sellAmountCheck(value) {
    this.setState({ sellAmount: value });
    axios
      .get(
        "https://ctyvahls-dev.outsystemsenterprise.com/CointralOnline_Services/rest/Swap/CalculateWithdrawAmount?DepositAsset=" +
          this.state.sellCurrency +
          "&WithdrawAsset=" +
          this.state.buyCurrency +
          "&DepositAmountExpected=" +
          value.toString()
      )
      .then(res => {
        console.log(res);
        this.setState({ buyAmount: res.data.WithdrawAmountEstimated });
      });
  }

  amountCheck() {
    axios
      .get(
        "https://ctyvahls-dev.outsystemsenterprise.com/CointralOnline_Services/rest/Swap/CalculateWithdrawAmount?DepositAsset=" +
          this.state.sellCurrency +
          "&WithdrawAsset=" +
          this.state.buyCurrency +
          "&DepositAmountExpected=" +
          this.state.sellAmount.toString()
      )
      .then(res => {
        console.log(res);
        this.setState({ buyAmount: res.data.WithdrawAmountEstimated });
      });
  }

  nota() {
    toast('Wow so easy !', {containerId: 'A'});
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}></h4>
        </GridItem>
        <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />
        <GridItem xs={12} sm={12}>
          <GridContainer>
            <GridItem xs={12} sm={4}>
              <FormLabel className={classes.labelHorizontal}>
                Sell Currency
              </FormLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CustomInput
                success={this.state.firstnameState === "success"}
                error={this.state.firstnameState === "error"}
                labelText={
                  <span>
                    Deposit Amount <small>(required)</small>
                  </span>
                }
                id="firstname"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: e => {
                    this.nota();
                    this.sellAmountCheck(e.target.value);
                  },
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className={classes.inputAdornment}
                    >
                      <AccountBalanceWallet
                        className={classes.inputAdornmentIcon}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={4}>
              <Select
                style={{ width: 100 }}
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.sellCurrency}
                onChange={e => {
                  this.sellCurrencyCheck(e.target.value);
                  this.amountCheck();
                }}
                inputProps={{
                  name: "simpleSelect",
                  id: "simple-select"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Choose Currency
                </MenuItem>
                {this.state.currencies.map(currency => (
                  // eslint-disable-next-line react/jsx-key
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={currency}
                  >
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={4}>
              <FormLabel className={classes.labelHorizontal}>
                Buy Currency
              </FormLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CustomInput
                success={this.state.lastnameState === "success"}
                error={this.state.lastnameState === "error"}
                disabled="disabled"
                labelText={this.state.buyAmount}
                id="lastname"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  disabled: true,
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className={classes.inputAdornment}
                    >
                      <Autorenew className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  )
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4}>
              <Select
                style={{ width: 100 }}
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.buyCurrency}
                onChange={e => {
                  this.buyCurrencyCheck(e.target.value);
                  this.amountCheck();
                }}
                inputProps={{
                  name: "simpleSelect",
                  id: "simple-select"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Choose Currency
                </MenuItem>
                {this.state.currencies.map(currency => (
                  // eslint-disable-next-line react/jsx-key
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={currency}
                  >
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            success={this.state.emailState === "success"}
            error={this.state.emailState === "error"}
            labelText={
              <span>
                Address <small>(required)</small>
              </span>
            }
            id="email"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "address", "length"),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Forward className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
