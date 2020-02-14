import React, { useState } from 'react';
import SearchResults from './SearchResults';

import axios from 'axios';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import champions from '../static/champion.js';
import spellsMap from '../static/spells.js';
import itemsMap from '../static/items.js';
import runesMap from '../static/runes.js';
console.log(spellsMap);
console.log(champions);
momentDurationFormatSetup(moment);
const Search = () => {
    const [summoner, setSummoner] = useState('');
    const [matches, setMatches] = useState([]);
    const onSubmit = async e => {
        e.preventDefault();
        console.log(summoner);
        if (!!summoner) {
            try {
                const arr = await axios.get(
                    `https://modest-chandrasekhar-133b5f.netlify.com/.netlify/functions/server/${summoner}`
                );
                setMatches(processMatches(arr.data.matchResults));
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    const processMatches = arr => {
        return arr.map(match => {
            const minutes = (match.gameDuration - 0) / 60;
            var summonerName
            var participantId;
            match.participantIdentities.forEach(e => {
                if (
                    e.player.summonerName.toLowerCase() ===
                    summoner.toLowerCase()
                ) {
                    summonerName = e.player.summonerName
                    participantId = e.participantId;
                }
            });
            const participant = match.participants.filter(e => {
                return e.participantId === participantId;
            })[0];
            const championId = participant.championId;
            const spells = [
                spellsMap[participant.spell1Id],
                spellsMap[participant.spell2Id]
            ];
            const {
                win,
                totalMinionsKilled,
                neutralMinionsKilled,
                champLevel,
                kills,
                deaths,
                assists,
                item0,
                item1,
                item2,
                item3,
                item4,
                item5,
                item6,
                perkPrimaryStyle,
                perkSubStyle
            } = participant.stats;

            const items = [item0, item1, item2, item3, item4, item5, item6]
                .map(e => (itemsMap[e] ? itemsMap[e].name : ''))
                .filter(e => e !== '');

            const runes = [perkPrimaryStyle, perkSubStyle].map(
                e => runesMap[e]
            );

            return {
                gameId: match.gameId,
                summoner: summonerName,
                gameCreation: moment(match.gameCreation).fromNow(),
                gameDuration: moment
                    .duration(match.gameDuration, 'seconds')
                    .format('hh[h]:mm[m] ss[s]'),
                win: win ? 'Win' : 'Loss',
                totalCS: totalMinionsKilled + neutralMinionsKilled,
                averageCS: (
                    (totalMinionsKilled + neutralMinionsKilled) /
                    minutes
                ).toFixed(1),
                kills,
                deaths,
                assists,
                KDA: ((kills + assists) / deaths).toFixed(1),
                champLevel,
                champion: champions[championId],
                spells,
                items,
                runes
            };
        });
    };

    return (
        <div>
            <h1>League Stats</h1>
            <form onSubmit={onSubmit}>
                <input
                    onChange={e => setSummoner(e.target.value.trim())}
                    placeholder="Enter summoner name"
                />
            </form>
            <div style={{
                margin: "60px 30px"
            }}>
                {matches.map(match => {
                    return (
                        // <div></div>
                        <SearchResults
                            key={match.gameId}
                            match={match}
                        ></SearchResults>
                    );
                })}
            </div>
        </div>
    );
};

export default Search;
