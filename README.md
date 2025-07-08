# ESPN Fantasy WNBA API

> The first and only public API for ESPN's Fantasy WNBA

This library provides access to ESPN's internal Fantasy WNBA endpoints, reverse-engineered and documented for public use.

## Prerequisites

This package is designed for Node.js environments and requires:

```bash
npm install node-fetch
```

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

const rosters = await privateApi.getLeagueRosters('YOUR_LEAGUE_ID_HERE');
```

## Authentication

For private league data, you need ESPN authentication cookies:

1. Go to ESPN Fantasy WNBA in your browser
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

const data = await api.getLeagueRosters('YOUR_LEAGUE_ID_HERE');
const rosters = api.extractRosters(data);

rosters.forEach(team => {
    console.log(`${team.name}:`);
    team.players.forEach(player => {
        console.log(`  - ${player.name}`);
    });
});
```

## Troubleshooting

**Common Issues:**

- **"fetch is not defined"** - Make sure you've installed `node-fetch`
- **401 Unauthorized** - Check that your ESPN cookies are valid and not expired
- **Module not found** - Ensure you're using Node.js 14+ with ES modules support

**Getting Your League ID:**
Your league ID can be found in the URL when viewing your ESPN Fantasy WNBA league:
`https://fantasy.espn.com/basketball/league?leagueId=YOUR_LEAGUE_ID_HERE`

## Discovered Endpoints

This API exposes ESPN's internal Fantasy WNBA endpoints. All discovered endpoints are documented in the source code for developers who want to expand functionality.

**Base URL:** `https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba`

**Game Code:** `wfba` (Women's Fantasy Basketball Association)

## Environment Support

- **Node.js**: 14.0.0 or higher
- **ES Modules**: Required

## Contributing

Found more endpoints or want to add features? PRs welcome!

## License

MIT - Use freely for personal or commercial projects.
