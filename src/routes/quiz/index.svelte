<script context="module" lang="ts">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ session }) {
    if (!session?.user?.id) {
      return {
        status: 301,
        redirect: "/?redirect=/quiz",
      };
    }

    return true;
  }
</script>



<script lang="ts">
  
const createQuiz = async() => {
  await fetch('/api/quiz.json', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',

    });
}
</script>

<h1>Welcome to Musikquiz Maschine 3000</h1>
