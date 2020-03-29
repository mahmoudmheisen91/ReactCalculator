let DisplayComp = props => {
  return (
    <div id="full-display">
      <div id="formulaSection">{props.formula}</div>
      <div id="display">{props.output}</div>
    </div>
  );
};

let KeyPadComp = props => {
  return (
    <div className="keys">
      <button
        className="op__key AC"
        id="clear"
        onClick={props.initialize}
        value="AC"
      >
        AC
      </button>
      <button
        className="op__key"
        id="negate"
        onClick={props.handleOperator}
        value="-"
      >
        +/-
      </button>

      <button
        className="op__key"
        id="divide"
        onClick={props.handleOperator}
        value="/"
      >
        /
      </button>
      <button
        className="num__key"
        id="seven"
        onClick={props.handleNumber}
        value="7"
      >
        7
      </button>
      <button
        className="num__key"
        id="eight"
        onClick={props.handleNumber}
        value="8"
      >
        8
      </button>
      <button
        className="num__key"
        id="nine"
        onClick={props.handleNumber}
        value="9"
      >
        9
      </button>
      <button
        className="op__key"
        id="multiply"
        onClick={props.handleOperator}
        value="x"
      >
        x
      </button>
      <button
        className="num__key"
        id="four"
        onClick={props.handleNumber}
        value="4"
      >
        4
      </button>
      <button
        className="num__key"
        id="five"
        onClick={props.handleNumber}
        value="5"
      >
        5
      </button>
      <button
        className="num__key"
        id="six"
        onClick={props.handleNumber}
        value="6"
      >
        6
      </button>
      <button
        className="op__key"
        id="subtract"
        onClick={props.handleOperator}
        value="-"
      >
        -
      </button>
      <button
        className="num__key"
        id="one"
        onClick={props.handleNumber}
        value="1"
      >
        1
      </button>
      <button
        className="num__key"
        id="two"
        onClick={props.handleNumber}
        value="2"
      >
        2
      </button>
      <button
        className="num__key"
        id="three"
        onClick={props.handleNumber}
        value="3"
      >
        3
      </button>
      <button
        className="op__key"
        id="add"
        onClick={props.handleOperator}
        value="+"
      >
        +
      </button>
      <button
        className="op__key"
        id="percent"
        onClick={props.handleOperator}
        value="%"
      >
        %
      </button>
      <button
        className="num__key"
        id="zero"
        onClick={props.handleNumber}
        value="0"
      >
        0
      </button>
      <button
        className="op__key"
        id="decimal"
        onClick={props.handleDecimal}
        value="."
      >
        .
      </button>
      <button
        className="op__key"
        id="equals"
        onClick={props.handleEqual}
        value="="
      >
        =
      </button>
    </div>
  );
};

class CalcController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: "",
      output: "0",
      previous: "",
      evaluated: false
    };

    this.initialize = this.initialize.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
  }

  initialize() {
    this.setState({
      formula: "",
      output: "0",
      previous: "0",
      evaluated: false
    });
  }

  handleOperator(event) {
    // took help from fcc
    let value = event.target.value;
    let { formula, previous, evaluated } = this.state;
    this.setState({ output: value, evaluated: false });

    if (evaluated) {
      this.setState({ formula: previous + value });
    } else if (!/[x+\-/%]$/.test(formula)) {
      this.setState({
        previous: formula,
        formula: formula + value
      });
    } else if (!/[x/+%]-$/.test(formula)) {
      this.setState({
        formula: (/[x/+%]-$/.test(formula + value) ? formula : previous) + value
      });
    } else if (value !== "-") {
      this.setState({
        formula: previous + value
      });
    }
  }

  handleEqual() {
    let expression = this.state.formula.replace(/x/g, "*");
    let answer = eval(expression);

    this.setState({
      formula: expression + " = " + answer,
      output: String(answer),
      previous: answer,
      evaluated: true
    });
  }

  handleDecimal() {
    if (!this.state.output.includes(".")) {
      this.setState({
        output: this.state.output + ".",
        formula: this.state.formula + ".",
        evaluated: false
      });
    }
  }

  handleNumber(event) {
    let value = event.target.value;
    let { output, formula } = this.state;

    this.setState({
      output: output === "0" ? value : output + value,
      formula: formula + value,
      evaluated: false
    });
  }

  render() {
    return (
      <div id="root2">
        <div id="calulator">
          <DisplayComp
            formula={this.state.formula}
            output={this.state.output}
          />
          <KeyPadComp
            initialize={this.initialize}
            handleOperator={this.handleOperator}
            handleEqual={this.handleEqual}
            handleDecimal={this.handleDecimal}
            handleNumber={this.handleNumber}
          />
        </div>
      </div>
    );
  }
}
