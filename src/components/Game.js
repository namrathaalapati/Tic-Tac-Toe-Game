import React,{Component} from 'react';
import Board from './Board';

export default class Game extends Component{
    constructor(props){
        super(props);
        this.state={
            xturn:true,
            stepNumber:0,
            history:[
                { squares:Array(9).fill(null) }
            ],
            xwinner:0,
            owinner:0
        }
    }

    handleChange(i){
        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        let winner = calculateWinner(squares);
        if(winner || squares[i])
        {
            return;
        }
        squares[i] = this.state.xturn?'X':'0';
        winner = calculateWinner(squares);
        if(winner === "X")
            {
                this.setState({xwinner:this.state.xwinner+1});
            }
        else if(winner === "0")
            {
                this.setState({owinner:this.state.owinner+1});
            }
        this.setState({
            history: history.concat({
                squares:squares
            }),
            xturn:!this.state.xturn,
            stepNumber:history.length
        });
    }
    restart(){
        this.setState({
            stepNumber:0,
            xturn:true,
            history:[
                { squares:Array(9).fill(null) }
            ]
        })
    }
    jumpTo(step){
        this.setState({
            xturn:(step%2===0),
            stepNumber:step
        })
    }
    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const displayturn = this.state.xturn?'Next player is "X" ':'Next player is "0" ';
        let status;
        if(winner)
        {
            status= 'Winner is ' +winner;
        }
        else if(this.state.stepNumber===9)
        {
            status='Game Over';
        }
        else{
            status= displayturn;
        }
        const moves = history.map((step,move)=>{
            const gameInfo = 'Go to # Step'+move;
            return(
                <ul className="list-group">
                    <li className="list-group-item list-group-item-action" key={move}>
                        <a href="#" onClick={()=>this.jumpTo(move)}>{gameInfo}</a>
                    </li>
                </ul>
            )
        })
        return(
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="title">Tic Tac Toe</h1>
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Score Board</h3>
                            <div className="table-responsive-lg">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>X</th>
                                        <th>0</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.state.xwinner}</td>
                                        <td>{this.state.owinner}</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <span className={winner?"winner":"status"}>{status}</span>
                            <Board squares={current.squares} onClick={(i)=>this.handleChange(i)} />
                            <button className="btn-info restart" onClick={()=>this.restart()}>Restart the Game</button>
                        </div>
                        <div className="col-md-4">
                            <h3>Game-Info</h3>
                            {moves}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares){
    const lines =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i=0;i<lines.length;i++)
    {
        const [x,y,z] = lines[i];
        if(squares[x] && squares[x]===squares[y] && squares[y]=== squares[z])
        {
        return squares[x];
        }
    }
    return null;
}