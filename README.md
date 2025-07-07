# ESPN Fantasy WNBA API

> The first and only public API for ESPN's Fantasy WNBA

This library provides access to ESPN's internal Fantasy WNBA endpoints, reverse-engineered and documented for public use.

## Installation

```bash
npm install espn-fantasy-wnba-api
```

## Quick Start

```javascript
import ESPNWNBAFantasyAPI from 'espn-fantasy-wnba-api';

// Public data (no authentication)
const api = new ESPNWNBAFantasyAPI();
const players = await api.getAllPlayers();

// Private league data (requires ESPN cookies)
const privateApi = new ESPNWNBAFantasyAPI({
    espnS2: 'your_espn_s2_cookie',
    swid: 'your_swid_cookie'
});

const rosters = await privateApi.getLeagueRosters('your_league_id');
```

## Authentication

For private league data, you need ESPN authentication cookies:

1. Go to ESPN Fantasy Basketball in your browser
2. Open DevTools (F12) → Application → Cookies → espn.com  
3. Copy `espn_s2` and `SWID` values

## Available Methods

### Public Endpoints (No Auth Required)
- `getAllPlayers(scoringPeriodId?)` - All WNBA players with ownership data
- `getProTeamSchedules()` - WNBA team schedules
- `getGameState()` - Current game state info

### Private Endpoints (Auth Required)
- `getLeagueRosters(leagueId)` - All team rosters in league
- `getLeagueSettings(leagueId)` - League scoring settings
- `getPendingTransactions(leagueId)` - Waivers and pending trades
- `getCurrentMatchups(leagueId, scoringPeriodId?)` - Current week matchups
- `getScoreboard(leagueId, scoringPeriodId?)` - League scoreboard

## Example: Get Team Rosters

```javascript
const api = new ESPNWNBAFantasyAPI({
    espnS2: 'your_cookie',
    swid: 'your_swid'
});

const data = await api.getLeagueRosters('1683551689');
const rosters = api.extractRosters(data);

rosters.forEach(team => {
    console.log(`${team.name}:`);
    team.players.forEach(player => {
        console.log(`  - ${player.name}`);
    });
});
```

## Discovered Endpoints

This API exposes ESPN's internal Fantasy WNBA endpoints. All discovered endpoints are documented in the source code for developers who want to expand functionality.

**Base URL:** `https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba`

**Game Code:** `wfba` (Women's Fantasy Basketball Association)

## Contributing

Found more endpoints or want to add features? PRs welcome!

## License

MIT - Use freely for personal or commercial projects.