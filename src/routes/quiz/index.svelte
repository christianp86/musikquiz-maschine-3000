<script context="module" lang="ts">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ session }) {
    console.log(`Session in quiz: ${session}`);
    if (!session?.user?.id) {
      return {
        status: 301,
        redirect: "/?redirect=/quiz",
      };
    }

    return true;
  }
</script>

<h1>Welcome to Musikquiz Maschine 3000</h1>

