import React , {Component} from 'react';
import Square from './Square';

export default class Board extends Component{
    renderSquare(i){
        return  <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)} />
    }
    render(){
        return(
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>{this.renderSquare(0)}</td>
                            <td>{this.renderSquare(1)}</td>
                            <td>{this.renderSquare(2)}</td>
                        </tr>
                        <tr>
                            <td>{this.renderSquare(3)}</td>
                            <td>{this.renderSquare(4)}</td>
                            <td>{this.renderSquare(5)}</td>
                        </tr>
                        <tr>
                            <td>{this.renderSquare(6)}</td>
                            <td>{this.renderSquare(7)}</td>
                            <td>{this.renderSquare(8)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}