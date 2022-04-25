/// <reference types="@sveltejs/kit" />
declare namespace App {
    interface Locals {
        user: { id: string, name: string, aud: string } | undefined;
    }

    interface Platform { }

    interface Session {
        user: { id: string, name: string, aud: string } | undefined;
    }

    interface Stuff { }
}