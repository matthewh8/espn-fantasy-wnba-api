#!/usr/bin/env node

/**
 * ESPN Fantasy WNBA API - Usage Example
 * 
 * Simple example showing how to use the API to get team rosters
 */

 import ESPNWNBAFantasyAPI from './index.js';

 // Configuration - Replace with your actual values
 const CONFIG = {
     espnS2: 'YOUR_ESPN_S2_COOKIE_HERE',
     swid: 'YOUR_SWID_COOKIE_HERE',
     leagueId: 'YOUR_LEAGUE_ID_HERE'
 };
 
 async function main() {
     console.log('🏀 ESPN Fantasy WNBA API Example\n');
     
     // Check if config is filled in
     if (CONFIG.espnS2.includes('YOUR_')) {
         console.log('❌ Please update CONFIG with your actual values:');
         console.log('1. espnS2: Get from browser cookies on espn.com');
         console.log('2. swid: Get from browser cookies on espn.com');
         console.log('3. leagueId: Get from your league URL\n');
         
         console.log('How to get cookies:');
         console.log('- Go to ESPN Fantasy Basketball in browser');
         console.log('- Open DevTools (F12) → Application → Cookies → espn.com');
         console.log('- Copy espn_s2 and SWID values');
         return;
     }
 
     try {
         // Initialize API with your credentials
         const api = new ESPNWNBAFantasyAPI({
             espnS2: CONFIG.espnS2,
             swid: CONFIG.swid
         });
 
         console.log('📊 Testing Public Endpoint (All Players)...');
         const players = await api.getAllPlayers();
         console.log(`✅ Found ${players.players?.length || 0} WNBA players\n`);
 
         console.log('🏆 Getting League Rosters...');
         const leagueData = await api.getLeagueRosters(CONFIG.leagueId);
         const rosters = api.extractRosters(leagueData);
 
         console.log(`✅ Found ${rosters.length} teams in your league:\n`);
 
         // Display each team's roster
         rosters.forEach((team, index) => {
             console.log(`${index + 1}. ${team.name} (Team ${team.id})`);
             console.log('─'.repeat(40));
             
             if (team.players.length === 0) {
                 console.log('   No players rostered');
             } else {
                 team.players.forEach(player => {
                     console.log(`   • ${player.name || 'Unknown Player'}`);
                 });
             }
             console.log('');
         });
 
         console.log('🎯 Testing Other Endpoints...');
         
         // Test league settings
         const settings = await api.getLeagueSettings(CONFIG.leagueId);
         console.log(`✅ League Settings: ${settings.settings?.name || 'Unknown League'}`);
         
         // Test pending transactions
         const transactions = await api.getPendingTransactions(CONFIG.leagueId);
         console.log(`✅ Pending Transactions: ${transactions.topics?.length || 0} pending`);
 
         console.log('\n🚀 All tests completed successfully!');
 
     } catch (error) {
         console.error('❌ Error:', error.message);
         
         if (error.message.includes('401')) {
             console.log('\n💡 Tip: Make sure your ESPN cookies are valid and not expired');
         }
     }
 }
 
 // Run the example
 main();