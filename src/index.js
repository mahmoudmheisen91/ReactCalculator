"use strict";

function App() {
  return (
    <div>
      <HeaderComp text="FCC: Front End Libraries - Project 4, Calculator" />

      <CalcController />

      <FooterComp />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
