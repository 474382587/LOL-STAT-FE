import React from 'react';
import './SearchResult.css';
const SearchResults = props => {
    return (
        <div className="result-container">
            <div>
                <div>Game Duration: {props.match.gameDuration}</div>
                <div>Summoner Name: {props.match.summoner}</div>
                <div>Game Result: {props.match.win}</div>
                <div>Game Creation: {props.match.gameCreation}</div>
            </div>
            <div>
                <div className="flex">
                    <div>Spells:</div>
                    <div>
                        {props.match.spells[0]}
                        <br></br>
                        {props.match.spells[1]}
                    </div>
                </div>
                <div className="flex">
                    <div>Runes:</div>
                    <div>
                        {props.match.runes.map((e, index) => (
                            <div key={index}>
                                <span>{e}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div>Champion: <span style={{
                    marginLeft: 10
                }}> {props.match.champion}</span></div>
            </div>
            <div>
                <div>
                    K/DA {props.match.kills} - {props.match.deaths} -{' '}
                    {props.match.assists} (
                    {(
                        (props.match.kills + props.match.assists) /
                        props.match.deaths
                    ).toFixed(1)}
                    )
                </div>
            </div>
            <div>
                <div>Champion Level: {props.match.champLevel}</div>
                <div>Total CS: {props.match.totalCS} </div>
                <div>{props.match.averageCS} CS/min</div>
            </div>
            <div>
                <div className="flex">
                    <div>Items:</div>
                    <div>
                        {props.match.items.map((e, index) => (
                            <div key={index}>
                                <span>{e}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
