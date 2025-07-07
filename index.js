/**
 * ESPN Fantasy WNBA API
 * 
 * The first and only public API for ESPN's Fantasy WNBA.
 * Reverse-engineered from ESPN's internal endpoints.
 * 
 * Base URL: https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba
 * Game Code: wfba (Women's Fantasy Basketball Association)
 */

 import fetch from 'node-fetch';

 export class ESPNWNBAFantasyAPI {
     constructor(options = {}) {
         this.espnS2 = options.espnS2;
         this.swid = options.swid;
         this.season = options.season || 2025;
         this.baseURL = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba';
     }
 
     /**
      * Make authenticated request to ESPN API
      */
     async request(endpoint) {
         const headers = {
             'Accept': 'application/json',
             'User-Agent': 'ESPN-Fantasy-WNBA-API'
         };
 
         if (this.espnS2 && this.swid) {
             headers.Cookie = `espn_s2=${this.espnS2}; SWID=${this.swid}`;
         }
 
         const response = await fetch(`${this.baseURL}${endpoint}`, { headers });
         
         if (!response.ok) {
             throw new Error(`ESPN API Error: ${response.status} ${response.statusText}`);
         }
 
         return response.json();
     }
 
     // ===== PUBLIC ENDPOINTS (No authentication required) =====
 
     /**
      * Get all WNBA players with ownership data
      */
     async getAllPlayers(scoringPeriodId = 0) {
         const endpoint = `/seasons/${this.season}/players?view=players_wl&scoringPeriodId=${scoringPeriodId}`;
         return this.request(endpoint);
     }
 
     /**
      * Get WNBA team schedules  
      */
     async getProTeamSchedules() {
         const endpoint = `/seasons/${this.season}?view=proTeamSchedules_wl`;
         return this.request(endpoint);
     }
 
     /**
      * Get current game state
      */
     async getGameState() {
         const endpoint = `/seasons/${this.season}?view=kona_game_state`;
         return this.request(endpoint);
     }
 
     // ===== PRIVATE ENDPOINTS (Requires ESPN authentication) =====
 
     /**
      * Get league rosters and teams
      */
     async getLeagueRosters(leagueId) {
         const endpoint = `/seasons/${this.season}/segments/0/leagues/${leagueId}?view=mRoster&view=mTeam`;
         return this.request(endpoint);
     }
 
     /**
      * Get league settings
      */
     async getLeagueSettings(leagueId) {
         const endpoint = `/seasons/${this.season}/segments/0/leagues/${leagueId}?view=mSettings`;
         return this.request(endpoint);
     }
 
     /**
      * Get pending transactions (waivers, trades)
      */
     async getPendingTransactions(leagueId) {
         const endpoint = `/seasons/${this.season}/segments/0/leagues/${leagueId}?view=mPendingTransactions`;
         return this.request(endpoint);
     }
 
     /**
      * Get current matchups
      */
     async getCurrentMatchups(leagueId, scoringPeriodId) {
         const endpoint = `/seasons/${this.season}/segments/0/leagues/${leagueId}?view=mMatchup${scoringPeriodId ? `&scoringPeriodId=${scoringPeriodId}` : ''}`;
         return this.request(endpoint);
     }
 
     /**
      * Get league scoreboard
      */
     async getScoreboard(leagueId, scoringPeriodId) {
         const endpoint = `/seasons/${this.season}/segments/0/leagues/${leagueId}?view=mScoreboard${scoringPeriodId ? `&scoringPeriodId=${scoringPeriodId}` : ''}`;
         return this.request(endpoint);
     }
 
     // ===== HELPER METHODS =====
 
     /**
      * Extract just roster data from league response
      */
     extractRosters(leagueData) {
         return leagueData.teams?.map(team => ({
             id: team.id,
             name: team.name,
             owner: team.primaryOwner,
             players: team.roster?.entries?.map(entry => ({
                 id: entry.playerId,
                 name: entry.playerPoolEntry?.player?.fullName,
                 position: entry.playerPoolEntry?.player?.defaultPositionId,
                 proTeam: entry.playerPoolEntry?.player?.proTeamId
             })) || []
         })) || [];
     }
 }
 
 export default ESPNWNBAFantasyAPI;