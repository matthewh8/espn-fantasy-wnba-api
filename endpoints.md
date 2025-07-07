# ESPN Fantasy WNBA API Endpoints

> Complete reference of discovered ESPN Fantasy WNBA endpoints for developers

**Base URL:** `https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba`

**Game Code:** `wfba` (Women's Fantasy Basketball Association)

## Authentication

Private endpoints require ESPN authentication cookies in the request header:

```
Cookie: espn_s2=YOUR_ESPN_S2_VALUE; SWID=YOUR_SWID_VALUE
```

## Public Endpoints

These endpoints work without authentication:

### Get All Players
```
GET /seasons/{season}/players?view=players_wl&scoringPeriodId={id}
```
Returns all WNBA players with ownership percentages across all fantasy leagues.

### Get Pro Team Schedules  
```
GET /seasons/{season}?view=proTeamSchedules_wl
```
Returns WNBA team schedules and game information.

### Get Game State
```
GET /seasons/{season}?view=kona_game_state
```
Returns current WNBA season state and timing information.

## Private Endpoints

These endpoints require ESPN authentication:

### League Data
```
# Team rosters and basic info
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mRoster&view=mTeam

# League settings and scoring rules
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mSettings

# Pending transactions (waivers, trades)
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mPendingTransactions
```

### Matchup Data
```
# Current week matchups
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mMatchup

# Detailed matchup scores
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mMatchupScore

# Box scores for games
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mBoxscore

# Live scoring updates
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mLiveScoring

# League scoreboard
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mScoreboard
```

### League Activity
```
# Recent league activity feed
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mRecentActivity

# Complete transaction history
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mTransactions2

# Draft results and picks
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mDraftDetail
```

### League Management
```
# League status and state
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mStatus

# Navigation and menu data
GET /seasons/{season}/segments/0/leagues/{leagueId}?view=mNav
```

## Combining Views

You can combine multiple views in a single request:

```
GET /seasons/2025/segments/0/leagues/123456?view=mRoster&view=mTeam&view=mSettings&view=mMatchup
```

## Parameters

- `{season}` - Fantasy season year (e.g., 2025)
- `{leagueId}` - Your ESPN fantasy league ID
- `{scoringPeriodId}` - Week number (optional for current week)

## Response Format

All endpoints return JSON data. The structure varies by endpoint but generally follows ESPN's internal API patterns.

## Rate Limiting

ESPN may rate limit requests. Use reasonable delays between calls to avoid being blocked.

## Discovery Notes

These endpoints were discovered through reverse engineering ESPN's Fantasy WNBA web application. This represents the complete set of known endpoints as of 2025.

The Fantasy WNBA system uses the game code `wfba` rather than the expected `fwb`, which was a key discovery in accessing these endpoints.