import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";

const endsWithOperator = /[*\/+-]$/,
  endsWithMinus = /-$/,
  doubleOperator = /[\/+*-]-$/,
  clearStyle = { background: "#AC3939" },
  operatorStyle = { background: "#666" },
  equalsStyle = {background: "#004466" }

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluated: false,
      currentVal: "0",
      formula: "",
      maxDigitLimit: 22,
    } 
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleInitialize = this.handleInitialize.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
  }
  handleInitialize() {
    this.setState({
      currentVal: "0",
      formula: ""
    })
  }

  handleOperators(e) {
    const value = e.target.value;
    const { evaluated, currentVal, formula } = this.state;
    if (evaluated) {
      this.setState({
        evaluated: false,
        currentVal: value,
        formula: currentVal.concat(value)
      })
    } else if (!formula) {
      this.setState({
        currentVal: value,
        formula: `0${value}`
      })
    } else if (endsWithOperator.test(formula)) {
      if (endsWithMinus.test(value) && !doubleOperator.test(formula)) {
        this.setState({
          currentVal: "-",
          formula: formula.concat("-")
        })
      } else if (doubleOperator.test(formula)) {
        console.log(doubleOperator.test(formula));
        if (endsWithOperator.test(value)) {
          this.setState({
            currentVal: value,
            formula: formula.replace(doubleOperator, value)
          })
        }
      } else if (!doubleOperator.test(formula)) {
        this.setState({
          currentVal: value,
          formula: formula.replace(endsWithOperator, value)
        })
      }
    } else {
      this.setState({
        currentVal: value,
        formula: formula.concat(value)
      })
    }
  }

  handleNumbers(e) {
    const value = e.target.value;
    let { currentVal, formula, evaluated, maxDigitLimit } = this.state
    if (evaluated) {
      this.setState({
        evaluated: false,
        currentVal: value,
        formula: value
      })      
    } else if (currentVal.length < maxDigitLimit) {
      if (endsWithOperator.test(currentVal)) {
      this.setState({
        currentVal: value,
        formula: formula.concat(value)
      })
    } else if (currentVal === "0") {
      if (value !== "0") {
        this.setState({
          currentVal: value,
          formula: value
        })
      }
    } else {
      this.setState({
        currentVal: currentVal.concat(value),
        formula: formula.concat(value)
      })
    }
    }
  }

  handleDecimal() {
    let {currentVal, formula, evaluated} = this.state;
    if (evaluated) {
      this.setState({
        evaluated: false,
        currentVal: currentVal.concat("."),
        formula: currentVal.concat(".")
      })
    } else if (!formula) {
      this.setState({
        currentVal: currentVal.concat("."),
        formula: "0."
      })
    } else if (endsWithOperator.test(formula)) {
      this.setState({
        currentVal: ".",
        formula: formula.concat(".")
      })
    } else if (!/\./.test(currentVal)) {
      this.setState({
        currentVal: currentVal.concat("."),
        formula: formula.concat(".")
      })
    }
  }
  
  handleEvaluate() {
    let {formula, evaluated} = this.state;
    if (formula && !evaluated) {
      formula = formula.replace("--", "+");
      if (doubleOperator.test(formula)) {
        formula = formula.slice(0, -2);
      } else if (endsWithOperator.test(formula)) {
        formula = formula.slice(0, -1)
      }
      let answer = eval(formula);
      this.setState({
        currentVal: answer.toString(),
        formula: formula.concat(`=${answer}`),
        evaluated: true
      })
    }
  }
  render() {
    return ( 
      <div id="container">
        <Formula formula={this.state.formula}/>
        <Output currentValue={this.state.currentVal}/>
        <Buttons
          numbers={this.handleNumbers}
          operators={this.handleOperators}
          decimal={this.handleDecimal}
          evaluate={this.handleEvaluate}
          initialize={this.handleInitialize}
        />
      </div>
    )
  }
}

class Buttons extends React.Component {
    render() {
        return (
          <div className="buttons">
            <button
              id="clear"
              onClick={this.props.initialize}
              style={clearStyle}
              value="AC"
            >
              AC
            </button>
            <button
              id="divide"
              onClick={this.props.operators}
              style={operatorStyle}
              value="/"
            >
              /
            </button>
            <button
              id="multiply"
              onClick={this.props.operators}
              style={operatorStyle}
              value="*"
            >
              x
            </button>
            <button
              id="seven"
              onClick={this.props.numbers}
              value="7"
            >
              7
            </button>
            <button
              id="eight"
              onClick={this.props.numbers}
              value="8"
            >
              8
            </button>
            <button
              id="nine"
              onClick={this.props.numbers}
              value="9"
            >
              9
            </button>
            <button
              id="subtract"
              onClick={this.props.operators}
              style={operatorStyle}
              value="-"
            >
              -
            </button>
            <button
              id="four"
              onClick={this.props.numbers}
              value="4"
            >
              4
            </button>
            <button 
              id="five" 
              onClick={this.props.numbers} 
              value="5"
            >
              5
            </button>
            <button 
              id="six" 
              onClick={this.props.numbers} 
              value="6"
            >
              6
            </button>
            <button
              id="add"
              onClick={this.props.operators}
              style={operatorStyle}
              value="+"
            >
              +
            </button>
            <button 
              id="one" 
              onClick={this.props.numbers} 
              value="1"
            >
              1
            </button>
            <button 
              id="two" 
              onClick={this.props.numbers} 
              value="2"
            >
              2
            </button>
            <button 
              id="three" 
              onClick={this.props.numbers} 
              value="3"
            >
              3
            </button>
            <button
              id="zero"
              onClick={this.props.numbers}
              value="0"
            >
              0
            </button>
            <button
              id="decimal" 
              onClick={this.props.decimal} 
              value="."
            >
              .
            </button>
            <button
              id="equals"
              onClick={this.props.evaluate}
              style={equalsStyle}
              value="="
            >
              =
            </button>
          </div>
        )
    }
}

class Output extends React.Component {
  render() {
    return (
      <div className="outputScreen" id="display">{this.props.currentValue}</div>
    )
  }
}

class Formula extends React.Component {
  render() {
    return (
      <div className="formulaScreen">{this.props.formula}</div>
    )
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Calculator/>)