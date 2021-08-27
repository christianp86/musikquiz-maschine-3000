
import { AuthManager } from '../src/utils/spotify/AuthManager'
import 'dotenv'

test("Return a valid OAuth 2.0 token", async () => {
    const authManager = new AuthManager();
    const token = await authManager.getApiToken(process.env.SPOTIFY_CLIENT, process.env.SPOTIFY_SECRET)
    expect(token).not.toBe("");
});

/* import { expect } from 'chai';
import 'mocha';
describe('Spotify Authentication via OAuth 2.0', () => {

    it('Return a valid OAuth 2.0 token', async () => {
        const authManager = new AuthManager();
        const token = await authManager.getApiToken(process.env.SPOTIFY_CLIENT, process.env.SPOTIFY_SECRET)
        expect(token).to.not.be.empty;
    });

}); */