import './App.css';
import React from 'react';

class StatBox extends React.Component {
  render() {
    return (
      <article className="StatBox">
        <header className="StatTitle">{this.props.num}</header>
        <p className="StatScore">{this.props.score}</p>
        <p className="StatMod">{this.props.mod}</p>
      </article>
    );
  }
}

class StatWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
      score5: 0,
      score6: 0,
      score7: 0,
      mod1: "+0",
      mod2: "+0",
      mod3: "+0",
      mod4: "+0",
      mod5: "+0",
      mod6: "+0",
      mod7: "+0"
    };
    this.rollStats = this.rollStats.bind(this);
  }

  rollD6() {
    return Math.floor(Math.random() * 7);
  }

  roll4D6Drop1() {
    const rolls = [0, 0, 0, 0];
    rolls[0] = this.rollD6();
    rolls[1] = this.rollD6();
    rolls[2] = this.rollD6();
    rolls[3] = this.rollD6();
    rolls.sort();
    rolls.reverse();

    let sum = 0;
    for (let step = 0; step < 3; step++) {
      sum += rolls[step];
    }

    return sum;
  }

  determineMod(score) {
    if (score <= 19 && score > 17)
      return 4;
    else if (score <= 17 && score > 15)
      return 3;
    else if (score <= 15 && score > 13)
      return 2;
    else if (score <= 13 && score > 11)
      return 1;
    else if (score <= 11 && score > 9)
      return 0;
    else if (score <= 9 && score > 7)
      return -1;
    else if (score <= 7 && score > 5)
      return -2;
    else if (score <= 5 && score > 3)
      return -3;
    else
      return -4;
  }

  appendSign(mod) {
    if (mod >= 0)
      return "+" + mod;
    else
      return mod
  }

  rollStats() {
    const r1 = this.roll4D6Drop1();
    const r2 = this.roll4D6Drop1();
    const r3 = this.roll4D6Drop1();
    const r4 = this.roll4D6Drop1();
    const r5 = this.roll4D6Drop1();
    const r6 = this.roll4D6Drop1();
    const r7 = r1 + r2 + r3 + r4 + r5 + r6;

    const m1 = this.determineMod(r1);
    const m2 = this.determineMod(r2);
    const m3 = this.determineMod(r3);
    const m4 = this.determineMod(r4);
    const m5 = this.determineMod(r5);
    const m6 = this.determineMod(r6);
    const m7 = m1 + m2 + m3 + m4 + m5 + m6;

    this.setState({
      score1: r1,
      score2: r2,
      score3: r3,
      score4: r4,
      score5: r5,
      score6: r6,
      score7: r7,
      mod1: this.appendSign(m1),
      mod2: this.appendSign(m2),
      mod3: this.appendSign(m3),
      mod4: this.appendSign(m4),
      mod5: this.appendSign(m5),
      mod6: this.appendSign(m6),
      mod7: this.appendSign(m7)
    });
  }

  render() {
    return (
      <section className="StatWidget">
        <section className="StatArray">
          <StatBox className="StatBox" num="Stat 1" score={this.state.score1} mod={this.state.mod1}></StatBox>
          <StatBox className="StatBox" num="Stat 2" score={this.state.score2} mod={this.state.mod2}></StatBox>
          <StatBox className="StatBox" num="Stat 3" score={this.state.score3} mod={this.state.mod3}></StatBox>
          <StatBox className="StatBox" num="Stat 4" score={this.state.score4} mod={this.state.mod4}></StatBox>
          <StatBox className="StatBox" num="Stat 5" score={this.state.score5} mod={this.state.mod5}></StatBox>
          <StatBox className="StatBox" num="Stat 6" score={this.state.score6} mod={this.state.mod6}></StatBox>
          <StatBox className="StatBox" num="Total" score={this.state.score7} mod={this.state.mod7}></StatBox>
        </section>
        <button className="RollButton" onClick={this.rollStats}>Roll</button>
      </section>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="AppHeader">Golumpki's Stat Roller</header>
      <StatWidget className="StatWidget"></StatWidget>
    </div>
  );
}

export default App;