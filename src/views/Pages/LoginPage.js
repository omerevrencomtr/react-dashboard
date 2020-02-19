import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import SwapHorizontalCircle from "@material-ui/icons/SwapHorizontalCircle";
import Security from "@material-ui/icons/Security";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Wizard from "components/Wizard/Wizard.js";

import Step1 from "./WizardSteps/Step1.js";
import Step2 from "./WizardSteps/Step2.js";
import Step3 from "./WizardSteps/Step3.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import Timeline from "@material-ui/core/SvgIcon/SvgIcon";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CardBody from "components/Card/CardBody.js";

import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Check from "@material-ui/icons/Check";
const useStyles = makeStyles(styles);

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const [checked, setChecked] = React.useState([]);
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={11}>
          <Card className={classes.cardSignup}>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={4} md={4}>
                  <InfoArea
                      title="24/7 INVESTMENT TRANSACTIONS"
                      description="You can also make your bank transfers after work and continue your buying and selling transactions."
                      icon={Code}
                      iconColor="rose"
                  />
                  <InfoArea
                      title="EASY BUYING AND SALE"
                      description="With fast buying and selling options, you can perform your transaction at the most affordable prices without waiting."
                      icon={SwapHorizontalCircle}
                      iconColor="primary"
                  />
                  <InfoArea
                      title="EASY TO USE INTERFACE"
                      description="With Cointral, buying and selling crypto money is easier and more understandable than ever before."
                      icon={Group}
                      iconColor="info"
                  />
                  <InfoArea
                      title="Security"
                      description="The security of your personal information and investments is kept at a high level."
                      icon={Security}
                      iconColor="danger"
                  />
                </GridItem>
                <GridItem xs={12} sm={8} md={8}>
                  <form>
                    <Wizard
                        validate
                        steps={[
                          { stepName: "Exchange", stepComponent: Step1, stepId: "exchange" },
                          { stepName: "Deposit", stepComponent: Step2, stepId: "deposit" },
                          { stepName: "Withdraw", stepComponent: Step3, stepId: "withdraw" },
                          { stepName: "Done", stepComponent: Step3, stepId: "done" }
                        ]}
                        title=""
                        subtitle=""
                        finishButtonClick={e => alert(e)}
                    />
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
