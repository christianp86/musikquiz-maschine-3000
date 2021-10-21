interface AuthApiReponse {
    access_token: string;
    token_type: string;
    expires: number;
}

export class AuthManager {
    private token: string;
    /**
       * 
       * @param token  API Token
       */
    constructor(token = "NO TOKEN") {
        this.token = token;
    }

    /**
       * Returns an api token from your client id and client secret!
       *
       * @param clientID Your spotify app's client id
       * @param clientSecret Your spotify app's client secret
       * @example await auth.getApiToken('id', 'secret');
       */
    async getApiToken(clientID: string, clientSecret: string): Promise<string> {

        const buff = Buffer.from(`${clientID}:${clientSecret}`, 'utf-8');
        const base64 = buff.toString('base64');
        const authenticationHeader = `Basic ${base64}`;

        console.debug(authenticationHeader);

        const body = `${encodeURIComponent("grant_type")}=${encodeURIComponent("client_credentials")
            }`;
        console.debug(`Body: ${body}`);

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": authenticationHeader,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body,
        });

        if (response.status !== 200) throw new Error('Invalid client')

        const jsonData: AuthApiReponse = await response.json();
        return jsonData.access_token;
    }
}
